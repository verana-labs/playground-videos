// Design tokens mirroring the playground language: light surfaces, vibrant
// purple-blue gradient, white cards, emerald "verified" accents. Body text
// bundles Inter (deterministic stand-in for the site's system sans); brand
// wordmarks use Space Grotesk (the Verana display font).
import { loadFont } from "@remotion/google-fonts/Inter";
import { loadFont as loadSpaceGrotesk } from "@remotion/google-fonts/SpaceGrotesk";

const { fontFamily } = loadFont();
const { fontFamily: displayFamily } = loadSpaceGrotesk();

export const theme = {
  font: fontFamily,
  display: displayFamily, // Space Grotesk, for brand wordmarks
  mono: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  // Palette (playground hero gradient + Tailwind hues used across the site).
  purple: "#764ba2",
  indigo: "#667eea",
  ink: "#0f172a", // slate-900
  muted: "#475569", // slate-600
  faint: "#94a3b8", // slate-400
  surface: "#f8fafc", // slate-50
  card: "#ffffff",
  green: "#10b981", // emerald-500, the verified color
  violet: "#7c3aed", // violet-600, the playground logo violet
  greenDark: "#065f46", // emerald-800
  red: "#ef4444", // red-500
  redDark: "#991b1b", // red-800
  amber: "#f59e0b",
  gradient: "linear-gradient(135deg, #764ba2 0%, #667eea 60%, #667eea 100%)",
  night: "#0b0d16", // intro question shots run on near-black
} as const;
