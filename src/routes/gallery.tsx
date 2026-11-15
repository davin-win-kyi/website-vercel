import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Davin Win Kyi" },
      {
        name: "description",
        content:
          "Photos of Davin Win Kyi with friends, on trips, and everything in between.",
      },
      { property: "og:title", content: "Gallery — Davin Win Kyi" },
      { property: "og:description", content: "Photos of Davin Win Kyi with friends, on trips, and everything in between." },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});

const thumbs = import.meta.glob<string>("/src/assets/gallery/thumb/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});
const fulls = import.meta.glob<string>("/src/assets/gallery/full/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
});

type Photo = { id: string; width: number; height: number; alt: string };

// Shown in a new random order on every visit. `id` names the image files in
// src/assets/gallery; width and height are the preview image's size.
const photos: Photo[] = [
  { id: "night-balcony", width: 620, height: 800, alt: "Posing on a balcony at night" },
  { id: "beach-selfie", width: 602, height: 800, alt: "Selfie with a friend on a sunny beach" },
  { id: "night-headband-selfie", width: 637, height: 800, alt: "Smiling night selfie in a sports headband" },
  { id: "headset-on-forehead-selfie", width: 624, height: 800, alt: "Selfie with a mixed-reality headset pushed up on the forehead" },
  { id: "bright-room-friends", width: 800, height: 539, alt: "Selfie with two friends in a bright room with plants" },
  { id: "resort-selfie", width: 800, height: 527, alt: "Selfie with a friend in front of a resort building" },
  { id: "snowfield-peace-sign", width: 656, height: 800, alt: "Crouching on a snowfield below a rocky slope, flashing a peace sign" },
  { id: "cafe-mural-selfie", width: 800, height: 550, alt: "Tilted selfie with friends at a café with a colorful mural" },
  { id: "rocky-trail-log", width: 616, height: 800, alt: "Sitting on a log on a rocky mountain trail, flashing a peace sign" },
  { id: "meeting-room-group-selfie", width: 800, height: 554, alt: "Group selfie with five colleagues around a meeting room table" },
  { id: "football-game-selfie", width: 700, height: 528, alt: "Three friends taking a selfie at a night football game in a packed stadium" },
  { id: "night-game-friends", width: 696, height: 526, alt: "Selfie with friends in the stands at a night game" },
  { id: "bearded-selfie", width: 800, height: 772, alt: "Selfie of a smiling bearded man in a black T-shirt" },
  { id: "japanese-restaurant-friends", width: 700, height: 514, alt: "Two friends smiling in a booth at a Japanese restaurant" },
  { id: "throwback-photo", width: 694, height: 430, alt: "A screen showing an old photo of two boys smiling outdoors" },
  { id: "public-market-sign", width: 646, height: 800, alt: "Standing under the glowing Public Market neon sign at night" },
  { id: "restaurant-selfie", width: 694, height: 748, alt: "Selfie with a friend outside a restaurant" },
  { id: "city-street-selfie", width: 608, height: 800, alt: "Selfie with a friend on a city street lined with tall buildings" },
  { id: "mountain-ledge-friends", width: 466, height: 800, alt: "Three friends sitting on a ledge in front of snowy mountains" },
  { id: "heart-arch-friends", width: 685, height: 800, alt: "Three friends posing inside a lit-up heart-shaped arch at night" },
  { id: "laughing-restaurant-selfie", width: 598, height: 800, alt: "Laughing selfie with a friend at a restaurant" },
  { id: "night-market-friends", width: 595, height: 800, alt: "Three friends posing in front of glowing yellow lights at a night market" },
  { id: "flower-arch-friends", width: 600, height: 800, alt: "Four friends standing under a flower-covered arch at night" },
  { id: "rope-net-selfie", width: 449, height: 800, alt: "Selfie in front of a rope net under a blue sky" },
  { id: "mid-laugh-selfie", width: 595, height: 800, alt: "Close-up selfie mid-laugh" },
  { id: "panda-mural-coffee", width: 608, height: 800, alt: "A hand holding a coffee cup up to a cartoon panda mural" },
  { id: "building-entrance", width: 471, height: 800, alt: "Standing in front of a building entrance in a navy T-shirt" },
  { id: "fist-sculpture", width: 502, height: 800, alt: "Posing next to a giant fist sculpture on a city plaza" },
  { id: "playful-selfie", width: 578, height: 800, alt: "Close-up selfie indoors with a playful expression" },
  { id: "white-tee-selfie", width: 762, height: 800, alt: "Smiling selfie in a white T-shirt" },
  { id: "half-dome-view", width: 800, height: 701, alt: "Sitting on granite rocks with Half Dome in the background" },
  { id: "headset-dinner", width: 448, height: 800, alt: "Wearing a mixed-reality headset at a restaurant with a graffiti wall" },
  { id: "black-tee-selfie", width: 656, height: 800, alt: "Smiling selfie in a black T-shirt" },
  { id: "headband-light-selfie", width: 633, height: 800, alt: "Smiling selfie wearing a light-up headband" },
  { id: "giant-duck-festival", width: 800, height: 622, alt: "Standing next to a giant yellow duck statue at a night festival" },
  { id: "tokyo-welcome-mural", width: 596, height: 800, alt: "Posing by a Welcome to Tokyo mural in an airport hallway" },
];

