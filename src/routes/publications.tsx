import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Expand, X } from "lucide-react";
import sonoImg from "@/assets/pub-sonocraftar-fig.png";
import taskImg from "@/assets/pub-taskaudit-fig.jpg";
import romansImg from "@/assets/pub-romans-fig.png";
import previewImg from "@/assets/previewar.png";
import translateImg from "@/assets/translatear.png";
import targetedImg from "@/assets/targeted_interaction_agents.png";
import interImg from "@/assets/intera11y.png";
import eyeqImg from "@/assets/eyeq.jpg";
import pageAssistImg from "@/assets/pageassist.png";
import sonoThumb from "@/assets/pub-thumbs/sonocraftar.jpg";
import taskThumb from "@/assets/pub-thumbs/taskaudit.jpg";
import romansThumb from "@/assets/pub-thumbs/romans.png";
import previewThumb from "@/assets/pub-thumbs/previewar.jpg";
import translateThumb from "@/assets/pub-thumbs/translatear.jpg";
import targetedThumb from "@/assets/pub-thumbs/targeted-agents.png";
import interThumb from "@/assets/pub-thumbs/intera11y.png";
import eyeqThumb from "@/assets/pub-thumbs/eyeq.jpg";
import pageAssistThumb from "@/assets/pub-thumbs/pageassist.png";
import { SITE_URL } from "@/lib/site";

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title: "Publications — Davin Win Kyi" },
      {
        name: "description",
        content:
          "Research publications by Davin Win Kyi in augmented reality, accessibility, and machine learning, including PreviewAR, TranslateAR, SonoCraftAR, and TaskAudit.",
      },
      { property: "og:title", content: "Publications — Davin Win Kyi" },
      {
        property: "og:description",
        content:
          "Research publications by Davin Win Kyi in augmented reality, accessibility, and machine learning.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/publications` }],
  }),
  component: Publications,
});

type Link = { label: string; href: string };

type Publication = {
  title: string;
  // `image` is the full figure, shown when it's clicked. `thumb` is a 2:1 crop of its most
  // telling part, sized to fill the card.
  image?: string;
  thumb?: string;
  imageLabel?: string;
  venue: string;
  authors: { name: string; emphasis?: boolean; coFirst?: boolean }[];
  note?: string;
  blurb: string;
  links: Link[];
};

