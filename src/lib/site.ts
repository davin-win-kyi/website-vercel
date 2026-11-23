// Who the site is about and where it lives, for the tags search engines read. The build config
// loads this file directly, which is why the import below spells out its file extension.
import { SOCIAL_LINKS } from "./links.ts";

// Where the site is served from, for the places that need full addresses (canonical links, the
// sitemap, the preview image, structured data). public/robots.txt names this address too.
export const SITE_URL = "https://davinwinkyi-web.vercel.app";

// Both names people search for.
export const FULL_NAME = "Davin Win Kyi";
export const SHORT_NAME = "Davin Kyi";

// Stands for the person in structured data, so every page's mention points to the same person.
export const PERSON_ID = `${SITE_URL}/#person`;

// A photo's entry in structured data, crediting it to Davin Win Kyi. Google Images can show the
// credit under the photo. `path` is the photo's address on the site, as an image import gives it;
// the entry has to be on the page that shows the photo.
export function creditedPhoto(path: string, description: string) {
  return {
    "@type": "ImageObject",
    contentUrl: SITE_URL + path,
    creditText: FULL_NAME,
    description,
  };
}

// Structured data for every page: the site and the person it's about, under both names, with the
// portraits that show them (full addresses).
export function siteStructuredData(portraits: string[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: FULL_NAME,
        alternateName: SHORT_NAME,
        about: { "@id": PERSON_ID },
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: FULL_NAME,
        alternateName: SHORT_NAME,
        url: `${SITE_URL}/`,
        image: portraits,
        description:
          "Graduate Computer Science student at the University of Washington working on AR, accessibility, and machine learning.",
        affiliation: { "@type": "CollegeOrUniversity", name: "University of Washington" },
        sameAs: SOCIAL_LINKS.map((link) => link.href),
      },
    ],
  };
}
