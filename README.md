# playground-videos

Remotion project for the Verana Playground use-case videos: one locked shared
intro (INTRO v1) plus one act per use case. **Vesta Appliances is the first
video**; the Verandia act is drafted and deferred. The production spec,
including every shot's timing and exact on-screen copy, lives in
[`verana-spec → playground/video/spec.md`](https://github.com/verana-labs/verana-spec/blob/main/playground/video/spec.md);
this repo is its implementation. Shot data mirrors the spec tables in
`src/shots/`. Branding is the **playground design language**: the playground
lockup (violet + emerald bull-horn V), the purple-blue gradient, light
surfaces; body text Inter, brand wordmarks Space Grotesk. A "Verana
Playground" banner sits top-left on every frame, and the I-8 reveal carries
the verana.io lockup (gradient tile, "Verana" in black).

## Quick start

```bash
npm install
npm run sync          # copy media from a local playground checkout (see below)
npm run dev           # Remotion Studio at http://localhost:3000
```

Renders:

```bash
npm run render:intro            # out/intro-v1.mp4          (1:12, 16:9)
npm run render:vesta            # out/vesta.mp4             (4:27, 16:9)
npm run render:vesta-vertical   # out/vesta-vertical.mp4    (1:00, 9:16)
npm run render:verandia         # out/verandia.mp4          (deferred act)
npm run render:verandia-vertical
```

The project renders end to end with **zero assets**: anything missing shows a
labeled placeholder naming the id to provide. Fill assets in three ways:

## 1. Synced assets (`npm run sync`)

`scripts/sync-assets.mjs` copies from a local checkout of
[`verana-labs/playground`](https://github.com/verana-labs/playground)
(default `../playground`, override with `PLAYGROUND_DIR=...`):

- the Vesta brand kit (logo, lineup, factory, support, impostor van, CEO/CTO
  portraits, ISO seal, from the playground images root),
- the Verandia brand kit (`public/images/verandia/*`),
- two generic six-scenario wallet clips for intro shots I-3/I-4
  (default wallet `inji`, override with `INTRO_WALLET=...`),
- wallet logos for the outro roster.

It then rebuilds `public/assets/manifest.json` from whatever is on disk, so it
also picks up everything you drop by hand (below). `public/assets/` is
gitignored; re-run sync after any manual change.

## 2. Captures (recorded by hand, the honesty rule)

Real devices, live against the cast on testnet, silent, one session so wallet
UI versions match. Record with `adb shell screenrecord` or `scrcpy --record`,
then drop the files at these exact paths and re-run `npm run sync`.

**Vesta (first video):**

| Path under `public/assets/` | Content |
| --- | --- |
| `captures/vesta-pot.mp4` | Proof of Trust on a Vesta service, in a wallet (S-4a) |
| `captures/vesta-badge-issuance.mp4` | Employee badge lands in a wallet (S-4b) |
| `captures/vesta-badge-login.mp4` | Partner login with the badge (S-4c) |
| `captures/vesta-door-scan.mp4` | Technician badge scanned at the door, seal shown (S-4d) |
| `captures/vesta-umbra-refusal.mp4` | Umbra: verified org, no Authorized Repairer, refused (S-5a, the star) |
| `captures/vesta-umbra-door.mp4` | Umbra at the door: no credential, no seal (S-5b) |

**Verandia (second video, deferred):** `captures/citizen-id-issuance.mp4`,
`captures/tax-login.mp4`, `captures/bank-kyc.mp4`, `captures/legal-rep.mp4`,
`captures/quickcash-refusal.mp4`, `captures/fake-portal.mp4`.

## 3. Music

Drop one licensed instrumental track at `public/assets/music.mp3` and re-run
sync. Ducking under UI footage and the fade in/out are automatic (shots
flagged `duck` in the data). The license must cover YouTube, X, and LinkedIn
distribution. Without the file, videos render silent.

## Editing rules

- **INTRO v1 is locked.** Changing `src/shots/intro.ts` or the intro visuals
  bumps the intro version in the spec and re-renders every published video.
- On-screen copy carries the house rules (no em-dashes, no glyph symbols);
  `validateShots` throws at build time on violations.
- A new use case = a new `src/shots/<case>.ts` + handoff entry + composition,
  reusing the same scene grammar. See spec §8.
- Rendered masters are attached to GitHub Releases (e.g. tag `intro-v1`), not
  committed.

## License note

Remotion is free for individuals and small teams; check the
[Remotion license](https://remotion.dev/license) before company-scale use.
