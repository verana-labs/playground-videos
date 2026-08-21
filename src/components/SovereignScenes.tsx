// I-5 / I-6: the sovereign-ecosystem questions, drawn as objects on the
// night stage.
//   I-5 "sovereign-build": a verifiable credential (attributes unreadable),
//     then, with the second line, a schema JSON snippet and a symbolic
//     pyramid of accredited issuers / verifiers.
//   I-6 "ecosystem-search": a big search lens pulsing over faint ecosystem
//     nodes: how do others find you, and join?
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

const CheckDot: React.FC<{ size?: number }> = ({ size = 22 }) => (
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

const Caption: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      marginTop: 14,
      fontFamily: theme.mono,
      fontSize: 16,
      letterSpacing: 1,
      color: "#94a3b8",
      textAlign: "center",
    }}
  >
    {children}
  </div>
);

/* The credential: real-looking frame, unreadable attributes. */
const CredentialCard: React.FC = () => (
  <div
    style={{
      width: 430,
      borderRadius: 18,
      background: "#fff",
      boxShadow: "0 30px 90px rgba(0,0,0,0.6)",
      padding: 26,
      fontFamily: theme.font,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
      <svg width={34} height={34} viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="9" r="6" fill="none" stroke={theme.violet} strokeWidth="1.9" />
        <circle cx="12" cy="9" r="2.4" fill={theme.violet} />
        <path d="M9 14 L7.5 21 L12 18.5 L16.5 21 L15 14" fill="none" stroke={theme.violet} strokeWidth="1.9" strokeLinejoin="round" />
      </svg>
      <div style={{ fontSize: 21, fontWeight: 700, color: theme.ink }}>Verifiable Credential</div>
    </div>
    {[
      [96, 208],
      [128, 164],
      [82, 232],
      [110, 180],
    ].map(([l, v], i) => (
      <div key={i} style={{ display: "flex", gap: 14, marginBottom: 14, alignItems: "center" }}>
        <div style={{ width: l, height: 15, borderRadius: 8, background: "#cbd5e1" }} />
        <div style={{ width: v, height: 15, borderRadius: 8, background: "#e2e8f0" }} />
      </div>
    ))}
    <div
      style={{
        marginTop: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ width: 150, height: 13, borderRadius: 7, background: "#e2e8f0" }} />
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          background: "#ecfdf5",
          border: "2px solid #10b981",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CheckDot size={24} />
      </div>
    </div>
  </div>
);

/* The schema: a small, real-looking JSON snippet. */
const SchemaJson: React.FC = () => {
  const K = (s: string) => <span style={{ color: "#a78bfa" }}>"{s}"</span>;
  const V = (s: string) => <span style={{ color: "#6ee7b7" }}>"{s}"</span>;
  const P = (s: string) => <span style={{ color: "#64748b" }}>{s}</span>;
  return (
    <div
      style={{
        width: 470,
        borderRadius: 16,
        background: "#0b1220",
        border: "2px solid #334155",
        padding: "22px 26px",
        fontFamily: theme.mono,
        fontSize: 18,
        lineHeight: 1.65,
        color: "#cbd5e1",
        boxShadow: "0 30px 90px rgba(0,0,0,0.6)",
        whiteSpace: "pre",
      }}
    >
      <div>{P("{")}</div>
      <div>  {K("$id")}{P(": ")}{V("PlumberCredential")}{P(",")}</div>
      <div>  {K("type")}{P(": ")}{V("object")}{P(",")}</div>
      <div>  {K("properties")}{P(": {")}</div>
      <div>    {K("name")}{P(":  { ")}{K("type")}{P(": ")}{V("string")}{P(" },")}</div>
      <div>    {K("level")}{P(": { ")}{K("type")}{P(": ")}{V("string")}{P(" }")}</div>
      <div>  {P("}")}</div>
      <div>{P("}")}</div>
    </div>
  );
};

/* The pyramid: root on top, accredited issuers / verifiers below. */
const AccreditedPyramid: React.FC<{ appeared: number }> = ({ appeared }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = (d: number) =>
    spring({ frame: frame - appeared - fps * d, fps, config: { damping: 200 } });
  const rows: { n: number; y: number; delay: number; root?: boolean }[] = [
    { n: 1, y: 0, delay: 0, root: true },
    { n: 2, y: 92, delay: 0.18 },
    { n: 3, y: 184, delay: 0.36 },
  ];
  return (
    <div style={{ width: 360, height: 300, position: "relative" }}>
      {/* connectors */}
      <svg width={360} height={300} style={{ position: "absolute", inset: 0 }}>
        {[
          [180, 40, 130, 132],
          [180, 40, 230, 132],
          [130, 132, 80, 224],
          [130, 132, 180, 224],
          [230, 132, 180, 224],
          [230, 132, 280, 224],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#334155"
            strokeWidth="2.5"
            opacity={pop(0.3)}
          />
        ))}
      </svg>
      {rows.map((row) =>
        Array.from({ length: row.n }, (_, i) => {
          const x = 180 + (i - (row.n - 1) / 2) * 100;
          return (
            <div
              key={`${row.y}-${i}`}
              style={{
                position: "absolute",
                left: x - 30,
                top: row.y + 10,
                transform: `scale(${pop(row.delay + i * 0.08)})`,
              }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  background: row.root ? theme.gradient : "#1f2937",
                  border: row.root ? "none" : "2.5px solid #475569",
                  boxShadow: row.root ? "0 12px 30px rgba(118,62,240,0.45)" : undefined,
                }}
              />
              {!row.root ? (
                <div
                  style={{
                    position: "absolute",
                    right: -6,
                    top: -6,
                    transform: `scale(${pop(row.delay + 0.35 + i * 0.08)})`,
                  }}
                >
                  <CheckDot />
                </div>
              ) : null}
            </div>
          );
        })
      )}
    </div>
  );
};

