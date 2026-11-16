import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Music, Shuffle, X } from "lucide-react";

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

// `group` marks photos with two or more people; those are shown first. `caption` appears
// under the photo in the viewer; `alt` describes what's in it for screen readers.
type Photo = {
  id: string;
  group?: boolean;
  width: number;
  height: number;
  caption: string;
  alt: string;
};

// Shown in a new random order on every visit, group photos first. `id` names the image files in
// src/assets/gallery; width and height are the preview image's size.
const photos: Photo[] = [
  { id: "snack-mural", width: 774, height: 800, caption: "The mural said it, not me.", alt: "Posing in front of a colorful mural of cartoon snacks" },
  { id: "graduation-selfie", group: true, width: 800, height: 565, caption: "We did it (somehow).", alt: "Selfie with friends in graduation caps and gowns at commencement" },
  { id: "graduation-friends", group: true, width: 800, height: 572, caption: "Officially overeducated.", alt: "Commencement selfie with classmates in graduation gowns" },
  { id: "driving-range-swing", width: 465, height: 800, caption: "Fore! (Probably.)", alt: "Mid-swing at a golf driving range on a sunny day" },
  { id: "living-room-pose", width: 800, height: 550, caption: "Home gym, open for business.", alt: "Playful arms-up pose in sunglasses in a living room" },
  { id: "mountain-overlook-pair", group: true, width: 800, height: 587, caption: "Views worth the leg day.", alt: "Posing with a friend on a rocky mountain overlook" },
  { id: "sunny-plaza-pair", group: true, width: 733, height: 800, caption: "Peak sunglasses weather.", alt: "Two people posing on a sunny plaza lined with flags" },
  { id: "pumpkin-carving", width: 757, height: 800, caption: "South Park would approve.", alt: "Two freshly carved jack-o'-lanterns on a kitchen counter" },
  { id: "glass-building-pair", group: true, width: 800, height: 712, caption: "Architecture appreciation society.", alt: "Two people standing outside a modern glass building by bike racks" },
  { id: "summit-selfie", group: true, width: 800, height: 619, caption: "Cloud level: unlocked.", alt: "Selfie with a friend on a mountain summit above the clouds" },
  { id: "night-market-sign", group: true, width: 600, height: 800, caption: "Night market, full stomachs.", alt: "Three friends standing in front of a tall glowing sign at a night market" },
  { id: "classroom-group-selfie", group: true, width: 800, height: 580, caption: "Class dismissed, selfie mandatory.", alt: "Group selfie with classmates in a classroom" },
  { id: "jack-o-lanterns", width: 615, height: 800, caption: "Simply gourd-geous.", alt: "Three carved jack-o'-lanterns on a kitchen cabinet" },
  { id: "conference-table-group", group: true, width: 800, height: 581, caption: "This meeting could've been a photo.", alt: "A large group posing around a conference table" },
  { id: "group-dinner", group: true, width: 800, height: 550, caption: "Table for a lot.", alt: "Friends gathered around a long table at a restaurant" },
  { id: "night-balcony", width: 620, height: 800, caption: "Balcony at night, very album cover.", alt: "Posing on a balcony at night" },
  { id: "beach-selfie", group: true, width: 602, height: 800, caption: "Sun's out, squints out.", alt: "Selfie with a friend on a sunny beach" },
  { id: "night-headband-selfie", width: 637, height: 800, caption: "Smiling past bedtime.", alt: "Smiling night selfie in a sports headband" },
  { id: "headset-on-forehead-selfie", width: 624, height: 800, caption: "Reality: temporarily restored.", alt: "Selfie with a mixed-reality headset pushed up on the forehead" },
  { id: "bright-room-friends", group: true, width: 800, height: 539, caption: "Plant-based friendship.", alt: "Selfie with two friends in a bright room with plants" },
  { id: "resort-selfie", group: true, width: 800, height: 527, caption: "Out of office.", alt: "Selfie with a friend in front of a resort building" },
  { id: "snowfield-peace-sign", width: 656, height: 800, caption: "Snow problem.", alt: "Crouching on a snowfield below a rocky slope, flashing a peace sign" },
  { id: "cafe-mural-selfie", group: true, width: 800, height: 550, caption: "Camera angle: optional.", alt: "Tilted selfie with friends at a café with a colorful mural" },
  { id: "rocky-trail-log", width: 616, height: 800, caption: "Log off, peace out.", alt: "Sitting on a log on a rocky mountain trail, flashing a peace sign" },
  { id: "football-game-selfie", group: true, width: 700, height: 528, caption: "Game day, undefeated in selfies.", alt: "Three friends taking a selfie at a night football game in a packed stadium" },
  { id: "night-game-friends", group: true, width: 696, height: 526, caption: "Photobomb: approved.", alt: "Selfie with friends in the stands at a night game" },
  { id: "bearded-selfie", width: 800, height: 772, caption: "The beard era.", alt: "Selfie of a smiling bearded man in a black T-shirt" },
  { id: "japanese-restaurant-friends", group: true, width: 700, height: 514, caption: "Sushi first, questions later.", alt: "Two friends smiling in a booth at a Japanese restaurant" },
  { id: "throwback-photo", group: true, width: 694, height: 430, caption: "Throwback on the big screen.", alt: "A screen showing an old photo of two boys smiling outdoors" },
  { id: "public-market-sign", width: 646, height: 800, caption: "Main character at Pike Place.", alt: "Standing under the glowing Public Market neon sign at night" },
  { id: "restaurant-selfie", group: true, width: 694, height: 748, caption: "Good food, better company.", alt: "Selfie with a friend outside a restaurant" },
  { id: "city-street-selfie", group: true, width: 608, height: 800, caption: "City walk, zero plans.", alt: "Selfie with a friend on a city street lined with tall buildings" },
  { id: "mountain-ledge-friends", group: true, width: 466, height: 800, caption: "Summit-adjacent.", alt: "Three friends sitting on a ledge in front of snowy mountains" },
  { id: "heart-arch-friends", group: true, width: 685, height: 800, caption: "The heart wanted a group photo.", alt: "Three friends posing inside a lit-up heart-shaped arch at night" },
  { id: "laughing-restaurant-selfie", group: true, width: 598, height: 800, caption: "Laughing at our own jokes.", alt: "Laughing selfie with a friend at a restaurant" },
  { id: "flower-arch-friends", group: true, width: 600, height: 800, caption: "Squad in full bloom.", alt: "Four friends standing under a flower-covered arch at night" },
  { id: "rope-net-selfie", width: 449, height: 800, caption: "Caught in the net, happily.", alt: "Selfie in front of a rope net under a blue sky" },
  { id: "mid-laugh-selfie", width: 595, height: 800, caption: "Unflattering? Unbothered.", alt: "Close-up selfie mid-laugh" },
  { id: "panda-mural-coffee", width: 608, height: 800, caption: "Coffee for the panda, obviously.", alt: "A hand holding a coffee cup up to a cartoon panda mural" },
  { id: "building-entrance", width: 471, height: 800, caption: "Standing like I own the place.", alt: "Standing in front of a building entrance in a navy T-shirt" },
  { id: "fist-sculpture", width: 502, height: 800, caption: "Fist bump, giant edition.", alt: "Posing next to a giant fist sculpture on a city plaza" },
  { id: "playful-selfie", width: 578, height: 800, caption: "Unimpressed, allegedly.", alt: "Close-up selfie indoors with a playful expression" },
  { id: "white-tee-selfie", width: 762, height: 800, caption: "Clean tee, cleaner smile.", alt: "Smiling selfie in a white T-shirt" },
  { id: "half-dome-view", width: 800, height: 701, caption: "Half Dome, full send.", alt: "Sitting on granite rocks with Half Dome in the background" },
  { id: "headset-dinner", width: 448, height: 800, caption: "Dinner, but make it spatial.", alt: "Wearing a mixed-reality headset at a restaurant with a graffiti wall" },
  { id: "black-tee-selfie", width: 656, height: 800, caption: "Same smile, different shirt.", alt: "Smiling selfie in a black T-shirt" },
  { id: "headband-light-selfie", width: 633, height: 800, caption: "Lights on, somebody's home.", alt: "Smiling selfie wearing a light-up headband" },
  { id: "giant-duck-festival", width: 800, height: 622, caption: "Duck, duck, giant duck.", alt: "Standing next to a giant yellow duck statue at a night festival" },
  { id: "tokyo-welcome-mural", width: 596, height: 800, caption: "Tokyo, I have arrived.", alt: "Posing by a Welcome to Tokyo mural in an airport hallway" },
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

// "Tokyo Night Story", a 1980s city pop mix from the Vintage J-Pop Station YouTube channel.
const MUSIC_VIDEO_ID = "794-o1fb8no";

// Loads YouTube's player only when a visitor asks for music, then plays it on a loop.
// Browsers don't allow sound before a visitor interacts, so this starts on their tap.
function GalleryMusic() {
  const [playing, setPlaying] = useState(false);

  if (!playing) {
    return (
      <button
        type="button"
        onClick={() => setPlaying(true)}
        className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-soft transition-colors hover:bg-secondary"
      >
        <Music className="h-4 w-4" aria-hidden />
        Play music while you browse
        <span className="hidden font-normal text-muted-foreground sm:inline">· Tokyo Night Story</span>
      </button>
    );
  }

  return (
    <div className="mt-5 w-full max-w-sm overflow-hidden rounded-xl border border-border bg-black shadow-soft">
      <iframe
        className="block h-[216px] w-full"
        src={`https://www.youtube-nocookie.com/embed/${MUSIC_VIDEO_ID}?autoplay=1&loop=1&playlist=${MUSIC_VIDEO_ID}&rel=0`}
        title="Tokyo Night Story, 1980s city pop from Vintage J-Pop Station (YouTube player)"
        allow="autoplay; encrypted-media; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}

function Gallery() {
  const [order] = useState(() => [
    ...shuffled(photos.filter((p) => p.group)),
    ...shuffled(photos.filter((p) => !p.group)),
  ]);
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
      <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
        <Shuffle className="h-4 w-4" aria-hidden />
        Refresh the browser to shuffle images!
      </p>
      <GalleryMusic />

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
              {photo.caption} · {current! + 1} of {order.length}
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
