/**
 * Single entry point for the Jyotish reference data layer.
 *
 * Consumers should import from `@/lib/data` rather than the individual files —
 * this keeps the public surface stable and lets internal file boundaries move
 * without breaking call sites.
 *
 * @example
 *   import { PLANETS, RASHIS, NAKSHATRAS, getPlanetById } from "@/lib/data";
 */

// ─────────────────────────────────────────────────────────────────────────────
// Datasets
// ─────────────────────────────────────────────────────────────────────────────

export { PLANETS } from "./planets";
export { RASHIS } from "./rashis";
export { NAKSHATRAS } from "./nakshatras";
export { HOUSES } from "./houses";
export { KARAKATWAS } from "./karakatwas";
export { CHARA_KARAKAS } from "./charaKarakas";
export { NAISARGIKA, TATKALIKA_RULE, PANCHADHA_MAITRI } from "./relationships";
export {
  BALADI_AVASTHAS,
  JAGRADADI_AVASTHAS,
  DEEPTADI_AVASTHAS,
} from "./avasthas";
export { SAMBANDHAS } from "./sambandha";
export { GLOSSARY } from "./glossary";

// ─────────────────────────────────────────────────────────────────────────────
// Types and identity arrays
// ─────────────────────────────────────────────────────────────────────────────

export * from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// Lookup helpers
// ─────────────────────────────────────────────────────────────────────────────

import { PLANETS } from "./planets";
import { RASHIS } from "./rashis";
import { NAKSHATRAS } from "./nakshatras";
import { HOUSES } from "./houses";
import type {
  House,
  HouseNumber,
  Nakshatra,
  NakshatraId,
  Planet,
  PlanetId,
  Rashi,
  RashiId,
} from "./types";

export const getPlanetById = (id: PlanetId): Planet | undefined =>
  PLANETS.find((p) => p.id === id);

export const getRashiById = (id: RashiId): Rashi | undefined =>
  RASHIS.find((r) => r.id === id);

export const getNakshatraById = (id: NakshatraId): Nakshatra | undefined =>
  NAKSHATRAS.find((n) => n.id === id);

export const getHouseByNumber = (n: HouseNumber): House | undefined =>
  HOUSES.find((h) => h.number === n);
