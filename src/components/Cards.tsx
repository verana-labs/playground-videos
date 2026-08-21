// Static-ish set pieces: standards strip (I-10), handoff card, URL card,
// wallet roster (O-1), and the small problem-mocks used in V-1.
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AssetImg, Placeholder, useAsset } from "../lib/assets";
import { theme } from "../theme";
import { VeranaIoLogo, VeranaLogo } from "./VeranaLogo";
import { TrustCardVesta } from "./TrustCardVesta";

// I-10: the verana.io lockup and standards chips at the top, then a real
// Proof of Trust (the Vesta Appliances TrustCard from journey 3.5) animates
// in below and holds so the viewer can read it. At FINALE the content
// shrinks away, the lockup travels to the center and grows, and the Verana
// URL appears: the intro's closing frame.
const FINALE = 7.5; // seconds into the shot

export const StandardsStrip: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const chips = ["W3C DIDs", "Verifiable Credentials", "DIDComm", "OpenID4VC", "eIDAS 2 interoperable"];
  const potDelay = 1.1; // seconds before the Proof of Trust rises in
  const pot = spring({ frame: frame - fps * potDelay, fps, config: { damping: 200 } });

  // Finale progress, eased.
  const f = interpolate(frame, [fps * FINALE, fps * (FINALE + 0.8)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fe = 1 - Math.pow(1 - f, 3);
  const urlIn = interpolate(frame, [fps * (FINALE + 0.7), fps * (FINALE + 1.2)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const taglineIn = interpolate(frame, [fps * (FINALE + 1.0), fps * (FINALE + 1.5)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Lockup: pinned at the top during the content phase (same place the flow
  // slot below reserves), then travels to the center while growing.
  const topY = 55 - height / 2; // lockup center during the content phase
  const lockupY = topY + fe * (-80 - topY);
  const lockupScale = 1 + fe * 1.3; // 62 → ~143

  return (
    <AbsoluteFill style={{ background: theme.surface, alignItems: "center" }}>
      {/* Content (chips + card + wallets): shrinks and fades at the finale */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          opacity: 1 - fe,
          transform: `scale(${1 - 0.14 * fe})`,
          transformOrigin: "50% 30%",
        }}
      >
        {/* Spacer where the (absolute) lockup visually sits */}
        <div style={{ marginTop: 22, marginBottom: 12, height: 62 }} />
        <div style={{ display: "flex", gap: 14 }}>
          {chips.map((c, i) => {
            const s = spring({ frame: frame - fps * 0.25 - i * 5, fps, config: { damping: 200 } });
            return (
              <div
                key={c}
                style={{
                  fontFamily: theme.font,
                  fontSize: 18,
                  fontWeight: 600,
                  color: theme.muted,
                  background: theme.card,
                  border: "2px solid #e2e8f0",
                  borderRadius: 999,
                  padding: "8px 20px",
                  opacity: s,
                  transform: `translateY(${(1 - s) * 24}px)`,
                }}
              >
                {c}
              </div>
            );
          })}
        </div>
        {/* The real Proof of Trust, rising in and holding */}
        <div
          style={{
            marginTop: 18,
            opacity: pot,
            transform: `translateY(${(1 - pot) * 90}px)`,
          }}
        >
          <TrustCardVesta appeared={fps * potDelay} />
        </div>
        {/* Every integrated personal wallet, appearing one by one below,
            spanning nearly the full frame width */}
        <div style={{ display: "flex", gap: 20, marginTop: 16 }}>
          {ROSTER.map((id, i) => {
            const s = spring({
              frame: frame - fps * (2.6 + i * 0.22),
              fps,
              config: { damping: 200 },
            });
            return <RosterTile key={id} id={id} scale={s} size={140} />;
          })}
        </div>
        <div
          style={{
            marginTop: 10,
            fontFamily: theme.mono,
            fontSize: 16,
            letterSpacing: 1.5,
            color: theme.muted,
            opacity: spring({ frame: frame - fps * 3.0, fps, config: { damping: 200 } }),
          }}
        >
          integrated personal wallets
        </div>
      </AbsoluteFill>

      {/* The travelling lockup, above the content */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        <div style={{ transform: `translateY(${lockupY}px) scale(${lockupScale})` }}>
          <VeranaIoLogo size={62} />
        </div>
      </AbsoluteFill>

      {/* The closing URL */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            fontFamily: theme.mono,
            fontSize: 44,
            color: theme.muted,
            letterSpacing: 1,
            opacity: urlIn,
            transform: `translateY(${70 + (1 - urlIn) * 24}px)`,
          }}
        >
          https://verana.io
        </div>
      </AbsoluteFill>

      {/* The closing tagline, below the URL */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            fontFamily: theme.font,
            fontSize: 40,
            fontWeight: 700,
            color: theme.ink,
            textAlign: "center",
            lineHeight: 1.35,
            maxWidth: 1150,
            opacity: taglineIn,
            transform: `translateY(${210 + (1 - taglineIn) * 24}px)`,
          }}
        >
          Build and join sovereign ecosystems on an open, public infrastructure, owned by no one.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

export const HandoffCard: React.FC<{ emblem: string; title: string; subtitle: string }> = ({
  emblem,
  title,
  subtitle,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200 } });
  const emblemSrc = useAsset(emblem);
  return (
    <AbsoluteFill
      style={{
        background: theme.surface,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 90,
        fontFamily: theme.font,
      }}
    >
      <div
        style={{
          width: 300,
          height: 300,
          borderRadius: 40,
          background: theme.card,
          boxShadow: "0 24px 60px rgba(15,23,42,0.12)",
          overflow: "hidden",
          transform: `scale(${s})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {emblemSrc ? (
          <AssetImg id={emblem} cover={false} style={{ padding: 30 }} />
        ) : (
          <Placeholder id={emblem} />
        )}
      </div>
      <div style={{ maxWidth: 850, opacity: interpolate(frame, [8, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }) }}>
        <div style={{ fontSize: 66, fontWeight: 800, color: theme.ink, marginBottom: 20 }}>{title}</div>
        <div style={{ fontSize: 36, color: theme.muted, lineHeight: 1.4 }}>{subtitle}</div>
      </div>
    </AbsoluteFill>
  );
};

const ROSTER = [
  "inji",
  "eudi",
  "authbound",
  "paradym",
  "bcwallet",
  "wwwallet",
  "hologram",
  "sphereon",
  "talao",
  "nl-wallet",
];

export const WalletRoster: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: theme.surface, alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", gap: 34, flexWrap: "wrap", justifyContent: "center", maxWidth: 1500, marginTop: 120 }}>
        {ROSTER.map((id, i) => {
          const s = spring({ frame: frame - i * 4, fps, config: { damping: 200 } });
          return <RosterTile key={id} id={id} scale={s} />;
        })}
      </div>
    </AbsoluteFill>
  );
};

const RosterTile: React.FC<{ id: string; scale: number; size?: number }> = ({
  id,
  scale,
  size = 130,
}) => {
  const src = useAsset(`wallet-logos/${id}`);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        background: theme.card,
        boxShadow: "0 16px 40px rgba(15,23,42,0.12)",
        transform: `scale(${scale})`,
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
        <span style={{ fontSize: size * 0.14, color: theme.muted, textAlign: "center", padding: 8 }}>
          {id}
        </span>
      )}
    </div>
  );
};

export const UrlCard: React.FC<{ url: string; tagline: string }> = ({ url, tagline }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200 } });
  return (
    <AbsoluteFill style={{ background: theme.night, alignItems: "center", justifyContent: "center", fontFamily: theme.font }}>
      <div style={{ marginBottom: 50, transform: `scale(${s})` }}>
        <VeranaLogo size={95} suffix="Playground" tone="dark" />
      </div>
      <div
        style={{
          fontFamily: theme.mono,
          fontSize: 40,
          color: "#f8fafc",
          background: "#111827",
          border: "2px solid #334155",
          borderRadius: 16,
          padding: "22px 44px",
          marginBottom: 34,
        }}
      >
        {url}
      </div>
      <div style={{ fontSize: 30, color: theme.faint }}>{tagline}</div>
    </AbsoluteFill>
  );
};

/** V-1 problem mocks (no assets needed). */
export const ProblemMock: React.FC<{ kind: "password" | "pdf"; label?: string }> = ({ kind, label }) => (
  <AbsoluteFill style={{ background: "#e2e8f0", alignItems: "center", justifyContent: "center", fontFamily: theme.font }}>
    <div
      style={{
        width: 760,
        borderRadius: 18,
        background: theme.card,
        boxShadow: "0 30px 80px rgba(15,23,42,0.25)",
        padding: 46,
      }}
    >
      {kind === "password" ? (
        <>
          <div style={{ fontSize: 34, fontWeight: 700, color: theme.ink, marginBottom: 24 }}>
            Password expired
          </div>
          <div style={{ fontSize: 24, color: theme.muted, marginBottom: 22 }}>
            Your new password must differ from your last 24 passwords.
          </div>
          {[1, 2].map((i) => (
            <div key={i} style={{ height: 52, borderRadius: 10, border: "2px solid #cbd5e1", marginBottom: 16 }} />
          ))}
        </>
      ) : (
        <>
          <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 26 }}>
            <div style={{ width: 60, height: 74, background: "#fee2e2", borderRadius: 8, border: "2px solid #fca5a5", display: "flex", alignItems: "center", justifyContent: "center", color: theme.redDark, fontWeight: 800, fontSize: 20 }}>
              PDF
            </div>
            <div style={{ fontSize: 30, fontWeight: 700, color: theme.ink }}>Company extract</div>
          </div>
          {[220, 340, 280, 400].map((w, i) => (
            <div key={i} style={{ height: 18, width: w, background: i === 1 ? "#fde68a" : "#e2e8f0", borderRadius: 6, marginBottom: 14 }} />
          ))}
          <div style={{ fontSize: 22, color: theme.redDark, marginTop: 12 }}>editing: director name...</div>
        </>
      )}
    </div>
    {label ? (
      <div style={{ position: "absolute", bottom: 70, fontSize: 26, color: theme.muted }}>{label}</div>
    ) : null}
  </AbsoluteFill>
);
