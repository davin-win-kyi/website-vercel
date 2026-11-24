import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { routeTree } from "./routeTree.gen";
import "./styles.css";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: { queryClient },
  scrollRestoration: true,
  defaultPreloadStaleTime: 0,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Each page arrives already rendered (see vite.config.ts): its content is in #root and its own
// title, description, preview and canonical tags are in <head>, marked data-page. The plain app
// (404.html) has index.html's defaults instead. The app sets these tags itself once it starts, so
// take the ones in the HTML out rather than leaving two of each.
function removeHeadTagsFromHtml() {
  document.head
    .querySelectorAll(
      '[data-page], meta[name="description"], meta[name="author"], meta[property^="og:"], meta[name^="twitter:"]',
    )
    .forEach((tag) => tag.remove());
}

// Load the current page's code first, so the app's first render is the whole page and replaces the
// rendered HTML in one step, instead of briefly showing the page empty while its code loads.
router
  .load()
  .catch(() => undefined)
  .then(() => {
    removeHeadTagsFromHtml();
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </StrictMode>,
    );
  });
