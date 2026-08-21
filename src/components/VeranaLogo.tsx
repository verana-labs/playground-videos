// Brand lockups.
//
// - VeranaMark / VeranaLogo: the playground lockup (bull-horn V, violet +
//   emerald, wordmark "Verana" + violet "Playground" suffix), as in the
//   playground site nav. Wordmarks are Space Grotesk.
// - VeranaIoLogo: the verana.io lockup (purple gradient tile + white V mark,
//   from https://verana.io/logo.svg) + "Verana" wordmark in black, as on the
//   verana.io website.
// - PlaygroundBanner: the persistent corner banner shown on every frame of
//   every video (the site-header treatment: white translucent pill).
import React from "react";
import { theme } from "../theme";

const V_OUTER =
  "M26.9932 51.6972L5.805 11.0977L2.91263 16.2161L0 10.6048L5.98725 0L26.9932 40.2483L47.9993 0L54 10.6217L51.0773 16.2161L48.1849 11.0977L26.9932 51.6972Z";
const V_INNER = "M13.696 0L26.9935 25.4637L39.9367 0H13.696Z";

export const VeranaMark: React.FC<{ size?: number }> = ({ size = 64 }) => (
  <svg width={size} height={(size * 52) / 54} viewBox="0 0 54 52" aria-hidden>
    <path fill={theme.violet} d={V_OUTER} />
    <path fill={theme.green} d={V_INNER} />
  </svg>
);

const wordmarkStyle = (size: number, color: string): React.CSSProperties => ({
  fontFamily: theme.display,
  fontWeight: 700,
  fontSize: size,
  letterSpacing: "-0.03em",
  color,
  whiteSpace: "nowrap",
});

export const VeranaLogo: React.FC<{
  size?: number;
  suffix?: string;
  tone?: "dark" | "light";
}> = ({ size = 96, suffix, tone = "light" }) => (
  <div style={{ display: "flex", alignItems: "center", gap: size * 0.28 }}>
    <VeranaMark size={size} />
    <span style={wordmarkStyle(size * 1.05, tone === "dark" ? "#f8fafc" : theme.ink)}>
      Verana{suffix ? <span style={{ color: theme.violet }}> {suffix}</span> : null}
    </span>
  </div>
);

/** The verana.io lockup: gradient tile + white V, "Verana" in black. */
export const VeranaIoLogo: React.FC<{ size?: number }> = ({ size = 120 }) => (
  <div style={{ display: "flex", alignItems: "center", gap: size * 0.3 }}>
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <defs>
        <linearGradient id="veranaIoGradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#763EF0" />
          <stop offset="100%" stopColor="#9F7AEA" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="64" height="64" rx="12" fill="url(#veranaIoGradient)" />
      <g transform="translate(32 33) scale(0.76923) translate(-27 -27)" fill="white">
        <path d={V_OUTER} />
        <path d={V_INNER} />
      </g>
    </svg>
    <span style={wordmarkStyle(size * 0.62, "#0b0b12")}>Verana</span>
  </div>
);

/** Persistent playground banner, top-left on every frame (site-header pill). */
export const PlaygroundBanner: React.FC<{ vertical?: boolean }> = ({ vertical = false }) => {
  const mark = vertical ? 26 : 30;
  const text = vertical ? 24 : 27;
  return (
    <div
      style={{
        position: "absolute",
        top: vertical ? 36 : 40,
        left: vertical ? 36 : 48,
        display: "flex",
        alignItems: "center",
        gap: 10,
        background: "rgba(255,255,255,0.88)",
        border: "1px solid #efeef6",
        borderRadius: 999,
        padding: "10px 22px 10px 16px",
        boxShadow: "0 4px 18px rgba(15,23,42,0.10)",
        zIndex: 10,
      }}
    >
      <VeranaMark size={mark} />
      <span style={wordmarkStyle(text, "#111827")}>
        Verana <span style={{ color: theme.violet }}>Playground</span>
      </span>
    </div>
  );
};