// Fisher–Yates shuffle, so every order is equally likely.
function shuffled<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const thumbSrc = (p: Photo) => thumbs[`/src/assets/gallery/thumb/${p.id}.jpg`];
const fullSrc = (p: Photo) => fulls[`/src/assets/gallery/full/${p.id}.jpg`];

function Gallery() {
  const [order] = useState(() => shuffled(photos));
  const [current, setCurrent] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);

  const step = (delta: number) =>
    setCurrent((i) => (i === null ? i : (i + delta + order.length) % order.length));

  // Open and close the viewer, and keep the page behind it from scrolling.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (current !== null && !dialog.open) dialog.showModal();
    if (current === null && dialog.open) dialog.close();
    document.documentElement.style.overflow = current !== null ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [current]);

  // Load the neighboring photos ahead of time so moving between them feels instant.
  useEffect(() => {
    if (current === null) return;
    for (const d of [-1, 1]) {
      new Image().src = fullSrc(order[(current + d + order.length) % order.length]);
    }
  }, [current, order]);

  const photo = current === null ? null : order[current];

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 md:py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Gallery
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
        Moments with friends, trips, and everything in between.
      </p>

      {/* Rows of photos at their natural shapes: each grows in proportion to its width. */}
      <ul className="mt-10 flex list-none flex-wrap gap-2 p-0 [--row:9rem] after:grow-[999] after:content-[''] sm:[--row:12rem] lg:[--row:15rem]">
        {order.map((p, i) => {
          const ratio = p.width / p.height;
          return (
            <li
              key={p.id}
              className="min-w-0"
              style={{ flexGrow: ratio, flexBasis: `calc(var(--row) * ${ratio})` }}
            >
              <button
                type="button"
                onClick={() => setCurrent(i)}
                className="group block w-full overflow-hidden rounded-lg bg-secondary"
                style={{ aspectRatio: `${p.width} / ${p.height}` }}
              >
                <img
                  src={thumbSrc(p)}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </button>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        onClose={() => setCurrent(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-0 h-dvh max-h-none w-dvw max-w-none bg-transparent p-0 text-white backdrop:bg-black/90"
      >
        {photo && (
          <div
            className="relative flex h-full w-full flex-col items-center justify-center gap-4 px-4 py-16 sm:px-20"
            onClick={(e) => {
              if (e.target === e.currentTarget) dialogRef.current?.close();
            }}
            onTouchStart={(e) => {
              touchX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Close photo viewer"
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            <img
              src={fullSrc(photo)}
              alt={photo.alt}
              className="max-h-[calc(100dvh-10rem)] max-w-full rounded-lg object-contain"
            />
            <p className="text-center text-sm text-white/80" aria-live="polite">
              {photo.alt} · {current! + 1} of {order.length}
            </p>

            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 sm:right-6"
            >
              <ChevronRight className="h-6 w-6" aria-hidden />
            </button>
          </div>
        )}
      </dialog>
    </div>
  );
}
