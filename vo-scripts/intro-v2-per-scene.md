# Intro v2 narration, one clip per scene

The institutional intro (foundations-first: W3C, eIDAS, Verana, scale).
Same flow as the other videos: generate each block as its own ElevenLabs
generation (or as one take with a single `<break time="1.5s" />` between
blocks, then split on the markers) and save the clips under the exact
filenames shown, in `public/assets/vo/intro2/`. A full-length
`public/assets/vo/intro2.mp3` wins over the per-scene clips when present.
Run `npm run sync`, then render.

Each clip starts exactly at its scene; it may run shorter than the scene
(silence follows) but must not run longer. Scene lengths are the budget.
Keep "eIDAS" and "W3C" written plainly; if the voice mangles "eIDAS",
regenerate that clip alone with "e-idas".

## V2-0.mp3  (6s)
Verana. The open trust infrastructure for the verifiable internet.

## V2-1.mp3  (10s)
The World Wide Web Consortium defined the standards for digital identity: for people, for organizations, and for things. We build on them.

## V2-2.mp3  (10s)
The European Union built the legal frame: eIDAS. State-grade guarantees that work across borders. We rely on them.

## V2-3.mp3  (14s)
Verana already gives public and private operators the way to combine both, on a decentralized trust infrastructure: create your own governance, fit to your ecosystem.

## V2-4.mp3  (14s)
Deploy your web services and your AI agents with the strongest cryptographic guarantees of cybersecurity. And interconnect ecosystems: no silos.

## V2-5.mp3  (12s)
Build and join sovereign ecosystems. Verana. Verana dot io.
