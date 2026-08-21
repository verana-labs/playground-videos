// The single text treatment of the series: lines from the shot data, shown
// sequentially, fading and rising. Centered by default; "lower" places the
// band in the lower third (over footage); vertical format raises text to the
// top third per spec §7.
import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

export const TextOverlay: React.FC<{
  lines: string[];
  durationInFrames: number;
  tone?: "dark" | "light";
  position?: "center" | "lower" | "top";
  size?: number;
  /** Seconds each non-final line stays before yielding; the final line gets
      all remaining time (reading-hold pacing). Default: equal slices. */
  leadSeconds?: number;
}> = ({
  lines,
  durationInFrames,
  tone = "dark",
  position = "center",
  size = 64,
  leadSeconds,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  if (lines.length === 0) return null;

  const lead = Math.min(
    leadSeconds ? fps * leadSeconds : durationInFrames / lines.length,
    durationInFrames / lines.length
  );
  const idx = Math.min(lines.length - 1, Math.floor(frame / lead));
  const sliceStart = idx * lead;
  const slice = idx === lines.length - 1 ? durationInFrames - sliceStart : lead;
  const local = frame - sliceStart;
  const fade = fps * 0.4;
  const opacity =
    interpolate(local, [0, fade], [0, 1], { extrapolateRight: "clamp" }) *
    interpolate(local, [slice - fade, slice], [1, 0.0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  // Last line holds instead of fading out.
  const holdOpacity =
    idx === lines.length - 1
      ? interpolate(local, [0, fade], [0, 1], { extrapolateRight: "clamp" })
      : opacity;
  const rise = interpolate(local, [0, fade], [16, 0], {
    extrapolateRight: "clamp",
  });

  const color = tone === "dark" ? "#f8fafc" : theme.ink;
  const shadow =
    tone === "dark" ? "0 2px 24px rgba(0,0,0,0.55)" : "0 1px 2px rgba(255,255,255,0.6)";

  // Readability scrim: a soft gradient band behind lower/top text so copy
  // stays legible over imagery and diagrams.
  const scrim =
    position === "center"
      ? undefined
      : tone === "dark"
        ? "linear-gradient(to top, rgba(11,13,22,0.92) 0%, rgba(11,13,22,0.55) 60%, rgba(11,13,22,0) 100%)"
        : "linear-gradient(to top, rgba(248,250,252,0.96) 0%, rgba(248,250,252,0.7) 60%, rgba(248,250,252,0) 100%)";

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent:
          position === "center" ? "center" : position === "top" ? "flex-start" : "flex-end",
      }}
    >
      {scrim ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            [position === "top" ? "top" : "bottom"]: 0,
            height: 320,
            background: scrim,
            transform: position === "top" ? "scaleY(-1)" : undefined,
          }}
        />
      ) : null}
      <div
        style={{
          fontFamily: theme.font,
          fontWeight: 700,
          fontSize: size,
          lineHeight: 1.25,
          color,
          textAlign: "center",
          textShadow: shadow,
          opacity: holdOpacity,
          transform: `translateY(${rise}px)`,
          maxWidth: 1400,
          // Top-positioned text (vertical cuts) clears the persistent banner.
          padding: position === "top" ? "150px 120px" : "0 120px",
          marginBottom: position === "lower" ? 90 : 0,
          position: "relative",
        }}
      >
        {lines[idx]}
      </div>
    </AbsoluteFill>
  );
};
