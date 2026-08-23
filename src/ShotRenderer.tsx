// Maps shot data to components and lays a timeline of shots into Sequences.
// This is the only place that knows which visual kind renders how.
import React from "react";
import { AbsoluteFill, interpolate, Sequence, useCurrentFrame, useVideoConfig } from "remotion";
import { Shot } from "./shots/types";
import { TextOverlay } from "./components/TextOverlay";
import { LoginGlitch } from "./components/LoginGlitch";
import { AgentFlicker } from "./components/AgentFlicker";
import { PhoneClip } from "./components/PhoneClip";
import { QrScanToPhone } from "./components/QrScan";
import { Constellation } from "./components/Constellation";
import { BrandOpen, BrandReveal, Triptych } from "./components/Triptych";
import { EcosystemSearch, SovereignBuild } from "./components/SovereignScenes";
import { VestaCompany } from "./components/VestaCompany";
import {
  VestaBuildEco,
  VestaJoin,
  VestaNeeds,
  VestaProblems,
} from "./components/VestaStory";
import { VestaJourney } from "./components/VestaJourney";
import { PlaygroundClose, SoloOpen, VestaDemos } from "./components/VestaFinish";
import {
  EcosystemSearchV2,
  Foundations,
  Freedoms,
  Silos,
  VeranaClose,
} from "./components/IntroV2Scenes";
import {
  EcosystemSearchV3,
  BuildEcoV3,
  FoundationsV3,
  SectorsV3,
  ServiceV3,
  SilosV3,
  TrustListsV3,
  VeranaCloseV3,
} from "./components/IntroV3Scenes";
import { HandoffCard, StandardsStrip, UrlCard, WalletRoster } from "./components/Cards";
import { CaptureSequence, DirectoryTeaser, ImageScene } from "./components/Scenes";
import { theme } from "./theme";

export type Format = "wide" | "vertical";

const Visual: React.FC<{ shot: Shot; format: Format }> = ({ shot, format }) => {
  const v = shot.visual;
  switch (v.kind) {
    case "login-glitch":
      return <LoginGlitch />;
    case "agent-flicker":
      return <AgentFlicker />;
    case "phone":
      return <PhoneClip asset={v.asset} label={v.caption} fullBleed={format === "vertical"} />;
    case "qr-scan-phone":
      return (
        <QrScanToPhone
          asset={v.asset}
          qrLabel={v.qrLabel}
          caption={v.caption}
          phoneSide={v.phoneSide}
          vertical={format === "vertical"}
        />
      );
    case "constellation":
      return <Constellation mode={v.mode} />;
    case "sovereign-build":
      return <SovereignBuild />;
    case "ecosystem-search":
      return <EcosystemSearch />;
    case "black":
      return <AbsoluteFill style={{ background: theme.night }} />;
    case "brand-open":
      return <BrandOpen />;
    case "brand-reveal":
      return <BrandReveal />;
    case "triptych":
      return <Triptych />;
    case "standards":
      return <StandardsStrip />;
    case "handoff":
      return <HandoffCard emblem={v.emblem} title={v.title} subtitle={v.subtitle} />;
    case "vesta-company":
      return <VestaCompany part={v.part} />;
    case "vesta-problems":
      return <VestaProblems />;
    case "vesta-needs":
      return <VestaNeeds />;
    case "vesta-join":
      return <VestaJoin />;
    case "vesta-build-eco":
      return <VestaBuildEco />;
    case "vesta-journey":
      return <VestaJourney data={v} />;
    case "vesta-demos":
      return <VestaDemos />;
    case "playground-close":
      return <PlaygroundClose />;
    case "solo-open":
      return <SoloOpen emblem={v.emblem} title={v.title} subtitle={v.subtitle} />;
    case "foundations":
      return <Foundations />;
    case "silos":
      return <Silos />;
    case "ecosystem-search-v2":
      return <EcosystemSearchV2 />;
    case "freedoms":
      return <Freedoms />;
    case "verana-close":
      return <VeranaClose />;
    case "foundations-v3":
      return <FoundationsV3 />;
    case "sectors-v3":
      return <SectorsV3 />;
    case "silos-v3":
      return <SilosV3 />;
    case "ecosystem-search-v3":
      return <EcosystemSearchV3 />;
    case "build-eco-v3":
      return <BuildEcoV3 />;
    case "build-service-v3":
      return <ServiceV3 />;
    case "verana-close-v3":
      return <VeranaCloseV3 />;
    case "trust-lists-v3":
      return <TrustListsV3 />;
    case "image-scene":
      return <ImageScene items={v.items} tint={v.tint} />;
    case "build":
      return <Constellation mode="build" entities={v.entities} />;
    case "captures":
      return <CaptureSequence items={v.items} fullBleed={format === "vertical"} />;
    case "directory":
      return <DirectoryTeaser queries={v.queries} />;
    case "roster":
      return <WalletRoster />;
    case "url-card":
      return <UrlCard url={v.url} tagline={v.tagline} />;
  }
};

