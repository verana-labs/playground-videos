// I-3 / I-4 choreography: a QR card appears first, alone and centered; then
// it travels aside and the wallet capture arrives next to it, so QR and
// phone stay on screen together (the scan moment, frozen).
//   I-3 (issuer):   "Scan this QR to get your credential"  · QR moves LEFT,
//                   phone enters RIGHT.
//   I-4 (verifier): "Scan this QR to present your ID"      · QR moves RIGHT,
//                   phone enters LEFT.
// In the vertical format the split is stacked instead: QR up, phone below.
//
// The QRs are real and scannable, generated at bundle time; the target URL
// is a pinned constant. Changing it changes INTRO v1 (spec §2 versioning).
import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import QRCode from "qrcode";
import { theme } from "../theme";
import { PhoneClip } from "./PhoneClip";

export const QR_TARGET = "https://playground.testnet.verana.network/personal-wallets";

const qr = QRCode.create(QR_TARGET, { errorCorrectionLevel: "M" });
const SIZE = qr.modules.size;
const DATA = qr.modules.data as Uint8Array;

const QrSvg: React.FC<{ px: number }> = ({ px }) => {
  const cell = px / (SIZE + 8); // 4-module quiet zone each side
  const rects: React.ReactNode[] = [];
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      if (DATA[y * SIZE + x]) {
        rects.push(
          <rect
            key={`${x}-${y}`}
            x={(x + 4) * cell}
            y={(y + 4) * cell}
            width={cell + 0.35}
            height={cell + 0.35}
            fill="#0f172a"
          />
        );
      }
    }
  }
  return (
    <svg width={px} height={px} style={{ display: "block", background: "#fff" }}>
      {rects}
    </svg>
  );
};

// The person caught in the middle: a worried face with question marks
// drifting up. Appears once QR and phone are both on screen.
const WorriedUser: React.FC<{ appear: number }> = ({ appear }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - appear, fps, config: { damping: 200 } });
  const t = Math.max(0, (frame - appear) / fps);
  const marks = [
    { delay: 0.0, x: -46, size: 30, color: "#94a3b8" },
    { delay: 0.6, x: 8, size: 42, color: "#fbbf24" },
    { delay: 1.2, x: 52, size: 26, color: "#94a3b8" },
  ];
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: 300,
        transform: `translateX(-50%) scale(${s})`,
        opacity: s,
        width: 200,
        height: 260,
        fontFamily: theme.font,
      }}
    >
      {marks.map((m, i) => {
        const cycle = ((t - m.delay) % 2.0 + 2.0) % 2.0; // 2s loop
        const active = t > m.delay ? 1 : 0;
        const rise = cycle * 46;
        const fade = Math.sin(Math.min(1, cycle / 2.0) * Math.PI);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 100 + m.x,
              top: 120 - rise,
              fontSize: m.size,
              fontWeight: 800,
              color: m.color,
              opacity: active * fade,
            }}
          >
            ?
          </div>
        );
      })}
      <svg
        width={110}
        height={110}
        viewBox="0 0 64 64"
        style={{ position: "absolute", left: 45, top: 140 }}
        aria-hidden
      >
        <circle cx="32" cy="32" r="28" fill="#1f2937" stroke="#e2e8f0" strokeWidth="2.6" />
        {/* worried brows */}
        <path d="M18 24 L27 20.5" stroke="#e2e8f0" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M46 24 L37 20.5" stroke="#e2e8f0" strokeWidth="2.6" strokeLinecap="round" />
        {/* eyes */}
        <circle cx="24" cy="30" r="2.6" fill="#e2e8f0" />
        <circle cx="40" cy="30" r="2.6" fill="#e2e8f0" />
        {/* frown */}
        <path d="M22 45 Q32 37 42 45" stroke="#e2e8f0" strokeWidth="2.6" fill="none" strokeLinecap="round" />
        {/* sweat drop */}
        <path d="M51 14 q4 6 0 8 q-4 -2 0 -8" fill="#fbbf24" />
      </svg>
    </div>
  );
};

export const QrScanToPhone: React.FC<{
  asset: string;
  qrLabel: string;
  caption?: string;
  /** Which side the phone lands on (the QR travels to the other side). */
  phoneSide: "right" | "left";
  vertical?: boolean;
}> = ({ asset, qrLabel, caption, phoneSide, vertical = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const swap = fps * 1.6; // when the QR yields the center
  const travelFrames = fps * 0.65;

  const qrIn = spring({ frame, fps, config: { damping: 200 } });
  const travel = interpolate(frame, [swap, swap + travelFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const eased = 1 - Math.pow(1 - travel, 3);

  // Wide: side-by-side split. Vertical: stacked (QR up, phone below).
  const qrOffset = vertical ? -480 : phoneSide === "right" ? -400 : 400;
  const phoneOffset = vertical ? 330 : phoneSide === "right" ? 400 : -400;
  const axis = vertical ? "translateY" : "translateX";

  const qrShift = eased * qrOffset;
  const qrScale = qrIn * (1 - eased * (vertical ? 0.25 : 0.08));
  const phoneIn = interpolate(frame, [swap + fps * 0.15, swap + fps * 0.85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phoneEased = 1 - Math.pow(1 - phoneIn, 3);
  const phoneShift = phoneOffset + (1 - phoneEased) * (vertical ? 260 : phoneSide === "right" ? 320 : -320);

  return (
    <AbsoluteFill style={{ background: theme.night }}>
      {/* The QR card: centered, then travelling aside */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          opacity: qrIn,
          transform: `${axis}(${qrShift}px) scale(${qrScale})`,
          paddingBottom: vertical ? 0 : 120,
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 24,
            padding: 28,
            boxShadow: "0 40px 120px rgba(0,0,0,0.6)",
          }}
        >
          <QrSvg px={vertical ? 340 : 370} />
          <div
            style={{
              fontFamily: theme.font,
              fontSize: 23,
              fontWeight: 600,
              color: theme.ink,
              textAlign: "center",
              marginTop: 16,
              maxWidth: vertical ? 340 : 370,
            }}
          >
            {qrLabel}
          </div>
        </div>
      </AbsoluteFill>

      {/* The wallet, arriving beside (wide) or below (vertical) */}
      <AbsoluteFill
        style={{
          opacity: phoneEased,
          transform: `${axis}(${phoneShift}px)`,
        }}
      >
        <PhoneClip asset={asset} label={caption} transparent />
      </AbsoluteFill>

      {/* The worried person in the middle (wide only) */}
      {!vertical ? <WorriedUser appear={swap + fps * 0.4} /> : null}
    </AbsoluteFill>
  );
};
