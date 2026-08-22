// INTRO v3 scenes: start as copies of the v2 scenes; edit freely (v2's
// files stay untouched).
//   N-1 "foundations": the W3C standards layer and the eIDAS 2.0 legal layer
//       locking together as a stack.
//   N-2 "silos": the stack holds, but around it ecosystems sit isolated.
//   N-9a "build-eco": for ecosystem builders, the governance card alone.
//   N-9b "build-service": for service builders: Join · Choose · Bridge.
//   N-10 "verana-close": lockup, verana.io, the sovereign tagline.
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { AssetImg, useAsset } from "../lib/assets";
import { VeranaIoLogo, VeranaMark } from "./VeranaLogo";

const pop = (frame: number, fps: number, d: number) =>
  spring({ frame: frame - fps * d, fps, config: { damping: 200 } });

const WalletTile: React.FC<{ id: string; size?: number }> = ({ id, size = 112 }) => {
  const src = useAsset(`wallet-logos/${id}`);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        background: theme.card,
        boxShadow: "0 12px 30px rgba(15,23,42,0.12)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: theme.font,
      }}
    >
      {src ? (
        <AssetImg id={`wallet-logos/${id}`} cover={false} style={{ padding: size * 0.14 }} />
      ) : (
        <span style={{ fontSize: size * 0.14, color: theme.muted }}>{id}</span>
      )}
    </div>
  );
};

