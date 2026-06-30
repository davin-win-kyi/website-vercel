import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";

export const Route = createFileRoute("/teaching")({
  head: () => ({
    meta: [
      { title: "Teaching — Davin Win Kyi" },
      {
        name: "description",
        content:
          "Davin Win Kyi has been a teaching assistant for CSE 473, CSE 340, and CSE 414 at the University of Washington.",
      },
      { property: "og:title", content: "Teaching — Davin Win Kyi" },
      { property: "og:description", content: "Teaching assistant experience of Davin Win Kyi." },
    ],
    links: [{ rel: "canonical", href: "/teaching" }],
  }),
  component: Teaching,
});

type Course = {
  year: string;
  code: string;
  name: string;
  role: string;
  video: string;
  poster: string;
};

// Most recent first, oldest last.
const timeline: Course[] = [
  {
    year: "2024 – 2025",
    code: "CSE 473",
    name: "Introduction to Artificial Intelligence",
    role: "Teaching Assistant",
    video: "/media/teaching-cse473.mp4",
    poster: "/media/teaching-cse473-poster.jpg",
  },
  {
    year: "2023",
    code: "CSE 340",
    name: "Interaction Programming",
    role: "Teaching Assistant",
    video: "/media/teaching-cse340.mp4",
    poster: "/media/teaching-cse340-poster.jpg",
  },
  {
    year: "2022",
    code: "CSE 414",
    name: "Introduction to Database Systems",
    role: "Teaching Assistant",
    video: "/media/teaching-cse414.mp4",
    poster: "/media/teaching-cse414-poster.jpg",
  },
];

function CourseVideo({
  code,
  name,
  video,
  poster,
}: {
  code: string;
  name: string;
  video: string;
  poster: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  const play = () => {
    ref.current?.play().catch(() => {});
  };

  const pauseVideo = () => {
    ref.current?.pause();
  };

  return (
    <video
      ref={ref}
      poster={poster}
      controls
      muted
      loop
      playsInline
      preload="metadata"
      onMouseEnter={play}
      onMouseLeave={pauseVideo}
      aria-label={`${code} — ${name}. Hover or press play to watch.`}
      className="h-full w-full max-w-full object-cover"
    >
      <source src={video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

function Teaching() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Teaching
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        I've supported hundreds of students as a teaching assistant at the
        University of Washington across databases, interaction programming, and
        artificial intelligence — through sections, office hours, and course
        materials.
      </p>

      <div className="relative mt-14 pl-8">
        {/* vertical line */}
        <span className="absolute left-[7px] top-2 bottom-2 w-px bg-border" aria-hidden />

        <ol className="space-y-10">
          {timeline.map((t) => (
            <li key={t.code} className="relative">
              <span
                className="absolute -left-[29px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-primary ring-1 ring-border"
                aria-hidden
              />
              <p className="font-serif text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                {t.year}
              </p>
              <div className="mt-2 overflow-hidden rounded-xl border border-border bg-card shadow-soft">
                <div className="aspect-[16/7] w-full overflow-hidden border-b border-border bg-secondary">
                  <CourseVideo
                    code={t.code}
                    name={t.name}
                    video={t.video}
                    poster={t.poster}
                  />
                </div>
                <div className="p-6">
                  <p className="font-serif text-2xl font-semibold text-foreground">
                    {t.code}
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-foreground">{t.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
