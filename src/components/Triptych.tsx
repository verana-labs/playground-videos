// I-9: the three Verana concepts, one panel each, visual-first (mirrors the
// verana.io home "Verana, in three parts" section):
//   1. Ecosystems - a sovereign ecosystem tree: root, governance, schemas,
//      accredited participants.
//   2. Verifiable Identity - shield; service + operator verified; TRUSTED.
//   3. Discovery - the Trust Graph lighting up from a query, trusted results
//      marked, ranked by trust.
// Generic demo values only: this scene lives inside the locked, use-case-
// agnostic intro (the Playground demo cast is the one deliberately generic
// cast, so its names are allowed).
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { VeranaIoLogo } from "./VeranaLogo";

// The I-8 → I-9 handshake: I-8 ends with the lockup dead center at this size;
// I-9 starts identically, then carries it to the top. Keep the two in sync.
const LOCKUP_SIZE = 150;
const LOCKUP_TRAVEL_S = 0.7; // seconds, at the start of I-9
const PANELS_DELAY_S = 0.55; // first panel starts while the lockup lands
const PANEL_STAGGER_S = 0.7; // one by one, clearly (spec: then >= 5 s to read)

/** I-8: the verana.io lockup alone on the light stage. */
// I-0: the cold open. The verana.io lockup springs in on the light stage,
// the kicker and positioning line follow, everything holds, then the stage
// dims to night over the last second so the cut into I-1's dark question
// lands as a "lights out" transition.
export const BrandOpen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const t = frame / fps;
  const end = durationInFrames / fps;
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const lockIn = spring({ frame, fps, config: { damping: 200 } });
  const kickerIn = interpolate(t, [0.7, 1.2], [0, 1], clamp);
  const tagIn = interpolate(t, [1.2, 1.8], [0, 1], clamp);
  // A gentle drift the whole shot, so the hold never feels frozen.
  const drift = 1 + 0.03 * (t / end);
  const nightIn = interpolate(t, [end - 1.0, end - 0.15], [0, 1], clamp);
  return (
    <AbsoluteFill
      style={{ background: theme.surface, alignItems: "center", justifyContent: "center" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: `scale(${drift})`,
        }}
      >
        <div style={{ opacity: lockIn, transform: `scale(${0.9 + 0.1 * lockIn})` }}>
          <VeranaIoLogo size={120} />
        </div>
        <div
          style={{
            marginTop: 44,
            fontFamily: theme.mono,
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: 7,
            color: theme.muted,
            opacity: kickerIn,
            transform: `translateY(${(1 - kickerIn) * 18}px)`,
          }}
        >
          [ OPEN · PUBLIC · NEUTRAL ]
        </div>
        <div
          style={{
            marginTop: 30,
            fontFamily: theme.font,
            fontSize: 50,
            fontWeight: 700,
            color: theme.ink,
            textAlign: "center",
            maxWidth: 1640,
            lineHeight: 1.3,
            opacity: tagIn,
            transform: `translateY(${(1 - tagIn) * 18}px)`,
          }}
        >
          The Open Trust Infrastructure for the Verifiable Internet
        </div>
      </div>
      {/* Lights out into I-1 */}
      <AbsoluteFill style={{ background: theme.night, opacity: nightIn }} />
    </AbsoluteFill>
  );
};

export const BrandReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200 } });
  return (
    <AbsoluteFill
      style={{ background: theme.surface, alignItems: "center", justifyContent: "center" }}
    >
      <div style={{ opacity: s, transform: `scale(${0.9 + 0.1 * s})` }}>
        <VeranaIoLogo size={LOCKUP_SIZE} />
      </div>
    </AbsoluteFill>
  );
};

const CheckIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden>
    <circle cx="10" cy="10" r="10" fill={theme.green} />
    <path
      d="M5.5 10.5 L8.5 13.5 L14.5 7"
      stroke="#fff"
      strokeWidth="2.2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ShieldIcon: React.FC<{ size?: number; color?: string }> = ({ size = 14, color = "#047857" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <path
      d="M12 2 L20 5 V11 C20 16.5 16.5 20.5 12 22 C7.5 20.5 4 16.5 4 11 V5 Z"
      fill={color}
    />
    <path
      d="M8.5 11.5 L11 14 L15.5 8.5"
      stroke="#fff"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Panel: React.FC<{
  index: number;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}> = ({ index, title, subtitle, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({
    frame: frame - fps * (PANELS_DELAY_S + index * PANEL_STAGGER_S),
    fps,
    config: { damping: 200 },
  });
  return (
    <div
      style={{
        width: 530,
        transform: `translateY(${(1 - s) * 80}px)`,
        opacity: s,
        fontFamily: theme.font,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          marginBottom: 14,
        }}
      >
        {/* Numbered bubble */}
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 23,
            background: theme.gradient,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: theme.display,
            fontWeight: 700,
            fontSize: 26,
            boxShadow: "0 8px 20px rgba(118,62,240,0.35)",
            flexShrink: 0,
          }}
        >
          {index + 1}
        </div>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontFamily: theme.display, fontSize: 34, fontWeight: 700, color: theme.ink, letterSpacing: "-0.02em" }}>
            {title}
          </div>
          <div style={{ fontSize: 21, color: theme.muted }}>{subtitle}</div>
        </div>
      </div>
      <div
        style={{
          background: theme.card,
          borderRadius: 20,
          boxShadow: "0 24px 60px rgba(15,23,42,0.12)",
          padding: 26,
          height: 560,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
};

/* The three panel bodies, visual-first (the verana.io home "Verana, in
   three parts" section, drawn as diagrams instead of text):
     1. Trust Ecosystems  - a sovereign ecosystem tree: root, governance,
        schemas, accredited participants.
     2. Verifiable Trust  - shield, service + operator both checked, TRUSTED.
        Signature: "Verify first. Then connect."
     3. The Trust Graph   - a graph lighting up from a search node, trusted
        results marked. Ranked by trust. */

const MonoTag: React.FC<{ children: React.ReactNode; color?: string }> = ({
  children,
  color = theme.muted,
}) => (
  <div style={{ fontFamily: theme.mono, fontSize: 17, color, letterSpacing: 1 }}>{children}</div>
);

// Draw-in helper for SVG strokes: dash the full path, reveal by progress.
const drawStroke = (progress: number) => ({
  strokeDasharray: 1,
  strokeDashoffset: 1 - progress,
  pathLength: 1,
} as const);

const SitemapGlyph: React.FC<{ size?: number }> = ({ size = 54 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <rect x="9" y="2.5" width="6" height="5" rx="1.2" fill="#fff" />
    <rect x="2" y="16.5" width="6" height="5" rx="1.2" fill="#fff" />
    <rect x="9" y="16.5" width="6" height="5" rx="1.2" fill="#fff" />
    <rect x="16" y="16.5" width="6" height="5" rx="1.2" fill="#fff" />
    <path d="M12 7.5 v4 M5 16.5 v-2.5 h14 v2.5 M12 11.5 v5" stroke="#fff" strokeWidth="1.7" fill="none" />
  </svg>
);

const DocGlyph: React.FC<{ size?: number; seal?: boolean }> = ({ size = 56, seal = false }) => (
  <svg width={size} height={(size * 60) / 48} viewBox="0 0 48 60" aria-hidden>
    <path
      d="M6 3 h26 l10 10 v44 a3 3 0 0 1 -3 3 H6 a3 3 0 0 1 -3 -3 V6 a3 3 0 0 1 3 -3 z"
      fill="#fff"
      stroke="#c4b5fd"
      strokeWidth="2.5"
    />
    <path d="M32 3 v10 h10" fill="none" stroke="#c4b5fd" strokeWidth="2.5" />
    <rect x="10" y="22" width="26" height="3.6" rx="1.8" fill="#ddd6fe" />
    <rect x="10" y="30" width="26" height="3.6" rx="1.8" fill="#ddd6fe" />
    <rect x="10" y="38" width="16" height="3.6" rx="1.8" fill="#ddd6fe" />
    {seal ? <circle cx="34" cy="46" r="7.5" fill="none" stroke={theme.violet} strokeWidth="2.4" /> : null}
    {seal ? <circle cx="34" cy="46" r="3" fill={theme.violet} /> : null}
  </svg>
);

const PersonDot: React.FC<{ size?: number; hue: string }> = ({ size = 46, hue }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <circle cx="12" cy="12" r="11" fill={hue} />
    <circle cx="12" cy="9.4" r="3.4" fill="#fff" />
    <path d="M5.5 19 a6.5 5.4 0 0 1 13 0" fill="#fff" />
  </svg>
);

/* Panel 1: Trust Ecosystems, a sovereign ecosystem drawn as a tree. */
const EcosystemPanel: React.FC<{ appeared: number }> = ({ appeared }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = (d: number) =>
    spring({ frame: frame - appeared - fps * d, fps, config: { damping: 200 } });
  const line = (d: number) =>
    interpolate(frame - appeared - fps * d, [0, fps * 0.45], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  const branches: { x: number; label: string; delay: number }[] = [
    { x: 92, label: "governance", delay: 0.55 },
    { x: 239, label: "schemas", delay: 0.7 },
    { x: 386, label: "participants", delay: 0.85 },
  ];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* connectors */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 478 508"
        style={{ position: "absolute", inset: 0 }}
      >
        {branches.map((b, i) => (
          <path
            key={i}
            d={`M 239 132 C 239 190, ${b.x} 180, ${b.x} 228`}
            fill="none"
            stroke="#ddd6fe"
            strokeWidth="3.5"
            {...drawStroke(line(0.35 + i * 0.12))}
          />
        ))}
      </svg>
      {/* root */}
      <div
        style={{
          position: "absolute",
          left: 239 - 52,
          top: 28,
          width: 104,
          height: 104,
          borderRadius: 26,
          background: theme.gradient,
          boxShadow: "0 18px 44px rgba(118,62,240,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${pop(0.1)})`,
        }}
      >
        <SitemapGlyph />
      </div>
      {/* governance */}
      <div
        style={{
          position: "absolute",
          left: 92 - 28,
          top: 232,
          transform: `scale(${pop(0.55)})`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          width: 56,
        }}
      >
        <DocGlyph seal />
      </div>
      {/* schemas: two docs, fanned */}
      <div style={{ position: "absolute", left: 239 - 38, top: 236, transform: `scale(${pop(0.7)})` }}>
        <div style={{ position: "relative", width: 76, height: 74 }}>
          <div style={{ position: "absolute", left: 22, top: 0, transform: "rotate(7deg)" }}>
            <DocGlyph size={48} />
          </div>
          <div style={{ position: "absolute", left: 0, top: 4, transform: "rotate(-5deg)" }}>
            <DocGlyph size={48} />
          </div>
        </div>
      </div>
      {/* participants: three people, each accredited (green tick) */}
      <div
        style={{
          position: "absolute",
          left: 386 - 56,
          top: 238,
          width: 112,
          transform: `scale(${pop(0.85)})`,
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", gap: 6 }}>
          <PersonDot hue="#8b5cf6" />
          <PersonDot hue="#6366f1" />
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: -8 }}>
          <PersonDot hue="#0ea5e9" />
        </div>
        {[
          { l: 26, t: 30 },
          { l: 78, t: 30 },
          { l: 52, t: 68 },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: pos.l,
              top: pos.t,
              transform: `scale(${pop(1.05 + i * 0.12)})`,
            }}
          >
            <CheckIcon size={20} />
          </div>
        ))}
      </div>
      {/* labels */}
      {branches.map((b, i) => (
        <div
          key={b.label}
          style={{
            position: "absolute",
            left: b.x - 70,
            top: 352,
            width: 140,
            textAlign: "center",
            opacity: pop(b.delay + 0.25),
          }}
        >
          <MonoTag>{b.label}</MonoTag>
        </div>
      ))}
      {/* the sovereign bit, kept to five words */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 428,
          display: "flex",
          justifyContent: "center",
          opacity: pop(1.5),
        }}
      >
        <MonoTag color={theme.violet}>your rules · your business model</MonoTag>
      </div>
    </div>
  );
};

