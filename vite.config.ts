import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { isAbsolute, relative } from "node:path";
import { FULL_NAME, SITE_URL, siteStructuredData } from "./src/lib/site.ts";
import { photos } from "./src/lib/gallery-photos.ts";

// The two portraits: the homepage's, then the About page's.
const HOME_PORTRAIT = "src/assets/davin-win-kyi.jpg";
const ABOUT_PORTRAIT = "src/assets/davin-win-kyi-portrait.jpg";

// A source file's path from the project folder ("src/assets/…"), however the build gives it.
const sourcePath = (name: string) => (isAbsolute(name) ? relative(process.cwd(), name) : name);

// Both image files of a gallery photo: the preview size and the full size.
const galleryFiles = (id: string) => [
  `src/assets/gallery/thumb/${id}.jpg`,
  `src/assets/gallery/full/${id}.jpg`,
];

// What each photo shows, written into its built file along with the credit.
const PHOTO_DESCRIPTIONS = new Map<string, string>([
  [HOME_PORTRAIT, `Portrait of ${FULL_NAME}`],
  [ABOUT_PORTRAIT, `Portrait of ${FULL_NAME}`],
  ...photos.flatMap((p) => galleryFiles(p.id).map((file): [string, string] => [file, p.alt])),
]);

// Gallery photos whose description names Davin Win Kyi also get the name at the front of their
// built file names ("davin-win-kyi-summit-selfie-….jpg"): Google reads a file name as a hint about
// what's in the photo. Other files keep the usual name.
const NAME_IN_FILES = FULL_NAME.toLowerCase().replace(/\s+/g, "-");
const NAMED_FILES = new Set(
  photos.filter((p) => p.alt.includes(FULL_NAME)).flatMap((p) => galleryFiles(p.id)),
);
const assetFileNames = (asset: { originalFileNames: string[] }) =>
  asset.originalFileNames.some((name) => NAMED_FILES.has(sourcePath(name)))
    ? `assets/${NAME_IN_FILES}-[name]-[hash][extname]`
    : "assets/[name]-[hash][extname]";

const XMP_ID = "http://ns.adobe.com/xap/1.0/\0";

// An XMP block, the standard way photos carry details about themselves, holding the credit line
// "Davin Win Kyi" and a description. Google Images can show the credit line from it, and both stay
// with the photo if it's copied elsewhere.
function xmpBlock(description: string) {
  const text = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const packet = [
    '<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>',
    '<x:xmpmeta xmlns:x="adobe:ns:meta/">',
    '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">',
    '<rdf:Description rdf:about="" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/">',
    `<photoshop:Credit>${text(FULL_NAME)}</photoshop:Credit>`,
    `<dc:description><rdf:Alt><rdf:li xml:lang="x-default">${text(description)}</rdf:li></rdf:Alt></dc:description>`,
    "</rdf:Description>",
    "</rdf:RDF>",
    "</x:xmpmeta>",
    '<?xpacket end="w"?>',
  ].join("");
  const body = new TextEncoder().encode(XMP_ID + packet);
  // A JPEG block: its marker (FF E1), then its length, which counts the two length bytes too.
  const block = new Uint8Array(4 + body.length);
  block.set([0xff, 0xe1, (body.length + 2) >> 8, (body.length + 2) & 0xff]);
  block.set(body, 4);
  return block;
}

// A copy of a JPEG with the XMP block added after its opening blocks (JFIF, EXIF), where photo
// software puts it. The image itself is untouched. Null if the file isn't a JPEG or already has XMP.
function withXmp(jpeg: Uint8Array, description: string) {
  if (jpeg[0] !== 0xff || jpeg[1] !== 0xd8) return null;
  const id = new TextEncoder().encode(XMP_ID);
  let at = 2;
  while (at + 4 <= jpeg.length && jpeg[at] === 0xff && [0xe0, 0xe1].includes(jpeg[at + 1])) {
    if (jpeg[at + 1] === 0xe1 && id.every((byte, k) => jpeg[at + 4 + k] === byte)) return null;
    at += 2 + ((jpeg[at + 2] << 8) | jpeg[at + 3]);
  }
  const block = xmpBlock(description);
  const result = new Uint8Array(jpeg.length + block.length);
  result.set(jpeg.subarray(0, at));
  result.set(block, at);
  result.set(jpeg.subarray(at), at + block.length);
  return result;
}

// Writes the credit and description into the portraits and gallery photos as they're built. The
// photos in src/assets stay as they are.
function photoDetails(): Plugin {
  return {
    name: "photo-details",
    apply: "build",
    generateBundle(_, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type !== "asset" || typeof file.source === "string") continue;
        const description = file.originalFileNames
          .map((name) => PHOTO_DESCRIPTIONS.get(sourcePath(name)))
          .find((found) => found !== undefined);
        if (description === undefined) continue;
        const updated = withXmp(file.source, description);
        if (updated) file.source = updated;
        else this.warn(`photo-details: ${file.fileName} isn't a JPEG or already has details`);
      }
    },
  };
}

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
      ? (file.originalFileNames ?? []).map((name) => ({
          source: sourcePath(name),
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
    photoDetails(),
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
    build: { rolldownOptions: { output: { assetFileNames } } },
    server: { host: "::", port: 8080, strictPort: true },
  };
});
