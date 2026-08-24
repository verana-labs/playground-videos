import React from "react";
import { CalculateMetadataFunction, Composition } from "remotion";
import {
  IntroOnly,
  IntroV2,
  IntroV3,
  IntroV4,
  VerandiaFull,
  VERANDIA_DURATION,
  VestaSolo,
  VESTA_SOLO_DURATION,
  VerandiaVertical,
  VestaFull,
  VESTA_DURATION,
  VestaVertical,
  VERTICAL_DURATION,
  VideoProps,
} from "./compositions";
import { INTRO_END } from "./shots/intro";
import { INTRO2_END } from "./shots/intro2";
import { INTRO3_END } from "./shots/intro3";
import { INTRO4_END } from "./shots/intro4";
import { fetchManifest } from "./lib/assets";

const FPS = 30;

// The asset manifest (public/assets/manifest.json, written by `npm run sync`)
// is fetched once per composition and injected as a prop, so components can
// fall back to placeholders for anything not on disk.
const withManifest: CalculateMetadataFunction<VideoProps> = async ({ props }) => ({
  props: { ...props, manifest: await fetchManifest() },
});

export const RemotionRoot: React.FC = () => (
  <>
    {/* Vesta: the standalone distribution cut (no intro) */}
    <Composition
      id="VestaSolo"
      component={VestaSolo}
      durationInFrames={VESTA_SOLO_DURATION * FPS}
      fps={FPS}
      width={1920}
      height={1080}
      defaultProps={{ manifest: {} }}
      calculateMetadata={withManifest}
    />
    {/* Vesta: intro + act, the full assembly */}
    <Composition
      id="VestaFull"
      component={VestaFull}
      durationInFrames={VESTA_DURATION * FPS}
      fps={FPS}
      width={1920}
      height={1080}
      defaultProps={{ manifest: {} }}
      calculateMetadata={withManifest}
    />
    <Composition
      id="VestaVertical"
      component={VestaVertical}
      durationInFrames={VERTICAL_DURATION * FPS}
      fps={FPS}
      width={1080}
      height={1920}
      defaultProps={{ manifest: {} }}
      calculateMetadata={withManifest}
    />
    {/* The locked shared opening */}
    <Composition
      id="IntroOnly"
      component={IntroOnly}
      durationInFrames={INTRO_END * FPS}
      fps={FPS}
      width={1920}
      height={1080}
      defaultProps={{ manifest: {} }}
      calculateMetadata={withManifest}
    />
    {/* INTRO v2: the merged institutional intro (independent video) */}
    <Composition
      id="IntroV2"
      component={IntroV2}
      durationInFrames={INTRO2_END * FPS}
      fps={FPS}
      width={1920}
      height={1080}
      defaultProps={{ manifest: {} }}
      calculateMetadata={withManifest}
    />
    {/* INTRO v3: iteration copy of v2 */}
    <Composition
      id="IntroV3"
      component={IntroV3}
      durationInFrames={INTRO3_END * FPS}
      fps={FPS}
      width={1920}
      height={1080}
      defaultProps={{ manifest: {} }}
      calculateMetadata={withManifest}
    />
    {/* INTRO v4: v3 on the verana.io design system */}
    <Composition
      id="IntroV4"
      component={IntroV4}
      durationInFrames={INTRO4_END * FPS}
      fps={FPS}
      width={1920}
      height={1080}
      defaultProps={{ manifest: {} }}
      calculateMetadata={withManifest}
    />
        {/* Verandia: drafted, deferred (second video) */}
    <Composition
      id="VerandiaFull"
      component={VerandiaFull}
      durationInFrames={VERANDIA_DURATION * FPS}
      fps={FPS}
      width={1920}
      height={1080}
      defaultProps={{ manifest: {} }}
      calculateMetadata={withManifest}
    />
    <Composition
      id="VerandiaVertical"
      component={VerandiaVertical}
      durationInFrames={VERTICAL_DURATION * FPS}
      fps={FPS}
      width={1080}
      height={1920}
      defaultProps={{ manifest: {} }}
      calculateMetadata={withManifest}
    />
  </>
);
