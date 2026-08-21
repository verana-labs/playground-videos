// The Verandia act (second video, deferred; spec §5), plus its handoff card.
// Times are absolute on the master timeline (handoff 45 to 50, act 50 to 220).
import { Shot, validateShots } from "./types";
import { ACT_START, HANDOFF_START } from "./timeline";

export const VERANDIA_HANDOFF: Shot = {
  id: "H-verandia",
  start: HANDOFF_START,
  end: ACT_START,
  lines: [],
  visual: {
    kind: "handoff",
    emblem: "verandia/verandia-logo",
    title: "Today: the Republic of Verandia.",
    subtitle: "A democracy deploys verifiable identity for citizens and businesses.",
  },
  tone: "light",
};

export const VERANDIA_SHOTS: Shot[] = validateShots([
  {
    id: "V-1",
    start: 0,
    end: 15,
    lines: [
      "A small democracy. Real institutions.",
      "Passwords everywhere. Paper that anyone can edit.",
      "And scammers who look exactly like the Republic.",
    ],
    vo: "Meet the Republic of Verandia. Real institutions, real services, and the same problem every country has: online, the Republic's word looks exactly like a scammer's word.",
    visual: {
      kind: "image-scene",
      tint: "problem",
      items: [
        { asset: "verandia/hero" },
        { asset: "verandia/institutions" },
        { mock: "password", label: "Reset your password" },
        { mock: "pdf", label: "Company extract, editable by anyone" },
        { asset: "verandia/phishing", label: "verandia-tax-refunds.example" },
      ],
    },
    tone: "light",
  },
  {
    id: "V-2",
    start: 15,
    end: 25,
    lines: ['"That has to change."', "Five needs. One public trust layer."],
    vo: "The Prime Minister decides that has to change. The Digital Minister lists five needs, and builds them all on Verana.",
    visual: {
      kind: "image-scene",
      items: [
        { asset: "verandia/pm", label: "The Prime Minister" },
        { asset: "verandia/minister", label: "The Digital Minister" },
      ],
    },
    tone: "light",
  },
  {
    id: "V-3",
    start: 25,
    end: 60,
    lines: [
      "The Business Registry becomes an accredited issuer. Company identity becomes a lookup, not paperwork.",
      "The Civil Registry creates the Citizen ID ecosystem. Only it may issue. Relying parties must register to verify.",
      "Banks and services prove who they are before you type anything.",
    ],
    vo: "The National Business Registry becomes an accredited issuer of Organization credentials, so proving a company is a lookup, not paperwork. The Civil Registry creates the Citizen ID ecosystem: it alone issues, and relying parties must register before wallets will share anything. Meridian Bank proves it is really your bank, before you type a password.",
    visual: {
      kind: "build",
      entities: [
        { label: "Business Registry", at: 0.05 },
        { label: "Civil Registry", at: 0.3 },
        { label: "Citizen ID ecosystem", at: 0.45 },
        { label: "Meridian Bank", at: 0.65 },
        { label: "Tax Buro", at: 0.78 },
        { label: "Legal Representation", at: 0.9 },
      ],
    },
    tone: "light",
  },
  {
    id: "V-4",
    start: 60,
    end: 105,
    lines: [
      "Your ID card, in the wallet you choose.",
      "One scan to file your taxes.",
      "KYC in one scan.",
      "Sign for your company, provably, revocably.",
    ],
    vo: "Aria receives her Citizen ID in the wallet she chooses, any wallet from an open roster. One scan signs her in at the Tax Buro. One scan opens her account at Meridian Bank. Tomás presents his proof of legal representation and acts for his bakery, and the day it ends, it is revoked.",
    visual: {
      kind: "captures",
      items: [
        { asset: "captures/citizen-id-issuance", label: "Get your Citizen ID" },
        { asset: "captures/tax-login", label: "Tax Buro, one scan" },
        { asset: "captures/bank-kyc", label: "Meridian Bank, KYC in one scan" },
        { asset: "captures/legal-rep", label: "Solaris Bakery (demo), corporate access" },
      ],
    },
    duck: true,
    tone: "dark",
  },
  {
    id: "V-5",
    start: 105,
    end: 145,
    lines: [
      "QuickCash is a real, verified company.",
      "But it never registered as a relying party.",
      "The wallet refuses to share. Your data never leaves.",
      "And the fake portal? It cannot even prove who it is.",
    ],
    vo: "Then QuickCash Loans asks for Aria's ID. QuickCash is real, verified, trustable. But it holds no verifier permission on the Citizen ID. Trust is not authorization: every compliant wallet refuses, and her data never leaves. The fake refund portal fails one step earlier: it cannot prove who it is at all.",
    visual: {
      kind: "captures",
      items: [
        { asset: "captures/quickcash-refusal", label: "Verified, but not authorized to request" },
        { asset: "captures/fake-portal", label: "Cannot prove who it is" },
      ],
    },
    duck: true,
    tone: "dark",
  },
  {
    id: "V-6",
    start: 145,
    end: 170,
    lines: [
      "Everything published here is public, resolvable, indexable.",
      "A national service directory nobody maintains by hand.",
    ],
    vo: "And because everything the Republic published is public and resolvable, discovery comes for free: every verified business, every authorized service, every representative. A directory nobody maintains by hand.",
    visual: {
      kind: "directory",
      queries: [
        { q: "all verified Verandian businesses", a: "38 organizations, all with a provable Business ID" },
        { q: "services accepting the Verandia Citizen ID", a: "Tax Buro, Meridian Bank. QuickCash Loans is not on this list" },
        { q: "who represents Solaris Bakery (demo)?", a: "Tomás Ferreira, managing director, valid today" },
      ],
    },
    tone: "light",
  },
]);
