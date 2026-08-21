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
import { VESTA_HANDOFF, VESTA_SHOTS } from "./shots/vesta";
import { VERANDIA_HANDOFF, VERANDIA_SHOTS } from "./shots/verandia";
import { outroShots, VERANDIA_URL, VESTA_URL } from "./shots/outro";
import { ACT_START, HANDOFF_START } from "./shots/timeline";
import { PlaygroundBanner } from "./components/VeranaLogo";
import { theme } from "./theme";

export type VideoProps = { manifest: AssetManifest };

// Acts are authored with RELATIVE times (0-based); shift them to ACT_START.
const fullShots = (handoff: Shot, act: Shot[], url: string): Shot[] => [
  ...INTRO_SHOTS,
  handoff,
  ...act.map((s) => ({ ...s, start: s.start + ACT_START, end: s.end + ACT_START })),
  ...outroShots(url),
];

const VESTA_FULL = fullShots(VESTA_HANDOFF, VESTA_SHOTS, VESTA_URL);
const VERANDIA_FULL = fullShots(VERANDIA_HANDOFF, VERANDIA_SHOTS, VERANDIA_URL);

export const FULL_DURATION = shotsEnd(VESTA_FULL); // 240 s, identical per act

const Music: React.FC<{ shots: Shot[]; offset?: number }> = ({ shots, offset = 0 }) => {
  const { fps } = useVideoConfig();
  const src = useAsset("music");
  if (!src) return null;
  const end = shotsEnd(shots) - offset;
  const duckRanges = shots
    .filter((s) => s.duck)
    .map((s) => [s.start - offset, s.end - offset] as const);
  return (
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
        return ducked * fadeIn * fadeOut;
      }}
    />
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
}> = ({ manifest, shots, format, offset = 0, bannerFrom = 0 }) => {
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
        <Music shots={shots} offset={offset} />
      </AbsoluteFill>
    </AssetContext.Provider>
  );
};

export const VestaFull: React.FC<VideoProps> = ({ manifest }) => (
  <Stage manifest={manifest} shots={VESTA_FULL} format="wide" bannerFrom={HANDOFF_START} />
);

export const VerandiaFull: React.FC<VideoProps> = ({ manifest }) => (
  <Stage manifest={manifest} shots={VERANDIA_FULL} format="wide" bannerFrom={HANDOFF_START} />
);

export const IntroOnly: React.FC<VideoProps> = ({ manifest }) => (
  <Stage manifest={manifest} shots={INTRO_SHOTS} format="wide" bannerFrom={Infinity} />
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
    at(pick(outroShots(url), "O-2"), 52, 60, "O-2-v"),
  ]);

const VESTA_VERTICAL = verticalShots(
  {
    ...pick(VESTA_SHOTS, "S-4"),
    lines: ["At your door: scan the badge, see the Vesta seal."],
    visual: {
      kind: "captures",
      items: [{ asset: "captures/vesta-door-scan", label: "At the door: badge scanned, seal shown" }],
    },
  },
  {
    ...pick(VESTA_SHOTS, "S-5"),
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
  <Stage manifest={manifest} shots={VESTA_VERTICAL} format="vertical" bannerFrom={18} />
);

export const VerandiaVertical: React.FC<VideoProps> = ({ manifest }) => (
  <Stage manifest={manifest} shots={VERANDIA_VERTICAL} format="vertical" bannerFrom={18} />
);
