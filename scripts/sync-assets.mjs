#!/usr/bin/env node
// Sync media from a local playground checkout into public/assets/, then
// rebuild public/assets/manifest.json from whatever is on disk (synced files
// AND anything dropped by hand, e.g. captures/ and music.mp3).
//
// Usage:
//   PLAYGROUND_DIR=../playground npm run sync      (default ../playground)
//   INTRO_WALLET=inji npm run sync                 (wallet whose generic
//                                                   six-scenario clips feed
//                                                   intro shots I-3 / I-4)
//
// The manifest maps a logical id (subpath without extension) to the file's
// path under public/, e.g. "verandia/hero" -> "assets/verandia/hero.webp".
// Components fall back to a labeled placeholder for any id absent from the
// manifest, so the project renders end to end with nothing synced.

import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const playground = resolve(root, process.env.PLAYGROUND_DIR ?? "../playground");
const introWallet = process.env.INTRO_WALLET ?? "inji";
const assetsDir = join(root, "public", "assets");

// Wallets shown on the outro roster (visible playground integrations; the
// hidden entries, procivis and swiyu, are deliberately excluded).
const ROSTER = [
  "inji",
  "eudi",
  "authbound",
  "paradym",
  "bcwallet",
  "wwwallet",
  "hologram",
  "sphereon",
  "talao",
  "nl-wallet",
];

// Vesta brand kit: chapter-1 imagery lives at the playground images root.
const VESTA_IMAGES = {
  emblem: "logo.webp",
  lineup: "lineup.webp",
  factory: "factory.webp",
  support: "support.webp",
  "fake-van": "fake-van3.webp",
  ceo: "ceo.webp",
  cto: "cto.webp",
  zenith: "zenith.webp",
  "iso-9001": "ISO_9001-2015.svg",
};

const copies = [
  // Vesta brand kit (act scenes S-1/S-2, handoff card).
  ...Object.entries(VESTA_IMAGES).map(([to, from]) => ({
    from: `public/images/${from}`,
    to: `vesta/${to}${extname(from)}`,
  })),
  // Verandia brand kit (act scenes V-1/V-2, handoff card).
  { from: "public/images/verandia", to: "verandia", dir: true },
  // Generic six-scenario clips for the locked intro (use-case-agnostic).
  {
    from: `public/wallets/${introWallet}/clips/2-issuer-unaccredited.mp4`,
    to: "clips/intro-issuer-unaccredited.mp4",
  },
  {
    from: `public/wallets/${introWallet}/clips/5-verifier-unaccredited.mp4`,
    to: "clips/intro-verifier-unaccredited.mp4",
  },
];

// Wallet logos for the roster strip (logo.* whatever the extension).
for (const id of ROSTER) {
  const dir = join(playground, "public", "wallets", id);
  if (!existsSync(dir)) continue;
  const logo = readdirSync(dir).find((f) => f.startsWith("logo."));
  if (logo) copies.push({ from: `public/wallets/${id}/${logo}`, to: `wallet-logos/${id}${extname(logo)}` });
}

// SVGs authored inline in JSX often lack the xmlns declaration; that is fine
// inline, but an SVG loaded as an image document (Img src) is parsed as XML
// and silently fails to render without it. Inject it on copy.
const fixSvgs = (path) => {
  if (statSync(path).isDirectory()) {
    for (const entry of readdirSync(path)) fixSvgs(join(path, entry));
    return;
  }
  if (!path.toLowerCase().endsWith(".svg")) return;
  const body = readFileSync(path, "utf8");
  if (!body.includes("xmlns=")) {
    writeFileSync(path, body.replace(/<svg\b/, '<svg xmlns="http://www.w3.org/2000/svg"'));
  }
};

let synced = 0;
if (!existsSync(playground)) {
  console.warn(`playground checkout not found at ${playground}; skipping copy, rebuilding manifest only.`);
} else {
  for (const c of copies) {
    const src = join(playground, c.from);
    if (!existsSync(src)) {
      console.warn(`missing in playground: ${c.from}`);
      continue;
    }
    const dest = join(assetsDir, c.to);
    mkdirSync(c.dir ? dest : dirname(dest), { recursive: true });
    cpSync(src, dest, { recursive: !!c.dir });
    fixSvgs(dest);
    synced++;
  }
}

// Rebuild the manifest from disk (picks up manual drops too: captures/, music.mp3).
// When one id exists in several formats (hero.png + hero.webp), the most
// web-friendly wins; source files like .xcf are ignored entirely.
const PREFERENCE = [".webp", ".svg", ".png", ".jpg", ".jpeg", ".mp4", ".webm", ".mp3", ".wav"];
const manifest = {};
const chosenExt = {};
const walk = (dir) => {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) walk(p);
    else if (!entry.startsWith(".") && entry !== "manifest.json") {
      const rel = relative(assetsDir, p).split("\\").join("/");
      const ext = extname(rel).toLowerCase();
      const rank = PREFERENCE.indexOf(ext);
      if (rank === -1) continue;
      const id = rel.replace(/\.[^.]+$/, "");
      const prev = chosenExt[id];
      if (prev !== undefined && PREFERENCE.indexOf(prev) <= rank) continue;
      chosenExt[id] = ext;
      manifest[id] = `assets/${rel}`;
    }
  }
};
walk(assetsDir);
mkdirSync(assetsDir, { recursive: true });
writeFileSync(join(assetsDir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`synced ${synced} sources, manifest has ${Object.keys(manifest).length} assets.`);
