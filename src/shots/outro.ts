// Outro, spec §6. Semi-shared: only the URL card changes per use case (and
// once at mainnet). Placed from the act's end, which varies per act.
import { Shot, validateShots } from "./types";

export const outroShots = (url: string, actEnd: number): Shot[] =>
  validateShots([
    {
      id: "O-1",
      start: actEnd,
      end: actEnd + 10,
      lines: ["Try it yourself. Any of these wallets. Nothing simulated."],
      visual: { kind: "roster" },
      tone: "light",
    },
    {
      id: "O-2",
      start: actEnd + 10,
      end: actEnd + 22,
      lines: [],
      vo: "See the other use cases, in the Verana Playground.",
      visual: { kind: "playground-close" },
      tone: "light",
    },
  ]);

export const VESTA_URL = "playground.testnet.verana.network/usecases/vesta";
export const VERANDIA_URL = "playground.testnet.verana.network/usecases/verandia";
