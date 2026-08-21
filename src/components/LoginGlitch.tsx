// I-1: a realistic identity-verification form (full name, date of birth,
// passport upload) in a browser window - and no way to tell who runs it:
// struck-out padlock, "?" operator avatar, a scrambling "Operated by" line,
// a pulsing identity-unknown tag. The window is completely static: no
// jitter, no resize. No real branding anywhere.
import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { RedPulse } from "./RedPulse";
import { theme } from "../theme";

const SCRAMBLE = "abcdefghjkmnpqrstuvwxyz23456789";
const scrambled = (seed: number, len: number) =>
  Array.from(
    { length: len },
    (_, i) => SCRAMBLE[Math.floor(random(`op-${seed}-${i}`) * SCRAMBLE.length)]
  ).join("");

// A padlock with a strike through it: the site cannot be identified.
const NoLock: React.FC = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" aria-hidden>
    <rect x="5" y="10" width="14" height="10" rx="2" fill="#64748b" />
    <path d="M8 10 V7 a4 4 0 0 1 8 0 v3" stroke="#64748b" strokeWidth="2.4" fill="none" />
    <line x1="3" y1="21" x2="21" y2="3" stroke="#f59e0b" strokeWidth="2.6" strokeLinecap="round" />
  </svg>
);

// A building: the organization nobody can identify.
const OrgIcon: React.FC<{ size?: number }> = ({ size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <path d="M4 21 V5.5 L13 3 v18" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinejoin="round" />
    <path d="M13 9 l7 2 v10" fill="none" stroke="#fff" strokeWidth="1.9" strokeLinejoin="round" />
    <path d="M2.5 21 h19" stroke="#fff" strokeWidth="1.9" strokeLinecap="round" />
    <path d="M7 8.5 h2.5 M7 12 h2.5 M7 15.5 h2.5 M15.5 13.5 h2 M15.5 16.5 h2" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" opacity="0.8" />
  </svg>
);

const DocIcon: React.FC = () => (
  <svg width={40} height={40} viewBox="0 0 24 24" aria-hidden>
    <path
      d="M6 2 h9 l5 5 v15 a1 1 0 0 1 -1 1 H6 a1 1 0 0 1 -1 -1 V3 a1 1 0 0 1 1 -1 z"
      fill="#e2e8f0"
      stroke="#94a3b8"
      strokeWidth="1.4"
    />
    <path d="M15 2 v5 h5" fill="none" stroke="#94a3b8" strokeWidth="1.4" />
    <rect x="8" y="11" width="8" height="1.8" rx="0.9" fill="#94a3b8" />
    <rect x="8" y="14.5" width="8" height="1.8" rx="0.9" fill="#94a3b8" />
    <rect x="8" y="18" width="5" height="1.8" rx="0.9" fill="#94a3b8" />
  </svg>
);

const Window: React.FC<{ domain: string; opSeed: number; pulse?: number }> = ({
  domain,
  opSeed,
  pulse = 0,
}) => (
  <div
    style={{
      width: 960,
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 40px 120px rgba(0,0,0,0.7)",
      fontFamily: theme.font,
    }}
  >
    <div
      style={{
        background: "#1e293b",
        color: "#cbd5e1",
        padding: "14px 24px",
        fontSize: 22,
        display: "flex",
        gap: 16,
        alignItems: "center",
      }}
    >
      <span style={{ display: "flex", gap: 8 }}>
        {["#ef4444", "#f59e0b", "#10b981"].map((c) => (
          <span key={c} style={{ width: 14, height: 14, borderRadius: 7, background: c }} />
        ))}
      </span>
      <span
        style={{
          background: "#0f172a",
          borderRadius: 8,
          padding: "6px 18px",
          fontFamily: theme.mono,
          fontSize: 21,
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <NoLock />
        {domain}
      </span>
    </div>
    {/* Who runs this? No way to tell. */}
    <div
      style={{
        background: "#fffbeb",
        borderBottom: "2px solid #fde68a",
        padding: "12px 28px",
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: "#e2e8f0",
          border: `2px solid rgb(${Math.round(203 + 42 * pulse)}, ${Math.round(213 - 55 * pulse)}, ${Math.round(225 - 214 * pulse)})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 26,
          fontWeight: 800,
          color: "#64748b",
        }}
      >
        ?
      </div>
      <div style={{ fontSize: 21, color: "#92400e" }}>Operated by</div>
      <div
        style={{
          fontFamily: theme.mono,
          fontSize: 21,
          color: "#b45309",
          background: "#fef3c7",
          borderRadius: 8,
          padding: "4px 12px",
          letterSpacing: 2,
        }}
      >
        {scrambled(opSeed, 12)}
      </div>
      <div
        style={{
          marginLeft: "auto",
          fontSize: 19,
          color: "#b45309",
          fontWeight: 600,
          opacity: 0.55 + 0.45 * pulse,
        }}
      >
        identity unknown
      </div>
    </div>
    <div style={{ background: "#f1f5f9", padding: "34px 44px 38px" }}>
      <div style={{ fontSize: 33, fontWeight: 700, color: theme.ink, marginBottom: 8 }}>
        Verify your identity
      </div>
      <div style={{ fontSize: 21, color: theme.muted, marginBottom: 22 }}>
        To continue, this site needs:
      </div>
      <div style={{ display: "flex", gap: 18, marginBottom: 20 }}>
        {["Full name", "Date of birth"].map((f) => (
          <div key={f} style={{ flex: 1 }}>
            <div style={{ fontSize: 19, color: theme.muted, marginBottom: 6 }}>{f}</div>
            <div
              style={{
                height: 48,
                borderRadius: 10,
                border: "2px solid #cbd5e1",
                background: "#fff",
              }}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          border: "2px dashed #94a3b8",
          borderRadius: 12,
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          gap: 20,
          background: "#f8fafc",
          marginBottom: 24,
        }}
      >
        <DocIcon />
        <div>
          <div style={{ fontSize: 24, fontWeight: 600, color: theme.ink }}>
            Upload your passport
          </div>
          <div style={{ fontSize: 18, color: theme.muted }}>PDF or JPG, both sides</div>
        </div>
      </div>
      <div
        style={{
          height: 54,
          borderRadius: 10,
          background: theme.gradient,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 24,
          fontWeight: 600,
        }}
      >
        Continue
      </div>
    </div>
  </div>
);

export const LoginGlitch: React.FC = () => {
  const frame = useCurrentFrame();
  // The window itself never moves or resizes. The unverifiable story is told
  // by steady, layout-stable cues only: the struck padlock, the scrambling
  // operator name (fixed-width mono) and the pulsing identity-unknown tag.
  const opSeed = Math.floor(frame / 7);
  const pulse = (Math.sin((frame / 30) * Math.PI * 1.4) + 1) / 2;
  return (
    <AbsoluteFill
      style={{ background: theme.night, alignItems: "center", justifyContent: "flex-start", paddingTop: 64 }}
    >
      <Window domain="verify.id-portal.example" opSeed={opSeed} pulse={pulse} />
      {/* The organization behind it: unknown, and glowing red like I-2's agent */}
      <div style={{ marginTop: 30 }}>
        <RedPulse appearAt={2.0} size={108}>
          <OrgIcon size={58} />
        </RedPulse>
      </div>
    </AbsoluteFill>
  );
};