const publications: Publication[] = [
  {
    title:
      "PageAssist: End-User Authoring of Generative Interfaces for Progress Tracking on Webpages",
    image: pageAssistImg,
    thumb: pageAssistThumb,
    imageLabel: "PageAssist",
    venue: "IUI '27 Poster · In submission",
    authors: [
      { name: "Davin Win Kyi", emphasis: true },
      { name: "Mingyuan Zhong" },
      { name: "James Fogarty" },
      { name: "Jacob O. Wobbrock" },
    ],
    blurb:
      "A conversational tool that lets web users, including people with cognitive accessibility needs, build their own interfaces for tracking progress through tasks like tutorials and job applications, then reuse them across webpages and keep them in sync as pages change.",
    links: [],
  },
  {
    title: "InterA11y: Interactive Web Accessibility Error Detection with LLM Agents",
    image: interImg,
    thumb: interThumb,
    imageLabel: "InterA11y",
    venue: "TheWebConf '27 · In submission",
    authors: [
      { name: "Mingyuan Zhong" },
      { name: "Mengqi Shi" },
      { name: "Davin Win Kyi", emphasis: true },
      { name: "Ajit Mallavarapu" },
      { name: "Xia Chen" },
      { name: "James Fogarty" },
      { name: "Jacob O. Wobbrock" },
    ],
    blurb:
      "An agentic accessibility evaluation system that pairs WCAG-derived rubrics with interactive tools, letting LLM agents find nearly twice as many web accessibility errors as the strongest LLM-driven baseline while matching the precision of rule-based checkers.",
    links: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2610.39488",
      },
    ],
  },
  {
    title: "EyeQ: Exploring Corneal Reflection for Mobile Context Sensing",
    image: eyeqImg,
    thumb: eyeqThumb,
    imageLabel: "EyeQ",
    venue: "CHI '27 · In submission",
    authors: [
      { name: "Jaewook Lee" },
      { name: "Judith Amores" },
      { name: "Donghoon Shin" },
      { name: "Bo-Eun Choi" },
      { name: "Jason Kim" },
      { name: "Davin Win Kyi", emphasis: true },
      { name: "Seok-Young Kim" },
      { name: "Jon E. Froehlich" },
      { name: "Andrew D. Wilson" },
    ],
    blurb:
      "Explores how reflections in a user's cornea can be used to sense their surrounding context on mobile devices.",
    links: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2611.13640",
      },
    ],
  },
  {
    title: "PreviewAR: Sketching Spaces for Scale-Aware Product Discovery in AR",
    image: previewImg,
    thumb: previewThumb,
    imageLabel: "PreviewAR",
    venue: "UIST '26 Poster · To appear",
    authors: [
      { name: "Davin Win Kyi", emphasis: true },
      { name: "Jason Kim" },
      { name: "Caleb Hu" },
      { name: "Jewoo Park" },
      { name: "Jaewook Lee" },
      { name: "Jon E. Froehlich" },
    ],
    blurb:
      "An AR system that lets users sketch a space, discover products that fit, and preview generated 3D models at real-world scale.",
    links: [
      {
        label: "PDF",
        href: "https://makeabilitylab.cs.washington.edu/media/publications/Kyi_PreviewarSketchingSpacesForScaleAwareProductDiscoveryInAr_UIST2026.pdf",
      },
      {
        label: "DOI",
        href: "https://doi.org/10.1145/3830397.3841872",
      },
    ],
  },
  {
    title:
      "TranslateAR: Towards Style-Preserving In-Situ Text Translation in Augmented Reality",
    image: translateImg,
    thumb: translateThumb,
    imageLabel: "TranslateAR",
    venue: "UIST '26 Demo · To appear",
    authors: [
      { name: "Minbeom Kim" },
      { name: "Jason Kim" },
      { name: "Davin Win Kyi", emphasis: true },
      { name: "Seok-Young Kim" },
      { name: "Jaewook Lee" },
      { name: "Jon E. Froehlich" },
    ],
    blurb:
      "A mobile AR prototype that translates text on physical surfaces while retaining its typography, color, layout, and placement in the scene.",
    links: [
      {
        label: "PDF",
        href: "https://makeabilitylab.cs.washington.edu/media/publications/Kim_TranslatearTowardsStylePreservingInSituTextTranslationInAugmentedReality_UIST2026.pdf",
      },
      {
        label: "DOI",
        href: "https://doi.org/10.1145/3830397.3842478",
      },
    ],
  },
  {
    title: "Targeted Interaction Agents for Web Accessibility Evaluation",
    image: targetedImg,
    thumb: targetedThumb,
    imageLabel: "Web Accessibility Agents",
    venue: "UIST '26 Adjunct · To appear",
    authors: [
      { name: "Mingyuan Zhong" },
      { name: "Ajit Mallavarapu" },
      { name: "Mengqi Shi" },
      { name: "Davin Win Kyi", emphasis: true },
      { name: "James Fogarty" },
      { name: "Jacob O. Wobbrock" },
    ],
    blurb:
      "An accessibility evaluation system that combines automated checkers with LLM agents, interactive tools, and focused rubrics to assess webpages using evidence from their behavior and appearance.",
    links: [
      {
        label: "PDF",
        href: "https://faculty.washington.edu/wobbrock/pubs/uist-26.01.pdf",
      },
      {
        label: "DOI",
        href: "https://doi.org/10.1145/3830397.3841898",
      },
    ],
  },
  {
    title:
      "SonoCraftAR: Towards Supporting Personalized Authoring of Sound-Reactive AR Interfaces by Deaf and Hard of Hearing Users",
    image: sonoImg,
    thumb: sonoThumb,
    venue: "ISMAR '25 Workshop",
    authors: [
      { name: "Davin Win Kyi", emphasis: true, coFirst: true },
      { name: "Jaewook Lee", emphasis: true, coFirst: true },
      { name: "Leejun Kim" },
      { name: "Jenny Peng" },
      { name: "Gagyeom Lim" },
      { name: "Jeremy Zhengqi Huang" },
      { name: "Dhruv Jain" },
      { name: "Jon E. Froehlich" },
    ],
    note: "* Equal contribution (co-first authors).",
    blurb:
      "A system letting Deaf and hard of hearing users personalize how everyday sounds are visualized in augmented reality.",
    links: [
      {
        label: "IEEE",
        href: "https://ieeexplore.ieee.org/document/11236143",
      },
      {
        label: "Scholar",
        href: "https://scholar.google.com/citations?user=oS2UUosAAAAJ&hl=en",
      },
    ],
  },
  {
    title:
      "TaskAudit: Detecting Functiona11ity Errors in Mobile Apps via Agentic Task Execution",
    image: taskImg,
    thumb: taskThumb,
    venue: "CHI '26",
    authors: [
      { name: "Mingyuan Zhong" },
      { name: "Xia Chen" },
      { name: "Davin Win Kyi", emphasis: true },
      { name: "Chen Li" },
      { name: "James Fogarty" },
      { name: "Jacob O. Wobbrock" },
    ],
    blurb:
      "An agentic pipeline that uncovers \"functiona11ity\" errors — accessibility barriers that only surface through real interaction with mobile apps.",
    links: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2510.12972",
      },
      {
        label: "DOI",
        href: "https://dl.acm.org/doi/10.1145/3772318.3791415",
      },
      {
        label: "Scholar",
        href: "https://scholar.google.com/citations?user=oS2UUosAAAAJ&hl=en",
      },
    ],
  },
  {
    title:
      "Do as the Romans Do: Learning Universal Behaviors from Heterogeneous Agents",
    image: romansImg,
    thumb: romansThumb,
    venue: "arXiv '26",
    authors: [
      { name: "Caleb Chang" },
      { name: "Davin Win Kyi", emphasis: true },
      { name: "Natasha Jaques" },
      { name: "Karen Leung" },
    ],
    blurb:
      "A framework for learning generalizable behaviors across diverse agent types by distilling shared patterns from heterogeneous populations.",
    links: [
      {
        label: "arXiv",
        href: "https://arxiv.org/abs/2606.18537",
      },
    ],
  },
];

