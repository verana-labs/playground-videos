// The compositions: IntroOnly (the locked shared opening), one Full (16:9)
// and one Vertical (9:16, spec §8) per use case. Vesta is the first video;
// Verandia is drafted and deferred. Music ducks under shots flagged `duck`
// when assets/music.mp3 exists (drop it in and re-run `npm run sync`).
import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AssetContext, AssetManifest, useAsset } from "./lib/assets";
import { Format, Timeline } from "./ShotRenderer";
import { Shot, shotsEnd, validateShots } from "./shots/types";
import { INTRO_SHOTS } from "./shots/intro";
import { INTRO2_SHOTS } from "./shots/intro2";
import { VESTA_HANDOFF, VESTA_SHOTS } from "./shots/vesta";
import { VERANDIA_HANDOFF, VERANDIA_SHOTS } from "./shots/verandia";
import { outroShots, VERANDIA_URL, VESTA_URL } from "./shots/outro";
import { ACT_START, HANDOFF_START } from "./shots/timeline";
import { PlaygroundBanner } from "./components/VeranaLogo";
import { theme } from "./theme";

export type VideoProps = { manifest: AssetManifest };

// Acts are authored with RELATIVE times (0-based); shift them to ACT_START.
// Each act brings its own length; the outro is placed from the act's end.
const fullShots = (handoff: Shot, act: Shot[], url: string): Shot[] => [
  ...INTRO_SHOTS,
  handoff,
  ...act.map((s) => ({ ...s, start: s.start + ACT_START, end: s.end + ACT_START })),
  ...outroShots(url, ACT_START + shotsEnd(act)),
];

const VESTA_FULL = fullShots(VESTA_HANDOFF, VESTA_SHOTS, VESTA_URL);
const VERANDIA_FULL = fullShots(VERANDIA_HANDOFF, VERANDIA_SHOTS, VERANDIA_URL);

// Standalone use-case cut for distribution: no intro. The playground lockup
// springs in, travels to the top, the use case is revealed below (0:00 to
// 0:08); the act follows, the outro closes it; its own music and VO.
const soloShots = (handoff: Shot, act: Shot[], url: string): Shot[] => [
  {
    id: "P-0",
    start: 0,
    end: 8,
    lines: [],
    vo:
      handoff.visual.kind === "handoff"
        ? `In the Verana Playground: ${handoff.visual.title} ${handoff.visual.subtitle}`
        : undefined,
    visual:
      handoff.visual.kind === "handoff"
        ? {
            kind: "solo-open",
            emblem: handoff.visual.emblem,
            title: handoff.visual.title,
            subtitle: handoff.visual.subtitle,
          }
        : handoff.visual,
    tone: "light",
  },
  ...act.map((s) => ({ ...s, start: s.start + 8, end: s.end + 8 })),
  ...outroShots(url, 8 + shotsEnd(act)),
];

const VESTA_SOLO = soloShots(VESTA_HANDOFF, VESTA_SHOTS, VESTA_URL);
export const VESTA_SOLO_DURATION = shotsEnd(VESTA_SOLO);

export const VESTA_DURATION = shotsEnd(VESTA_FULL);
export const VERANDIA_DURATION = shotsEnd(VERANDIA_FULL);

// Per-video audio: a music bed (public/assets/music/<id>.mp3) and narration.
// Narration comes in two forms:
//   - one full-length track at public/assets/vo/<id>.mp3, or
//   - one clip per shot at public/assets/vo/<id>/<shot-id>.mp3 (preferred:
//     each clip starts exactly at its shot, so TTS pacing can never drift).
// When narration is present the bed drops well under it; `duck` shots lower
// it further.
const ShotVo: React.FC<{ id: string }> = ({ id }) => {
  const src = useAsset(id);
  if (!src) return null;
  return <Audio src={src} />;
};

const Music: React.FC<{ shots: Shot[]; offset?: number; musicId: string; voId?: string }> = ({
  shots,
  offset = 0,
  musicId,
  voId,
}) => {
  const { fps } = useVideoConfig();
  const manifest = React.useContext(AssetContext);
  const src = useAsset(musicId);
  const voSrc = useAsset(voId ?? "");
  const hasShotVo =
    !!voId && Object.keys(manifest).some((k) => k.startsWith(`${voId}/`));
  const end = shotsEnd(shots) - offset;
  const duckRanges = shots
    .filter((s) => s.duck)
    .map((s) => [s.start - offset, s.end - offset] as const);
  const base = voSrc || hasShotVo ? 0.18 : 1;
  return (
    <>
      {src ? (
        <Audio
          src={src}
          volume={(f) => {
            const t = f / fps;
            const ducked = duckRanges.some(([a, b]) => t >= a && t <= b) ? 0.35 : 1;
            const fadeIn = interpolate(t, [0, 2], [0, 1], { extrapolateRight: "clamp" });
            const fadeOut = interpolate(t, [end - 3, end], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return base * ducked * fadeIn * fadeOut;
          }}
        />
      ) : null}
      {voSrc ? <Audio src={voSrc} /> : null}
      {!voSrc && voId
        ? shots.map((s) => (
            <Sequence
              key={`vo-${s.id}`}
              from={Math.round((s.start - offset) * fps)}
              name={`vo-${s.id}`}
            >
              <ShotVo id={`${voId}/${s.id}`} />
            </Sequence>
          ))
        : null}
    </>
  );
};

// The playground banner fades in when the use-case content starts; the intro
// carries verana.io branding only.
const BannerFade: React.FC<{ vertical: boolean }> = ({ vertical }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const o = interpolate(frame, [0, fps * 0.4], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ opacity: o }}>
      <PlaygroundBanner vertical={vertical} />
    </AbsoluteFill>
  );
};

