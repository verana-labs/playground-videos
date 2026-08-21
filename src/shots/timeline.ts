// The series time budget (spec §1), derived from INTRO_END so intro edits
// re-time everything downstream. Acts are authored RELATIVE and shifted to
// ACT_START at assembly; each act brings its own length (Vesta 231 s,
// Verandia 170 s), so the outro is placed per video from the act's end.
import { INTRO_END } from "./intro";

export const HANDOFF_START = INTRO_END;
export const ACT_START = INTRO_END + 5;
