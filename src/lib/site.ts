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

// What the two portraits show: their alt text, and the description built into the files.
export const HOME_PORTRAIT_ALT = `Head-and-shoulders portrait of ${FULL_NAME} in a dark collared shirt against a plain gray background`;
export const ABOUT_PORTRAIT_ALT = `${FULL_NAME} wearing a mixed-reality headset in front of a graffiti wall`;

// A photo's entry in structured data: Davin Win Kyi took or made it (as confirmed) and is credited
// for it, which Google Images can show with the photo. `path` is the photo's address on the site,
// as an image import gives it; Google matches the entry to the photo by it, and only on a page
// that shows the photo. `caption` is the photo's visible caption, if it has one.
export function creditedPhoto(path: string, description: string, caption?: string) {
  return {
    "@type": "ImageObject",
    contentUrl: SITE_URL + path,
    creator: { "@type": "Person", "@id": PERSON_ID, name: FULL_NAME },
    creditText: FULL_NAME,
    description,
    ...(caption ? { caption } : {}),
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