const Stage: React.FC<{
  manifest: AssetManifest;
  shots: Shot[];
  format: Format;
  offset?: number;
  /** Seconds on this timeline where the playground banner appears;
      Infinity keeps it off entirely (pure-intro renders). */
  bannerFrom?: number;
  musicId?: string;
  voId?: string;
}> = ({ manifest, shots, format, offset = 0, bannerFrom = 0, musicId = "music/intro", voId }) => {
  const { fps } = useVideoConfig();
  return (
    <AssetContext.Provider value={manifest}>
      <AbsoluteFill style={{ background: theme.night }}>
        <Timeline shots={shots} format={format} offset={offset} />
        {Number.isFinite(bannerFrom) ? (
          <Sequence from={Math.round(bannerFrom * fps)} name="playground-banner">
            <BannerFade vertical={format === "vertical"} />
          </Sequence>
        ) : null}
        <Music shots={shots} offset={offset} musicId={musicId} voId={voId} />
      </AbsoluteFill>
    </AssetContext.Provider>
  );
};

export const VestaFull: React.FC<VideoProps> = ({ manifest }) => (
  <Stage manifest={manifest} shots={VESTA_FULL} format="wide" bannerFrom={HANDOFF_START} musicId="music/vesta" voId="vo/vesta" />
);

export const VerandiaFull: React.FC<VideoProps> = ({ manifest }) => (
  <Stage manifest={manifest} shots={VERANDIA_FULL} format="wide" bannerFrom={HANDOFF_START} musicId="music/verandia" voId="vo/verandia" />
);

export const IntroOnly: React.FC<VideoProps> = ({ manifest }) => (
  <Stage
    manifest={manifest}
    shots={INTRO_SHOTS}
    format="wide"
    bannerFrom={Infinity}
    musicId="music/intro"
    voId="vo/intro"
  />
);

/** INTRO v2, the merged institutional intro: an independent video. */
export const IntroV2: React.FC<VideoProps> = ({ manifest }) => (
  <Stage
    manifest={manifest}
    shots={INTRO2_SHOTS}
    format="wide"
    bannerFrom={Infinity}
    musicId="music/intro2"
    voId="vo/intro2"
  />
);

/** The distribution cut: the Vesta use case on its own, no intro. */
export const VestaSolo: React.FC<VideoProps> = ({ manifest }) => (
  <Stage
    manifest={manifest}
    shots={VESTA_SOLO}
    format="wide"
    bannerFrom={8}
    musicId="music/vesta"
    voId="vo/vesta"
  />
);

// Vertical recuts, spec §8: intro compressed (I-1, I-4, I-7, I-8), one payoff
// capture, the refusal, the URL card. Own ~60 s timelines reusing the visuals.
const pick = (shots: Shot[], id: string): Shot => {
  const s = shots.find((x) => x.id === id);
  if (!s) throw new Error(`vertical recut: shot ${id} not found`);
  return s;
};

const at = (shot: Shot, start: number, end: number, id?: string): Shot => ({
  ...shot,
  id: id ?? `${shot.id}-v`,
  start,
  end,
});

const verticalShots = (
  payoff: Shot,
  refusal: Shot,
  url: string
): Shot[] =>
  validateShots([
    at(pick(INTRO_SHOTS, "I-1"), 0, 4),
    at(pick(INTRO_SHOTS, "I-4"), 4, 9),
    at(pick(INTRO_SHOTS, "I-7"), 9, 13),
    at(pick(INTRO_SHOTS, "I-8"), 13, 18),
    at(payoff, 18, 33, `${payoff.id}-v`),
    at(refusal, 33, 52, `${refusal.id}-v`),
    at(pick(outroShots(url, 0), "O-2"), 52, 60, "O-2-v"),
  ]);

const VESTA_VERTICAL = verticalShots(
  {
    id: "vertical-payoff",
    start: 0,
    end: 0,
    duck: true,
    tone: "dark",
    lines: ["At your door: scan the badge, see the Vesta seal."],
    visual: {
      kind: "captures",
      items: [{ asset: "captures/vesta-door-scan", label: "At the door: badge scanned, seal shown" }],
    },
  },
  {
    id: "vertical-refusal",
    start: 0,
    end: 0,
    duck: true,
    tone: "dark",
    lines: ["Umbra is verified. But not authorized.", "No credential, no seal. Proof, not paper."],
    visual: {
      kind: "captures",
      items: [{ asset: "captures/vesta-umbra-refusal", label: "Verified organization, no Authorized Repairer" }],
    },
  },
  VESTA_URL
);

const VERANDIA_VERTICAL = verticalShots(
  {
    ...pick(VERANDIA_SHOTS, "V-4"),
    lines: ["KYC in one scan."],
    visual: {
      kind: "captures",
      items: [{ asset: "captures/bank-kyc", label: "Meridian Bank, KYC in one scan" }],
    },
  },
  {
    ...pick(VERANDIA_SHOTS, "V-5"),
    lines: ["Verified, but not authorized to ask.", "The wallet refuses. Your data never leaves."],
    visual: {
      kind: "captures",
      items: [{ asset: "captures/quickcash-refusal", label: "Verified, but not authorized to request" }],
    },
  },
  VERANDIA_URL
);

export const VERTICAL_DURATION = shotsEnd(VESTA_VERTICAL); // 60 s

export const VestaVertical: React.FC<VideoProps> = ({ manifest }) => (
  <Stage manifest={manifest} shots={VESTA_VERTICAL} format="vertical" bannerFrom={18} musicId="music/vesta" />
);

export const VerandiaVertical: React.FC<VideoProps> = ({ manifest }) => (
  <Stage manifest={manifest} shots={VERANDIA_VERTICAL} format="vertical" bannerFrom={18} musicId="music/verandia" />
);
