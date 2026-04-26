/**
 * Shared TypeScript types for the Jyotish reference data layer.
 *
 * Conventions:
 * - Sanskrit terms use IAST-light transliteration (no diacritics): "Vrishchika", "Karakatwa".
 * - Tamil terms live in dedicated `tamilName` / `tamilMonth` fields.
 * - Foreign keys are ID strings (e.g. `ruler: "mars"`), not object refs — keeps data
 *   tree-shakeable, JSON-serializable, and FK-typo-detectable at compile time.
 * - The exported const-arrays at the top (PLANET_IDS, RASHI_IDS, NAKSHATRA_IDS, HOUSE_IDS)
 *   are the canonical source of identity. Their derived literal-union types police every
 *   cross-reference: a typo in `ruler: "marz"` becomes a `tsc` error, not a runtime bug.
 *
 * @source Brihat Parashara Hora Shastra (Santhanam tr.); Phaladeepika; Brihat Samhita;
 *         Jaimini Sutras. Per-record `notes` fields document classical variation.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Identity arrays + derived literal-union ID types
// ─────────────────────────────────────────────────────────────────────────────

export const PLANET_IDS = [
  "sun",
  "moon",
  "mars",
  "mercury",
  "jupiter",
  "venus",
  "saturn",
  "rahu",
  "ketu",
] as const;
export type PlanetId = (typeof PLANET_IDS)[number];

export const RASHI_IDS = [
  "mesha",
  "vrishabha",
  "mithuna",
  "karka",
  "simha",
  "kanya",
  "tula",
  "vrishchika",
  "dhanu",
  "makara",
  "kumbha",
  "meena",
] as const;
export type RashiId = (typeof RASHI_IDS)[number];

export const NAKSHATRA_IDS = [
  "ashwini",
  "bharani",
  "krittika",
  "rohini",
  "mrigashira",
  "ardra",
  "punarvasu",
  "pushya",
  "ashlesha",
  "magha",
  "purva_phalguni",
  "uttara_phalguni",
  "hasta",
  "chitra",
  "swati",
  "vishakha",
  "anuradha",
  "jyeshtha",
  "mula",
  "purva_ashadha",
  "uttara_ashadha",
  "shravana",
  "dhanishta",
  "shatabhisha",
  "purva_bhadrapada",
  "uttara_bhadrapada",
  "revati",
] as const;
export type NakshatraId = (typeof NAKSHATRA_IDS)[number];

export const HOUSE_IDS = [
  "house_1",
  "house_2",
  "house_3",
  "house_4",
  "house_5",
  "house_6",
  "house_7",
  "house_8",
  "house_9",
  "house_10",
  "house_11",
  "house_12",
] as const;
export type HouseId = (typeof HOUSE_IDS)[number];
export type HouseNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

// ─────────────────────────────────────────────────────────────────────────────
// String-literal enum unions
// ─────────────────────────────────────────────────────────────────────────────

export type Gender = "masculine" | "feminine" | "neuter";

export type Guna = "sattva" | "rajas" | "tamas";

/** Pancha-bhuta extended with ether for planet-level use. */
export type Element = "fire" | "earth" | "air" | "water" | "ether";

/** Pancha mahabhuta — strict five-element scheme used by nakshatras. */
export type Mahabhuta = "prithvi" | "apas" | "tejas" | "vayu" | "akasha";

export type Varna = "brahmin" | "kshatriya" | "vaishya" | "shudra" | "mleccha";

export type Dosha =
  | "vata"
  | "pitta"
  | "kapha"
  | "vata-pitta"
  | "pitta-kapha"
  | "vata-kapha"
  | "tridosha";

export type PlanetNatureClass = "benefic" | "malefic" | "conditional";

/** Rashi modality / quality (chara=movable, sthira=fixed, dwiswabhava=dual). */
export type Modality = "chara" | "sthira" | "dwiswabhava";

export type Purushartha = "dharma" | "artha" | "kama" | "moksha";

export type Fertility = "fruitful" | "barren" | "semi-fruitful" | "neutral";

export type RisingMode = "prishtodaya" | "shirshodaya" | "ubhayodaya";