// ---------------------------------------------------------------- N-1
const Chip: React.FC<{ children: React.ReactNode; color?: "violet" | "blue" }> = ({
  children,
  color = "violet",
}) => (
  <span
    style={{
      fontFamily: theme.mono,
      fontSize: 16,
      color: color === "violet" ? "#6d28d9" : "#1d4ed8",
      background: color === "violet" ? "#f5f3ff" : "#eff6ff",
      border: `1.5px solid ${color === "violet" ? "#ddd6fe" : "#bfdbfe"}`,
      borderRadius: 999,
      padding: "4px 12px",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </span>
);

const IdCard: React.FC<{ icon: "user" | "building" | "thing"; label: string }> = ({
  icon,
  label,
}) => {
  const st = { fill: "none", stroke: theme.violet, strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <div
      style={{
        width: 250,
        background: theme.card,
        border: "1.5px solid #e2e8f0",
        borderRadius: 16,
        padding: "16px 18px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        boxShadow: "0 10px 26px rgba(15,23,42,0.08)",
      }}
    >
      <svg width={40} height={40} viewBox="0 0 24 24" aria-hidden>
        {icon === "user" ? (
          <>
            <circle cx="12" cy="8" r="4" {...st} />
            <path d="M5 21 a7 6 0 0 1 14 0" {...st} />
          </>
        ) : icon === "building" ? (
          <>
            <path d="M4 21 V5.5 L13 3 v18 M13 9 l7 2 v10 M2.5 21 h19" {...st} />
          </>
        ) : (
          <>
            <rect x="4" y="7" width="16" height="10" rx="2" {...st} />
            <path d="M8 21 h8 M12 17 v4 M9 11.5 h6" {...st} />
          </>
        )}
      </svg>
      <div style={{ fontFamily: theme.font, fontSize: 21, fontWeight: 700, color: theme.ink }}>
        {label}
      </div>
    </div>
  );
};

const StarsSeal: React.FC<{ size?: number }> = ({ size = 74 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
    <circle cx="24" cy="24" r="22" fill="#1d4ed8" />
    {Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
      const x = 24 + 14 * Math.cos(a);
      const y = 24 + 14 * Math.sin(a);
      return (
        <text key={i} x={x} y={y + 2.6} textAnchor="middle" fontSize={7} fill="#facc15">
          {"★"}
        </text>
      );
    })}
  </svg>
);

export const FoundationsV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const layer1 = pop(frame, fps, 0.5);
  const layer2 = pop(frame, fps, 4.6);
  return (
    <AbsoluteFill style={{ background: theme.surface, alignItems: "center" }}>
      {/* layer 2: eIDAS, dropping on top */}
      <div
        style={{
          position: "absolute",
          top: 160,
          opacity: layer2,
          transform: `translateY(${(1 - layer2) * -60}px)`,
          width: 1240,
          background: "#eff6ff",
          border: "2px solid #bfdbfe",
          borderRadius: 22,
          padding: "26px 36px",
          display: "flex",
          alignItems: "center",
          gap: 28,
        }}
      >
        <StarsSeal />
        <div style={{ fontFamily: theme.font }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: theme.ink }}>eIDAS 2.0</div>
          <div style={{ fontSize: 20, color: "#1d4ed8", fontWeight: 600 }}>
            the legal frame · state-grade guarantees, across borders
          </div>
        </div>
        {/* cross-border arrow */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 14 }}>
          {["🇫🇷", "🇩🇪"].map((f, i) => (
            <React.Fragment key={f}>
              {i === 1 ? (
                <svg width={64} height={22} viewBox="0 0 64 22" aria-hidden>
                  <path d="M2 11 H54 M54 11 l-9 -7 M54 11 l-9 7" stroke="#1d4ed8" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : null}
              <span
                style={{
                  fontSize: 34,
                  background: theme.card,
                  border: "1.5px solid #bfdbfe",
                  borderRadius: 12,
                  padding: "6px 12px",
                }}
              >
                {f}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* layer 1: W3C standards */}
      <div
        style={{
          position: "absolute",
          top: 330,
          opacity: layer1,
          transform: `translateY(${(1 - layer1) * 60}px)`,
          width: 1240,
          background: "#f5f3ff",
          border: "2px solid #ddd6fe",
          borderRadius: 22,
          padding: "26px 36px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 20, fontFamily: theme.font }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: theme.ink }}>W3C</div>
          <div style={{ fontSize: 20, color: "#6d28d9", fontWeight: 600 }}>
            the standards for decentralized digital identity
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
            <Chip>DIDs</Chip>
            <Chip>Verifiable Credentials</Chip>
          </div>
        </div>
        <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
          {[
            { icon: "user" as const, label: "People", at: 1.4 },
            { icon: "building" as const, label: "Organizations", at: 1.7 },
            { icon: "thing" as const, label: "Things", at: 2.0 },
          ].map((c) => (
            <div key={c.label} style={{ transform: `scale(${pop(frame, fps, c.at)})` }}>
              <IdCard icon={c.icon} label={c.label} />
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- N-2
export const SilosV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Isolated ecosystem islands on the night stage: solid within, no links
  // between.
  const clusters = [
    { x: 360, y: 320, n: 5, delay: 0.5 },
    { x: 960, y: 240, n: 6, delay: 0.8 },
    { x: 1560, y: 330, n: 5, delay: 1.1 },
    { x: 620, y: 640, n: 6, delay: 1.4 },
    { x: 1330, y: 650, n: 5, delay: 1.7 },
  ];
  return (
    <AbsoluteFill style={{ background: theme.night }}>
      {clusters.map((c, ci) => {
        const s = pop(frame, fps, c.delay);
        const nodes = Array.from({ length: c.n }, (_, i) => {
          const a = (i / c.n) * Math.PI * 2;
          return { x: c.x + 95 * Math.cos(a), y: c.y + 62 * Math.sin(a) };
        });
        return (
          <div key={ci} style={{ position: "absolute", inset: 0, opacity: s }}>
            <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
              <ellipse
                cx={c.x}
                cy={c.y}
                rx={150}
                ry={105}
                fill="none"
                stroke="#334155"
                strokeWidth="2"
                strokeDasharray="6 6"
              />
              {nodes.map((n, i) => (
                <line
                  key={i}
                  x1={c.x}
                  y1={c.y}
                  x2={n.x}
                  y2={n.y}
                  stroke="#1e293b"
                  strokeWidth="2"
                />
              ))}
            </svg>
            {[{ x: c.x, y: c.y, hub: true }, ...nodes].map((n, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: n.x - (i === 0 ? 17 : 11),
                  top: n.y - (i === 0 ? 17 : 11),
                  width: i === 0 ? 34 : 22,
                  height: i === 0 ? 34 : 22,
                  borderRadius: "50%",
                  background: i === 0 ? "#334155" : "#1f2937",
                  border: `2px solid ${i === 0 ? "#64748b" : "#475569"}`,
                }}
              />
            ))}
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- N-7
export const EcosystemSearchV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const lensIn = pop(frame, fps, 0.3);
  const pairIn = pop(frame, fps, 0.6);
  const nodes = [
    { x: 620, y: 250, delay: 0.7 },
    { x: 1320, y: 230, found: true, delay: 0.9 },
    { x: 520, y: 560, found: true, delay: 1.1 },
    { x: 1440, y: 560, delay: 1.3 },
    { x: 1100, y: 720, delay: 1.5 },
  ];
  const st = { fill: "none", stroke: "#e2e8f0", strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  return (
    <AbsoluteFill style={{ background: theme.night }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
        {nodes.map((n, i) => (
          <line
            key={i}
            x1={960}
            y1={430}
            x2={n.x}
            y2={n.y}
            stroke="#1e293b"
            strokeWidth="2.5"
            opacity={interpolate(t, [n.delay, n.delay + 0.4], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
        ))}
      </svg>
      {nodes.map((n, i) => {
        const s2 = pop(frame, fps, n.delay);
        return (
          <div key={i} style={{ position: "absolute", left: n.x - 26, top: n.y - 26, transform: `scale(${s2})` }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 26,
                background: "#1f2937",
                border: `2.5px solid ${n.found ? "#10b981" : "#475569"}`,
              }}
            />
            {n.found ? (
              <div style={{ position: "absolute", right: -7, top: -7, transform: `scale(${pop(frame, fps, n.delay + 0.5)})` }}>
                <svg width={26} height={26} viewBox="0 0 20 20" aria-hidden>
                  <circle cx="10" cy="10" r="10" fill={theme.green} />
                  <path d="M5.5 10.5 L8.5 13.5 L14.5 7" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            ) : null}
          </div>
        );
      })}
      {/* the searchers: a person and their AI agent, side by side */}
      <div
        style={{
          position: "absolute",
          left: 250,
          top: 720,
          display: "flex",
          gap: 20,
          alignItems: "center",
          opacity: pairIn,
          transform: `scale(${pairIn})`,
        }}
      >
        {(["user", "bot"] as const).map((k) => (
          <div
            key={k}
            style={{
              width: 84,
              height: 84,
              borderRadius: 42,
              background: "#111827",
              border: "2.5px solid #64748b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width={44} height={44} viewBox="0 0 24 24" aria-hidden>
              {k === "user" ? (
                <>
                  <circle cx="12" cy="8" r="4" {...st} />
                  <path d="M5 21 a7 6 0 0 1 14 0" {...st} />
                </>
              ) : (
                <>
                  <path d="M12 8V4H8" {...st} />
                  <rect x="4" y="8" width="16" height="12" rx="2" {...st} />
                  <path d="M2 14h2 M20 14h2 M15 13v2 M9 13v2" {...st} />
                </>
              )}
            </svg>
          </div>
        ))}
        <svg width={90} height={24} viewBox="0 0 90 24" aria-hidden>
          <path d="M2 12 H78 M78 12 l-10 -8 M78 12 l-10 8" stroke="#64748b" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {/* pulse rings + lens */}
      {[0, 0.8].map((d) => {
        const cycle = ((t - 0.9 - d) % 1.6 + 1.6) % 1.6;
        const on = t > 0.9 + d ? 1 : 0;
        return (
          <svg key={d} width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
            <circle
              cx={960}
              cy={430}
              r={90 + cycle * 150}
              fill="none"
              stroke={theme.violet}
              strokeWidth="3"
              opacity={on * Math.max(0, 0.5 - (cycle / 1.6) * 0.5)}
            />
          </svg>
        );
      })}
      <div style={{ position: "absolute", left: 960 - 80, top: 430 - 80, transform: `scale(${lensIn})` }}>
        <div
          style={{
            width: 160,
            height: 160,
            borderRadius: 80,
            background: theme.gradient,
            boxShadow: "0 24px 70px rgba(118,62,240,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg width={80} height={80} viewBox="0 0 24 24" aria-hidden>
            <circle cx="10.5" cy="10.5" r="6.2" fill="none" stroke="#fff" strokeWidth="2.2" />
            <path d="M15.2 15.2 L20.5 20.5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- N-8a
const LIST_ICON = {
  stars: null, // rendered via StarsSeal
  doc: (
    <svg width={40} height={40} viewBox="0 0 24 24" aria-hidden>
      <path d="M6 2 h9 l5 5 v15 a1 1 0 0 1 -1 1 H6 a1 1 0 0 1 -1 -1 V3 a1 1 0 0 1 1 -1 z" fill="none" stroke="#b45309" strokeWidth="1.8" />
      <path d="M15 2 v5 h5 M8.5 13 l2.5 2.5 L15.5 10" fill="none" stroke="#b45309" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  globe: (
    <svg width={40} height={40} viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="9" fill="none" stroke="#047857" strokeWidth="1.8" />
      <path d="M3 12 h18 M12 3 a14 14 0 0 1 0 18 M12 3 a14 14 0 0 0 0 18" fill="none" stroke="#047857" strokeWidth="1.6" />
    </svg>
  ),
  lei: (
    <svg width={40} height={40} viewBox="0 0 24 24" aria-hidden>
      <path d="M4 21 V5.5 L13 3 v18 M13 9 l7 2 v10 M2.5 21 h19" fill="none" stroke="#0369a1" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M7 8.5 h2.5 M7 12 h2.5 M7 15.5 h2.5 M15.5 13.5 h2 M15.5 16.5 h2" stroke="#0369a1" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
    </svg>
  ),
  passport: (
    <svg width={40} height={40} viewBox="0 0 24 24" aria-hidden>
      <rect x="5" y="2.5" width="14" height="19" rx="2" fill="none" stroke="#6d28d9" strokeWidth="1.8" />
      <circle cx="12" cy="10" r="3.2" fill="none" stroke="#6d28d9" strokeWidth="1.7" />
      <path d="M8.5 16.5 h7" stroke="#6d28d9" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
};

export const TrustListsV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lists = [
    { icon: "stars" as const, name: "EU Trusted Lists", sub: "eIDAS · European Commission", at: 0.5 },
    { icon: "doc" as const, name: "Adobe AATL", sub: "document signing", at: 0.8 },
    { icon: "globe" as const, name: "Root programs", sub: "Microsoft · Apple · Mozilla", at: 1.1 },
    { icon: "passport" as const, name: "ICAO PKD", sub: "ePassports", at: 1.4 },
    { icon: "lei" as const, name: "GLEIF", sub: "LEI · vLEI issuers", at: 1.7 },
  ];
  const gapIn = pop(frame, fps, 7.5);
  const clusters = [
    { x: 430, y: 0 }, { x: 750, y: 40 }, { x: 1080, y: 10 }, { x: 1400, y: 45 },
  ];
  return (
    <AbsoluteFill style={{ background: theme.surface, alignItems: "center" }}>
      {/* the official layer */}
      <div style={{ position: "absolute", top: 170, display: "flex", gap: 22 }}>
        {lists.map((l) => {
          const s = pop(frame, fps, l.at);
          return (
            <div
              key={l.name}
              style={{
                width: 342,
                background: theme.card,
                border: "1.5px solid #e2e8f0",
                borderRadius: 18,
                padding: "20px 20px",
                boxShadow: "0 14px 40px rgba(15,23,42,0.09)",
                opacity: s,
                transform: `translateY(${(1 - s) * 40}px)`,
                fontFamily: theme.font,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                {l.icon === "stars" ? <StarsSeal size={44} /> : LIST_ICON[l.icon]}
                <div>
                  <div style={{ fontSize: 21, fontWeight: 700, color: theme.ink }}>{l.name}</div>
                  <div style={{ fontSize: 15.5, color: theme.muted }}>{l.sub}</div>
                </div>
              </div>
              <span
                style={{
                  display: "inline-block",
                  marginTop: 14,
                  fontFamily: theme.mono,
                  fontSize: 14,
                  letterSpacing: 2,
                  color: "#1d4ed8",
                  background: "#eff6ff",
                  border: "1.5px solid #bfdbfe",
                  borderRadius: 999,
                  padding: "4px 12px",
                }}
              >
                OFFICIAL
              </span>
            </div>
          );
        })}
      </div>
      {/* the boundary of the official scope */}
      <svg width="1700" height="4" style={{ position: "absolute", top: 430 }} aria-hidden>
        <line x1="0" y1="2" x2="1700" y2="2" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="12 10" opacity={gapIn} />
      </svg>
      {/* below the line: the private world, uncovered */}
      <div style={{ position: "absolute", top: 470, width: 1700, opacity: gapIn }}>
        {clusters.map((c2, ci) => (
          <svg key={ci} width={210} height={140} style={{ position: "absolute", left: c2.x - 105, top: c2.y }} aria-hidden>
            <ellipse cx={105} cy={70} rx={95} ry={60} fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 6" />
            {Array.from({ length: 5 }, (_, i) => {
              const a = (i / 5) * Math.PI * 2;
              return <circle key={i} cx={105 + 55 * Math.cos(a)} cy={70 + 34 * Math.sin(a)} r={9} fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.6" />;
            })}
          </svg>
        ))}
        <div
          style={{
            position: "absolute",
            top: 160,
            width: "100%",
            textAlign: "center",
            fontFamily: theme.mono,
            fontSize: 19,
            letterSpacing: 2,
            color: theme.muted,
          }}
        >
          private ecosystems · not covered
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- N-9
const FreedomPanel: React.FC<{
  index: number;
  title: string;
  subtitle: string;
  appearAt: number;
  children: React.ReactNode;
}> = ({ index, title, subtitle, appearAt, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = pop(frame, fps, appearAt);
  return (
    <div
      style={{
        width: 530,
        opacity: s,
        transform: `translateY(${(1 - s) * 70}px)`,
        fontFamily: theme.font,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 14 }}>
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
          }}
        >
          {index}
        </div>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontFamily: theme.display, fontSize: 34, fontWeight: 700, color: theme.ink }}>
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
          height: 430,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};

const EcoCard: React.FC<{ width?: number; fontScale?: number }> = ({ width = 780, fontScale = 1.35 }) => (
  <div
    style={{
      width,
      background: theme.card,
      border: "1.5px solid #e2e8f0",
      borderRadius: 20,
      boxShadow: "0 24px 60px rgba(15,23,42,0.12)",
      padding: "30px 34px",
      fontFamily: theme.font,
    }}
  >
    <div style={{ fontSize: 24 * fontScale, fontWeight: 700, color: theme.ink, marginBottom: 16 }}>
      Your Ecosystem
    </div>
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
      <Chip>your governance framework</Chip>
      <Chip>your credential schemas</Chip>
    </div>
    {["Accredited issuers", "Accredited verifiers"].map((r) => (
      <div
        key={r}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          border: "1.5px solid #e2e8f0",
          borderRadius: 12,
          padding: "12px 16px",
          marginBottom: 10,
          fontSize: 19 * fontScale,
          color: "#475569",
        }}
      >
        <svg width={22} height={22} viewBox="0 0 20 20" aria-hidden>
          <circle cx="10" cy="10" r="10" fill={theme.green} />
          <path d="M5.5 10.5 L8.5 13.5 L14.5 7" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {r}
      </div>
    ))}
    <div style={{ fontFamily: theme.mono, fontSize: 15 * fontScale, color: theme.violet }}>
      your rules · your business model
    </div>
  </div>
);

/** N-9a: for ecosystem builders, the governance card alone, center stage. */
export const BuildEcoV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = pop(frame, fps, 0.4);
  return (
    <AbsoluteFill style={{ background: theme.surface, alignItems: "center" }}>
      <div style={{ position: "absolute", top: 170, opacity: s, transform: `translateY(${(1 - s) * 50}px)` }}>
        <EcoCard />
      </div>
    </AbsoluteFill>
  );
};

/** N-9b: for service builders: Join · Choose · Bridge. */
export const ServiceV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const wallets = ["inji", "eudi", "paradym", "bcwallet", "hologram", "talao"];
  const link = interpolate(frame, [fps * 2.6, fps * 3.4], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        background: theme.surface,
        flexDirection: "row",
        gap: 48,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FreedomPanel index={1} title="Join" subtitle="ecosystems, on Verana or other trust lists" appearAt={0.4}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18, width: "100%" }}>
          {[
            { icon: <VeranaMark size={44} />, name: "Ecosystems on Verana", sub: "sovereign trust registries" },
            {
              icon: (
                <svg width={44} height={44} viewBox="0 0 24 24" aria-hidden>
                  <path d="M4 5.5 h16 M4 10 h16 M4 14.5 h16 M4 19 h10" stroke="#1d4ed8" strokeWidth="1.9" strokeLinecap="round" />
                </svg>
              ),
              name: "Other trust lists",
              sub: "official and industry lists",
            },
          ].map((e) => (
            <div
              key={e.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                border: "1.5px solid #e2e8f0",
                borderRadius: 16,
                padding: "18px 20px",
                fontFamily: theme.font,
              }}
            >
              <span style={{ display: "inline-flex", width: 56, height: 56, borderRadius: 14, background: "#f8fafc", alignItems: "center", justifyContent: "center" }}>
                {e.icon}
              </span>
              <div>
                <div style={{ fontSize: 22, fontWeight: 700, color: theme.ink }}>{e.name}</div>
                <div style={{ fontSize: 17, color: theme.muted }}>{e.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </FreedomPanel>

      <FreedomPanel index={2} title="Choose" subtitle="your personal wallet · privacy preserved" appearAt={1.1}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", maxWidth: 420 }}>
          {wallets.map((id, i) => (
            <div key={id} style={{ transform: `scale(${pop(frame, fps, 1.6 + i * 0.12)})` }}>
              <WalletTile id={id} />
            </div>
          ))}
        </div>
      </FreedomPanel>

      <FreedomPanel index={3} title="Bridge" subtitle="to other ecosystems" appearAt={1.8}>
        <div style={{ position: "relative", width: 460, height: 300 }}>
          <svg width={460} height={300} style={{ position: "absolute", inset: 0 }}>
            {[{ cx: 95, cy: 110 }, { cx: 365, cy: 190 }].map((c2, ci) => (
              <g key={ci}>
                <ellipse cx={c2.cx} cy={c2.cy} rx={88} ry={64} fill="none" stroke="#ddd6fe" strokeWidth="2.5" />
                {Array.from({ length: 4 }, (_, i) => {
                  const a = (i / 4) * Math.PI * 2 + 0.5;
                  return (
                    <circle
                      key={i}
                      cx={c2.cx + 52 * Math.cos(a)}
                      cy={c2.cy + 36 * Math.sin(a)}
                      r={11}
                      fill="#f5f3ff"
                      stroke={theme.violet}
                      strokeWidth="2"
                    />
                  );
                })}
              </g>
            ))}
            <path
              d="M 168 135 C 220 150, 250 155, 292 172"
              stroke={theme.violet}
              strokeWidth="4"
              fill="none"
              strokeDasharray={1}
              strokeDashoffset={1 - link}
              pathLength={1}
            />
          </svg>
          <div style={{ position: "absolute", left: 230 - 26, top: 152 - 26, transform: `scale(${pop(frame, fps, 3.2)})` }}>
            <VeranaMark size={52} />
          </div>
        </div>
      </FreedomPanel>
    </AbsoluteFill>
  );
};

// ---------------------------------------------------------------- N-10
export const VeranaCloseV3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const lockIn = pop(frame, fps, 0.3);
  const urlIn = interpolate(frame, [fps * 1.2, fps * 1.7], [0, 1], clamp);
  const lineIn = interpolate(frame, [fps * 1.8, fps * 2.3], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ background: theme.surface, alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", transform: "translateY(-40px)" }}>
        <div style={{ opacity: lockIn, transform: `scale(${0.9 + 0.1 * lockIn})` }}>
          <VeranaIoLogo size={130} />
        </div>
        <div
          style={{
            marginTop: 54,
            fontFamily: theme.mono,
            fontSize: 42,
            color: theme.muted,
            letterSpacing: 1,
            opacity: urlIn,
            transform: `translateY(${(1 - urlIn) * 24}px)`,
          }}
        >
          https://verana.io
        </div>
        <div
          style={{
            marginTop: 32,
            fontFamily: theme.font,
            fontSize: 38,
            fontWeight: 700,
            color: theme.ink,
            textAlign: "center",
            maxWidth: 1200,
            lineHeight: 1.35,
            opacity: lineIn,
            transform: `translateY(${(1 - lineIn) * 24}px)`,
          }}
        >
          Build and join sovereign ecosystems on an open, public infrastructure, owned by no
          one.
        </div>
      </div>
    </AbsoluteFill>
  );
};
