import { createFileRoute } from "@tanstack/react-router";
import {
  type CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronLeft, ChevronRight, Music, Pause, Play, Shuffle, X } from "lucide-react";

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

// `group` marks photos with two or more people; those are shown first. `lead` names a set of
// photos (like "football"); one of each set is always shown near the top. `featured` marks the
// photo shown larger at the very top: as tall as the rows of photos beside it, or across the
// full width on phones. `caption` appears under the photo in the viewer; `alt` describes what's
// in it for screen readers.
type Photo = {
  id: string;
  group?: boolean;
  lead?: string;
  featured?: boolean;
  width: number;
  height: number;
  caption: string;
  alt: string;
};

// Shown in a new random order on every visit: the featured photo first, one photo from each
// `lead` set beside it (or just below it), then the rest with group photos first. `id` names the
// image files in src/assets/gallery; width and height are the preview image's size.
const photos: Photo[] = [
  { id: "night-market-red-carpet", group: true, width: 800, height: 782, caption: "Night market, full stomachs.", alt: "Three friends standing on a red carpet in front of a tall glowing sign at a night market" },
  { id: "peace-sign-selfie", group: true, width: 597, height: 800, caption: "Two grins, one peace sign.", alt: "Two friends grinning in a selfie, one flashing a peace sign, beside an orange wall" },
  { id: "waterfront-sunset-selfie", group: true, width: 800, height: 599, caption: "Sunset squad, assembled.", alt: "Selfie with three friends on a dock at dusk, with calm water and lit-up houses behind them" },
  { id: "graduation-roses", group: true, featured: true, width: 602, height: 800, caption: "Degree done, roses in hand.", alt: "With parents on graduation day, holding red roses in a graduation gown and purple stole outside Alaska Airlines Field" },
  { id: "lab-aviators", width: 800, height: 660, caption: "Shades on, code compiling.", alt: "Leaning back in aviator sunglasses in an office with computer monitors" },
  { id: "snack-mural", width: 774, height: 800, caption: "The mural said it, not me.", alt: "Posing in front of a colorful mural of cartoon snacks" },
  { id: "graduation-selfie", group: true, lead: "graduation", width: 800, height: 565, caption: "We did it (somehow).", alt: "Selfie with friends in graduation caps and gowns at commencement" },
  { id: "graduation-friends", group: true, lead: "graduation", width: 800, height: 572, caption: "Officially overeducated.", alt: "Commencement selfie with classmates in graduation gowns" },
  { id: "driving-range-swing", width: 465, height: 800, caption: "Fore! (Probably.)", alt: "Mid-swing at a golf driving range on a sunny day" },
  { id: "living-room-pose", width: 800, height: 550, caption: "Home gym, open for business.", alt: "Playful arms-up pose in sunglasses in a living room" },
  { id: "mountain-overlook-pair", group: true, width: 800, height: 587, caption: "Views worth the leg day.", alt: "Posing with a friend on a rocky mountain overlook" },
  { id: "sunny-plaza-pair", group: true, width: 733, height: 800, caption: "Peak sunglasses weather.", alt: "Two people posing on a sunny plaza lined with flags" },
  { id: "pumpkin-carving", width: 757, height: 800, caption: "South Park would approve.", alt: "Two freshly carved jack-o'-lanterns on a kitchen counter" },
  { id: "summit-selfie", group: true, lead: "summit", width: 800, height: 619, caption: "Cloud level: unlocked.", alt: "Selfie with a friend on a mountain summit above the clouds" },
  { id: "classroom-group-selfie", group: true, width: 800, height: 580, caption: "Class dismissed, selfie mandatory.", alt: "Group selfie with classmates in a classroom" },
  { id: "jack-o-lanterns", width: 615, height: 800, caption: "Simply gourd-geous.", alt: "Three carved jack-o'-lanterns on a kitchen cabinet" },
  { id: "conference-table-group", group: true, width: 800, height: 581, caption: "This meeting could've been a photo.", alt: "A large group posing around a conference table" },
  { id: "night-balcony", width: 620, height: 800, caption: "Balcony at night, very album cover.", alt: "Posing on a balcony at night" },
  { id: "night-headband-selfie", width: 637, height: 800, caption: "Smiling past bedtime.", alt: "Smiling night selfie in a sports headband" },
  { id: "headset-on-forehead-selfie", width: 624, height: 800, caption: "Reality: temporarily restored.", alt: "Selfie with a mixed-reality headset pushed up on the forehead" },
  { id: "bright-room-friends", group: true, width: 800, height: 539, caption: "Plant-based friendship.", alt: "Selfie with two friends in a bright room with plants" },
  { id: "resort-selfie", group: true, width: 800, height: 527, caption: "Out of office.", alt: "Selfie with a friend in front of a resort building" },
  { id: "snowfield-peace-sign", width: 656, height: 800, caption: "Snow problem.", alt: "Crouching on a snowfield below a rocky slope, flashing a peace sign" },
  { id: "cafe-mural-selfie", group: true, width: 800, height: 550, caption: "Camera angle: optional.", alt: "Tilted selfie with friends at a café with a colorful mural" },
  { id: "rocky-trail-log", width: 616, height: 800, caption: "Log off, peace out.", alt: "Sitting on a log on a rocky mountain trail, flashing a peace sign" },
  { id: "football-game-selfie", group: true, lead: "football", width: 700, height: 528, caption: "Game day, undefeated in selfies.", alt: "Three friends taking a selfie at a night football game in a packed stadium" },
  { id: "night-game-friends", group: true, lead: "football", width: 696, height: 526, caption: "Photobomb: approved.", alt: "Selfie with friends in the stands at a night game" },
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
function shuffled<T>(items: T[], random: () => number = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function pickOne<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

// Random numbers that come out the same for the same seed (the mulberry32 generator).
function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Picks = {
  featured: Photo | null;
  leads: Photo[];
  rest: Photo[];
  // The lead photos and the first two of the rest, in the order they'd sit beside the featured
  // photo.
  besideOrder: Photo[];
  // Seeds any random choice made while laying out, so laying out again after a resize makes
  // the same choices.
  seed: number;
};

// This visit's picks: the featured photo, one photo at random from each `lead` set, and
// everything else shuffled with the group photos first.
function pickPhotos(): Picks {
  const featured = photos.find((p) => p.featured) ?? null;
  const pool = photos.filter((p) => p !== featured);
  const setNames = [...new Set(pool.flatMap((p) => (p.lead ? [p.lead] : [])))];
  const leads = shuffled(setNames.map((name) => pickOne(pool.filter((p) => p.lead === name))));
  const others = pool.filter((p) => !leads.includes(p));
  const rest = [
    ...shuffled(others.filter((p) => p.group)),
    ...shuffled(others.filter((p) => !p.group)),
  ];
  return {
    featured,
    leads,
    rest,
    besideOrder: shuffled([...leads, ...rest.slice(0, 2)]),
    seed: Math.floor(Math.random() * 2 ** 32),
  };
}

type RowLayout = { width: number; rowHeight: number; gap: number };

// Which row each photo lands in, by the rule the browser uses to wrap the list: a photo joins
// the current row while its starting width (row height × its shape) still fits. Rows break a
// pixel early here, so the browser's rounding can only move a photo up a row, never down.
function rowsOf(order: Photo[], { width, rowHeight, gap }: RowLayout): number[] {
  let row = 0;
  let used = 0;
  return order.map((p) => {
    const base = rowHeight * (p.width / p.height);
    if (used > 0 && used + gap + base > width - 1) {
      row += 1;
      used = 0;
    }
    used += (used > 0 ? gap : 0) + base;
    return row;
  });
}

// Puts the lead photos at random spots within the first two rows. When they can't all fit
// there (a phone row holds just one wide photo), it allows one more row at a time.
function placeLeads(
  leads: Photo[],
  rest: Photo[],
  layout: RowLayout,
  random: () => number,
): Photo[] {
  const leadsFirst = [...leads, ...rest];
  if (!leads.length || !(layout.width > 0 && layout.rowHeight > 0)) return leadsFirst;
  const restRows = rowsOf(rest, layout);
  for (let rowLimit = 2; rowLimit <= Math.max(2, leads.length); rowLimit++) {
    const slotCount = Math.max(leads.length, restRows.filter((row) => row < rowLimit).length);
    for (let attempt = 0; attempt < 50; attempt++) {
      const slots = shuffled([...Array(slotCount).keys()], random)
        .slice(0, leads.length)
        .sort((a, b) => a - b);
      const order = [...rest];
      shuffled(leads, random).forEach((lead, i) => order.splice(slots[i], 0, lead));
      const rows = rowsOf(order, layout);
      if (leads.every((p) => rows[order.indexOf(p)] < rowLimit)) return order;
    }
  }
  return leadsFirst;
}

// The list's width, row height and gap, in pixels.
function measureRows(list: HTMLElement): RowLayout {
  const probe = document.createElement("div");
  probe.style.cssText = "position: absolute; visibility: hidden; width: var(--row)";
  list.append(probe);
  const rowHeight = probe.getBoundingClientRect().width;
  probe.remove();
  return {
    width: list.getBoundingClientRect().width,
    rowHeight,
    gap: parseFloat(getComputedStyle(list).columnGap) || 0,
  };
}

// Sizes the featured photo to be exactly as tall as the rows of photos beside it. A row sharing
// width w is (w − its gaps) ÷ (the sum of its photos' width-to-height ratios) tall, so "featured
// width = its ratio × the rows' total height" can be solved for the width directly.
function fitBeside(featured: Photo, rows: Photo[][], { width, gap }: RowLayout) {
  const ratio = featured.width / featured.height;
  const sums = rows.map((row) => row.reduce((sum, p) => sum + p.width / p.height, 0));
  const a = sums.reduce((total, sum) => total + 1 / sum, 0);
  const c =
    rows.reduce((total, row, i) => total + (width - row.length * gap) / sums[i], 0) +
    (rows.length - 1) * gap;
  const featuredWidth = (ratio * c) / (1 + ratio * a);
  return {
    featuredWidth,
    height: featuredWidth / ratio,
    rowHeights: rows.map((row, i) => (width - featuredWidth - row.length * gap) / sums[i]),
  };
}

type Mosaic = { share: number; rows: Photo[][]; below: Photo[] };

// Puts the lead photos (and up to two others, to even out the rows) in two or three rows beside
// the featured photo. Of the ways to split them, keeps the one where the featured photo comes
// out nearest two ordinary rows tall and the rows are most alike, with every lead photo beside
// it if there's room (any left out start the rows below). Null when no split fits, as on
// phones.
function planMosaic(picks: Picks, layout: RowLayout): Mosaic | null {
  const { featured, leads, rest, besideOrder } = picks;
  if (!featured) return null;
  const { rowHeight, gap } = layout;
  const groups = [0, 1, 2].map((extra) => {
    const chosen = [...leads, ...rest.slice(0, extra)];
    return besideOrder.filter((p) => chosen.includes(p));
  });
  groups.push(besideOrder.filter((p) => leads.includes(p)).slice(0, 2));
  let best: (Mosaic & { score: number }) | null = null;
  for (const group of groups) {
    const leftOut = leads.filter((p) => !group.includes(p));
    // Every way to cut the group, in order, into two or three rows.
    const splits: Photo[][][] = [];
    for (let a = 1; a < group.length; a++) {
      splits.push([group.slice(0, a), group.slice(a)]);
      for (let b = a + 1; b < group.length; b++) {
        splits.push([group.slice(0, a), group.slice(a, b), group.slice(b)]);
      }
    }
    for (const rows of splits) {
      const fit = fitBeside(featured, rows, layout);
      const fits =
        fit.height >= 1.6 * rowHeight &&
        fit.height <= 2.6 * rowHeight &&
        fit.rowHeights.every((h) => h >= 0.68 * rowHeight && h <= 1.5 * rowHeight);
      if (!fits) continue;
      const score =
        Math.abs(Math.log(fit.height / (2 * rowHeight + gap))) +
        0.6 * Math.log(Math.max(...fit.rowHeights) / Math.min(...fit.rowHeights)) +
        0.5 * leftOut.length +
        0.05 * (group.length + leftOut.length - leads.length);
      if (!best || score < best.score) {
        best = {
          score,
          share: fit.featuredWidth / layout.width,
          rows,
          below: [...leftOut, ...rest.filter((p) => !group.includes(p))],
        };
      }
    }
  }
  return best;
}

type Arrangement = {
  featured: Photo | null;
  // The rows beside the featured photo, and the share of the width it takes. With no rows
  // beside it, it spans the full width.
  beside: Photo[][];
  share: number;
  below: Photo[];
};

// Where every photo goes at this width. It depends only on this visit's picks and the layout,
// so working it out again after a resize keeps the same choices.
function arrange(picks: Picks, layout: RowLayout | null): Arrangement {
  const { featured, leads, rest } = picks;
  const mosaic = layout ? planMosaic(picks, layout) : null;
  if (mosaic) return { featured, beside: mosaic.rows, share: mosaic.share, below: mosaic.below };
  return {
    featured,
    beside: [],
    share: 1,
    below: layout ? placeLeads(leads, rest, layout, seededRandom(picks.seed)) : [...leads, ...rest],
  };
}

const thumbSrc = (p: Photo) => thumbs[`/src/assets/gallery/thumb/${p.id}.jpg`];
const fullSrc = (p: Photo) => fulls[`/src/assets/gallery/full/${p.id}.jpg`];

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

type TileProps = {
  photo: Photo;
  onOpen: () => void;
  className?: string;
  style?: CSSProperties;
  // Take the height of its slot instead of following the photo's own shape.
  fill?: boolean;
  // The photo shown larger: loaded first, and at full size on sharp screens.
  featured?: boolean;
};

// One photo on the page; clicking it opens the viewer.
function Tile({ photo: p, onOpen, className = "", style, fill, featured }: TileProps) {
  return (
    <div role="listitem" className={`min-w-0 ${className}`} style={style}>
      <button
        type="button"
        onClick={onOpen}
        className={`group relative block w-full overflow-hidden rounded-lg bg-secondary ${fill ? "h-full" : ""}`}
        style={fill ? undefined : { aspectRatio: `${p.width} / ${p.height}` }}
      >
        <img
          src={thumbSrc(p)}
          srcSet={featured ? `${thumbSrc(p)} 1x, ${fullSrc(p)} 2x` : undefined}
          alt={p.alt}
          width={p.width}
          height={p.height}
          loading={featured ? "eager" : "lazy"}
          fetchPriority={featured ? "high" : undefined}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      </button>
    </div>
  );
}

function Gallery() {
  const [picks] = useState(pickPhotos);
  const [layout, setLayout] = useState<RowLayout | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);

  const arrangement = useMemo(() => arrange(picks, layout), [picks, layout]);
  const { featured, beside, share, below } = arrangement;
  // The viewer steps through the photos in the same order as the page.
  const order = useMemo(
    () => [...(featured ? [featured] : []), ...beside.flat(), ...below],
    [featured, beside, below],
  );
  const current = order.findIndex((p) => p.id === currentId);
  const photo = current < 0 ? null : order[current];
  const viewing = photo !== null;

  const step = (delta: number) => {
    if (current >= 0) setCurrentId(order[(current + delta + order.length) % order.length].id);
  };

  // Measures the rows, which decide where each photo goes. Skipped while the viewer is open,
  // since hiding the page's scrollbar changes its width for that time.
  const measure = useCallback(() => {
    const list = listRef.current;
    if (!list || dialogRef.current?.open) return;
    const next = measureRows(list);
    setLayout((prev) =>
      prev && Math.abs(prev.width - next.width) < 0.5 && prev.rowHeight === next.rowHeight
        ? prev
        : next,
    );
  }, []);

  // Measure before the page is shown, and again whenever its width changes.
  useLayoutEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (listRef.current) observer.observe(listRef.current);
    return () => observer.disconnect();
  }, [measure]);

  // Open and close the viewer, and keep the page behind it from scrolling.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (viewing && !dialog.open) dialog.showModal();
    if (!viewing && dialog.open) dialog.close();
    document.documentElement.style.overflow = viewing ? "hidden" : "";
    // The window may have been resized while the viewer was open.
    if (!viewing) measure();
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [viewing, measure]);

  // Load the neighboring photos ahead of time so moving between them feels instant.
  useEffect(() => {
    if (current < 0) return;
    for (const d of [-1, 1]) {
      new Image().src = fullSrc(order[(current + d + order.length) % order.length]);
    }
  }, [current, order]);

  const open = (p: Photo) => () => setCurrentId(p.id);

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

      <div role="list" className="mt-10 [--row:11rem] sm:[--row:14rem] lg:[--row:17rem]">
        {/* The featured photo, as tall as the two or three rows of photos beside it. Where there
            isn't room beside it (on phones), it spans the full width above the rows instead. */}
        {featured && (
          <div className="mb-2 flex gap-2">
            <Tile
              photo={featured}
              featured
              fill={beside.length > 0}
              className={beside.length > 0 ? "shrink-0" : "w-full"}
              style={beside.length > 0 ? { width: `${share * 100}%` } : undefined}
              onOpen={open(featured)}
            />
            {beside.length > 0 && (
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                {/* Each row fills the width exactly, as sized. Grow factors are scaled up because
                    a row only fills when they add up to at least 1, and a row may hold just one
                    tall photo. */}
                {beside.map((row, i) => (
                  <div key={i} className="flex gap-2">
                    {row.map((p) => (
                      <Tile
                        key={p.id}
                        photo={p}
                        style={{ flex: `${(100 * p.width) / p.height} 1 0%` }}
                        onOpen={open(p)}
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Rows of photos at their natural shapes: each grows in proportion to its width. */}
        <div ref={listRef} className="flex flex-wrap gap-2 after:grow-[999] after:content-['']">
          {below.map((p) => {
            const ratio = p.width / p.height;
            return (
              <Tile
                key={p.id}
                photo={p}
                style={{ flexGrow: ratio, flexBasis: `calc(var(--row) * ${ratio})` }}
                onOpen={open(p)}
              />
            );
          })}
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        onClose={() => setCurrentId(null)}
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
              {photo.caption} · {current + 1} of {order.length}
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
    </div>
  );
}