/** Relative ascension duration; absolute durations vary by latitude. */
export type AscensionDuration = "short" | "medium" | "long" | "shortest" | "longest";

export type DayNightStrength = "diurnal" | "nocturnal";

export type TimeOfStrength = "sunrise" | "midday" | "sunset" | "midnight";

export type Direction =
  | "east"
  | "southeast"
  | "south"
  | "southwest"
  | "west"
  | "northwest"
  | "north"
  | "northeast";

export type Age = "infant" | "child" | "youth" | "adult" | "old";

export type Height = "tall" | "medium" | "short" | "dwarf";

export type Sense = "sight" | "hearing" | "smell" | "taste" | "touch";

export type Taste = "madhura" | "amla" | "lavana" | "katu" | "tikta" | "kashaya";

export type Season = "vasanta" | "grishma" | "varsha" | "sharad" | "hemanta" | "shishira";

export type Dhatu = "bone" | "blood" | "marrow" | "skin" | "fat" | "muscle" | "semen";

export type HouseClassification =
  | "kendra"
  | "trikona"
  | "upachaya"
  | "dusthana"
  | "maraka";

export type RelationStatus = "friend" | "enemy" | "neutral";

export type PanchadhaLevel =
  | "great_friend"
  | "friend"
  | "neutral"
  | "enemy"
  | "great_enemy";

export type NakshatraNature =
  | "laghu"
  | "mridu"
  | "dhruva"
  | "chara"
  | "ugra"
  | "mishra"
  | "tikshna";

export type NakshatraOrientation = "urdhva-mukha" | "adho-mukha" | "tiryan-mukha";

export type Gana = "deva" | "manushya" | "rakshasa";

/** Adi (vata), Madhya (pitta), Antya (kapha) — used in nadi-koota compatibility. */
export type Nadi = "adi" | "madhya" | "antya";

export type BodyRegion = "upper" | "middle" | "lower";

export type CabinetRole =
  | "king"
  | "queen"
  | "commander"
  | "prince"
  | "minister"
  | "advisor"
  | "shadow";

export type StrengthLevel = "weak" | "moderate" | "strong" | "very_strong";

export type KarakatwaDomain =
  | "career"
  | "relationships"
  | "health"
  | "wealth"
  | "spirituality"
  | "family";

export type Parity = "odd" | "even";

export type PadaNumber = 1 | 2 | 3 | 4;

export type GandantaPosition = "start" | "end" | "both";

// ─────────────────────────────────────────────────────────────────────────────
// Shared composite shapes
// ─────────────────────────────────────────────────────────────────────────────

export interface DegreeRange {
  readonly startDegree: number;
  readonly endDegree: number;
}

export interface Pada {
  readonly number: PadaNumber;
  readonly range: DegreeRange;
  readonly navamsa: RashiId;
}

export interface Yoni {
  readonly animal: string;
  readonly gender: "male" | "female";
}

export interface Shakti {
  readonly name: string;
  /** Upward/positive resultant of the shakti per Taittiriya Brahmana. */
  readonly basisAbove?: string;
  /** Downward/grounding resultant of the shakti per Taittiriya Brahmana. */
  readonly basisBelow?: string;
}

export interface Flora {
  readonly flowers: readonly string[];
  readonly grains: readonly string[];
  readonly trees: readonly string[];
}

export interface Exaltation {
  readonly rashi: RashiId;
  readonly degree: number;
}

export interface Debilitation {
  readonly rashi: RashiId;
  readonly degree: number;
}

export interface Moolatrikona {
  readonly rashi: RashiId;
  readonly startDegree: number;
  readonly endDegree: number;
}

export interface PlanetNature {
  readonly classification: PlanetNatureClass;
  readonly notes?: string;
}

