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
import { PERSON_ID, SITE_URL, creditedPhoto } from "@/lib/site";
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
      // Names the portrait as this page's main photo, the one search engines can show with it,
      // and credits it. (Who the site is about is in index.html, added by the build.)
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              url: `${SITE_URL}/`,
              name: "Davin Kyi — CS Researcher at the University of Washington",
              about: { "@id": PERSON_ID },
              primaryImageOfPage: { "@id": `${SITE_URL}/#portrait` },
            },
            {
              "@id": `${SITE_URL}/#portrait`,
              ...creditedPhoto(profilePhoto, "Portrait of Davin Win Kyi"),
            },
          ],
        },
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/` }],
  }),
  component: Index,
});

const GREETING = "Hi there! I'm Davin";

function Index() {
  const { displayed, done } = useTypewriter(GREETING, 80);

  return (
    <section className="flex min-h-[calc(100vh-57px)] items-center md:min-h-screen">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-y-8 px-6 py-12 md:py-24 lg:grid-cols-[auto_minmax(0,34rem)] lg:justify-center lg:gap-x-16 xl:gap-x-20">
        {/* Portrait */}
        <div className="blob-bubbly w-72 justify-self-center overflow-hidden border-[6px] border-secondary shadow-soft md:w-80 lg:w-84 lg:border-8 xl:w-100">
          <img
            src={profilePhoto}
            alt="Portrait of Davin Win Kyi"
            width={900}
            height={900}
            className="aspect-square h-full w-full object-cover"
          />
        </div>

        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
            <GraduationCap className="h-3.5 w-3.5 text-primary" />
            University of Washington · CSE
          </p>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {/* Screen readers get the whole greeting at once, not each typed letter. */}
            <span className="sr-only">{GREETING}</span>
            <span aria-hidden="true">
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
