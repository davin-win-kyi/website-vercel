import { createFileRoute } from "@tanstack/react-router";
import sonoImg from "@/assets/pub-sonocraftar-fig.png";
import taskImg from "@/assets/pub-taskaudit-fig.jpg";
import romansImg from "@/assets/pub-romans-fig.png";

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title: "Publications — Davin Win Kyi" },
      {
        name: "description",
        content:
          "Research publications by Davin Win Kyi, including SonoCraftAR and TaskAudit.",
      },
      { property: "og:title", content: "Publications — Davin Win Kyi" },
      { property: "og:description", content: "Research publications by Davin Win Kyi." },
    ],
    links: [{ rel: "canonical", href: "/publications" }],
  }),
  component: Publications,
});

type Link = { label: string; href: string };

type Publication = {
  title: string;
  image: string;
  venue: string;
  authors: { name: string; emphasis?: boolean; coFirst?: boolean }[];
  note?: string;
  blurb: string;
  links: Link[];
};

const publications: Publication[] = [
  {
    title:
      "SonoCraftAR: Towards Supporting Personalized Authoring of Sound-Reactive AR Interfaces by Deaf and Hard of Hearing Users",
    image: sonoImg,
    venue: "ISMAR '25 Workshop",
    authors: [
      { name: "Jaewook Lee", emphasis: true, coFirst: true },
      { name: "Davin Win Kyi", emphasis: true, coFirst: true },
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
        label: "Scholar",
        href: "https://scholar.google.com/citations?user=oS2UUosAAAAJ&hl=en",
      },
    ],
  },
  {
    title:
      "TaskAudit: Detecting Functiona11ity Errors in Mobile Apps via Agentic Task Execution",
    image: taskImg,
    venue: "CHI '26",
    authors: [
      { name: "Mingyuan Zhong" },
      { name: "Xia Chen" },
      { name: "Davin Win Kyi", emphasis: true },
      { name: "Li Chen" },
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
        label: "Scholar",
        href: "https://scholar.google.com/citations?user=oS2UUosAAAAJ&hl=en",
      },
    ],
  },
  {
    title:
      "Do as the Romans Do: Learning Universal Behaviors from Heterogeneous Agents",
    image: romansImg,
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

function Publications() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
      <p className="inline-block rounded-md bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
        Papers
      </p>
      <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Publications
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        Research spanning augmented reality and accessibility.
      </p>

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {publications.map((p) => (
          <article key={p.title} className="flex flex-col">
            <div className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl border border-border bg-secondary/40 p-4 shadow-soft">
              <img
                src={p.image}
                alt={`Figure from ${p.title}`}
                loading="lazy"
                width={1024}
                height={1024}
                className="max-h-full max-w-full rounded-lg object-contain"
              />
            </div>


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
                  <span className={a.emphasis ? "font-semibold text-foreground" : ""}>
                    {a.name}
                    {a.coFirst ? "*" : ""}
                  </span>
                  {i < p.authors.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>

            {p.note && (
              <p className="mt-2 text-xs italic text-muted-foreground">{p.note}</p>
            )}

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {p.blurb}
            </p>

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
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
