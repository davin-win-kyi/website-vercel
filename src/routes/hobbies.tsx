import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";

export const Route = createFileRoute("/hobbies")({
  head: () => ({
    meta: [
      { title: "Hobbies — Davin Win Kyi" },
      {
        name: "description",
        content:
          "Outside of research, Davin Win Kyi enjoys snowboarding, golfing, lifting, and boxing.",
      },
      { property: "og:title", content: "Hobbies — Davin Win Kyi" },
      {
        property: "og:description",
        content: "Snowboarding, golfing, lifting, and boxing.",
      },
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
  videoFit?: "cover" | "contain";
  videoScale?: number;
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
    name: "Golfing",
    video: "/media/golfing.mp4",
    poster: "/media/golfing-poster.jpg",
    blurb: "Working on my swing and enjoying some time out on the course.",
  },
  {
    name: "Lifting",
    video: "/media/lifting.mp4",
    poster: "/media/lifting-poster.png",
    blurb:
      "Pushing to new limits gives me the motivation to continually grow and help others with their gains as well.",
    videoFit: "contain",
    // 1 = full available size; smaller values add more space around it.
    videoScale: 0.85,
  },
];

type HobbyVideoProps = {
  name: string;
  video: string;
  poster?: string;
  fit?: "cover" | "contain";
  scale?: number;
};

function HobbyVideo({
  name,
  video,
  poster,
  fit = "cover",
  scale = 1,
}: HobbyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  const play = () => {
    ref.current?.play().catch(() => {});
  };

  const pause = () => {
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
      onMouseLeave={pause}
      aria-label={`${name} — video of one of Davin's hobbies. Hover or press play to watch.`}
      className="block max-h-full max-w-full"
      style={{
        width: `${scale * 100}%`,
        height: `${scale * 100}%`,
        objectFit: fit,
        objectPosition: "center",
      }}
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
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              {/* Keep media inside a defined frame and center it. */}
              <div className="absolute inset-0 flex items-center justify-center">
                {h.video ? (
                  <HobbyVideo
                    name={h.name}
                    video={h.video}
                    poster={h.poster}
                    fit={h.videoFit}
                    scale={h.videoScale}
                  />
                ) : (
                  <img
                    src={h.image}
                    alt={`${h.name} — one of Davin's hobbies`}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className={`block h-full w-full object-cover transition-transform duration-500 group-hover:scale-105${
                      h.bw ? " grayscale" : ""
                    }`}
                  />
                )}
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-xl font-semibold text-foreground">
                {h.name}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {h.blurb}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}