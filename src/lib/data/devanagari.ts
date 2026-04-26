/**
 * Devanāgarī renderings of the 9 grahas, 12 rāśis, and 27 nakṣatras.
 *
 * Kept as a separate file so the canonical data layer (`planets.ts`,
 * `rashis.ts`, `nakshatras.ts`) stays IAST-light per its own contract. The
 * UI looks these up when the Devanāgarī toggle is on.
 *
 * @source standard classical Devanāgarī forms; first 9 + 12 + 9 verbatim
 *         from the Claude Design "Vedic Rune" prototype, remainder added
 *         from common Sanskrit references.
 */

import type { NakshatraId, PlanetId, RashiId } from "./types";

export const PLANET_DEVA: Record<PlanetId, string> = {
  sun: "सूर्य",
  moon: "चन्द्र",
  mars: "मङ्गल",
  mercury: "बुध",
  jupiter: "बृहस्पति",
  venus: "शुक्र",
  saturn: "शनि",
  rahu: "राहु",
  ketu: "केतु",
};

export const RASHI_DEVA: Record<RashiId, string> = {
  mesha: "मेष",
  vrishabha: "वृषभ",
  mithuna: "मिथुन",
  karka: "कर्क",
  simha: "सिंह",
  kanya: "कन्या",
  tula: "तुला",
  vrishchika: "वृश्चिक",
  dhanu: "धनु",
  makara: "मकर",
  kumbha: "कुम्भ",
  meena: "मीन",
};

export const NAKSHATRA_DEVA: Record<NakshatraId, string> = {
  ashwini: "अश्विनी",
  bharani: "भरणी",
  krittika: "कृत्तिका",
  rohini: "रोहिणी",
  mrigashira: "मृगशीर्ष",
  ardra: "आर्द्रा",
  punarvasu: "पुनर्वसु",
  pushya: "पुष्य",
  ashlesha: "आश्लेषा",
  magha: "मघा",
  purva_phalguni: "पूर्वा फाल्गुनी",
  uttara_phalguni: "उत्तरा फाल्गुनी",
  hasta: "हस्त",
  chitra: "चित्रा",
  swati: "स्वाति",
  vishakha: "विशाखा",
  anuradha: "अनुराधा",
  jyeshtha: "ज्येष्ठा",
  mula: "मूल",
  purva_ashadha: "पूर्वाषाढा",
  uttara_ashadha: "उत्तराषाढा",
  shravana: "श्रवण",
  dhanishta: "धनिष्ठा",
  shatabhisha: "शतभिषा",
  purva_bhadrapada: "पूर्व भाद्रपदा",
  uttara_bhadrapada: "उत्तर भाद्रपदा",
  revati: "रेवती",
};

/**
 * Common term-level Devanāgarī labels used throughout the UI for attribute
 * keys (Cabinet → राजन्, Element → भूत, etc.). Only the most-frequently-
 * displayed concepts are included.
 */
export const TERM_DEVA: Record<string, string> = {
  // Domains
  Grahas: "ग्रह",
  Rashayah: "राशि",
  Nakshatrani: "नक्षत्र",
  Navagraha: "नवग्रह",

  // Identity / archetype
  Atma: "आत्मन्",
  Cabinet: "राजन्",
  Archetype: "आर्केटाइप",
  Nature: "स्वभाव",
  Guna: "गुण",
  Element: "भूत",
  Mahabhuta: "महाभूत",
  Varna: "वर्ण",
  Direction: "दिशा",
  Dosha: "दोष",
  Day: "वार",
  Metal: "धातु",
  Gem: "रत्न",
  Color: "वर्ण",
  Rules: "स्वक्षेत्र",
  Deity: "देवता",
  Exaltation: "उच्च",
  Debilitation: "नीच",
  Friends: "मित्र",
  Enemies: "शत्रु",
  Lord: "स्वामी",
  Modality: "स्वभाव",
  Symbol: "रूपक",
  Gender: "लिङ्ग",
  Body: "अङ्ग",
  Month: "मास",
  Purushartha: "अर्थ",
  Span: "अंश",
  Number: "क्रम",
  Yoni: "योनि",
  Nadi: "नाडी",
  Gana: "गण",
  Sign: "राशि",
  Identity: "स्वरूप",
  Attributes: "स्वरूप",
  Connections: "सम्बन्ध",
  Significations: "कारकत्व",
};
