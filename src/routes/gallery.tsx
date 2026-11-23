import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Music, Pause, Play, Shuffle, X } from "lucide-react";
import { SITE_URL, creditedPhoto } from "@/lib/site";
import { type Photo, photos } from "@/lib/gallery-photos";

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
    links: [{ rel: "canonical", href: `${SITE_URL}/gallery` }],
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

// Fisher–Yates shuffle, so every order is equally likely.
function shuffled<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// This visit's order: the `top` photos by number, then the other group photos, then the rest, each
// part shuffled.
function pickOrder(): Photo[] {
  return [
    ...[1, 2, 3].flatMap((rank) => shuffled(photos.filter((p) => p.top === rank))),
    ...shuffled(photos.filter((p) => !p.top && p.group)),
    ...shuffled(photos.filter((p) => !p.top && !p.group)),
  ];
}

const thumbSrc = (p: Photo) => thumbs[`/src/assets/gallery/thumb/${p.id}.jpg`];
const fullSrc = (p: Photo) => fulls[`/src/assets/gallery/full/${p.id}.jpg`];

// Structured data crediting every photo, in both of its sizes, so Google Images can show the
// credit under it. "<" is written as an escape so nothing in the text can end the script tag early.
const photoCredits = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": photos.flatMap((p) => [
    creditedPhoto(thumbSrc(p), p.alt),
    creditedPhoto(fullSrc(p), p.alt),
  ]),
}).replace(/</g, "\\u003c");

// "Tokyo Night Story", a 1980s city pop mix from the Vintage J-Pop Station YouTube channel.
const MUSIC_VIDEO_ID = "794-o1fb8no";
const MUSIC_TITLE = "Tokyo Night Story";
const PLAYER_ORIGIN = "https://www.youtube-nocookie.com";

// Player states that YouTube reports.
const YT_PLAYING = 1;
const YT_PAUSED = 2;

// Sends the player a message in the format YouTube's own IFrame API script uses.
function tellPlayer(frame: HTMLIFrameElement | null, message: Record<string, unknown>) {
  frame?.contentWindow?.postMessage(
    JSON.stringify({ ...message, id: 1, channel: "widget" }),
    PLAYER_ORIGIN,
  );
}

const command = (frame: HTMLIFrameElement | null, func: string, args: unknown[] = []) =>
  tellPlayer(frame, { event: "command", func, args });

// Little bars that bounce while the music plays (they hold still for reduced motion).
function SoundBars() {
  return (
    <span aria-hidden className="flex h-3 items-end gap-0.5">
      {[0, 0.3, 0.6].map((delay) => (
        <span
          key={delay}
          className="sound-bar h-full w-[3px] rounded-full bg-foreground/60"
          style={{ animationDelay: `-${delay}s` }}
        />
      ))}
    </span>
  );
}

type MusicState = "off" | "starting" | "playing" | "paused";

