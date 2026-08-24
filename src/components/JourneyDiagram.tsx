// The playground's StoryDiagram, rendered by Remotion: the Vesta scene graph
// at a given stage, with the page's exact layout, tones, pills and labels.
// New-in-stage elements spring in and pulse; the selected node carries the
// dashed ring (the "click" the page invites, performed for the viewer).
// Data: src/journey/scenes.ts, copied verbatim from the playground.
import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  nodeLabelAt,
  nodeToneAt,
  stageIndex,
  visibleAt,
  type SceneEdge,
  type SceneGraph,
  type Tone,
} from "../journey/scene-graph";
import { theme } from "../theme";

export const TONE: Record<Tone, { stroke: string; halo: string; pill: string; pillText: string }> = {
  violet: { stroke: "#7c3aed", halo: "#ede9fe", pill: "#f5f3ff", pillText: "#6d28d9" },
  blue: { stroke: "#2563eb", halo: "#dbeafe", pill: "#eff6ff", pillText: "#1d4ed8" },
  emerald: { stroke: "#059669", halo: "#d1fae5", pill: "#ecfdf5", pillText: "#047857" },
  amber: { stroke: "#d97706", halo: "#fef3c7", pill: "#fffbeb", pillText: "#b45309" },
  red: { stroke: "#dc2626", halo: "#fee2e2", pill: "#fef2f2", pillText: "#b91c1c" },
  gray: { stroke: "#9ca3af", halo: "#f3f4f6", pill: "#f9fafb", pillText: "#4b5563" },
};

/** Lucide-like stroke icons, 24-viewBox, drawn inline. */
export const NodeIcon: React.FC<{ icon: string; size?: number; color: string }> = ({
  icon,
  size = 20,
  color,
}) => {
  const st = {
    fill: "none",
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as const;
  const body = (() => {
    switch (icon) {
      case "building":
        return (
          <>
            <rect x="5" y="3" width="14" height="18" rx="1.5" {...st} />
            <path d="M9 7h2 M13 7h2 M9 11h2 M13 11h2 M9 15h2 M13 15h2 M10.5 21v-3h3v3" {...st} />
          </>
        );
      case "landmark":
        return <path d="M3 21h18 M6 18v-7 M10 18v-7 M14 18v-7 M18 18v-7 M12 3 3 8h18z" {...st} />;
      case "stamp":
        return (
          <>
            <path d="M5 21h14 M6 17h12v-2a2 2 0 0 0-2-2h-2.5l1-6a2.5 2.5 0 1 0-5 0l1 6H8a2 2 0 0 0-2 2z" {...st} />
          </>
        );
      case "bot":
        return (
          <>
            <path d="M12 8V4H8" {...st} />
            <rect x="4" y="8" width="16" height="12" rx="2" {...st} />
            <path d="M2 14h2 M20 14h2 M15 13v2 M9 13v2" {...st} />
          </>
        );
      case "badge":
        return (
          <>
            <circle cx="12" cy="12" r="9" {...st} />
            <path d="M8.5 12 L11 14.5 L15.5 9.5" {...st} />
          </>
        );
      case "key":
        return (
          <>
            <circle cx="16.5" cy="7.5" r="4.5" {...st} />
            <path d="M13 11 L4 20 M6.5 17.5 L9 20 M4 20 v-2.5" {...st} />
          </>
        );
      case "wallet":
        return (
          <>
            <path d="M20 7 H5 a2 2 0 0 1 0-4 h13 v4 z" {...st} />
            <rect x="3" y="7" width="18" height="13" rx="2" {...st} />
            <circle cx="16.5" cy="13.5" r="1.4" fill={color} />
          </>
        );
      case "award":
        return (
          <>
            <circle cx="12" cy="9" r="6" {...st} />
            <path d="M9 14 L7.5 21 L12 18.5 L16.5 21 L15 14" {...st} />
          </>
        );
      case "network":
        return (
          <>
            <rect x="9" y="2.5" width="6" height="5" rx="1" {...st} />
            <rect x="2.5" y="16.5" width="6" height="5" rx="1" {...st} />
            <rect x="15.5" y="16.5" width="6" height="5" rx="1" {...st} />
            <path d="M12 7.5v4 M5.5 16.5v-2.5h13v2.5 M12 11.5v2.5" {...st} />
          </>
        );
      case "wrench":
        return (
          <path
            d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
            {...st}
          />
        );
      case "ghost":
        return (
          <>
            <path d="M5 11 a7 7 0 0 1 14 0 v10 l-2.33-2 -2.34 2 -2.33-2 -2.33 2 -2.34-2 L5 21 z" {...st} />
            <circle cx="9.5" cy="10" r="1.2" fill={color} />
            <circle cx="14.5" cy="10" r="1.2" fill={color} />
          </>
        );
      case "user":
        return (
          <>
            <circle cx="12" cy="8" r="4" {...st} />
            <path d="M5 21 a7 6 0 0 1 14 0" {...st} />
          </>
        );
      case "bank":
        return (
          <>
            <path d="M19 10.5 a7 6.5 0 1 0 -14 1.5 l-1.5 3 h2.5 l1 2.5 h2.5 l0.5 1.5 h4 l0.5-1.5 a7 6.5 0 0 0 4.5-7z" {...st} />
            <path d="M10 5.5 h4" {...st} />
            <circle cx="15.5" cy="10" r="1" fill={color} />
          </>
        );
      case "id":
        return (
          <>
            <rect x="3" y="5" width="18" height="14" rx="2" {...st} />
            <circle cx="8.5" cy="11" r="2" {...st} />
            <path d="M6 16 a3 2.4 0 0 1 5 0 M14 9.5h4 M14 13h4" {...st} />
          </>
        );
      default:
        return <circle cx="12" cy="12" r="8" {...st} />;
    }
  })();
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      {body}
    </svg>
  );
};

