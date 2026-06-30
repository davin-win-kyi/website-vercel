import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileText, GraduationCap, Github, Linkedin } from "lucide-react";
import profilePhoto from "@/assets/home-portrait.png";
import { RESUME_URL } from "@/lib/links";
import { useTypewriter } from "@/hooks/useTypewriter";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Davin Kyi — CS Researcher at the University of Washington" },
      {
        name: "description",
        content:
          "Davin Kyi is an M.S. Computer Science student at the University of Washington working on AR, accessibility, and machine learning.",
      },
      { property: "og:title", content: "Davin Kyi" },
      { property: "og:description", content: "CS researcher at the University of Washington." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const { displayed, done } = useTypewriter("Hi there! I'm Davin", 80);

  return (
    <section className="flex min-h-[calc(100vh-57px)] items-center md:min-h-screen">
      <div className="mx-auto grid w-full max-w-5xl items-center gap-10 px-6 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-24">
        <div className="relative mx-auto w-full max-w-xs md:mx-0">
          <div className="blob blob-animated absolute -inset-4 -z-10 bg-secondary" />
          <img
            src={profilePhoto}
            alt="Portrait of Davin Win Kyi"
            width={900}
            height={900}
            className="blob blob-animated aspect-square w-full object-cover shadow-lift"
            style={{ objectPosition: "50% 30%" }}
          />
        </div>

        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
            <GraduationCap className="h-3.5 w-3.5 text-primary" />
            University of Washington · CSE
          </p>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {displayed}
            {!done && (
              <span className="cursor-blink ml-0.5 inline-block h-[1em] w-[3px] bg-current align-middle" />
            )}
          </h1>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-muted-foreground">
            Graduate student at the University of Washington where my research
            lies in the application of machine learning and artificial intelligence
            into the space of augmented reality, accessibility, and other fields.
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
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href="https://github.com/davin-win-kyi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              <Github className="h-4 w-4" /> GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
