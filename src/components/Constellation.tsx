// I-5 / I-6 / I-8 and the V-3 build scene. One seeded node-and-edge field:
//  - sketch:  a single ecosystem draws itself (root, schema, issuers, verifiers)
//  - zoomout: many ecosystems appear, a search field overlays
//  - verify:  green verification pulses propagate along edges (behind the logo)
//  - build:   labeled cast entities turn from gray to verified green in order
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { theme } from "../theme";
import { VeranaIoLogo } from "./VeranaLogo";

type Node = { x: number; y: number; r: number; cluster: number };

const makeNodes = (
  clusters: number,
  perCluster: number,
  seed: string,
  grid: boolean
): Node[] => {
  const nodes: Node[] = [];
  for (let c = 0; c < clusters; c++) {
    // Build mode uses a deterministic grid in the upper band so labels never
    // collide with each other or with the lower-third text.
    const cols = 3;
    const cx = grid
      ? 400 + (c % cols) * 560
      : 320 + random(`${seed}-cx-${c}`) * 1280;
    const cy = grid
      ? 240 + Math.floor(c / cols) * 330
      : 260 + random(`${seed}-cy-${c}`) * 560;
    nodes.push({ x: cx, y: cy, r: 26, cluster: c });
    for (let i = 0; i < perCluster; i++) {
      const a = random(`${seed}-a-${c}-${i}`) * Math.PI * 2;
      const d = grid ? 70 + random(`${seed}-d-${c}-${i}`) * 50 : 90 + random(`${seed}-d-${c}-${i}`) * 130;
      nodes.push({ x: cx + Math.cos(a) * d, y: cy + Math.sin(a) * d, r: grid ? 10 : 13, cluster: c });
    }
  }
  return nodes;
};

