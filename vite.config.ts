import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { SITE_URL, siteStructuredData } from "./src/lib/site.ts";

// The two portraits: the homepage's, then the About page's.
const HOME_PORTRAIT = "src/assets/davin-win-kyi.jpg";
const ABOUT_PORTRAIT = "src/assets/davin-win-kyi-portrait.jpg";

// Every page, with the photos shown on it. A path ending in "/" stands for every image in that
// folder: the gallery shows each one, the preview size on the page and the full size in the viewer.
const SITEMAP_PAGES: [page: string, images: string[]][] = [
  ["/", [HOME_PORTRAIT]],
  ["/about", [ABOUT_PORTRAIT]],
  ["/publications", []],
  ["/teaching", []],
  ["/hobbies", []],
  ["/gallery", ["src/assets/gallery/thumb/", "src/assets/gallery/full/"]],
  ["/contact", []],
];

const escapeXml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

type BuiltFiles = Record<string, { type: string; fileName: string; originalFileNames?: string[] }>;

// The full address of every file this build made from a source file. A built photo's file name
// changes whenever the photo does, so its address can only come from the build's own files.
function builtFiles(bundle: BuiltFiles) {
  return Object.values(bundle).flatMap((file) =>
    file.type === "asset"
      ? (file.originalFileNames ?? []).map((source) => ({
          source,
          url: `${SITE_URL}/${file.fileName}`,
        }))
      : [],
  );
}

// Adds to index.html the tags that need a built photo's address: the homepage portrait as the
// preview image, and the structured data saying who the site is about. In the HTML itself, they
// reach search engines and link previews without the site's JavaScript having to run.
function searchTags(): Plugin {
  return {
    name: "search-tags",
    apply: "build",
    transformIndexHtml: {
      order: "post",
      handler(_html, { bundle }) {
        const built = builtFiles(bundle ?? {});
        const portraits = [HOME_PORTRAIT, ABOUT_PORTRAIT].flatMap((source) =>
          built.filter((b) => b.source === source).map((b) => b.url),
        );
        if (portraits.length < 2) {
          console.warn("search-tags: a portrait is missing from the build; tags left out");
          return [];
        }
        const previewImage = { content: portraits[0] };
        return [
          { tag: "meta", attrs: { property: "og:image", ...previewImage }, injectTo: "head" },
          { tag: "meta", attrs: { name: "twitter:image", ...previewImage }, injectTo: "head" },
          {
            tag: "script",
            attrs: { type: "application/ld+json" },
            // "<" is written as an escape so nothing in the data can end the script tag early.
            children: JSON.stringify(siteStructuredData(portraits)).replace(/</g, "\\u003c"),
            injectTo: "head",
          },
        ];
      },
    },
  };
}

// Writes sitemap.xml: every page, and the photos on it so Google Images can find them (the pages
// show their photos with JavaScript).
function sitemap(): Plugin {
  return {
    name: "sitemap",
    apply: "build",
    generateBundle(_, bundle) {
      const built = builtFiles(bundle);
      const entries = SITEMAP_PAGES.map(([page, sources]) => {
        const images = sources.flatMap((source) => {
          const found = built
            .filter((b) =>
              source.endsWith("/") ? b.source.startsWith(source) : b.source === source,
            )
            .sort((a, b) => a.source.localeCompare(b.source));
          if (!found.length) this.warn(`sitemap: no image built from ${source}`);
          return found.map(
            (b) => `    <image:image><image:loc>${escapeXml(b.url)}</image:loc></image:image>`,
          );
        });
        return ["  <url>", `    <loc>${escapeXml(SITE_URL + page)}</loc>`, ...images, "  </url>"];
      });
      this.emitFile({
        type: "asset",
        fileName: "sitemap.xml",
        source: [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
          ...entries.flat(),
          "</urlset>",
          "",
        ].join("\n"),
      });
    },
  };
}

// Standard static Vite + React SPA.
// `bun run build` emits a real dist/index.html plus dist/assets — deployable
// to Netlify, Vercel, GitHub Pages, etc. (no SSR / server runtime required).
export default defineConfig(async ({ command }) => {
  const plugins = [
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    tsConfigPaths(),
    searchTags(),
    sitemap(),
  ];

  // Lovable in-editor preview helpers — loaded ONLY while running the dev
  // server inside the Lovable sandbox. They are never imported during a
  // production build (e.g. on Netlify), so external deploys don't need them.
  if (command === "serve" && process.env.LOVABLE_SANDBOX) {
    try {
      const { hmrGatePlugin } = await import("@lovable.dev/vite-plugin-hmr-gate");
      const { devServerBridgePlugin } = await import(
        "@lovable.dev/vite-plugin-dev-server-bridge"
      );
      plugins.push(hmrGatePlugin(), devServerBridgePlugin());
    } catch {
      // Plugins unavailable outside the Lovable sandbox — safe to ignore.
    }
  }

  return {
    plugins,
    server: { host: "::", port: 8080, strictPort: true },
  };
});