/* Panel 2: Verifiable Trust, verify the service and its operator, then
   connect. */
const ProofOfTrustPanel: React.FC<{ appeared: number }> = ({ appeared }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = (d: number) =>
    spring({ frame: frame - appeared - fps * d, fps, config: { damping: 200 } });
  const line = (d: number) =>
    interpolate(frame - appeared - fps * d, [0, fps * 0.4], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  const Tile: React.FC<{ children: React.ReactNode; delay: number; label: string }> = ({
    children,
    delay,
    label,
  }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        transform: `scale(${pop(delay)})`,
        position: "relative",
      }}
    >
      <div
        style={{
          width: 92,
          height: 92,
          borderRadius: 22,
          background: "#f5f3ff",
          border: "2.5px solid #ddd6fe",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
      <MonoTag>{label}</MonoTag>
      <div style={{ position: "absolute", right: -8, top: -8, transform: `scale(${pop(delay + 0.35)})` }}>
        <CheckIcon size={30} />
      </div>
    </div>
  );
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* the shield */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 16,
          display: "flex",
          justifyContent: "center",
          transform: `scale(${pop(0.1)})`,
        }}
      >
        <svg width={120} height={132} viewBox="0 0 40 44" aria-hidden>
          <defs>
            <linearGradient id="pot-shield" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#763EF0" />
              <stop offset="100%" stopColor="#9F7AEA" />
            </linearGradient>
          </defs>
          <path
            d="M20 2 L36 8 V20 c0 10.5 -6.8 18.2 -16 22 C10.8 38.2 4 30.5 4 20 V8 Z"
            fill="url(#pot-shield)"
          />
          <path
            d="M12.5 21.5 L18 27 L28 15.5"
            stroke="#fff"
            strokeWidth="3.4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {/* service + operator, both verified */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 196,
          display: "flex",
          justifyContent: "center",
          gap: 96,
        }}
      >
        <Tile delay={0.5} label="service">
          <svg width={50} height={50} viewBox="0 0 24 24" aria-hidden>
            <rect x="2.5" y="4" width="19" height="12.5" rx="2" fill="none" stroke={theme.violet} strokeWidth="1.9" />
            <path d="M9 20.5 h6 M12 16.5 v4" stroke={theme.violet} strokeWidth="1.9" strokeLinecap="round" />
            <path d="M6.5 8.5 h7 M6.5 12 h4.5" stroke="#a78bfa" strokeWidth="1.9" strokeLinecap="round" />
          </svg>
        </Tile>
        <Tile delay={0.65} label="operator">
          <svg width={50} height={50} viewBox="0 0 24 24" aria-hidden>
            <path d="M4 21 V5.5 L13 3 v18" fill="none" stroke={theme.violet} strokeWidth="1.9" strokeLinejoin="round" />
            <path d="M13 9 l7 2 v10" fill="none" stroke={theme.violet} strokeWidth="1.9" strokeLinejoin="round" />
            <path d="M2.5 21 h19" stroke={theme.violet} strokeWidth="1.9" strokeLinecap="round" />
            <path d="M7 8.5 h2.5 M7 12 h2.5 M7 15.5 h2.5 M15.5 13.5 h2 M15.5 16.5 h2" stroke="#a78bfa" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
        </Tile>
      </div>
      {/* the link between them */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 478 508"
        style={{ position: "absolute", inset: 0 }}
      >
        <path
          d="M 194 242 H 284"
          stroke="#c4b5fd"
          strokeWidth="3.5"
          fill="none"
          {...drawStroke(line(0.85))}
        />
      </svg>
      {/* verdict */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 356,
          display: "flex",
          justifyContent: "center",
          transform: `scale(${pop(1.15)})`,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            border: "2.5px solid #10b981",
            background: "#ecfdf5",
            borderRadius: 999,
            padding: "12px 26px",
          }}
        >
          <ShieldIcon size={22} />
          <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: 3, color: "#047857" }}>
            TRUSTED
          </span>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 442,
          display: "flex",
          justifyContent: "center",
          opacity: pop(1.5),
        }}
      >
        <MonoTag color="#047857">Verify first. Then connect.</MonoTag>
      </div>
    </div>
  );
};

