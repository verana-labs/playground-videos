// The act's finish: D-1 "Run the demos" (what you can try on the playground,
// §4 of the page) and the playground close (the intro finale's shape, in
// playground branding: lockup, URL, "See other use cases").
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { AssetImg, Placeholder, useAsset } from "../lib/assets";
import { theme } from "../theme";
import { ChapterHeader } from "./VestaCompany";
import { VeranaLogo } from "./VeranaLogo";

const pop = (frame: number, fps: number, d: number) =>
  spring({ frame: frame - fps * d, fps, config: { damping: 200 } });

const DEMOS = [
  {
    at: 0.9,
    title: "Get a badge",
    sub: "from Vesta Appliances, Zenith Repairs, or Umbra Repairs (demo)",
    issuers: ["Vesta Appliances", "Zenith Repairs", "Umbra Repairs (demo)"],
    icon: (
      <svg width={38} height={38} viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="9" fill="none" stroke={theme.violet} strokeWidth="1.9" />
        <path d="M8.5 12 L11 14.5 L15.5 9.5" fill="none" stroke={theme.violet} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    at: 1.35,
    title: "Log in to the Vesta portal",
    sub: "present your badge, see the verdict: no passwords",
    icon: (
      <svg width={38} height={38} viewBox="0 0 24 24" aria-hidden>
        <circle cx="16.5" cy="7.5" r="4.5" fill="none" stroke={theme.violet} strokeWidth="1.9" />
        <path d="M13 11 L4 20 M6.5 17.5 L9 20 M4 20 v-2.5" fill="none" stroke={theme.violet} strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    ),
  },
];

export const VestaDemos: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const zenith = useAsset("vesta/zenith");
  return (
    <AbsoluteFill style={{ background: theme.surface }}>
      <div style={{ position: "absolute", left: 120, top: 80, width: 900 }}>
        <ChapterHeader title="Run the demos" at={0.2} kicker="4 · TRY IT YOURSELF" />
        <div style={{ marginTop: 30, display: "flex", flexDirection: "column", gap: 22 }}>
          {DEMOS.map((d) => {
            const s = pop(frame, fps, d.at);
            return (
              <div
                key={d.title}
                style={{
                  background: theme.card,
                  border: "1.5px solid #e2e8f0",
                  borderRadius: 20,
                  boxShadow: "0 14px 40px rgba(15,23,42,0.08)",
                  padding: "24px 28px",
                  opacity: s,
                  transform: `translateX(${(1 - s) * -40}px)`,
                  fontFamily: theme.font,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                  <span
                    style={{
                      display: "inline-flex",
                      width: 64,
                      height: 64,
                      borderRadius: 16,
                      background: "#f5f3ff",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {d.icon}
                  </span>
                  <div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: theme.ink }}>{d.title}</div>
                    <div style={{ fontSize: 20, color: theme.muted }}>{d.sub}</div>
                  </div>
                </div>
                {d.issuers ? (
                  <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {d.issuers.map((n) => (
                      <span
                        key={n}
                        style={{
                          fontSize: 18,
                          fontWeight: 600,
                          color: theme.muted,
                          background: "#f8fafc",
                          border: "1.5px solid #e2e8f0",
                          borderRadius: 999,
                          padding: "6px 16px",
                        }}
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      {/* the front door, simulated: the §3 technician photo */}
      <div
        style={{
          position: "absolute",
          left: 990,
          top: 170,
          opacity: pop(frame, fps, 1.8),
          transform: `translateY(${(1 - pop(frame, fps, 1.8)) * 40}px)`,
        }}
      >
        <div
          style={{
            width: 810,
            height: 600,
            borderRadius: 18,
            overflow: "hidden",
            boxShadow: "0 30px 80px rgba(15,23,42,0.18)",
            background: theme.card,
          }}
        >
          {zenith ? <AssetImg id="vesta/zenith" /> : <Placeholder id="vesta/zenith" />}
        </div>
        <div style={{ marginTop: 16, width: 810, textAlign: "center", fontFamily: theme.font, fontSize: 20, color: theme.muted }}>
          At the front door: the technician at your door, proving they're from an authorized
          repairer - trust before you open.
        </div>
      </div>
    </AbsoluteFill>
  );
};

/** The standalone cut's opening: the Verana Playground lockup springs in
 *  center stage, travels to the top, and the use case is revealed below. */
export const SoloOpen: React.FC<{ emblem: string; title: string; subtitle: string }> = ({
  emblem,
  title,
  subtitle,
}) => {
  const frame = useCurrentFrame();
  const { fps, height } = useVideoConfig();
  const t = frame / fps;
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const lockIn = spring({ frame: frame - fps * 0.3, fps, config: { damping: 200 } });
  const travel = interpolate(t, [2.0, 2.7], [0, 1], clamp);
  const eased = 1 - Math.pow(1 - travel, 3);
  // Target: the top-right banner lockup position (VeranaLogo.tsx).
  const lockupX = eased * 650;
  const lockupY = eased * (66 - height / 2);
  const lockupScale = 1 - eased * 0.52;
  const inAt = (d: number) => spring({ frame: frame - fps * d, fps, config: { damping: 200 } });
  const emblemIn = inAt(2.6);
  const textIn = interpolate(t, [2.9, 3.5], [0, 1], clamp);
  const src = useAsset(emblem);
  return (
    <AbsoluteFill style={{ background: theme.surface }}>
      {/* the reveal, below the landed lockup */}
      <AbsoluteFill
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 90,
          paddingTop: 60,
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
            transform: `scale(${emblemIn})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {src ? <AssetImg id={emblem} cover={false} style={{ padding: 30 }} /> : <Placeholder id={emblem} />}
        </div>
        <div style={{ maxWidth: 850, opacity: textIn, transform: `translateY(${(1 - textIn) * 20}px)` }}>
          <div style={{ fontSize: 66, fontWeight: 800, color: theme.ink, marginBottom: 20 }}>{title}</div>
          <div style={{ fontSize: 36, color: theme.muted, lineHeight: 1.4 }}>{subtitle}</div>
        </div>
      </AbsoluteFill>
      {/* the travelling playground lockup */}
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        <div style={{ opacity: lockIn, transform: `translate(${lockupX}px, ${lockupY}px) scale(${lockIn * lockupScale})` }}>
          <VeranaLogo size={100} suffix="Playground" />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** The conclusion: the intro finale's shape, playground-branded. */
export const PlaygroundClose: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
  const lockIn = spring({ frame: frame - fps * 0.3, fps, config: { damping: 200 } });
  const urlIn = interpolate(frame, [fps * 1.2, fps * 1.7], [0, 1], clamp);
  const lineIn = interpolate(frame, [fps * 1.8, fps * 2.3], [0, 1], clamp);
  return (
    <AbsoluteFill style={{ background: theme.surface, alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transform: "translateY(-40px)",
        }}
      >
        <div style={{ opacity: lockIn, transform: `scale(${0.9 + 0.1 * lockIn})` }}>
          <VeranaLogo size={110} suffix="Playground" />
        </div>
        <div
          style={{
            marginTop: 56,
            fontFamily: theme.mono,
            fontSize: 40,
            color: theme.muted,
            letterSpacing: 1,
            opacity: urlIn,
            transform: `translateY(${(1 - urlIn) * 24}px)`,
          }}
        >
          https://playground.testnet.verana.network
        </div>
        <div
          style={{
            marginTop: 34,
            fontFamily: theme.font,
            fontSize: 42,
            fontWeight: 700,
            color: theme.ink,
            opacity: lineIn,
            transform: `translateY(${(1 - lineIn) * 24}px)`,
          }}
        >
          See the other use cases in the Verana Playground.
        </div>
      </div>
    </AbsoluteFill>
  );
};
