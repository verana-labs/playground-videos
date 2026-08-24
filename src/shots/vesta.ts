// The Vesta act (first video; spec §4), plus its handoff card. Story source:
// verana-spec → playground/verana-explained/spec.md (the Vesta Appliances
// cast: Helvetia Trust, ISO Certification + NormaCert, the Vesta Repair
// Network with Iberia/Nordics and Zenith, and Umbra the credentialed
// impostor). Act times are RELATIVE (0 to 280); the composition
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
  // §1 "The Company": the playground journey page, chapter by chapter, with
  // its exact paragraphs as the VO script (shown on screen in the visuals).
  {
    id: "S-1a",
    start: 0,
    end: 11,
    lines: [
      "Vesta Appliances: forty years of washing machines and ovens.",
      "Machines that last, and get repaired, not replaced.",
    ],
    vo: "Vesta Appliances: forty years of washing machines and ovens. Machines that last, and get repaired, not replaced.",
    visual: { kind: "vesta-company", part: "product-line" },
    tone: "light",
  },
  {
    id: "S-1b",
    start: 11,
    end: 24,
    lines: [
      "One plant, one assembly line, forty years of engineering.",
      "Designed from the first screw to be serviceable in your kitchen.",
    ],
    vo: "One plant, one assembly line, forty years of engineering. Designed from the first screw to be serviceable in your kitchen.",
    visual: { kind: "vesta-company", part: "factory" },
    tone: "light",
  },
  {
    id: "S-1c",
    start: 24,
    end: 40,
    lines: [
      "120 independent repair companies, certified by Vesta.",
      "Training, yearly audits, a signed partner contract.",
    ],
    vo: "120 independent repair companies, certified by Vesta. Training, yearly audits, a signed partner contract.",
    visual: { kind: "vesta-company", part: "repair-network" },
    tone: "light",
  },
  {
    id: "S-1d",
    start: 40,
    end: 54,
    lines: ["Customers ask for help. Employees sign in. Partners order parts."],
    vo: "Customers ask for help. Employees sign in. Partners order parts.",
    visual: { kind: "vesta-company", part: "services" },
    tone: "light",
  },
  {
    id: "S-2",
    start: 54,
    end: 66,
    lines: [
      "Fake support lines. Password pain. Paperwork, again and again.",
      "And at the front door: fake authorized repairers.",
    ],
    vo: "Fake support lines. Password pain. Paperwork, again and again. And at the front door: fake authorized repairers. Nothing can be proven.",
    visual: { kind: "vesta-problems" },
    tone: "light",
  },
  {
    id: "S-4",
    start: 66,
    end: 86,
    lines: [],
    vo: "Marc, CTO of Vesta, will make the company verifiable. His list is short: verifiable identities for organizations. Verifiable identities for services. Credentials people can hold. Certifications as proof, not PDFs. And Vesta's own rules for its network.",
    visual: { kind: "vesta-needs" },
    tone: "light",
  },
  {
    id: "S-5",
    start: 86,
    end: 104,
    lines: [
      "Vesta joins the Verana ECS Ecosystem: one KYB, provable everywhere.",
      "And the ISO Certification Ecosystem: the paper certificate becomes proof.",
    ],
    vo: "Vesta picks the two it needs. The Verana ECS Ecosystem: one KYB, and Vesta is provable everywhere. And the ISO Certification Ecosystem: the paper certificate becomes proof.",
    visual: { kind: "vesta-join" },
    tone: "light",
  },
  {
    id: "S-6",
    start: 104,
    end: 120,
    lines: [
      "Only Vesta can say who is an authorized Vesta repairer.",
      "So Vesta builds its own ecosystem: governed issuance, open verification.",
    ],
    vo: "One need remains: only Vesta can say who is an authorized Vesta repairer. So Vesta builds its own ecosystem: the Vesta Repair Network. Issuance governed, verification open, and revocable.",
    visual: { kind: "vesta-build-eco" },
    tone: "light",
  },
  // §3 Marc's journey: the page's scene graph, subsection by subsection,
  // with the exact story text as VO (src/components/VestaJourney.tsx).
  {
    id: "J-1",
    start: 120,
    end: 134,
    lines: [
      "Marc deploys Vesta's Business Wallet: a DID is generated.",
      "It proves nothing yet: the empty identity card.",
    ],
    vo: "Marc deploys Vesta's Business Wallet: a DID is generated. It proves nothing yet: the empty identity card.",
    visual: {
      kind: "vesta-journey",
      sectionKicker: "3 · MARC'S JOURNEY",
      sectionTitle: "Need 1 · Vesta Organization identity",
      stage: "3.1",
      stepId: "3.1",
      stepTitle: "Marc deploys Vesta's Business Wallet",
      selects: [
        { at: 1.2, node: "vesta" },
      ],
    },
    tone: "light",
  },
  {
    id: "J-2",
    start: 134,
    end: 150,
    lines: [
      "Helvetia Trust runs the KYB, once, over DIDComm.",
      "Vesta's wallet receives its Organization credential.",
    ],
    vo: "Helvetia Trust runs the KYB, once, over DIDComm. Vesta's wallet receives its Organization credential.",
    visual: {
      kind: "vesta-journey",
      sectionKicker: "3 · MARC'S JOURNEY",
      sectionTitle: "Need 1 · Vesta Organization identity",
      stage: "3.2",
      stepId: "3.2",
      stepTitle: "KYB with an accredited issuer",
      selects: [
        { at: 1.2, node: "orgIssuer" },
        { at: 8.5, node: "vesta" },
      ],
    },
    tone: "light",
  },
  {
    id: "J-3",
    start: 150,
    end: 164,
    lines: [
      "Vesta self-issues its Service credential.",
      "Valid: the same DID presents the proven organization.",
    ],
    vo: "Vesta self-issues its Service credential. Valid: the same DID presents the proven organization.",
    visual: {
      kind: "vesta-journey",
      sectionKicker: "3 · MARC'S JOURNEY",
      sectionTitle: "Need 2 · Service identity",
      stage: "3.3",
      stepId: "3.3",
      stepTitle: "The Service credential, self-issued",
      selects: [
        { at: 1.5, node: "vesta" },
      ],
    },
    tone: "light",
  },
  {
    id: "J-4",
    start: 164,
    end: 178,
    lines: [
      "Vesta self-accredits as an ECS-Badge issuer.",
      "Every employee gets a badge, in their own wallet.",
    ],
    vo: "Vesta self-accredits as an ECS-Badge issuer. Every employee gets a badge, in their own wallet.",
    visual: {
      kind: "vesta-journey",
      sectionKicker: "3 · MARC'S JOURNEY",
      sectionTitle: "Need 3 · Vesta employee badges",
      stage: "3.4",
      stepId: "3.4",
      stepTitle: "Vesta becomes an ECS-Badge issuer",
      selects: [
        { at: 1.5, node: "vesta" },
        { at: 8, node: "emp2" },
      ],
    },
    tone: "light",
  },
  {
    id: "J-5",
    start: 178,
    end: 196,
    lines: [
      "A dedicated login service, verifiable in its own right.",
      "Only badges from Vesta's trust anchor are accepted.",
      "No passwords. The same badge opens the door.",
    ],
    vo: "A dedicated login service, verifiable in its own right. Only badges from Vesta's trust anchor are accepted. No passwords. The same badge opens the door.",
    visual: {
      kind: "vesta-journey",
      sectionKicker: "3 · MARC'S JOURNEY",
      sectionTitle: "Need 3 · Vesta employee badges",
      stage: "3.5",
      stepId: "3.5",
      stepTitle: "A verifiable login service, accredited to verify badges",
      selects: [
        { at: 1.5, node: "portal" },
      ],
    },
    tone: "light",
  },
  {
    id: "J-6",
    start: 196,
    end: 212,
    lines: [
      "NormaCert recognizes Vesta's credential: no paperwork, no re-checks.",
      "ISO 9001 becomes a verifiable credential.",
    ],
    vo: "NormaCert recognizes Vesta's credential: no paperwork, no re-checks. ISO 9001 becomes a verifiable credential.",
    visual: {
      kind: "vesta-journey",
      sectionKicker: "3 · MARC'S JOURNEY",
      sectionTitle: "Need 4 · ISO 9001 credential",
      stage: "3.6",
      stepId: "3.6",
      stepTitle: "ISO 9001, without re-certifying",
      selects: [
        { at: 1.5, node: "normacert" },
        { at: 9, node: "vesta" },
      ],
    },
    tone: "light",
  },
  {
    id: "J-7",
    start: 212,
    end: 230,
    lines: [
      "Vesta creates the Vesta Repair Network ecosystem.",
      "Issuance governed. Verification open.",
      "Zenith Repairs joins: an Authorized Repairer.",
    ],
    vo: "Vesta creates the Vesta Repair Network ecosystem. Issuance governed. Verification open. Zenith Repairs joins: an Authorized Repairer.",
    visual: {
      kind: "vesta-journey",
      sectionKicker: "3 · MARC'S JOURNEY",
      sectionTitle: "Need 5 · Vesta's own rules for its network",
      stage: "3.7",
      stepId: "3.7",
      stepTitle: "The Vesta Repair Network",
      selects: [
        { at: 1.5, node: "vestaEco" },
        { at: 10, node: "zenith" },
      ],
    },
    tone: "light",
  },
  {
    id: "J-8",
    start: 230,
    end: 246,
    lines: [
      "Zenith badges its technicians. They log in to the Vesta portal.",
      "And at the door: the Vesta Authorized Repairer seal.",
    ],
    vo: "Zenith badges its technicians. They log in to the Vesta portal. And at the door: the Vesta Authorized Repairer seal.",
    visual: {
      kind: "vesta-journey",
      sectionKicker: "3 · MARC'S JOURNEY",
      sectionTitle: "Need 5 · Vesta's own rules for its network",
      stage: "3.8",
      stepId: "3.8",
      stepTitle: "Authorized Repairer login - and at the front door",
      selects: [
        { at: 1.5, node: "zenith" },
        { at: 9, node: "techWallet" },
      ],
    },
    tone: "light",
  },
  {
    id: "J-9",
    start: 246,
    end: 262,
    lines: [
      "Umbra Repairs: verifiable, even trusted.",
      "But no Authorized Repairer credential. Refused.",
    ],
    vo: "Umbra Repairs: verifiable, even trusted. But no Authorized Repairer credential. Refused.",
    visual: {
      kind: "vesta-journey",
      sectionKicker: "3 · MARC'S JOURNEY",
      sectionTitle: "Need 5 · Vesta's own rules for its network",
      stage: "3.8",
      stepId: "3.8",
      stepTitle: "How about unauthorized repair companies?",
      selects: [
        { at: 1.2, node: "umbra" },
      ],
      noDiagram: true,
      umbraOverride: true,
    },
    tone: "light",
  },
  // §4: what you can try yourself.
  {
    id: "D-1",
    start: 262,
    end: 280,
    lines: [],
    vo: "Try it yourself: get a badge from Vesta Appliances, Zenith Repairs, or even Umbra Repairs. Log in to the Vesta portal and see the result. And at the front door, scan the technician's badge: trust before you open.",
    visual: { kind: "vesta-demos" },
    tone: "light",
  },
]);