// Starts downloading a full figure so it's ready by the time the viewer opens.
function preload(src: string) {
  new Image().src = src;
}

function Publications() {
  const [viewing, setViewing] = useState<Publication | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Open and close the figure viewer, and keep the page behind it from scrolling.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (viewing && !dialog.open) dialog.showModal();
    if (!viewing && dialog.open) dialog.close();
    document.documentElement.style.overflow = viewing ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [viewing]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Publications
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        Research spanning augmented reality, accessibility, and machine learning.
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {publications.map((p) => (
          <article key={p.title} className="flex flex-col">
            {p.image && p.thumb ? (
              <button
                type="button"
                onClick={() => setViewing(p)}
                onPointerEnter={() => p.image && preload(p.image)}
                onFocus={() => p.image && preload(p.image)}
                className="group relative block aspect-[2/1] w-full cursor-zoom-in overflow-hidden rounded-xl border border-border bg-white shadow-soft"
              >
                <img
                  src={p.thumb}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width={1000}
                  height={500}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                {/* Shown on hover and keyboard focus, and always on touch screens. */}
                <span className="pointer-events-none absolute bottom-2.5 right-2.5 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 pointer-coarse:opacity-100">
                  <Expand className="h-4 w-4" aria-hidden />
                </span>
                <span className="sr-only">View the full figure from {p.title}</span>
              </button>
            ) : (
              <div className="flex aspect-[2/1] items-center justify-center rounded-xl border border-border bg-secondary/40 p-4 shadow-soft">
                <span
                  aria-hidden="true"
                  className="max-w-sm px-6 text-center text-2xl font-semibold tracking-tight text-muted-foreground"
                >
                  {p.imageLabel ?? p.title}
                </span>
              </div>
            )}

            <p className="mt-6 text-sm font-medium text-muted-foreground">
              {p.venue}
            </p>
            <div className="mt-3 border-t border-border" />

            <h2 className="mt-5 text-2xl font-bold leading-snug tracking-tight text-foreground">
              {p.title}
            </h2>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              {p.authors.map((a, i) => (
                <span key={a.name}>
                  <span
                    className={a.emphasis ? "font-semibold text-foreground" : ""}
                  >
                    {a.name}
                    {a.coFirst ? "*" : ""}
                  </span>
                  {i < p.authors.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>

            {p.note && (
              <p className="mt-2 text-xs italic text-muted-foreground">
                {p.note}
              </p>
            )}

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {p.blurb}
            </p>

            {p.links.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-5">
                {p.links.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold uppercase tracking-wide text-foreground underline-offset-4 transition-colors hover:text-muted-foreground hover:underline"
                  >
                    {l.label}
                    <span className="sr-only"> for {p.title}</span>
                  </a>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Figure viewer"
        onClose={() => setViewing(null)}
        className="m-0 h-dvh max-h-none w-dvw max-w-none bg-transparent p-0 text-white backdrop:bg-black/90"
      >
        {viewing && (
          <div
            className="relative flex h-full w-full flex-col items-center justify-center gap-4 px-3 py-16 sm:px-10"
            onClick={(e) => {
              if (e.target === e.currentTarget) dialogRef.current?.close();
            }}
          >
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close figure viewer"
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/50 ring-1 ring-white/25 transition-colors hover:bg-black/70"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>
            {/* Figures are made for white paper, so they sit on white here too. */}
            <img
              src={viewing.image}
              alt={`Figure from ${viewing.title}`}
              className="max-h-[calc(100dvh-11rem)] w-auto max-w-full rounded-lg bg-white object-contain p-2 sm:p-4"
            />
            <p className="max-w-3xl px-4 text-center text-sm text-white/80">{viewing.title}</p>
          </div>
        )}
      </dialog>
    </div>
  );
}
