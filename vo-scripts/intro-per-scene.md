# Intro narration, one clip per scene (recommended)

Same flow as the Vesta act: either generate `intro-single-take.txt` as ONE
take and split it on the 1.5 s break markers, or generate each block below
separately. Save the clips under the exact filenames shown, in
`public/assets/vo/intro/`. A full-length `public/assets/vo/intro.mp3` wins
over the per-scene clips when present. Run `npm run sync`, then
`npm run render:intro`.

Each clip starts exactly at its scene; it may run shorter than the scene
(silence follows) but must not run longer. Scene lengths are the budget.

## I-0.mp3  (6s)
Verana. The open trust infrastructure for the verifiable internet.

## I-1.mp3  (6s)
Have you ever wondered... who is really behind this service?

## I-2.mp3  (7s)
And behind this AI agent?

## I-3.mp3  (6s)
And when you receive a credential... is it real? Is the issuer accredited?

## I-4.mp3  (6s)
And when a service asks for your ID: is it even allowed to ask?

## I-5.mp3  (7s)
And what if you build your own ecosystem: where do your schemas and accredited issuers live?

## I-6.mp3  (6s)
And finally: how do others find your ecosystem, and join?

## I-7.mp3  (4s)
Today: static trust lists, vendor lock-in, or silos.

## I-8.mp3  (4s)
But there is Verana.

## I-9.mp3  (8s)
Ecosystems. Verifiable identity. Discovery. One open, public trust layer.

## I-10.mp3  (12s)
Attach credentials to your services. Prove you're accredited. Then let your users simply verify they can trust you. Verana dot io.
