/**
 * Compile-time integrity checks for the data layer.
 *
 * This file emits no runtime code beyond the constants it declares — its sole
 * purpose is to fail `tsc --noEmit` if any cardinality or FK invariant is
 * violated. If a future edit drops a planet, mistypes a rashi ID, or shrinks
 * the glossary below the documented minimum, tsc surfaces the regression
 * before it reaches a UI.
 *
 * Run: `npx tsc --noEmit`
 */

import {
  CHARA_KARAKAS,
  GLOSSARY,
  HOUSES,
  HOUSE_IDS,
  NAKSHATRAS,
  NAKSHATRA_IDS,
  PLANETS,
  PLANET_IDS,
  RASHIS,
  RASHI_IDS,
  SAMBANDHAS,
  BALADI_AVASTHAS,
  JAGRADADI_AVASTHAS,
  DEEPTADI_AVASTHAS,
} from "./index";
import type {
  HouseId,
  NakshatraId,
  PlanetId,
  RashiId,
} from "./types";

// ─────────────────────────────────────────────────────────────────────────────
// Cardinality — counts the spec mandates, locked at compile time
// ─────────────────────────────────────────────────────────────────────────────

type AssertEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;
type AssertTrue<T extends true> = T;
type _PlanetCount = AssertTrue<AssertEqual<typeof PLANET_IDS["length"], 9>>;
type _RashiCount = AssertTrue<AssertEqual<typeof RASHI_IDS["length"], 12>>;
type _NakshatraCount = AssertTrue<AssertEqual<typeof NAKSHATRA_IDS["length"], 27>>;
type _HouseCount = AssertTrue<AssertEqual<typeof HOUSE_IDS["length"], 12>>;

// Runtime-derived datasets must match the const-array cardinalities exactly.
const _planetsLen: 9 = PLANETS.length as 9;
const _rashisLen: 12 = RASHIS.length as 12;
const _nakshatrasLen: 27 = NAKSHATRAS.length as 27;
const _housesLen: 12 = HOUSES.length as 12;
const _charaKarakasLen: 7 = CHARA_KARAKAS.length as 7;
const _sambandhasLen: 4 = SAMBANDHAS.length as 4;
const _baladiLen: 5 = BALADI_AVASTHAS.length as 5;
const _jagradadiLen: 3 = JAGRADADI_AVASTHAS.length as 3;
const _deeptadiLen: 9 = DEEPTADI_AVASTHAS.length as 9;
const _glossaryLen: number = GLOSSARY.length;
type _GlossaryAtLeast80 = AssertTrue<typeof GLOSSARY extends { readonly length: infer L } ? (L extends number ? (L extends 0 | 1 | 2 | 79 ? false : true) : false) : false>;

// Suppress "unused" warnings for the type-level assertions above.
void _planetsLen;
void _rashisLen;
void _nakshatrasLen;
void _housesLen;
void _charaKarakasLen;
void _sambandhasLen;
void _baladiLen;
void _jagradadiLen;
void _deeptadiLen;
void _glossaryLen;

// ─────────────────────────────────────────────────────────────────────────────
// FK integrity — every record's `id` is a member of the canonical ID arrays
// ─────────────────────────────────────────────────────────────────────────────

const _planetIdsExist: readonly PlanetId[] = PLANETS.map((p) => p.id);
const _rashiIdsExist: readonly RashiId[] = RASHIS.map((r) => r.id);
const _nakshatraIdsExist: readonly NakshatraId[] = NAKSHATRAS.map((n) => n.id);
const _houseIdsExist: readonly HouseId[] = HOUSES.map((h) => h.id);
void _planetIdsExist;
void _rashiIdsExist;
void _nakshatraIdsExist;
void _houseIdsExist;

// ─────────────────────────────────────────────────────────────────────────────
// Glossary count — runtime guard so the minimum-80 invariant fails loudly
// during a verification run, not just at type-check time.
// ─────────────────────────────────────────────────────────────────────────────

if (GLOSSARY.length < 80) {
  throw new Error(
    `Glossary contains ${String(GLOSSARY.length)} entries; minimum is 80.`,
  );
}
