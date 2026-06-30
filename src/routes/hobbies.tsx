import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";

export const Route = createFileRoute("/hobbies")({
  head: () => ({
    meta: [
      { title: "Hobbies — Davin Win Kyi" },
      {
        name: "description",
        content:
          "Outside of research, Davin Win Kyi enjoys snowboarding, running, lifting, and boxing.",
      },
      { property: "og:title", content: "Hobbies — Davin Win Kyi" },
      { property: "og:description", content: "Snowboarding, running, lifting, and boxing." },
    ],
    links: [{ rel: "canonical", href: "/hobbies" }],
  }),
  component: Hobbies,
});

type Hobby = {
  name: string;
  blurb: string;
  image?: string;
  video?: string;
  poster?: string;
  bw?: boolean;
};

const hobbies: Hobby[] = [
  {
    name: "Snowboarding",
    video: "/media/snowboarding.mp4",
    poster: "/media/snowboarding-poster.jpg",
    blurb: "Carving down mountains, enjoying the chill and sleek breeze.",
  },
  {
    name: "Boxing",
    video: "/media/boxing.mp4",
    poster: "/media/boxing-poster.jpg",
    blurb: "It's sure as heck more technical than I thought, aha.",
  },
  {
    name: "Running",
    video: "/media/running.mp4",
    poster: "/media/running-poster.jpg",
    blurb: "Running down scenic neighborhoods like Mercer Island, Cambridge, and Somerset sure help me get out of the grind.",
  },
  {
    name: "Lifting",
    video: "/media/lifting.mp4",
    poster: "/media/lifting-poster.jpg",
    blurb: "Pushing to new limits gives me the motivation to continually grow and help others with their gains as well.",
  },
];

function HobbyVideo({ name, video, poster }: { name: string; video: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  const play = () => {
    ref.current?.play().catch(() => {});
  };

  const pauseReset = () => {
    const el = ref.current;
    if (!el) return;
    el.pause();
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
      onMouseLeave={pauseReset}
      aria-label={`${name} — video of one of Davin's hobbies. Hover or press play to watch.`}
      className="h-full w-full max-w-full object-cover"
    >
      <source src={video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

function Hobbies() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16 md:py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Hobbies
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        When I'm not in the lab, you'll usually find me staying active.
      </p>

      <ul className="mt-10 grid list-none gap-6 p-0 sm:grid-cols-2">
        {hobbies.map((h) => (
          <li
            key={h.name}
            className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow hover:shadow-lift"
          >
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              {h.video ? (
                <HobbyVideo name={h.name} video={h.video} poster={h.poster} />
              ) : (
                <img
                  src={h.image}
                  alt={`${h.name} — one of Davin's hobbies`}
                  loading="lazy"
                  width={1024}
                  height={768}
                  className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105${
                    h.bw ? " grayscale" : ""
                  }`}
                />
              )}
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-foreground">{h.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.blurb}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
