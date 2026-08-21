// The Vesta act (first video; spec §4), plus its handoff card. Story source:
// verana-spec → playground/verana-explained/spec.md (the Vesta Appliances
// cast: Helvetia Trust, ISO Certification + NormaCert, the Vesta Repair
// Network with Iberia/Nordics and Zenith, and Umbra the credentialed
// impostor). Act times are RELATIVE (0 to 170); the composition
// assembly shifts them to ACT_START (src/shots/timeline.ts). The star scene is the refusal: Umbra is verifiable but
// holds no Authorized Repairer credential; trust is not membership.
import { Shot, validateShots } from "./types";
import { ACT_START, HANDOFF_START } from "./timeline";

export const VESTA_HANDOFF: Shot = {
  id: "H-vesta",
  start: HANDOFF_START,
  end: ACT_START,
  lines: [],
  visual: {
    kind: "handoff",
    emblem: "vesta/emblem",
    title: "Today: Vesta Appliances.",
    subtitle: "A brand fights impostors with proof.",
  },
  tone: "light",
};

export const VESTA_SHOTS: Shot[] = validateShots([
  {
    id: "S-1",
    start: 0,
    end: 15,
    lines: [
      "An appliance maker. A certified repair network.",
      "But the repair badge is paper. Anyone can print it.",
      "Fake support lines. Impostor vans. In Vesta's name.",
    ],
    vo: "Meet Vesta Appliances: a household appliance maker with a certified repair network. The certification badge is paper, and online, anyone can print one. Fake support lines and impostor vans trade on Vesta's name.",
    visual: {
      kind: "image-scene",
      tint: "problem",
      items: [
        { asset: "vesta/lineup" },
        { asset: "vesta/factory" },
        { asset: "vesta/support", label: "vesta-official-support.example" },
        { asset: "vesta/fake-van", label: "not a Vesta partner" },
      ],
    },
    tone: "light",
  },
  {
    id: "S-2",
    start: 15,
    end: 25,
    lines: ['"That has to change."', "Five needs. One public trust layer."],
    vo: "The CEO decides that has to change. Marc, the CTO, lists five needs, and builds them all on Verana.",
    visual: {
      kind: "image-scene",
      items: [
        { asset: "vesta/ceo", label: "The CEO" },
        { asset: "vesta/cto", label: "The CTO" },
      ],
    },
    tone: "light",
  },
  {
    id: "S-3",
    start: 25,
    end: 60,
    lines: [
      "One KYB, by an accredited issuer. Vesta becomes provable.",
      "NormaCert turns the ISO 9001 paper certificate into a credential.",
      "And Vesta writes its own rules: the Authorized Repairer credential, issued by its subsidiaries.",
    ],
    vo: "Helvetia Trust runs the KYB once, and Vesta's identity becomes provable, everywhere. NormaCert, accredited in the ISO Certification ecosystem, turns the paper certificate into a verifiable credential, no re-identification needed. Then Vesta creates its own ecosystem: the Authorized Repairer credential, issued by Vesta Iberia and Vesta Nordics to genuine partners like Zenith Repairs.",
    visual: {
      kind: "build",
      entities: [
        { label: "Helvetia Trust", at: 0.05 },
        { label: "Vesta Appliances", at: 0.22 },
        { label: "ISO Certification", at: 0.4 },
        { label: "Vesta Repair Network", at: 0.58 },
        { label: "Vesta Iberia + Nordics", at: 0.74 },
        { label: "Zenith Repairs", at: 0.88 },
      ],
    },
    tone: "light",
  },
  {
    id: "S-4",
    start: 60,
    end: 105,
    lines: [
      "Customers see who they talk to. Before they type.",
      "Employee badges, in the wallet of their choice.",
      "Partners log in with proof, not passwords.",
      "At your door: scan the badge, see the Vesta seal.",
    ],
    vo: "Now customers see who they are talking to before they type a word. Employees carry their badge in the wallet they choose. Partners log in with proof instead of passwords. And at your door, you scan the technician's badge and see the Vesta seal, backed by the registry.",
    visual: {
      kind: "captures",
      items: [
        { asset: "captures/vesta-pot", label: "Proof of Trust, before you connect" },
        { asset: "captures/vesta-badge-issuance", label: "An employee badge lands in a wallet" },
        { asset: "captures/vesta-badge-login", label: "Partner login, one scan" },
        { asset: "captures/vesta-door-scan", label: "At the door: badge scanned, seal shown" },
      ],
    },
    duck: true,
    tone: "dark",
  },
  {
    id: "S-5",
    start: 105,
    end: 145,
    lines: [
      "Umbra Repairs is real. Verified, even.",
      "But it holds no Authorized Repairer credential.",
      "Its badges are refused. No seal at the door.",
      "Trust is not membership. Proof is.",
    ],
    vo: "Then comes Umbra Repairs: a real, verified company, with real credentials. But it holds no Authorized Repairer credential from Vesta's network. Its technician badges are refused at the portal, and at the door there is no seal. Being verifiable is not being authorized: the red verdict comes from the missing credential.",
    visual: {
      kind: "captures",
      items: [
        { asset: "captures/vesta-umbra-refusal", label: "Verified organization, no Authorized Repairer" },
        { asset: "captures/vesta-umbra-door", label: "No credential, no seal" },
      ],
    },
    duck: true,
    tone: "dark",
  },
  {
    id: "S-6",
    start: 145,
    end: 170,
    lines: [
      "Every partner Vesta authorized is publicly resolvable.",
      "A partner directory that maintains itself.",
    ],
    vo: "And because every authorization lives on a public registry, discovery comes for free: every Authorized Repairer, every ISO-certified partner, resolvable by anyone. A partner directory nobody maintains by hand.",
    visual: {
      kind: "directory",
      queries: [
        { q: "all Authorized Repairers", a: "120 companies, every one provable" },
        { q: "Authorized Repairers holding ISO 9001 (demo)", a: "Zenith Repairs and 16 more" },
        { q: "is Umbra Repairs authorized?", a: "No. Verified organization, but no Authorized Repairer credential" },
      ],
    },
    tone: "light",
  },
]);
