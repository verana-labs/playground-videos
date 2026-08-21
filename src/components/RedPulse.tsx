// The reveal treatment shared by the intro's unidentified actors: a red,
// glowing, size-throbbing circular badge (I-1: the unknown organization
// behind the service; I-2: the machine behind the personas).
import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

export const RedPulse: React.FC<{
  /** Seconds into the shot when the badge appears. */
  appearAt: number;
  size?: number;
  children: React.ReactNode;
}> = ({ appearAt, size = 116, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - fps * appearAt, fps, config: { damping: 200 } });
  const pulse =
    (Math.sin(((frame - fps * appearAt) / fps) * ((Math.PI * 2) / 0.9)) + 1) / 2;
  return (
    <div style={{ opacity: s, transform: `scale(${s * (1 + 0.09 * pulse)})` }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          background: "rgba(239,68,68,0.16)",
          border: "2.5px solid #ef4444",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 ${26 + 40 * pulse}px rgba(239,68,68,${0.4 + 0.3 * pulse})`,
        }}
      >
        {children}
      </div>
    </div>
  );
};