export const Constellation: React.FC<{
  mode: "sketch" | "zoomout" | "verify" | "build";
  entities?: { label: string; at: number }[];
}> = ({ mode, entities = [] }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frame / durationInFrames;

  const clusters = mode === "sketch" ? 1 : mode === "build" ? entities.length : 7;
  const per = mode === "sketch" ? 8 : mode === "build" ? 3 : 5;
  const nodes = makeNodes(
    clusters,
    per,
    mode === "build" ? "build" : "constellation",
    mode === "build"
  );
  const roots = nodes.filter((n) => n.r > 20);

  // Sketch draws within 2.5 s regardless of shot length, so the finished
  // diagram holds long enough to read (other modes keep proportional draws).
  const sketchWindow = Math.min(0.7, (2.5 * fps) / durationInFrames);
  const appearAt = (i: number) => (i / nodes.length) * (mode === "sketch" ? sketchWindow : 0.4);
  const zoom =
    mode === "zoomout" ? interpolate(t, [0, 1], [1.6, 1]) : mode === "sketch" ? 1.35 : 1;
  // Build and verify play on the light surface (verify is the turn to
  // daylight, carrying the black verana.io wordmark); the question modes
  // stay on the dark stage.
  const light = mode === "build" || mode === "verify";

  return (
    <AbsoluteFill style={{ background: light ? theme.surface : theme.night }}>
      <svg
        viewBox="0 0 1920 1080"
        style={{ width: "100%", height: "100%", transform: `scale(${zoom})` }}
      >
        {/* edges to cluster roots */}
        {nodes.map((n, i) => {
          if (n.r > 20) return null;
          const root = roots[n.cluster];
          const p = interpolate(t, [appearAt(i), appearAt(i) + 0.12], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const verified =
            mode === "verify"
              ? t > 0.25 + (i / nodes.length) * 0.5
              : mode === "build"
                ? t > (entities[n.cluster]?.at ?? 1)
                : false;
          const stroke = verified ? theme.green : light ? "#cbd5e1" : "#334155";
          return (
            <line
              key={`e-${i}`}
              x1={root.x}
              y1={root.y}
              x2={root.x + (n.x - root.x) * p}
              y2={root.y + (n.y - root.y) * p}
              stroke={stroke}
              strokeWidth={verified ? 3 : 2}
            />
          );
        })}
        {/* nodes */}
        {nodes.map((n, i) => {
          const s = spring({ frame: frame - appearAt(i) * durationInFrames, fps, config: { damping: 200 } });
          const verified =
            mode === "verify"
              ? t > 0.25 + (i / nodes.length) * 0.5
              : mode === "build"
                ? t > (entities[n.cluster]?.at ?? 1)
                : false;
          const fill = verified ? theme.green : n.r > 20 ? theme.indigo : light ? "#94a3b8" : "#475569";
          return <circle key={`n-${i}`} cx={n.x} cy={n.y} r={n.r * s} fill={fill} />;
        })}
        {/* build mode: entity labels beside cluster roots */}
        {mode === "build"
          ? roots.map((r, c) => {
              const done = t > (entities[c]?.at ?? 1);
              return (
                <g key={`l-${c}`}>
                  <rect
                    x={r.x - 170}
                    y={r.y + 40}
                    width={340}
                    height={54}
                    rx={12}
                    fill={done ? "#ecfdf5" : "#ffffff"}
                    stroke={done ? theme.green : "#cbd5e1"}
                    strokeWidth={2}
                  />
                  <text
                    x={r.x}
                    y={r.y + 75}
                    textAnchor="middle"
                    fontFamily={theme.font}
                    fontSize={22}
                    fontWeight={600}
                    fill={done ? theme.greenDark : theme.muted}
                  >
                    {entities[c]?.label ?? ""}
                  </text>
                  {done ? (
                    <text
                      x={r.x}
                      y={r.y - 44}
                      textAnchor="middle"
                      fontFamily={theme.font}
                      fontSize={20}
                      fontWeight={700}
                      fill={theme.greenDark}
                    >
                      verified
                    </text>
                  ) : null}
                </g>
              );
            })
          : null}
      </svg>
      {/* zoomout mode: search field. Typing finishes early (40% of the shot)
          so the completed query holds; once complete, the pill pulses and
          the search term stays highlighted so it cannot be missed. */}
      {mode === "zoomout"
        ? (() => {
            const prefix = "find ecosystems: ";
            const term = "plumber certification";
            const full = prefix + term;
            const typed = Math.floor(
              interpolate(t, [0.08, 0.4], [0, full.length], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            );
            const done = typed >= full.length;
            const pulse = done ? Math.sin((frame / 30) * Math.PI * 2.4) * 0.5 + 0.5 : 0;
            return (
              <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 120 }}>
                <div
                  style={{
                    borderRadius: 44,
                    background: "#ffffff",
                    border: `3px solid ${done ? theme.violet : "#cbd5e1"}`,
                    display: "flex",
                    alignItems: "center",
                    padding: "20px 40px",
                    fontFamily: theme.mono,
                    fontSize: 31,
                    color: theme.ink,
                    boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 ${12 + pulse * 34}px rgba(124,58,237,${0.25 + pulse * 0.55})`,
                    transform: `scale(${1 + pulse * 0.03})`,
                  }}
                >
                  <span>{prefix.slice(0, typed)}</span>
                  <span
                    style={{
                      color: theme.violet,
                      fontWeight: 700,
                      background: done ? "rgba(124,58,237,0.12)" : undefined,
                      borderRadius: 8,
                      padding: done ? "2px 8px" : undefined,
                    }}
                  >
                    {term.slice(0, Math.max(0, typed - prefix.length))}
                  </span>
                  <span style={{ opacity: frame % 20 < 10 ? 1 : 0 }}>|</span>
                </div>
              </AbsoluteFill>
            );
          })()
        : null}
      {/* verify mode: the verana.io lockup resolves over the field */}
      {mode === "verify" ? (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div
            style={{
              opacity: interpolate(t, [0.05, 0.35], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              transform: "translateY(-70px)",
            }}
          >
            <VeranaIoLogo size={150} />
          </div>
        </AbsoluteFill>
      ) : null}
    </AbsoluteFill>
  );
};