// Plays the song from a hidden YouTube player, loaded only once a visitor asks for music and
// controlled by our own play/pause button. Some browsers (Safari, and every browser on iPhone)
// only start sound from a tap on the player itself; there the player shows until the song
// starts, then hides again.
function GalleryMusic() {
  const [state, setState] = useState<MusicState>("off");
  const [needsTap, setNeedsTap] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const ready = useRef(false);
  const wantsMusic = useRef(false);

  // Follow what the player reports, so the button and note always match what you hear.
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const frame = frameRef.current;
      if (!frame || event.source !== frame.contentWindow) return;
      let data: { event?: unknown; info?: unknown } | null;
      try {
        data = JSON.parse(event.data);
      } catch {
        return;
      }
      if (!data || typeof data !== "object") return;

      if (data.event === "onReady" && !ready.current) {
        ready.current = true;
        command(frame, "addEventListener", ["onStateChange"]);
        command(frame, "addEventListener", ["onAutoplayBlocked"]);
        if (wantsMusic.current) command(frame, "playVideo");
        return;
      }
      if (data.event === "onAutoplayBlocked") {
        setNeedsTap(true);
        setState("paused");
        return;
      }
      const reported =
        data.event === "onStateChange"
          ? data.info
          : (data.info as { playerState?: unknown } | null | undefined)?.playerState;
      if (reported === YT_PLAYING) {
        wantsMusic.current = true;
        setNeedsTap(false);
        setState("playing");
      } else if (reported === YT_PAUSED) {
        wantsMusic.current = false;
        setState("paused");
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // Once the player's page loads, say hello until it answers, as YouTube's own script does.
  useEffect(() => {
    if (!loaded) return;
    let tries = 0;
    const timer = window.setInterval(() => {
      if (ready.current || ++tries > 40) window.clearInterval(timer);
      else tellPlayer(frameRef.current, { event: "listening" });
    }, 250);
    return () => window.clearInterval(timer);
  }, [loaded]);

  // If the song still hasn't started after a while, show the player so the visitor can start it.
  useEffect(() => {
    if (state !== "starting" || needsTap) return;
    const timer = window.setTimeout(() => {
      setNeedsTap(true);
      setState("paused");
    }, 12000);
    return () => window.clearTimeout(timer);
  }, [state, needsTap]);

  const toggle = () => {
    const play = state === "off" || state === "paused";
    wantsMusic.current = play;
    // The first press loads the player, which starts the song as soon as it's ready.
    if (state !== "off") command(frameRef.current, play ? "playVideo" : "pauseVideo");
    setState(play ? "starting" : "paused");
  };

  const on = state === "starting" || state === "playing";

  return (
    <div className="mt-5">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <button
          type="button"
          onClick={toggle}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-soft transition-colors hover:bg-secondary"
        >
          {state === "off" ? (
            <Music className="h-4 w-4" aria-hidden />
          ) : on ? (
            <Pause className="h-4 w-4" aria-hidden />
          ) : (
            <Play className="h-4 w-4" aria-hidden />
          )}
          {state === "off" ? "Play music while you browse" : on ? "Pause music" : "Play music"}
          {state === "off" && (
            <span className="hidden font-normal text-muted-foreground sm:inline">
              · {MUSIC_TITLE}
            </span>
          )}
        </button>

        {/* Says what's playing, since the player itself stays out of sight. */}
        <p className="flex items-center gap-2 text-sm text-muted-foreground" aria-live="polite">
          {needsTap ? (
            "Tap play on the video below to start the music."
          ) : state === "starting" ? (
            `Loading ${MUSIC_TITLE}…`
          ) : state === "playing" ? (
            <>
              <SoundBars />
              <span>
                Now playing: <span className="font-medium text-foreground">{MUSIC_TITLE}</span>
                <span className="hidden sm:inline"> · Vintage J-Pop Station</span>
              </span>
            </>
          ) : state === "paused" ? (
            `Paused: ${MUSIC_TITLE}`
          ) : null}
        </p>
      </div>

      {state !== "off" && (
        <div
          inert={!needsTap}
          className={
            needsTap
              ? "mt-3 aspect-video w-full max-w-sm overflow-hidden rounded-xl border border-border bg-black shadow-soft"
              : "pointer-events-none fixed bottom-0 left-0 h-[200px] w-[200px] opacity-0"
          }
        >
          <iframe
            ref={frameRef}
            className="block h-full w-full"
            src={`${PLAYER_ORIGIN}/embed/${MUSIC_VIDEO_ID}?loop=1&playlist=${MUSIC_VIDEO_ID}&playsinline=1&rel=0&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`}
            title={`YouTube player for ${MUSIC_TITLE}`}
            tabIndex={needsTap ? undefined : -1}
            allow="autoplay; encrypted-media"
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => setLoaded(true)}
          />
        </div>
      )}
    </div>
  );
}

function Gallery() {
  const [order] = useState(pickOrder);
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
      <ul className="mt-10 flex list-none flex-wrap gap-2 p-0 [--row:11rem] after:grow-[999] after:content-[''] sm:[--row:14rem] lg:[--row:17rem]">
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
                {/* The first photos are on screen as soon as the page opens (up to about eight on
                    a large monitor), so they load right away, the first one first; the rest
                    load as they're scrolled to. */}
                <img
                  src={thumbSrc(p)}
                  alt={p.alt}
                  width={p.width}
                  height={p.height}
                  loading={i < 8 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : undefined}
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
            className="relative flex h-full w-full flex-col items-center justify-center gap-4 px-0 py-16 sm:px-20"
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
              className="absolute right-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/50 ring-1 ring-white/25 transition-colors hover:bg-black/70"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            {/* Fill the space left around the caption and controls, keeping the photo's shape. */}
            <img
              src={fullSrc(photo)}
              alt={photo.alt}
              className="h-auto object-contain sm:rounded-lg"
              style={{
                width: `min(100%, calc((100dvh - 11rem) * ${photo.width / photo.height}))`,
                aspectRatio: `${photo.width} / ${photo.height}`,
              }}
            />
            <p className="px-4 text-center text-sm text-white/80" aria-live="polite">
              {photo.caption} · {current! + 1} of {order.length}
            </p>

            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 ring-1 ring-white/25 transition-colors hover:bg-black/70 sm:left-6"
            >
              <ChevronLeft className="h-6 w-6" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 ring-1 ring-white/25 transition-colors hover:bg-black/70 sm:right-6"
            >
              <ChevronRight className="h-6 w-6" aria-hidden />
            </button>
          </div>
        )}
      </dialog>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: photoCredits }} />
    </div>
  );
}
