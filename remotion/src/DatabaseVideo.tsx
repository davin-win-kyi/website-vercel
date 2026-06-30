import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";
import { loadFont as loadSans } from "@remotion/google-fonts/Inter";

const { fontFamily: mono } = loadMono("normal", { weights: ["400", "700"] });
const { fontFamily: sans } = loadSans("normal", { weights: ["500", "700"] });

const BG = "#0b1220";
const PANEL = "#111a2e";
const HEADER = "#2563eb";
const BORDER = "#1e2c47";
const TEXT = "#e6edf7";
const MUTED = "#8aa0c2";
const PK = "#fbbf24";
const FK = "#34d399";

type Col = { name: string; type: string; key?: "PK" | "FK" };
type Tbl = {
  title: string;
  x: number;
  y: number;
  cols: Col[];
};

const TW = 300;
const ROW_H = 38;
const HEAD_H = 46;

const tables: Tbl[] = [
  {
    title: "users",
    x: 70,
    y: 120,
    cols: [
      { name: "id", type: "int", key: "PK" },
      { name: "name", type: "varchar" },
      { name: "email", type: "varchar" },
      { name: "created_at", type: "timestamp" },
    ],
  },
  {
    title: "orders",
    x: 490,
    y: 100,
    cols: [
      { name: "id", type: "int", key: "PK" },
      { name: "user_id", type: "int", key: "FK" },
      { name: "product_id", type: "int", key: "FK" },
      { name: "quantity", type: "int" },
      { name: "total", type: "decimal" },
    ],
  },
  {
    title: "products",
    x: 910,
    y: 150,
    cols: [
      { name: "id", type: "int", key: "PK" },
      { name: "name", type: "varchar" },
      { name: "price", type: "decimal" },
      { name: "stock", type: "int" },
    ],
  },
];

function tableHeight(t: Tbl) {
  return HEAD_H + t.cols.length * ROW_H;
}

function rowCenterY(t: Tbl, idx: number) {
  return t.y + HEAD_H + idx * ROW_H + ROW_H / 2;
}

function Table({ t, index }: { t: Tbl; index: number }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({
    frame: frame - index * 10,
    fps,
    config: { damping: 18, stiffness: 120 },
  });
  const y = interpolate(appear, [0, 1], [30, 0]);
  const h = tableHeight(t);

  return (
    <div
      style={{
        position: "absolute",
        left: t.x,
        top: t.y,
        width: TW,
        opacity: appear,
        transform: `translateY(${y}px)`,
        borderRadius: 12,
        overflow: "hidden",
        background: PANEL,
        border: `1px solid ${BORDER}`,
        boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
      }}
    >
      <div
        style={{
          height: HEAD_H,
          background: HEADER,
          display: "flex",
          alignItems: "center",
          paddingLeft: 16,
          color: "#fff",
          fontFamily: sans,
          fontWeight: 700,
          fontSize: 20,
          letterSpacing: 0.3,
        }}
      >
        {t.title}
      </div>
      {t.cols.map((c, i) => (
        <div
          key={c.name}
          style={{
            height: ROW_H,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            borderTop: `1px solid ${BORDER}`,
            background: i % 2 ? "rgba(255,255,255,0.02)" : "transparent",
            fontFamily: mono,
            fontSize: 15,
          }}
        >
          <span style={{ color: TEXT, display: "flex", gap: 8, alignItems: "center" }}>
            {c.key && (
              <span
                style={{
                  color: c.key === "PK" ? PK : FK,
                  fontWeight: 700,
                  fontSize: 11,
                }}
              >
                {c.key}
              </span>
            )}
            {c.name}
          </span>
          <span style={{ color: MUTED, fontSize: 13 }}>{c.type}</span>
        </div>
      ))}
    </div>
  );
}

function Relations() {
  const frame = useCurrentFrame();

  // orders.user_id (table 1, row 1) -> users.id (table 0, row 0)
  const o = tables[1];
  const u = tables[0];
  const p = tables[2];

  const lines = [
    {
      x1: o.x,
      y1: rowCenterY(o, 1),
      x2: u.x + TW,
      y2: rowCenterY(u, 0),
      delay: 40,
    },
    {
      x1: o.x + TW,
      y1: rowCenterY(o, 2),
      x2: p.x,
      y2: rowCenterY(p, 0),
      delay: 55,
    },
  ];

  return (
    <svg
      width={1280}
      height={720}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      {lines.map((l, i) => {
        const prog = interpolate(frame, [l.delay, l.delay + 25], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const midX = (l.x1 + l.x2) / 2;
        const path = `M ${l.x1} ${l.y1} C ${midX} ${l.y1}, ${midX} ${l.y2}, ${l.x2} ${l.y2}`;
        const len = 600;
        return (
          <g key={i}>
            <path
              d={path}
              fill="none"
              stroke={FK}
              strokeWidth={2.5}
              strokeDasharray={len}
              strokeDashoffset={len * (1 - prog)}
              opacity={0.9}
            />
            <circle cx={l.x1} cy={l.y1} r={5} fill={FK} opacity={prog} />
            <circle cx={l.x2} cy={l.y2} r={5} fill={FK} opacity={prog} />
          </g>
        );
      })}
    </svg>
  );
}

const QUERY = "SELECT * FROM users JOIN orders ON users.id = orders.user_id;";

function QueryBar() {
  const frame = useCurrentFrame();
  const start = 80;
  const chars = Math.max(
    0,
    Math.floor(interpolate(frame, [start, start + 60], [0, QUERY.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }))
  );
  const text = QUERY.slice(0, chars);
  const caretOn = Math.floor(frame / 8) % 2 === 0;

  return (
    <div
      style={{
        position: "absolute",
        left: 70,
        right: 70,
        bottom: 50,
        background: "#0a0f1c",
        border: `1px solid ${BORDER}`,
        borderRadius: 12,
        padding: "20px 24px",
        fontFamily: mono,
        fontSize: 22,
        color: TEXT,
        boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
      }}
    >
      <span style={{ color: MUTED, marginRight: 12, fontSize: 18 }}>SQL&gt;</span>
      <span>
        {text.split(/(SELECT|FROM|JOIN|ON)/g).map((part, i) => {
          const kw = ["SELECT", "FROM", "JOIN", "ON"].includes(part);
          return (
            <span key={i} style={{ color: kw ? "#60a5fa" : TEXT, fontWeight: kw ? 700 : 400 }}>
              {part}
            </span>
          );
        })}
      </span>
      <span style={{ opacity: caretOn ? 1 : 0, color: "#60a5fa" }}>▌</span>
    </div>
  );
}

export const DatabaseVideo = () => {
  return (
    <AbsoluteFill style={{ background: BG }}>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(900px 500px at 30% 20%, rgba(37,99,235,0.18), transparent 70%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 44,
          left: 70,
          fontFamily: sans,
          fontWeight: 700,
          fontSize: 26,
          color: TEXT,
          letterSpacing: 0.3,
        }}
      >
        Relational Schema
        <span style={{ color: MUTED, fontWeight: 500, fontSize: 18, marginLeft: 12 }}>
          users · orders · products
        </span>
      </div>

      <Relations />
      {tables.map((t, i) => (
        <Table key={t.title} t={t} index={i} />
      ))}
      <Sequence from={0}>
        <QueryBar />
      </Sequence>
    </AbsoluteFill>
  );
};
