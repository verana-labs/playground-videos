// INTRO v3 (spec/intro-v3.md) - starts as a copy of INTRO v2; iterate
// here freely: v1 and v2 stay locked and byte-identical. Scene kinds are the
// v3 copies (IntroV3Scenes.tsx), so visual edits never touch v2 either.
import { Shot, validateShots } from "./types";

export const INTRO3_SHOTS: Shot[] = validateShots([
  {
    id: "N-0",
    start: 0,
    end: 6,
    lines: [],
    vo: "Verana. The open trust infrastructure for the verifiable internet.",
    visual: { kind: "brand-open" },
    tone: "light",
  },
  {
    id: "N-1",
    start: 6,
    end: 24,
    lines: [
      "Verifiable Credentials are becoming a reality.",
      "Each ecosystem, bringing value to the entire digital economy.",
    ],
    vo: "Verifiable credentials are becoming a reality. The foundations are laid: issuer, holder, verifier, one trust triangle. And implementations are arriving in every sector: each ecosystem potentially bringing value to the entire digital economy.",
    visual: { kind: "foundations-v3" },
    tone: "light",
  },
  {
    id: "N-2",
    start: 24,
    end: 34,
    lines: [
      "The next challenges: interconnect ecosystems.",
      "Create at will, and monetize. Scale cross-border.",
      "Mutual authentication. Discovery.",
    ],
    vo: "The next challenges: interconnect ecosystems. Create new ones at will and monetize. Scale cross-border. Authenticate mutually. And discover trusted services.",
    visual: { kind: "silos-v3" },
    tone: "dark",
  },
  {
    id: "N-3",
    start: 34,
    end: 48,
    lines: [
      "Scale: create new ecosystems at will.",
      "Schemas, accreditation lists, business models...",
      "...publicly discoverable, interconnectable, joinable?",
    ],
    vo: "Scale, by creating ecosystems. How do we create new trust registries at will: publish schemas and accreditation lists, define business models, and make each ecosystem publicly discoverable, interconnectable, and joinable?",
    visual: { kind: "create-eco-q-v3" },
    tone: "dark",
  },
  {
    id: "N-4",
    start: 48,
    end: 56,
    lines: [
      "Scale cross-border.",
      "How to recognize and onboard ecosystems from any country, any sector?",
    ],
    vo: "Scale, cross-border. How do we recognize and onboard ecosystems from any country, and any sector?",
    visual: { kind: "cross-border-q-v3" },
    tone: "dark",
  },
  {
    id: "N-5",
    start: 56,
    end: 65,
    lines: [
      "Mutual authentication.",
      "Can services and AI agents from different countries identify and trust each other?",
    ],
    vo: "Mutual authentication. How do services and AI agents from different countries identify each other, and trust each other?",
    visual: { kind: "mutual-auth-v3" },
    tone: "dark",
  },
  {
    id: "N-6",
    start: 65,
    end: 72,
    lines: ["And finally: discovery.", "How do we search the graph of trusted services?"],
    vo: "And finally, discovery. How do we search the graph of trusted services?",
    visual: { kind: "ecosystem-search-v3" },
    tone: "dark",
  },
  {
    id: "N-8b",
    start: 72,
    end: 80,
    lines: ["Verana answers all of this.", "Open, neutral, owned by no one."],
    vo: "Verana answers all of this. Sovereign ecosystems, verifiable identity, one public Trust Graph. Open, neutral, owned by no one.",
    visual: { kind: "brand-reveal" },
    tone: "light",
  },
  {
    id: "N-9a",
    start: 80,
    end: 93,
    lines: [
      "Build your own sovereign ecosystem trust registry.",
      "Your ecosystem exists, and is discoverable.",
    ],
    vo: "Build your own sovereign ecosystem trust registry. Publish your Ecosystem Governance Framework, your credential schemas, business models. Onboard your ecosystem participants. Your ecosystem exists, and is discoverable.",
    visual: { kind: "build-eco-tree-v3" },
    tone: "light",
  },
  {
    id: "N-9b",
    start: 93,
    end: 106,
    lines: [],
    vo: "Then build your service: choose the ecosystems you would like to join, on Verana, or on other trust lists. Choose your personal wallet. And bridge to other ecosystems.",
    visual: { kind: "build-service-v3" },
    tone: "light",
  },
  {
    id: "N-10",
    start: 106,
    end: 123,
    lines: [],
    vo: "In essence: Verana enables trust to scale. Not just within one ecosystem: across the entire digital economy. Verana dot io.",
    visual: { kind: "verana-close-v3" },
    tone: "light",
  },
]);

export const INTRO3_END = 123;
