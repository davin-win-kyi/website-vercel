import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// Standard static Vite + React SPA.
// `bun run build` emits a real dist/index.html plus dist/assets — deployable
// to Netlify, Vercel, GitHub Pages, etc. (no SSR / server runtime required).
export default defineConfig(async ({ command }) => {
  const plugins = [
    TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
    react(),
    tailwindcss(),
    tsConfigPaths(),
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
