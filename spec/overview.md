<!-- Moved from verana-labs/verana-spec playground/video/spec.md: the videos' spec now lives beside the code, one file per video. -->

# Playground Use-Case Videos, Production Spec: Overview

**Status:** DRAFT 0.2 · 2026-08-20, shared intro locked in implementation; **Vesta act is the first video**; Verandia act drafted and deferred.
**Companions:** [playground spec](../spec.md) · [Vesta story spec](../verana-explained/spec.md) · [Verandia story spec](../utopia/spec.md) (Utopia was renamed Verandia) · [FIDES dossier: Verandia](../submission/use-case-verandia.md)

---

## 1. Purpose

**Implementation:** [`verana-labs/playground-videos`](https://github.com/verana-labs/playground-videos), a Remotion project whose shot data (`src/shots/`) mirrors the tables below; the shared intro, the acts, the outro, and the 9:16 recuts are compositions rendered from this spec.

One video per playground use case, all built from the same three-part template:

```
[ INTRO, shared, locked ]  →  [ handoff card ]  →  [ USE-CASE ACT ]  →  [ OUTRO, semi-shared ]
```

The intro explains what Verana is and why it matters, in 72 seconds, and is rendered **once** and reused verbatim in every video (Vesta, Verandia, Bolivia, MOSIP, ...). Only the act and the handoff card change per video. This spec locks the intro (§3), defines the first act, Vesta Appliances (§4), and keeps the drafted Verandia act for the second video (§5).

### Format decisions (defaults, flip here if changed)

| Decision | Value | Rationale |
| --- | --- | --- |
| Master format | 1920×1080, 16:9, 30 fps | YouTube, embeds, conference screens |
| Vertical cut | 9:16 recut of intro + act highlights (≤ 60 s) | X / LinkedIn / Shorts; see §8 |
| Narration | On-screen text + music. Script lines double as VO lines so a voiceover can be added later without re-editing | No language lock-in, cheaper iteration |
| Music | One continuous instrumental bed, calm-to-confident arc, ducked under wallet clips | |
| Branding | **Playground design language**: the playground lockup (bull-horn V, violet #7C3AED + emerald #10B981, wordmark "Verana" + violet "Playground"), the purple-blue gradient (#764ba2 to #667eea), light surfaces, white cards. Body text Inter; **brand wordmarks Space Grotesk**. The I-8 reveal carries the **verana.io lockup** (gradient tile + white V, "Verana" in black) | The video should look like the site it promotes |
| Playground banner | A "Verana Playground" banner (mark + wordmark, site-header white pill treatment) sits top-left from the **handoff card onward** (use-case content and outro, both formats; verticals from their payoff shot). The intro carries **verana.io branding only**, no banner | Playground branding on the use-case content; the shared intro stays brand-pure |
| Copy rules | **No em-dashes** and **no glyph symbols** (no ☑ ✕ ↗) in any on-screen text, same rule as rendered site copy. Words instead: "verified", "refused". Enforced at build time by the implementation | House rule |
| Honesty convention | Wallet and demo footage: real devices, live against the cast, silent, joined end to end, speed-ups disclosed in the video description. Same note style as the wallet `video.note` fields in the playground registry | Every claim reproducible |
| Fiction disclaimer | Lower-third on first act shot: "Vesta Appliances is a fictional company. Entities marked (demo) are fictional." (per-cast wording) | Same convention as the site's about page |

### Length budget

| Segment | Duration | Running total |
| --- | --- | --- |
| Intro (shared) | 1:12 | 1:12 |
| Handoff card | 0:05 | 1:17 |
| Act (Vesta) | 4:40 | 5:57 |
| Outro | 0:22 | 6:19 |

The Verandia act (deferred) keeps its 2:50 draft: its outro runs 4:07 to 4:29, total 4:29.

## 2. Series architecture and reuse rules

- **The intro is evergreen.** Nothing in it may age: no wallet counts, no dates, no roadmap, no "testnet", no partner names. Facts that age live in the act or the outro.
- **The intro is use-case-agnostic**, with one deliberate exception: I-10 closes on the real Vesta Appliances Proof of Trust as the canonical example (a stable artifact of the permanent demo cast) and the integrated personal-wallet logo roster (a roster change is an intro-version bump). Everything else never names a cast entity; wallet footage uses the generic DemoCredential six-scenario clips (already recorded, per wallet, in the playground repo), because those are story-neutral.
- **Versioning.** The rendered intro is tagged `INTRO v1`. Any change to its copy or footage bumps the version and §3 of this spec; older videos keep the version they shipped with.
- **The handoff card** is one full-frame title card per use case (5 s): use-case logo or emblem on the left, one line of text. It is the only bridge asset produced per video besides the act itself.
- **The outro** is shared except for one swappable element: the URL card (deep link to the use-case page). When mainnet replaces testnet, only the outro is re-rendered.


## 6. Outro (Vesta 5:57 to 6:19; Verandia, deferred, 4:07 to 4:29)

| # | Time | Visual | On-screen text (exact) |
| --- | --- | --- | --- |
| O-1 | 5:57–6:07 | Wallet roster strip (the integrated-wallet logos, the same strip as the playground home) sliding under the line | Try it yourself. Any of these wallets. Nothing simulated. |
| O-2 | 6:07–6:19 | The conclusion, the intro finale's shape in playground branding: the **Verana Playground lockup** (site typography and colors) springs to the center, the URL **https://playground.testnet.verana.network** below, then the line **See the other use cases in the Verana Playground.** | (all copy in the visual) |

Video description (not on screen) carries the honesty notes: real devices, live against the Verana testnet, silent captures, list of speed-ups, links to the story spec and repos.

## 7. Asset and capture inventory

Exists (playground repo, synced by the implementation's `npm run sync`):

| Asset | Where | Used in |
| --- | --- | --- |
| Vesta brand kit: logo, `lineup`, `factory`, `support`, impostor van, CEO / CTO portraits, ISO seal | `public/images/` (root) | S-1, S-2, handoff |
| Verandia brand kit: `hero`, `institutions`, `pm`, `minister`, `phishing`, `bank`, coat of arms | `public/images/verandia/` | V-1, V-2, handoff |
| Six-scenario wallet clips and screenshots (generic DemoCredential), per wallet | `public/wallets/<id>/clips/` | I-3, I-4 |
| Wallet logos (visible integrations) | `public/wallets/<id>/logo.*` | O-1 roster |
| Cast entity icons | `public/images/cast/*.svg` | optional diagram dressing |

To record for the **Vesta video** (real device, live against the `vesta-*` cast, one session):

1. `vesta-pot` — Proof of Trust on a Vesta service in a wallet (S-4a)
2. `vesta-badge-issuance` — employee badge lands in a wallet (S-4b)
3. `vesta-badge-login` — partner badge login on the portal (S-4c)
4. `vesta-door-scan` — technician badge scanned at the door, seal shown (S-4d)
5. `vesta-umbra-refusal` — the star capture: verified org, missing Authorized Repairer, refused (S-5a)
6. `vesta-umbra-door` — no credential, no seal (S-5b)

Prereq: the `vesta-*` cast agents live and the badge / login demos wired (Vesta story spec §5 inventory). Verandia's capture list (citizen-id-issuance, tax-login, bank-kyc, legal-rep, quickcash-refusal, fake-portal) is unblocked since PR #192 merged, and waits for the second video.

Also to produce: handoff and outro cards (from the brand kits, implemented), the music track (licensed for YouTube + X + LinkedIn), and screen recordings of the playground pages at 1080p+ where the acts show QR mint moments.

## 8. Vertical cut (≤ 60 s, per use case)

9:16 recut, phone footage full-bleed, text top third: I-1, I-4, I-7, I-8 (intro compressed to ~18 s) + one payoff capture (~15 s; Vesta: the door scan) + the refusal (~19 s; Vesta: Umbra) + O-2 (~8 s). No new footage required.

## 9. Reuse plan for the next acts

| Use case | Status | Handoff card line | Star scene |
| --- | --- | --- | --- |
| Vesta Appliances | **first video, this spec §4** | Today: Vesta Appliances. A brand fights impostors with proof. | Q2-family refusal: verified but uncertified impostor (Umbra) |
| Republic of Verandia | drafted, deferred, §5 | Today: the Republic of Verandia. A democracy deploys verifiable identity for citizens and businesses. | Q3 refusal (QuickCash) |
| Bolivia | future | Today: Bolivia. SEGIP, SEPREC and a bank on one trust layer. | Q3 refusal (Prestamista) |
| MOSIP Inji | future | Today: the MOSIP stack, trust-resolved. | full-triangle resolution |

The intro and outro are untouched in every case; production cost per new video is one handoff card + one act.

## 10. Open items

1. Confirm narration mode for v1 (text + music only, or record VO from the VO column).
2. Vesta captures (§7) blocked on the `vesta-*` cast demos being live end to end; record within one session so wallet UI versions match across shots.
3. V-3 / S-3 execution shipped as the implementation's build diagram; optionally upgrade to a screen-recorded site chapter 3 with its scene-graph for closer site parity.
4. S-6 / V-6 directory: mock the queries until the Trust Graph is queryable, disclose in the description, re-shoot live later.
5. Music selection and license; must allow YouTube + X + LinkedIn distribution.
6. Localization: master is English; the text-driven format makes subtitle tracks (ES, FR) cheap. Decide whether ES ships with v1 (Bolivia audience).