const textPosition = (shot: Shot, format: Format): "center" | "lower" | "top" => {
  if (format === "vertical") return "top";
  const v = shot.visual;
  // Verify mode centers the brand lockup, so its line moves to the lower third.
  if (v.kind === "constellation") return v.mode === "verify" ? "lower" : "center";
  if (v.kind === "black") return "center";
  return "lower";
};

export const ShotRenderer: React.FC<{ shot: Shot; format: Format }> = ({ shot, format }) => {
  const { fps, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();
  const frames = durationInFrames;
  const big = shot.visual.kind === "black" || shot.id === "I-8" || shot.id === "N-8" || shot.id === "N-8b";
  // The dense standards + Proof of Trust scene needs a smaller line to
  // clear the wallet roster.
  const compact = shot.visual.kind === "standards";
  const textFade = shot.textFadeOut;
  // The intro's dark question shots dip to black between cuts, so each
  // question lands as its own beat (I-0 already ends on night, I-8 turns on
  // the light).
  const isQuestion =
    (shot.id.startsWith("I-") || shot.id.startsWith("N-")) && (shot.tone ?? "dark") === "dark";
  const dip = isQuestion
    ? Math.min(
        interpolate(frame, [0, fps * 0.35], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        interpolate(frame, [frames - fps * 0.35, frames - 1], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      )
    : 1;
  return (
    <AbsoluteFill style={isQuestion ? { background: theme.night } : undefined}>
      <AbsoluteFill style={{ opacity: dip }}>
      <Visual shot={shot} format={format} />
      <AbsoluteFill
        style={
          textFade
            ? {
                opacity: interpolate(
                  frame,
                  [textFade[0] * fps, textFade[1] * fps],
                  [1, 0],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                ),
              }
            : undefined
        }
      >
        <TextOverlay
          lines={shot.lines}
          durationInFrames={frames}
          tone={shot.tone ?? "dark"}
          position={textPosition(shot, format)}
          size={format === "vertical" ? 54 : big ? 76 : compact ? 36 : 56}
          // Question shots: the final line lands early, then everything holds
          // >= 3 s fully assembled (spec pacing rule).
          leadSeconds={/^(I-[0-6]|N-[2-7])$/.test(shot.id) ? 2.2 : undefined}
        />
      </AbsoluteFill>
      </AbsoluteFill>
      {/* keep fps referenced for future per-shot timing tweaks */}
      <span style={{ display: "none" }}>{fps}</span>
    </AbsoluteFill>
  );
};

/** Lay absolute-timed shots into sequences, offset by `offset` seconds. */
export const Timeline: React.FC<{ shots: Shot[]; format: Format; offset?: number }> = ({
  shots,
  format,
  offset = 0,
}) => {
  const { fps } = useVideoConfig();
  return (
    <>
      {shots.map((shot) => (
        <Sequence
          key={shot.id}
          name={shot.id}
          from={Math.round((shot.start - offset) * fps)}
          durationInFrames={Math.round((shot.end - shot.start) * fps)}
        >
          <ShotRenderer shot={shot} format={format} />
        </Sequence>
      ))}
    </>
  );
};
