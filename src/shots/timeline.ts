// The series time budget (spec §1): intro to 0:50, handoff to 0:55, act
// (2:50, authored relative and shifted at assembly) to 3:45, outro to 4:05.
// Derived from INTRO_END so intro edits re-time everything downstream; the
// outro always lands on the same timecodes across acts and the intro stays
// byte-identical across videos.
import { INTRO_END } from "./intro";

export const HANDOFF_START = INTRO_END; // 50
export const ACT_START = INTRO_END + 5; // 55
export const ACT_LENGTH = 170; // 2:50
export const ACT_END = ACT_START + ACT_LENGTH; // 225