export const SovereignBuild: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const credIn = spring({ frame: frame - fps * 0.3, fps, config: { damping: 200 } });
  // With the second line (2.2 s), the credential yields the center and the
  // schema + pyramid arrive.
  const travel = interpolate(frame, [fps * 2.2, fps * 2.8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const eased = 1 - Math.pow(1 - travel, 3);
  const jsonIn = spring({ frame: frame - fps * 2.4, fps, config: { damping: 200 } });
  const pyramidIn = spring({ frame: frame - fps * 2.7, fps, config: { damping: 200 } });
  return (
    <AbsoluteFill style={{ background: theme.night }}>
      {/* credential: center, then left */}
      <div
        style={{
          position: "absolute",
          left: 960,
          top: 400,
          transform: `translate(-50%, -50%) translateX(${-600 * eased}px) scale(${credIn * (1 - 0.06 * eased)})`,
          opacity: credIn,
        }}
      >
        <CredentialCard />
        <Caption>attributes stay private</Caption>
      </div>
      {/* schema json */}
      <div
        style={{
          position: "absolute",
          left: 960,
          top: 400,
          transform: `translate(-50%, -50%) scale(${jsonIn})`,
          opacity: jsonIn,
        }}
      >
        <SchemaJson />
        <Caption>credential schema</Caption>
      </div>
      {/* accredited pyramid */}
      <div
        style={{
          position: "absolute",
          left: 1560,
          top: 400,
          transform: `translate(-50%, -50%) scale(${pyramidIn})`,
          opacity: pyramidIn,
        }}
      >
        <AccreditedPyramid appeared={fps * 2.7} />
        <Caption>accredited issuers · verifiers</Caption>
      </div>
    </AbsoluteFill>
  );
};

export const EcosystemSearch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const lensIn = spring({ frame: frame - fps * 0.3, fps, config: { damping: 200 } });
  // Faint ecosystem nodes around the lens; two get found (ticked).
  const nodes: { x: number; y: number; found?: boolean; delay: number }[] = [
    { x: 560, y: 260, delay: 0.5 },
    { x: 1360, y: 230, found: true, delay: 0.7 },
    { x: 440, y: 560, found: true, delay: 0.9 },
    { x: 1480, y: 560, delay: 1.1 },
    { x: 760, y: 700, delay: 1.3 },
    { x: 1180, y: 720, delay: 1.5 },
  ];
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
        const s = spring({ frame: frame - fps * n.delay, fps, config: { damping: 200 } });
        return (
          <div key={i} style={{ position: "absolute", left: n.x - 26, top: n.y - 26, transform: `scale(${s})` }}>
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
              <div
                style={{
                  position: "absolute",
                  right: -7,
                  top: -7,
                  transform: `scale(${spring({ frame: frame - fps * (n.delay + 0.5), fps, config: { damping: 200 } })})`,
                }}
              >
                <CheckDot size={26} />
              </div>
            ) : null}
          </div>
        );
      })}
      {/* pulse rings + the lens */}
      {[0, 0.8].map((d) => {
        const cycle = ((t - 0.9 - d) % 1.6 + 1.6) % 1.6;
        const on = t > 0.9 + d ? 1 : 0;
        const r = 90 + cycle * 150;
        return (
          <svg key={d} width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
            <circle
              cx={960}
              cy={430}
              r={r}
              fill="none"
              stroke={theme.violet}
              strokeWidth="3"
              opacity={on * Math.max(0, 0.5 - (cycle / 1.6) * 0.5)}
            />
          </svg>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 960 - 80,
          top: 430 - 80,
          transform: `scale(${lensIn})`,
        }}
      >
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
