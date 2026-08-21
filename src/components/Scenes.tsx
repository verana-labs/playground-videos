// Act-scene machinery: image sequences with Ken Burns (V-1, V-2), capture
// sequences (V-4, V-5), and the directory type-on teaser (V-6).
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { AssetImg } from "../lib/assets";
import { theme } from "../theme";
import { PhoneClip } from "./PhoneClip";
import { ProblemMock } from "./Cards";

type ImageItem = { asset?: string; mock?: "password" | "pdf"; label?: string };

export const ImageScene: React.FC<{ items: ImageItem[]; tint?: "none" | "problem" }> = ({
  items,
  tint = "none",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const slice = durationInFrames / items.length;
  const idx = Math.min(items.length - 1, Math.floor(frame / slice));
  const local = frame - idx * slice;
  const item = items[idx];
  const scale = interpolate(local, [0, slice], [1, 1.07]);
  return (
    <AbsoluteFill style={{ background: theme.night }}>
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        {item.mock ? (
          <ProblemMock kind={item.mock} label={item.label} />
        ) : (
          <AssetImg id={item.asset ?? ""} />
        )}
      </AbsoluteFill>
      {tint === "problem" && idx >= 2 ? (
        <AbsoluteFill style={{ background: "rgba(153,27,27,0.14)" }} />
      ) : null}
      {item.label && !item.mock ? (
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 60,
            fontFamily: theme.mono,
            fontSize: 26,
            color: "#fecaca",
            background: "rgba(15,23,42,0.75)",
            borderRadius: 10,
            padding: "10px 20px",
          }}
        >
          {item.label}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

export const CaptureSequence: React.FC<{
  items: { asset: string; label: string }[];
  fullBleed?: boolean;
}> = ({ items, fullBleed }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const slice = durationInFrames / items.length;
  const idx = Math.min(items.length - 1, Math.floor(frame / slice));
  return <PhoneClip asset={items[idx].asset} label={items[idx].label} fullBleed={fullBleed} />;
};

export const DirectoryTeaser: React.FC<{ queries: { q: string; a: string }[] }> = ({ queries }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const slice = durationInFrames / queries.length;
  const idx = Math.min(queries.length - 1, Math.floor(frame / slice));
  const local = frame - idx * slice;
  const { q, a } = queries[idx];
  const typed = Math.floor(interpolate(local, [0, slice * 0.45], [0, q.length], { extrapolateRight: "clamp" }));
  const showAnswer = local > slice * 0.5;
  return (
    <AbsoluteFill style={{ background: theme.surface, alignItems: "center", justifyContent: "flex-start", paddingTop: 200, fontFamily: theme.font }}>
      <div
        style={{
          width: 1150,
          background: theme.card,
          borderRadius: 22,
          boxShadow: "0 30px 80px rgba(15,23,42,0.12)",
          padding: 44,
        }}
      >
        <div
          style={{
            fontFamily: theme.mono,
            fontSize: 30,
            color: theme.ink,
            background: theme.surface,
            border: "2px solid #e2e8f0",
            borderRadius: 999,
            padding: "16px 32px",
            marginBottom: 30,
          }}
        >
          {q.slice(0, typed)}
          <span style={{ opacity: frame % 20 < 10 ? 1 : 0 }}>|</span>
        </div>
        <div
          style={{
            fontSize: 30,
            color: theme.greenDark,
            background: "#ecfdf5",
            border: `2px solid ${theme.green}`,
            borderRadius: 14,
            padding: "20px 30px",
            opacity: showAnswer ? 1 : 0,
            transform: `translateY(${showAnswer ? 0 : 12}px)`,
          }}
        >
          {a}
        </div>
      </div>
    </AbsoluteFill>
  );
};
