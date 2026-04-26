/**
 * Avasthas — three classical state-systems for assessing planetary potency.
 *
 * Each system answers a different question about a planet's effective
 * strength at the moment of birth:
 *
 * - **Baladi** (5 states) classifies by degree-position within the sign,
 *   modeling the planet's life-cycle from infant to dead.
 * - **Jagradadi** (3 states) classifies by friendly/neutral/inimical
 *   placement, modeling alertness from awake to deep sleep.
 * - **Deeptadi** (9 states) classifies by a richer mix of conditions
 *   (exaltation, retrogression, planetary war, etc.) yielding qualitative
 *   moods — shining, comfortable, joyous, peaceful, capable, distressed,
 *   wicked, proud, depressed.
 *
 * @source Brihat Parashara Hora Shastra (Santhanam tr.), Avasthadhyaya;
 *         Phaladeepika; Saravali.
 */

import type { AvasthaBaladi, AvasthaDeeptadi, AvasthaJagradadi } from "./types";

/**
 * The five Baladi avasthas by degree within the occupied sign.
 *
 * For odd-numbered signs (Mesha, Mithuna, Simha, Tula, Dhanu, Kumbha) the
 * sequence runs forward from 0°. For even-numbered signs (Vrishabha, Karka,
 * Kanya, Vrishchika, Makara, Meena) the sequence runs in reverse — Bala
 * occupies 24°–30° and Mrita occupies 0°–6°.
 *
 * @source BPHS Avasthadhyaya, slokas on Baladi.
 */
export const BALADI_AVASTHAS = [
  {
    name: "Bala",
    meaning: "infant — newly arrived, limited capacity",
    oddSignRange: { startDegree: 0, endDegree: 6 },
    evenSignRange: { startDegree: 24, endDegree: 30 },
    effect:
      "Gives one-quarter of its potential results. The planet is alive but lacks strength to deliver its karaka effects.",
  },
  {
    name: "Kumara",
    meaning: "child — growing, half-capacity",
    oddSignRange: { startDegree: 6, endDegree: 12 },
    evenSignRange: { startDegree: 18, endDegree: 24 },
    effect:
      "Gives one-half of its potential results. The planet's significations are forming but not yet mature.",
  },
  {
    name: "Yuva",
    meaning: "youth — peak capacity, full effect",
    oddSignRange: { startDegree: 12, endDegree: 18 },
    evenSignRange: { startDegree: 12, endDegree: 18 },
    effect:
      "Gives full results. The planet is in its prime and delivers significations completely.",
  },
  {
    name: "Vriddha",
    meaning: "old — declining, weakened",
    oddSignRange: { startDegree: 18, endDegree: 24 },
    evenSignRange: { startDegree: 6, endDegree: 12 },
    effect:
      "Gives little to negligible results. The planet's vitality is fading and karaka effects are thin.",
  },
  {
    name: "Mrita",
    meaning: "dead — exhausted, no effect",
    oddSignRange: { startDegree: 24, endDegree: 30 },
    evenSignRange: { startDegree: 0, endDegree: 6 },
    effect:
      "Gives no results from its own significations. The planet is functionally inert; only by being involved in a yoga can its karakas express.",
  },
] as const satisfies readonly AvasthaBaladi[];

/**
 * The three Jagradadi avasthas by sign-dignity.
 *
 * @source BPHS Avasthadhyaya, slokas on Jagradadi.
 */
export const JAGRADADI_AVASTHAS = [
  {
    name: "Jagrat",
    meaning: "awake — fully alert and effective",
    condition:
      "Planet placed in its own sign (swakshetra), its moolatrikona, or its exaltation sign (uchcha).",
    effect:
      "Delivers significations fully and clearly, with strength and dignity. Karakatwas express in their highest form.",
  },
  {
    name: "Swapna",
    meaning: "dreaming — half-aware, moderate effect",
    condition:
      "Planet placed in a friendly or neutral sign (mitra-kshetra or sama-kshetra).",
    effect:
      "Delivers significations partially. Effects are mixed and somewhat blurred — like the half-real quality of a dream.",
  },
  {
    name: "Sushupti",
    meaning: "deep sleep — unconscious, ineffective",
    condition:
      "Planet placed in an enemy sign (shatru-kshetra) or its debilitation sign (neecha).",
    effect:
      "Karakatwas largely fail to manifest. The planet is functionally dormant; results require activation by yogas, transits, or dasha periods.",
  },
] as const satisfies readonly AvasthaJagradadi[];

/**
 * The nine Deeptadi avasthas by combined positional and combinational state.
 *
 * Several Deeptadi states can apply to the same planet simultaneously.
 * Practitioners weigh all applicable states when judging a planet's mood.
 *
 * @source BPHS Avasthadhyaya, slokas on Deeptadi.
 */
export const DEEPTADI_AVASTHAS = [
  {
    name: "Deepta",
    meaning: "shining — radiant, exalted",
    condition: "Planet is in its sign of exaltation (uchcha).",
    effect:
      "Confers fame, wealth, recognition, vehicles, and respect. Whatever the planet signifies arrives in abundance and visibility.",
  },
  {
    name: "Swastha",
    meaning: "comfortable — at ease in its own home",
    condition: "Planet is in its own sign (swakshetra).",
    effect:
      "Confers material comfort, prosperity, sound health, and steady recognition. The planet's significations unfold without strain.",
  },
  {
    name: "Mudita",
    meaning: "joyous — content among friends",
    condition: "Planet is in a friendly sign (mitra-kshetra).",
    effect:
      "Confers happiness, success in undertakings, support from friends, and pleasant outcomes from the planet's significations.",
  },
  {
    name: "Shanta",
    meaning: "peaceful — calm and benevolent",
    condition:
      "Planet is in a benefic varga (such as Shubha-vargottama) or aspected predominantly by benefics.",
    effect:
      "Confers equanimity, freedom from anxiety, peaceful relationships, and steady moral conduct.",
  },
  {
    name: "Shakta",
    meaning: "capable — empowered to act",
    condition:
      "Planet is retrograde (vakra), in its own navamsa, or otherwise positionally strong (e.g. by Shadbala).",
    effect:
      "Confers strength of action, ability to overcome obstacles, and delivery of significations through effort.",
  },
  {
    name: "Nipidita",
    meaning: "distressed — afflicted",
    condition:
      "Planet is defeated in graha-yuddha (planetary war), eclipsed by the Sun (combust), or otherwise pressed by malefic influence.",
    effect:
      "Causes distress, anxiety, illness, and obstacles. The planet's significations come with suffering or loss.",
  },
  {
    name: "Khala",
    meaning: "wicked — turned to harm",
    condition: "Planet is in an enemy sign (shatru-kshetra).",
    effect:
      "Causes mischief, conflict with others, sharp tongue, and tendencies toward harmful action. Significations turn destructive.",
  },
  {
    name: "Garvita",
    meaning: "proud — exalted and self-aware",
    condition: "Planet is in its moolatrikona.",
    effect:
      "Confers pride, dignity, accomplishment, and recognition — but also a tendency toward arrogance. The planet's effects are strong but ego-tinged.",
  },
  {
    name: "Deena",
    meaning: "depressed — fallen and weakened",
    condition: "Planet is in its sign of debilitation (neecha).",
    effect:
      "Causes lowliness, depression, defeat, poverty, and the failure of the planet's significations. Difficult to restore without neecha-bhanga (cancellation of debilitation).",
  },
] as const satisfies readonly AvasthaDeeptadi[];