/* Panel 3: The Trust Graph, discovery drawn as a graph lighting up. */
const DiscoverPanel: React.FC<{ appeared: number }> = ({ appeared }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = (d: number) =>
    spring({ frame: frame - appeared - fps * d, fps, config: { damping: 200 } });
  const line = (d: number) =>
    interpolate(frame - appeared - fps * d, [0, fps * 0.5], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  // A small trust graph: fixed layout, drawn once, lit progressively.
  const nodes: { x: number; y: number; trusted?: boolean; delay: number }[] = [
    { x: 239, y: 214, delay: 0.35 }, // hub (the query)
    { x: 96, y: 96, trusted: true, delay: 0.6 },
    { x: 352, y: 74, delay: 0.7 },
    { x: 415, y: 208, trusted: true, delay: 0.8 },
    { x: 68, y: 250, delay: 0.9 },
    { x: 150, y: 372, trusted: true, delay: 1.0 },
    { x: 330, y: 350, delay: 1.1 },
    { x: 415, y: 396, delay: 1.2 },
  ];
  const edges: [number, number, number][] = [
    [0, 1, 0.5],
    [0, 2, 0.6],
    [0, 3, 0.7],
    [0, 4, 0.8],
    [0, 5, 0.9],
    [0, 6, 1.0],
    [6, 7, 1.1],
    [1, 4, 1.15],
    [2, 3, 1.2],
  ];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <svg width="100%" height="100%" viewBox="0 0 478 508" style={{ position: "absolute", inset: 0 }}>
        {edges.map(([a, b, d], i) => (
          <path
            key={i}
            d={`M ${nodes[a].x} ${nodes[a].y} L ${nodes[b].x} ${nodes[b].y}`}
            stroke={nodes[a].trusted && nodes[b].trusted ? "#a7f3d0" : "#e2e8f0"}
            strokeWidth="3"
            {...drawStroke(line(d))}
          />
        ))}
      </svg>
      {nodes.map((n, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: n.x - (i === 0 ? 34 : 24),
            top: n.y - (i === 0 ? 34 : 24),
            transform: `scale(${pop(n.delay)})`,
          }}
        >
          <div
            style={{
              width: i === 0 ? 68 : 48,
              height: i === 0 ? 68 : 48,
              borderRadius: "50%",
              background: i === 0 ? theme.gradient : n.trusted ? "#ecfdf5" : "#f1f5f9",
              border: i === 0 ? "none" : `2.5px solid ${n.trusted ? "#6ee7b7" : "#e2e8f0"}`,
              boxShadow: i === 0 ? "0 14px 34px rgba(118,62,240,0.4)" : undefined,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {i === 0 ? (
              <svg width={34} height={34} viewBox="0 0 24 24" aria-hidden>
                <circle cx="10.5" cy="10.5" r="6.2" fill="none" stroke="#fff" strokeWidth="2.4" />
                <path d="M15.2 15.2 L20 20" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
              </svg>
            ) : null}
          </div>
          {n.trusted ? (
            <div style={{ position: "absolute", right: -7, top: -7, transform: `scale(${pop(n.delay + 0.5)})` }}>
              <CheckIcon size={24} />
            </div>
          ) : null}
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 452,
          display: "flex",
          justifyContent: "center",
          opacity: pop(1.6),
        }}
      >
        <MonoTag color="#047857">ranked by trust</MonoTag>
      </div>
    </div>
  );
};

export const Triptych: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();

  // The lockup starts where I-8 left it (dead center, LOCKUP_SIZE) and
  // travels to the top while shrinking; the panels spring in below.
  const travel = interpolate(frame, [0, fps * LOCKUP_TRAVEL_S], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const eased = interpolate(travel, [0, 1], [0, 1], { easing: (t) => 1 - Math.pow(1 - t, 3) });
  const lockupY = eased * (120 - height / 2); // center → y 120
  const lockupScale = 1 - eased * 0.4; // 150 → 90

  return (
    <AbsoluteFill style={{ background: theme.surface }}>
      {/* The three concept panels, below the landed lockup */}
      <AbsoluteFill
        style={{
          flexDirection: "row",
          gap: 48,
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: 205,
        }}
      >
        <Panel index={0} title="Ecosystems" subtitle="Build and/or join trust registries">
          <EcosystemPanel appeared={fps * (PANELS_DELAY_S + 0 * PANEL_STAGGER_S)} />
        </Panel>
        <Panel index={1} title="Verifiable Identity" subtitle="Services and AI Agents">
          <ProofOfTrustPanel appeared={fps * (PANELS_DELAY_S + 1 * PANEL_STAGGER_S)} />
        </Panel>
        <Panel index={2} title="Discovery" subtitle="Find services for what they prove">
          <DiscoverPanel appeared={fps * (PANELS_DELAY_S + 2 * PANEL_STAGGER_S)} />
        </Panel>
      </AbsoluteFill>

      {/* The travelling lockup, above the panels */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        <div style={{ transform: `translateY(${lockupY}px) scale(${lockupScale})` }}>
          <VeranaIoLogo size={LOCKUP_SIZE} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
