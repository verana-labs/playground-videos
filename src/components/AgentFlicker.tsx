// I-2: a chat with an AI agent whose identity flickers between three faces.
// The avatar carries a robot icon (this is clearly an agent) and the header
// an amber "identity unknown" badge: you cannot tell who operates it.
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { RedPulse } from "./RedPulse";
import { theme } from "../theme";

const IDENTITIES = [
  { name: "Nova, travel assistant", bg: "linear-gradient(135deg,#667eea,#764ba2)" },
  { name: "SupportBot, your bank", bg: "linear-gradient(135deg,#f59e0b,#ef4444)" },
  { name: "Dr. Ellis, health advisor", bg: "linear-gradient(135deg,#10b981,#0ea5e9)" },
];

// A simple robot head: antenna, rounded head, two eyes, mouth.
const BotIcon: React.FC<{ size?: number }> = ({ size = 42 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
    <line x1="12" y1="2.2" x2="12" y2="5.4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="12" cy="2.2" r="1.4" fill="#fff" />
    <rect x="4.4" y="5.4" width="15.2" height="12.6" rx="3.6" fill="none" stroke="#fff" strokeWidth="1.9" />
    <circle cx="9" cy="11" r="1.6" fill="#fff" />
    <circle cx="15" cy="11" r="1.6" fill="#fff" />
    <path d="M9 14.8 h6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="2" y1="10.5" x2="4.4" y2="10.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="19.6" y1="10.5" x2="22" y2="10.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const AgentFlicker: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const id = IDENTITIES[Math.floor(frame / (fps * 0.55)) % IDENTITIES.length];
  const reply = "Of course. First I just need your ID to feed my database.";
  const typed = Math.floor(
    interpolate(frame, [0, fps * 2.8], [0, reply.length], { extrapolateRight: "clamp" })
  );
  return (
    <AbsoluteFill
      style={{ background: theme.night, alignItems: "center", justifyContent: "flex-start", paddingTop: 110 }}
    >
      <div
        style={{
          width: 900,
          borderRadius: 20,
          background: "#111827",
          boxShadow: "0 40px 120px rgba(0,0,0,0.7)",
          padding: 36,
          fontFamily: theme.font,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              background: id.bg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BotIcon />
          </div>
          <div>
            <div style={{ color: "#f8fafc", fontSize: 28, fontWeight: 700 }}>{id.name}</div>
            <div style={{ color: theme.green, fontSize: 20 }}>online · AI agent</div>
          </div>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(245,158,11,0.14)",
              border: "2px solid rgba(245,158,11,0.55)",
              borderRadius: 999,
              padding: "8px 18px",
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                background: "rgba(245,158,11,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fbbf24",
                fontSize: 18,
                fontWeight: 800,
              }}
            >
              ?
            </div>
            <span style={{ color: "#fbbf24", fontSize: 19, fontWeight: 600 }}>
              identity unknown
            </span>
          </div>
        </div>
        <div
          style={{
            background: "#1f2937",
            borderRadius: 14,
            padding: "18px 22px",
            color: "#e2e8f0",
            fontSize: 24,
            maxWidth: 620,
            marginBottom: 16,
          }}
        >
          Can you help me book this?
        </div>
        <div
          style={{
            background: "#0f172a",
            borderRadius: 14,
            padding: "18px 22px",
            color: "#cbd5e1",
            fontSize: 24,
            maxWidth: 680,
            marginLeft: 100,
          }}
        >
          {reply.slice(0, typed)}
          <span style={{ opacity: frame % 20 < 10 ? 1 : 0 }}>|</span>
        </div>
      </div>
      {/* The machine behind the personas: holds ~3 s before the cut */}
      <div style={{ marginTop: 44 }}>
        <RedPulse appearAt={3.1}>
          <BotIcon size={66} />
        </RedPulse>
      </div>
    </AbsoluteFill>
  );
};
