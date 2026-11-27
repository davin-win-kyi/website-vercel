import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  FileText,
  GraduationCap,
  Github,
  Linkedin,
} from "lucide-react";
import profilePhoto from "@/assets/davin-win-kyi.jpg";
import { CV_URL, RESUME_URL } from "@/lib/links";
import {
  FULL_NAME,
  HOME_PORTRAIT_ALT,
  PERSON_ID,
  SHORT_NAME,
  SITE_URL,
  creditedPhoto,
} from "@/lib/site";
import { useTypewriter } from "@/hooks/useTypewriter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Davin Kyi — CS Researcher at the University of Washington",
      },
      {
        name: "description",
        content:
          "Davin Kyi is a graduate Computer Science student at the University of Washington working on AR, accessibility, and machine learning.",
      },
      {
        property: "og:title",
        content: "Davin Kyi",
      },
      {
        property: "og:description",
        content: "CS researcher at the University of Washington.",
      },
      // A profile page: the page is about one person, Davin Win Kyi, shown in the portrait, which
      // is the page's main image and is credited. (More about the person is in index.html.)
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ProfilePage",
              url: `${SITE_URL}/`,
              name: "Davin Kyi — CS Researcher at the University of Washington",
              mainEntity: {
                "@type": "Person",
                "@id": PERSON_ID,
                name: FULL_NAME,
                alternateName: SHORT_NAME,
              },
              primaryImageOfPage: { "@id": `${SITE_URL}/#portrait` },
            },
            {
              "@id": `${SITE_URL}/#portrait`,
              ...creditedPhoto(profilePhoto, HOME_PORTRAIT_ALT),
            },
          ],
        },
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
  component: Index,
});

// The full name sits right beside the portrait, which helps Google connect the photo to it.
const GREETING = "Hi there! I'm Davin Win Kyi";

function Index() {
  const { displayed, done } = useTypewriter(GREETING, 80);

  return (
    <section className="flex min-h-[calc(100vh-57px)] items-center md:min-h-screen">
      {/* From lg the photo and the text sit side by side, centred as a pair. The text column is
          capped at about the greeting's width (30rem), so no empty space at its end pulls the
          pair off-centre. */}
      <div className="mx-auto grid w-full max-w-5xl items-center gap-y-8 px-6 py-12 md:py-24 lg:grid-cols-[auto_minmax(0,30rem)] lg:justify-center lg:gap-x-14 xl:gap-x-18">
        {/* Portrait. On phones it's 19rem wide, or narrower if the screen is too narrow for that
            beside the page's side padding. */}
        <div className="blob-bubbly w-[min(19rem,100vw_-_3rem)] justify-self-center overflow-hidden border-[6px] border-secondary shadow-soft md:w-84 lg:w-88 lg:border-8 xl:w-105">
          <img
            src={profilePhoto}
            alt={HOME_PORTRAIT_ALT}
            width={900}
            height={900}
            // The page's main image: fetched before anything else.
            fetchPriority="high"
            className="aspect-square h-full w-full object-cover"
          />
        </div>

        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            <GraduationCap className="h-3.5 w-3.5 text-primary" />
            University of Washington · CSE
          </p>

          <h1 className="grid text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {/* Screen readers get the whole greeting at once, not each typed letter. */}
            <span className="sr-only">{GREETING}</span>
            {/* An invisible copy of the whole greeting holds the space it will take up, so the
                page doesn't move when the typing reaches a new line. */}
            <span aria-hidden="true" className="invisible col-start-1 row-start-1">
              {GREETING}
            </span>
            <span aria-hidden="true" className="col-start-1 row-start-1">
              {displayed}
              {!done && (
                <span className="cursor-blink ml-0.5 inline-block h-[1em] w-[3px] bg-current align-middle" />
              )}
            </span>
          </h1>

          <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">
            I'm a Graduate student at the University of Washington where my
            research lies in the application of machine learning and artificial
            intelligence into the space of augmented reality, accessibility,
            and other fields.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              <FileText className="h-4 w-4" />
              Resume
            </a>

            <a
              href={CV_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-transform hover:-translate-y-0.5"
            >
              <FileText className="h-4 w-4" />
              CV
            </a>

            <Link
              to="/publications"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              Publications
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <a
              href="https://scholar.google.com/citations?user=oS2UUosAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Google Scholar
            </a>

            <a
              href="https://www.linkedin.com/in/davin-kyi/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>

            <a
              href="https://github.com/davin-win-kyi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
