// Renders a page to HTML at build time, so each page's content, photos included, is in the HTML
// the server sends rather than appearing only once the app's JavaScript runs. vite.config.ts runs
// this for every page and saves the results next to the app, which then takes over in the browser.
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createMemoryHistory, createRouter } from "@tanstack/react-router";
import { renderToString } from "react-dom/server";

import { routeTree } from "./routeTree.gen";

function routerAt(path: string) {
  return createRouter({
    routeTree,
    context: { queryClient: new QueryClient() },
    history: createMemoryHistory({ initialEntries: [path] }),
  });
}

// Every page's address. Pages with a parameter in their address can't be rendered ahead of time.
export function pagePaths(): string[] {
  return Object.keys(routerAt("/").routesByPath).filter(
    (path) => path.startsWith("/") && !path.includes("$"),
  );
}

type Tag = Record<string, unknown> | undefined;
type Match = { meta?: Tag[]; links?: Tag[] };

const escapeText = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const attributes = (tag: Record<string, unknown>) =>
  Object.entries(tag)
    .filter(([, value]) => value !== undefined && value !== null && value !== false)
    .map(([name, value]) => `${name}="${escapeText(String(value)).replace(/"/g, "&quot;")}"`)
    .join(" ");

// The page's <head> tags, chosen the way the app's <HeadContent> chooses them: from the deepest
// route up, the first title and the first tag of each name or property win. The character set and
// viewport are already in index.html. Each tag is marked data-page, so the app can swap in its own
// copies when it starts.
function headTags(matches: Match[]) {
  let title: string | undefined;
  const seen = new Set<string>();
  const tags: string[] = [];
  for (const match of [...matches].reverse()) {
    for (const tag of [...(match.meta ?? [])].reverse()) {
      if (!tag || "charSet" in tag || tag.name === "viewport") continue;
      if (typeof tag.title === "string") {
        title ??= tag.title;
      } else if ("script:ld+json" in tag) {
        // "<" is written as an escape so nothing in the data can end the script tag early.
        const json = JSON.stringify(tag["script:ld+json"]).replace(/</g, "\\u003c");
        tags.push(`<script type="application/ld+json" data-page>${json}</script>`);
      } else {
        const key = String(tag.name ?? tag.property ?? "");
        if (key && seen.has(key)) continue;
        seen.add(key);
        tags.push(`<meta ${attributes(tag)} data-page>`);
      }
    }
  }
  tags.reverse();
  if (title) tags.unshift(`<title data-page>${escapeText(title)}</title>`);
  for (const match of matches) {
    for (const link of match.links ?? [])
      if (link) tags.push(`<link ${attributes(link)} data-page>`);
  }
  return tags.join("\n    ");
}

// One page as HTML: its <head> tags, the app's markup for <div id="root">, and its status: 200 when
// the address matched a page and everything on it loaded, 404 when no page matched (only the root
// layout did, or a route reported "not found"), 500 when something failed to load.
export async function renderPage(path: string) {
  const router = routerAt(path);
  await router.load();
  const body = renderToString(
    <QueryClientProvider client={router.options.context.queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  );
  const { matches } = router.state;
  const status = matches.some((m) => m.status === "error")
    ? 500
    : matches.length > 1 && matches.every((m) => m.status === "success")
      ? 200
      : 404;
  return { head: headTags(matches as Match[]), body, status };
}