export interface Karakatwa {
  readonly domain: KarakatwaDomain;
  readonly significations: readonly string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Master record interfaces
// ─────────────────────────────────────────────────────────────────────────────

export interface Planet {
  readonly id: PlanetId;
  readonly sanskritName: string;
  readonly englishName: string;
  readonly tamilName: string;
  /** Unicode glyph for the planet (e.g. "☉"). */
  readonly glyph: string;
  /** 2–3 sentence mythological / character description. */
  readonly description: string;
  readonly cabinetRole: CabinetRole;
  readonly gender: Gender;
  readonly guna: Guna;
  readonly element: Element;
  readonly nature: PlanetNature;
  readonly varna: Varna;
  readonly direction: Direction;
  readonly age: Age;
  readonly dosha: Dosha;
  /** Houses aspected (full drishti). All planets aspect 7th; specials extend the list. */
  readonly aspects: readonly HouseNumber[];
  /** Soul-level signification (e.g. Sun = "soul/dharma", Moon = "mind/emotion"). */
  readonly persuasion: string;
  readonly bodyConstitution: string;
  readonly bodyParts: readonly string[];
  readonly height: Height;
  readonly complexion: string;
  readonly dhatu: Dhatu;
  readonly sense: Sense;
  readonly taste: Taste;
  readonly diseases: readonly string[];
  readonly colors: readonly string[];
  readonly clothes: string;
  readonly shape: string;
  readonly metal: string;
  readonly gem: string;
  readonly season: Season;
  readonly deity: string;
  readonly flora: Flora;
  readonly exaltation: Exaltation | null;
  readonly debilitation: Debilitation | null;
  readonly moolatrikona: Moolatrikona | null;
  readonly ownSigns: readonly RashiId[];
  /** Kendra house granting digbala (1, 4, 7, or 10). null for nodes. */
  readonly directionalStrength: HouseNumber | null;
  /** Classical-source variation notes, when present. */
  readonly notes?: string;
}

export interface Rashi {
  readonly id: RashiId;
  /** 1–12 in zodiacal order. */
  readonly number: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  readonly sanskritName: string;
  readonly englishName: string;
  readonly tamilName: string;
  /** Tamil solar month corresponding to the sun's transit through this rashi. */
  readonly tamilMonth: string;
  /** Symbolic creature/object (Ram, Bull, Twins, …). */
  readonly symbol: string;
  /** Unicode zodiac glyph (♈–♓). */
  readonly glyph: string;
  /** Absolute zodiac span — Mesha 0–30, Vrishabha 30–60, … Meena 330–360. */
  readonly span: DegreeRange;
  /** Approximate Gregorian solar-transit dates (sayana reference; nirayana ≈ 24 days later). */
  readonly gregorianRange: string;
  readonly ruler: PlanetId;
  /** Co-ruler per traditions that assign Ketu→Vrishchika and Rahu→Kumbha. */
  readonly coRuler?: PlanetId;
  readonly bodyPart: string;
  readonly bodyRegion: BodyRegion;
  readonly purushartha: Purushartha;
  readonly modality: Modality;
  readonly element: Element;
  readonly parity: Parity;
  readonly gender: Gender;
  readonly direction: Direction;
  readonly varna: Varna;
  /** Classical descriptor keywords for the sign (e.g. "leadership", "accumulation"). */
  readonly functions: readonly string[];
  readonly constitution: Dosha;
  readonly physique: string;
  readonly fertility: Fertility;
  readonly risingMode: RisingMode;
  readonly ascensionDuration: AscensionDuration;
  readonly dayNight: DayNightStrength;
  readonly timeOfStrength: TimeOfStrength;
  /** Additional notes on rashi bala when classical sources elaborate. */
  readonly naturalStrength?: string;
  readonly places: readonly string[];
  readonly colors: readonly string[];
  readonly significance: string;
  readonly notes?: string;
}

export interface Nakshatra {
  readonly id: NakshatraId;
  /** 1–27 in classical order, Ashwini = 1. */
  readonly number:
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16
    | 17
    | 18
    | 19
    | 20
    | 21
    | 22
    | 23
    | 24
    | 25
    | 26
    | 27;
  readonly sanskritName: string;
  readonly tamilName: string;
  readonly englishMeaning: string;
  /** 13°20' span in absolute zodiac degrees. */
  readonly span: DegreeRange;
  /** Rashi(s) the nakshatra falls within; ordered from start-degree onward. */
  readonly rashiSpan: readonly RashiId[];
  /** Four 3°20' padas with their navamsa rashis. */
  readonly padas: readonly [Pada, Pada, Pada, Pada];
  /** Vimshottari dasha lord. */
  readonly lord: PlanetId;
  /** Classical visual symbol (e.g. "horse's head"). */
  readonly symbol: string;
  readonly deity: string;
  readonly shakti: Shakti;
  readonly nature: NakshatraNature;
  readonly orientation: NakshatraOrientation;
  readonly guna: Guna;
  readonly gana: Gana;
  readonly yoni: Yoni;
  readonly varna: Varna;
  /** Body part of the cosmic Nakshatra Purusha. */
  readonly bodyPart: string;
  readonly dosha: Dosha;
  /** Tree (vriksha) associated with the nakshatra. */
  readonly tree: string;
  readonly direction: Direction;
  readonly colors: readonly string[];
  readonly purushartha: Purushartha;
  readonly mahabhuta: Mahabhuta;
  readonly nadi: Nadi;
  /** Marks gandanta junctions at water-fire boundaries (Revati-Ashwini, Ashlesha-Magha, Jyeshtha-Mula). */
  readonly gandanta?: GandantaPosition;
  readonly notes?: string;
}

export interface House {
  readonly id: HouseId;
  readonly number: HouseNumber;
  readonly sanskritName: string;
  /** Common alternate Sanskrit names (e.g. 6th: "ari" / "shatru"). */
  readonly alternateNames: readonly string[];
  readonly significations: readonly string[];
  readonly bodyParts: readonly string[];
  readonly classifications: readonly HouseClassification[];
  /** Bhava karaka per Parashara. */
  readonly karakaPlanet: readonly PlanetId[];
  readonly themes: readonly string[];
}

export interface CharaKaraka {
  readonly id: string;
  readonly name: string;
  readonly sanskritName: string;
  readonly abbreviation: string;
  /** 1 = highest degree (Atmakaraka), 7 = lowest (Darakaraka). */
  readonly calculationOrder: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  readonly role: string;
  readonly significations: readonly string[];
  readonly notes?: string;
}

export interface AvasthaBaladi {
  readonly name: "Bala" | "Kumara" | "Yuva" | "Vriddha" | "Mrita";
  readonly meaning: string;
  /** Degrees within an odd sign at which a planet is in this state. */
  readonly oddSignRange: DegreeRange;
  /** Degrees within an even sign at which a planet is in this state. */
  readonly evenSignRange: DegreeRange;
  readonly effect: string;
}

export interface AvasthaJagradadi {
  readonly name: "Jagrat" | "Swapna" | "Sushupti";
  readonly meaning: string;
  readonly condition: string;
  readonly effect: string;
}

export interface AvasthaDeeptadi {
  readonly name:
    | "Deepta"
    | "Swastha"
    | "Mudita"
    | "Shanta"
    | "Shakta"
    | "Nipidita"
    | "Khala"
    | "Garvita"
    | "Deena";
  readonly meaning: string;
  readonly condition: string;
  readonly effect: string;
}

export interface Sambandha {
  readonly id: string;
  readonly name: string;
  readonly sanskritName: string;
  readonly definition: string;
  readonly example: string;
  readonly strengthLevel: StrengthLevel;
}

export interface GlossaryEntry {
  /** Canonical term in IAST-light. */
  readonly term: string;
  /** Tamil rendering, when one exists. */
  readonly tamil?: string;
  /** Devanagari/Sanskrit form, when relevant for disambiguation. */
  readonly sanskrit?: string;
  readonly meaning: string;
  readonly category: string;
  /** Cross-reference IDs for follow-on navigation. */
  readonly seeAlso?: readonly string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Relationship table types
// ─────────────────────────────────────────────────────────────────────────────

export type NaisargikaMatrix = Readonly<Record<PlanetId, Readonly<Record<PlanetId, RelationStatus>>>>;

export interface TatkalikaRule {
  readonly description: string;
  /** Houses-from-each-other counted as temporary friends. */
  readonly friendHouses: readonly HouseNumber[];
  /** Houses-from-each-other counted as temporary enemies. */
  readonly enemyHouses: readonly HouseNumber[];
}

export type PanchadhaMaitriMatrix = Readonly<
  Record<RelationStatus, Readonly<Record<RelationStatus, PanchadhaLevel>>>
>;