const BadgeCheckSmall: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x}, ${y})`}>
    <circle cx="6.5" cy="6.5" r="6" fill="none" stroke="#059669" strokeWidth="1.6" />
    <path d="M4 6.7 L5.8 8.5 L9 5" stroke="#059669" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

function edgeGeometry(graph: SceneGraph, e: SceneEdge) {
  const a = graph.nodes.find((n) => n.id === e.from)!;
  const b = graph.nodes.find((n) => n.id === e.to)!;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const r1 = (a.r ?? 22) + 10;
  const r2 = (b.r ?? 22) + 16;
  const x1 = a.x + ux * r1;
  const y1 = a.y + uy * r1;
  const x2 = b.x - ux * r2;
  const y2 = b.y - uy * r2;
  const t = e.labelT ?? 0.5;
  if (!e.curve) {
    return { d: `M ${x1} ${y1} L ${x2} ${y2}`, lx: x1 + (x2 - x1) * t, ly: y1 + (y2 - y1) * t };
  }
  const cx = (x1 + x2) / 2 + -uy * e.curve;
  const cy = (y1 + y2) / 2 + ux * e.curve;
  const omt = 1 - t;
  return {
    d: `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`,
    lx: omt * omt * x1 + 2 * omt * t * cx + t * t * x2,
    ly: omt * omt * y1 + 2 * omt * t * cy + t * t * y2,
  };
}

const Pill: React.FC<{ x: number; y: number; text: string; tone: Tone; opacity?: number }> = ({
  x,
  y,
  text,
  tone,
  opacity = 1,
}) => {
  const c = TONE[tone];
  const w = text.length * 5.7 + 14;
  return (
    <g opacity={opacity}>
      <rect x={x - w / 2} y={y - 9} width={w} height={18} rx={9} fill={c.pill} stroke={c.stroke} strokeOpacity={0.45} />
      <text x={x} y={y + 3.5} textAnchor="middle" fontSize={10} fontWeight={600} fill={c.pillText} fontFamily={theme.font}>
        {text}
      </text>
    </g>
  );
};

export const JourneyDiagram: React.FC<{
  graph: SceneGraph;
  stage: string;
  selected?: string | null;
  /** Seconds into the shot when new-in-stage elements animate in. */
  revealAt?: number;
  width: number;
  maxHeight?: number;
}> = ({ graph, stage, selected = null, revealAt = 0.6, width, maxHeight }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const idx = stageIndex(graph, stage);
  const isNew = (el: { appears: string }) => stageIndex(graph, el.appears) === idx;
  const reveal = (el: { appears: string }, extra = 0) =>
    isNew(el)
      ? spring({ frame: frame - fps * (revealAt + extra), fps, config: { damping: 200 } })
      : 1;
  const pulse = (Math.sin(t * Math.PI * 2.2) + 1) / 2;

  const view = graph.stageView[stage];
  const inView = (id: string) => !view?.only || view.only.includes(id);
  const nodes = graph.nodes.filter((n) => visibleAt(graph, n, stage) && inView(n.id));
  const edges = graph.edges.filter(
    (e) => visibleAt(graph, e, stage) && inView(e.from) && inView(e.to)
  );
  const badges = graph.badges.filter((b) => visibleAt(graph, b, stage) && inView(b.node));
  const changes = graph.stageChanges[stage];
  const changedNodes = new Set(changes?.nodes ?? []);
  const tones = Array.from(new Set(edges.map((e) => e.tone)));

  const vb = (view?.viewBox ?? graph.defaultViewBox).split(" ").map(Number);
  let w = width;
  if (maxHeight && (w * vb[3]) / vb[2] > maxHeight) w = (maxHeight * vb[2]) / vb[3];
  const height = (w * vb[3]) / vb[2];

  return (
    <svg
      width={w}
      height={height}
      viewBox={view?.viewBox ?? graph.defaultViewBox}
      aria-label={`The ${graph.title} story graph at step ${stage}`}
    >
      <defs>
        {tones.map((tn) => (
          <marker
            key={tn}
            id={`jd-arrow-${stage}-${tn}`}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 9 5 L 0 9" fill="none" stroke={TONE[tn].stroke} strokeWidth="1.6" />
          </marker>
        ))}
      </defs>

      {edges.map((e, i) => {
        const g = edgeGeometry(graph, e);
        const c = TONE[e.tone];
        const o = reveal(e, 0.15 + (i % 3) * 0.1);
        return (
          <g key={e.id} opacity={o}>
            <path
              d={g.d}
              fill="none"
              stroke={c.stroke}
              strokeWidth={(isNew(e) ? 2.2 : 1.5) * (e.width ?? 1)}
              strokeOpacity={isNew(e) ? 0.95 : 0.55}
              strokeDasharray={e.dashed ? "5 4" : undefined}
              markerEnd={`url(#jd-arrow-${stage}-${e.tone})`}
            />
            {e.label ? <Pill x={g.lx} y={g.ly} text={e.label} tone={e.tone} /> : null}
          </g>
        );
      })}

      {nodes.map((n, i) => {
        const tone = nodeToneAt(graph, n, stage);
        const c = TONE[tone];
        const r = n.r ?? 22;
        const highlight = isNew(n) || changedNodes.has(n.id);
        const { label, sub } = nodeLabelAt(graph, n, stage);
        const o = reveal(n, (i % 4) * 0.08);
        const labelW = (label ?? "").length * 6.6;
        return (
          <g key={n.id} opacity={o}>
            {selected === n.id ? (
              <circle
                cx={n.x}
                cy={n.y}
                r={r + 12}
                fill="none"
                stroke={c.stroke}
                strokeWidth={2}
                strokeDasharray="3 3"
              />
            ) : null}
            {highlight ? (
              <circle
                cx={n.x}
                cy={n.y}
                r={r + 7 + pulse * 5}
                fill="none"
                stroke={c.stroke}
                strokeWidth={2}
                opacity={0.65 - pulse * 0.35}
              />
            ) : null}
            <circle cx={n.x} cy={n.y} r={r + 7} fill={c.halo} opacity={0.55} />
            <circle
              cx={n.x}
              cy={n.y}
              r={r}
              fill="#ffffff"
              stroke={c.stroke}
              strokeWidth={1.8}
              strokeDasharray={n.dashed ? "4 3" : undefined}
            />
            <g transform={`translate(${n.x - (r < 20 ? 8 : 10)}, ${n.y - (r < 20 ? 8 : 10)})`}>
              <NodeIcon icon={n.icon} size={r < 20 ? 16 : 20} color={c.stroke} />
            </g>
            {label ? (
              <>
                {n.verifiedAt && stageIndex(graph, n.verifiedAt) <= idx ? (
                  <BadgeCheckSmall x={n.x - labelW / 2 - 17} y={n.y + r + 13} />
                ) : null}
                <text
                  x={n.x}
                  y={n.y + r + 24}
                  textAnchor="middle"
                  fontSize={12}
                  fontWeight={700}
                  fill="#111827"
                  fontFamily={theme.font}
                >
                  {label}
                </text>
              </>
            ) : null}
            {sub ? (
              <text
                x={n.x}
                y={n.y + r + (label ? 39 : 26)}
                textAnchor="middle"
                fontSize={9.5}
                fill="#6b7280"
                fontFamily={theme.font}
              >
                {sub}
              </text>
            ) : null}
          </g>
        );
      })}

      {badges.map((b) => {
        const n = graph.nodes.find((x) => x.id === b.node)!;
        return (
          <g key={b.id} opacity={reveal(b, 0.3)}>
            <Pill
              x={n.x + b.dx + (b.dx > 0 ? (b.text.length * 5.7 + 14) / 2 : 0)}
              y={n.y + b.dy}
              text={b.text}
              tone={b.tone}
            />
          </g>
        );
      })}
    </svg>
  );
};
