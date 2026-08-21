// A phone bezel around a (vertical) wallet capture, centered on a dark stage.
// In vertical format the clip goes full-bleed instead (spec §7).
import React from "react";
import { AbsoluteFill } from "remotion";
import { AssetVideo } from "../lib/assets";
import { theme } from "../theme";

export const PhoneClip: React.FC<{
  asset: string;
  label?: string;
  fullBleed?: boolean;
  /** Skip the stage background (for layered scenes like the QR handoff). */
  transparent?: boolean;
}> = ({ asset, label, fullBleed = false, transparent = false }) => {
  const bg = transparent ? undefined : theme.night;
  if (fullBleed) {
    return (
      <AbsoluteFill style={{ background: bg }}>
        <AssetVideo id={asset} label={label} />
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill style={{ background: bg, alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          width: 380,
          height: 820,
          borderRadius: 48,
          border: "10px solid #1f2937",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 0 2px #0b0d16",
          overflow: "hidden",
          position: "relative",
          background: "#000",
        }}
      >
        <AssetVideo id={asset} label={label} />
        <div
          style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 120,
            height: 24,
            borderRadius: 12,
            background: "#0b0d16",
          }}
        />
      </div>
      {label ? (
        <div
          style={{
            position: "absolute",
            top: 50,
            fontFamily: theme.font,
            fontSize: 28,
            color: theme.faint,
          }}
        >
          {label}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
