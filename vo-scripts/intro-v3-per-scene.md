# Intro v3 narration, one clip per scene

The merged intro: foundations (W3C + eIDAS), the scalability gap, the
question chain, Verana's answer, the three freedoms, the essence.
Generate each block as its own ElevenLabs generation (or as one take with a
single `<break time="1.5s" />` between blocks, then split on the markers)
and save the clips under the exact filenames shown, in
`public/assets/vo/intro3/`. A full-length `public/assets/vo/intro3.mp3`
wins over the per-scene clips when present. Run `npm run sync`, then render.

Each clip starts exactly at its scene; it may run shorter than the scene
(silence follows) but must not run longer. Scene lengths are the budget.
Keep "eIDAS" and "W3C" written plainly; if the voice mangles "eIDAS",
regenerate that clip alone with "e-idas".

## N-0.mp3  (6s)
Verana. The open trust infrastructure for the verifiable internet.

## N-1.mp3  (12s)
Decentralized digital identity is becoming a reality: eIDAS 2.0 in Europe, and the W3C standards ecosystem. We build on both.

## N-2.mp3  (10s)
These technologies have proven their worth. The next challenges: scalability, interoperability, and monetization.

## N-3.mp3  (6s)
Have you ever wondered... who is really behind this service?

## N-4.mp3  (7s)
And behind this AI agent?

## N-5.mp3  (6s)
And when you receive a credential... is it real? Is the issuer accredited?

## N-6.mp3  (6s)
And when a service asks for your ID: is it even allowed to ask?

## N-7.mp3  (6s)
And finally: how do you, or your AI agent, find a trusted service?

## N-8a.mp3  (19s)
Official trust lists exist: the EU Trusted Lists, Adobe's approved list, the browser root programs, ICAO's passport directory, GLEIF's legal entity identifiers. Governments and big organizations manage them. But most private ecosystems fall outside: they need an independent solution to bridge the gap.

## N-8b.mp3  (8s)
Verana is that bridge. Independent, at scale, and across ecosystems.

## N-9.mp3  (12s)
Build your own sovereign ecosystem, freely, on Verana's public, privacy-preserving infrastructure: your rules, your business model. Choose any wallet provider. And bridge to other ecosystems.

## N-10.mp3  (13s)
In essence: Verana enables trust to scale. Not just within one ecosystem: across the entire digital economy. Verana dot io.
