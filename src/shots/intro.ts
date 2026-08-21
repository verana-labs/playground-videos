// INTRO v1 - locked shared opening, spec §3 (verana-spec/playground/video/spec.md).
// Evergreen rules: use-case-agnostic, nothing that ages. Any change here bumps
// the intro version in the spec and re-renders every video.
import { Shot, validateShots } from "./types";

export const INTRO_VERSION = "v1";

export const INTRO_SHOTS: Shot[] = validateShots([
  {
    id: "I-0",
    start: 0,
    end: 6,
    // The visual carries all copy: lockup, [ OPEN · PUBLIC · NEUTRAL ],
    // and the positioning line. Ends dimming to night, straight into I-1.
    lines: [],
    vo: "Verana. The open trust infrastructure for the verifiable internet.",
    visual: { kind: "brand-open" },
    tone: "light",
  },
  {
    id: "I-1",
    start: 6,
    end: 12,
    lines: ["Have you ever wondered...", "who is really behind this service?"],
    vo: "Have you ever wondered... who is really behind this service? The one asking for your name, your birth date, your passport?",
    visual: { kind: "login-glitch" },
    tone: "dark",
  },
  {
    id: "I-2",
    start: 12,
    end: 19,
    lines: ["And behind this AI agent?"],
    vo: "And behind this AI agent?",
    visual: { kind: "agent-flicker" },
    tone: "dark",
  },
  {
    id: "I-3",
    start: 19,
    end: 25,
    lines: ["And when you receive a credential...", "is it real? Is the issuer accredited to issue it?"],
    vo: "And when you receive a credential: is it real? Is the issuer even accredited to issue it?",
    visual: {
      kind: "qr-scan-phone",
      asset: "clips/intro-issuer-unaccredited",
      qrLabel: "Scan this QR to get your credential",
      phoneSide: "right",
    },
    duck: true,
    tone: "dark",
  },
  {
    id: "I-4",
    start: 25,
    end: 31,
    lines: ["And when a service asks for your ID...", "is it even allowed to ask?"],
    vo: "And when a service asks for your ID: is it even allowed to ask?",
    visual: {
      kind: "qr-scan-phone",
      asset: "clips/intro-verifier-unaccredited",
      qrLabel: "Scan this QR to present your ID",
      phoneSide: "left",
    },
    duck: true,
    tone: "dark",
  },
  {
    id: "I-5",
    start: 31,
    end: 38,
    lines: [
      "And what if you want to build your own sovereign ecosystem...",
      "where do you store your schemas? The list of accredited issuers and relying parties?",
    ],
    vo: "And what if you want to build your own sovereign ecosystem: where do you store your schemas, the list of accredited issuers and relying parties?",
    visual: { kind: "sovereign-build" },
    tone: "dark",
  },
  {
    id: "I-6",
    start: 38,
    end: 44,
    lines: ["And finally... how do others find your ecosystem and join?"],
    vo: "And finally: how do others find your ecosystem, and join?",
    visual: { kind: "ecosystem-search" },
    tone: "dark",
  },
  {
    id: "I-7",
    start: 44,
    end: 48,
    lines: ["Today, most of us think we must stick to static trust lists, vendor lock-in, or silos."],
    vo: "Today, most of us think we must stick to static trust lists, vendor lock-in, or silos.",
    visual: { kind: "black" },
    tone: "dark",
  },
  {
    id: "I-8",
    start: 48,
    end: 52,
    lines: ["But there is Verana."],
    vo: "But there is Verana.",
    // The turn to daylight: the verana.io lockup alone on the light stage;
    // I-9 then carries the same lockup to the top (pixel-continuous).
    visual: { kind: "brand-reveal" },
    tone: "light",
  },
  {
    id: "I-9",
    start: 52,
    end: 60,
    lines: ["Ecosystems. Verifiable Identity. Discovery.", "One open, public trust layer."],
    vo: "Build and/or join ecosystem trust registries, with their governance, schemas and accreditations. Verifiable identity for services and AI agents, with a Proof of Trust. And find services for what they prove. One open, public trust layer.",
    visual: { kind: "triptych" },
    tone: "light",
  },
  {
    id: "I-10",
    start: 60,
    end: 72,
    lines: [
      "Attach credentials to your services. Prove you're accredited. Then let your users just verify they can trust you.",
    ],
    vo: "Attach credentials to your services. Prove you are accredited. Then let your users just verify they can trust you: a real Proof of Trust, resolved against the public registry, in any of the integrated wallets. Build and join sovereign ecosystems on an open, public infrastructure, owned by no one. Verana. verana.io.",
    visual: { kind: "standards" },
    tone: "light",
    // The finale takes over at 7.5 s: content shrinks away, the lockup grows
    // to the center, the URL and closing tagline appear. The line fades just
    // before.
    textFadeOut: [7.2, 7.9],
  },
]);

export const INTRO_END = 72;
