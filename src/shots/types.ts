// Shot data model. Every table row of the production spec
// (verana-spec/playground/video/spec.md §3 to §5) becomes one Shot here, so
// timings and on-screen copy stay reviewable as data.

/** One journey subsection: the scene graph at a stage, a moving selection,
 *  and the page's exact story text. */
export type JourneySelect = { at: number; node: string };
export type JourneyStepVisual = {
  kind: "vesta-journey";
  sectionKicker: string;
  sectionTitle: string;
  stage: string;
  stepId: string;
  stepTitle: string;
  /** The page's full copy, kept for reference; not rendered (VO lines carry it). */
  story?: string;
  points?: string[];
  selects: JourneySelect[];
  noDiagram?: boolean;
  umbraOverride?: boolean;
};

export type Visual =
  | { kind: "login-glitch" } // I-1
  | { kind: "agent-flicker" } // I-2
  | { kind: "phone"; asset: string; caption?: string } // act captures
  | {
      kind: "qr-scan-phone";
      asset: string;
      qrLabel: string;
      caption?: string;
      phoneSide: "right" | "left";
    } // I-3 (phone right), I-4 (phone left)
  | { kind: "constellation"; mode: "sketch" | "zoomout" | "verify" } // legacy intro modes
  | { kind: "sovereign-build" } // I-5: credential, schema JSON, accredited pyramid
  | { kind: "ecosystem-search" } // I-6: search lens over ecosystem nodes
  | { kind: "brand-open" } // I-0: cold open, lockup + positioning line, dims to night
  | { kind: "brand-reveal" } // I-8: the verana.io lockup alone, light stage
  | { kind: "black" } // I-7
  | { kind: "triptych" } // I-9
  | { kind: "standards" } // I-10
  | { kind: "handoff"; emblem: string; title: string; subtitle: string }
  | {
      kind: "vesta-company";
      part: "product-line" | "factory" | "repair-network" | "services";
    } // S-1a..S-1d: playground journey §1, exact content
  | { kind: "vesta-problems" } // S-2: problems, titles + van + root cause
  | { kind: "vesta-needs" } // S-4: the five-item checklist
  | { kind: "vesta-join" } // S-5: the two ecosystems Vesta joins
  | { kind: "vesta-build-eco" } // S-6: the ecosystem Vesta builds
  | JourneyStepVisual // J-1..J-9: Marc's journey, one shot per page subsection
  | { kind: "vesta-demos" } // D-1: run the demos
  | { kind: "playground-close" } // the conclusion, playground-branded finale
  | { kind: "solo-open"; emblem: string; title: string; subtitle: string } // standalone cut opener
  | { kind: "foundations" } // N-1: W3C + eIDAS layer stack (intro v2)
  | { kind: "silos" } // N-2: isolated ecosystem islands (intro v2)
  | { kind: "ecosystem-search-v2" } // N-7: search lens + human/agent pair (intro v2)
  | { kind: "freedoms" } // N-9: Build · Choose · Bridge (intro v2)
  | { kind: "verana-close" } // N-10: verana.io finale (intro v2)
  | { kind: "foundations-v3" } // intro v3 copies of the v2 scenes
  | { kind: "sectors-v3" } // (unused) the beyond-human-identity sector map
  | { kind: "identify-v3" } // (unused) entity + controller identification
  | { kind: "self-identify-v3" } // (unused) the party triangle, who are you?
  | { kind: "create-eco-q-v3" } // N-3: challenge 1, create ecosystems at will
  | { kind: "cross-border-q-v3" } // N-4: challenge 2, onboard across borders
  | { kind: "mutual-auth-v3" } // N-5: challenge 3, mutual authentication
  | {
      kind: "qr-scan-parties-v3";
      asset: string;
      qrLabel: string;
      caption?: string;
      phoneSide: "right" | "left";
    } // N-5/N-6: the v1 capture plus the person/agent/service chip row
  | { kind: "silos-v3" }
  | { kind: "ecosystem-search-v3" }
  | { kind: "build-eco-v3" } // (unused) the governance card alone
  | { kind: "build-eco-tree-v3" } // N-9a: root + artifacts + participant tree
  | { kind: "build-service-v3" }
  | { kind: "connect-v3" } // N-9c: found, mutually authenticated, connected
  | { kind: "verana-close-v3" }
  | { kind: "trust-lists-v3" } // N-8a: official trust lists vs the private gap
  | {
      kind: "image-scene";
      items: { asset?: string; mock?: "password" | "pdf"; label?: string }[];
      tint?: "none" | "problem";
    } // V-1, V-2 imagery
  | { kind: "build"; entities: { label: string; at: number }[] } // V-3
  | { kind: "captures"; items: { asset: string; label: string }[] } // V-4, V-5
  | { kind: "directory"; queries: { q: string; a: string }[] } // V-6
  | { kind: "roster" } // O-1
  | { kind: "url-card"; url: string; tagline: string }; // O-2

export type Shot = {
  id: string;
  /** Seconds on the master timeline. */
  start: number;
  end: number;
  /** On-screen text, shown sequentially within the shot. Exact spec copy. */
  lines: string[];
  /** Optional voiceover line (not rendered; kept beside the copy it matches). */
  vo?: string;
  visual: Visual;
  /** Duck the music while this shot plays (real UI footage). */
  duck?: boolean;
  /** Dark or light text treatment. */
  tone?: "dark" | "light";
  /** Fade the on-screen text out over [from, to] seconds (shot-relative). */
  textFadeOut?: [number, number];
};

// House copy rules, enforced at module load: no em-dashes, no glyph symbols
// in anything that reaches the screen.
const BANNED = /[—✓✔✗✘☑↗×]/;
export const validateShots = (shots: Shot[]): Shot[] => {
  for (const s of shots) {
    for (const line of s.lines) {
      if (BANNED.test(line)) {
        throw new Error(`Shot ${s.id}: banned character in on-screen text: "${line}"`);
      }
    }
    if (s.end <= s.start) throw new Error(`Shot ${s.id}: end <= start`);
  }
  return shots;
};

export const shotsEnd = (shots: Shot[]): number => Math.max(...shots.map((s) => s.end));
