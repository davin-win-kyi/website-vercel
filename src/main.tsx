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

// index.html carries a default description and preview tags for readers that don't run JavaScript
// (link previews, some crawlers). Each page sets its own once the app starts, so take the defaults
// out instead of leaving two of each.
document.head
  .querySelectorAll(
    'meta[name="description"], meta[name="author"], meta[property^="og:"], meta[name^="twitter:"]',
  )
  .forEach((tag) => tag.remove());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
