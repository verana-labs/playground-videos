// Outro, spec §5. Semi-shared: only the URL card changes per use case (and
// once at mainnet). Times are absolute on the master timeline.
import { Shot, validateShots } from "./types";
import { ACT_END } from "./timeline";

export const outroShots = (url: string): Shot[] =>
  validateShots([
    {
      id: "O-1",
      start: ACT_END,
      end: ACT_END + 10,
      lines: ["Try it yourself. Any of these wallets. Nothing simulated."],
      visual: { kind: "roster" },
      tone: "light",
    },
    {
      id: "O-2",
      start: ACT_END + 10,
      end: ACT_END + 20,
      lines: [],
      visual: { kind: "url-card", url, tagline: "Open source. Reproducible. Verana." },
      tone: "dark",
    },
  ]);

export const VESTA_URL = "playground.testnet.verana.network/usecases/vesta";
export const VERANDIA_URL = "playground.testnet.verana.network/usecases/verandia";
