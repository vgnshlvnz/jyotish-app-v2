/**
 * Planetary relationships in three layers:
 *
 * 1. **Naisargika** (permanent / natural) — fixed friend / neutral / enemy
 *    assignments per BPHS 3.55–58. The seven classical planets follow the
 *    canonical table; Rahu and Ketu were not addressed by Parashara directly,
 *    so their entries follow widely accepted post-Parashara conventions.
 *
 * 2. **Tatkalika** (temporary) — derived at chart time from the relative
 *    house-positions of two planets. The rule itself is exposed here; the
 *    derivation depends on a specific chart and is not pre-computed.
 *
 * 3. **Panchadha Maitri** (five-fold friendship) — the combinatorial matrix
 *    that collapses naisargika × tatkalika into one of five levels:
 *    great friend, friend, neutral, enemy, great enemy.
 *
 * @source Brihat Parashara Hora Shastra (Santhanam tr.), Sambandha-adhyaya
 *         (chapter 3, slokas 55–62). Rahu/Ketu rows from later commentators.
 */

import type {
  HouseNumber,
  NaisargikaMatrix,
  PanchadhaMaitriMatrix,
  TatkalikaRule,
} from "./types";

/**
 * 9 × 9 permanent relationship matrix. A planet's relationship to itself is
 * recorded as "friend" — a defensible default that the Panchadha Maitri
 * combinator can consume without a special case.
 *
 * @source BPHS 3.55–58 (Santhanam tr.). Rahu/Ketu rows per later tradition
 *         (Hart de Fouw, Robert Svoboda, Hindu Predictive Astrology).
 */
export const NAISARGIKA: NaisargikaMatrix = {
  sun: {
    sun: "friend",
    moon: "friend",
    mars: "friend",
    mercury: "neutral",
    jupiter: "friend",
    venus: "enemy",
    saturn: "enemy",
    rahu: "enemy",
    ketu: "enemy",
  },
  moon: {
    sun: "friend",
    moon: "friend",
    mars: "neutral",
    mercury: "friend",
    jupiter: "neutral",
    venus: "neutral",
    saturn: "neutral",
    rahu: "enemy",
    ketu: "enemy",
  },
  mars: {
    sun: "friend",
    moon: "friend",
    mars: "friend",
    mercury: "enemy",
    jupiter: "friend",
    venus: "neutral",
    saturn: "neutral",
    rahu: "enemy",
    ketu: "friend",
  },
  mercury: {
    sun: "friend",
    moon: "enemy",
    mars: "neutral",
    mercury: "friend",
    jupiter: "neutral",
    venus: "friend",
    saturn: "neutral",
    rahu: "friend",
    ketu: "neutral",
  },
  jupiter: {
    sun: "friend",
    moon: "friend",
    mars: "friend",
    mercury: "enemy",
    jupiter: "friend",
    venus: "enemy",
    saturn: "neutral",
    rahu: "neutral",
    ketu: "neutral",
  },
  venus: {
    sun: "enemy",
    moon: "enemy",
    mars: "neutral",
    mercury: "friend",
    jupiter: "neutral",
    venus: "friend",
    saturn: "friend",
    rahu: "friend",
    ketu: "neutral",
  },
  saturn: {
    sun: "enemy",
    moon: "enemy",
    mars: "enemy",
    mercury: "friend",
    jupiter: "neutral",
    venus: "friend",
    saturn: "friend",
    rahu: "friend",
    ketu: "neutral",
  },
  rahu: {
    sun: "enemy",
    moon: "enemy",
    mars: "enemy",
    mercury: "friend",
    jupiter: "neutral",
    venus: "friend",
    saturn: "friend",
    rahu: "friend",
    ketu: "neutral",
  },
  ketu: {
    sun: "enemy",
    moon: "enemy",
    mars: "friend",
    mercury: "neutral",
    jupiter: "neutral",
    venus: "neutral",
    saturn: "friend",
    rahu: "neutral",
    ketu: "friend",
  },
} as const;

/**
 * Temporary friendship rule (BPHS 3.59).
 *
 * Counted from the sign occupied by planet A: a planet B is a temporary
 * friend if B occupies the 2nd, 3rd, 4th, 10th, 11th, or 12th sign from A.
 * Otherwise (1st, 5th, 6th, 7th, 8th, 9th) B is a temporary enemy.
 *
 * Note: the 1st-house entry covers the case where B occupies the same sign
 * as A — i.e. they are conjunct. This is the BPHS-literal convention.
 */
export const TATKALIKA_RULE: TatkalikaRule = {
  description:
    "Counted from the sign of planet A: planets in the 2nd, 3rd, 4th, 10th, 11th, or 12th house are temporary friends. Planets in the 1st (same sign / conjunction), 5th, 6th, 7th, 8th, or 9th house are temporary enemies. The relationship is symmetric — A's tatkalika friend is also A's friend by the same count.",
  friendHouses: [2, 3, 4, 10, 11, 12] satisfies readonly HouseNumber[],
  enemyHouses: [1, 5, 6, 7, 8, 9] satisfies readonly HouseNumber[],
} as const;

/**
 * Panchadha Maitri (five-fold friendship) combinator.
 *
 * Indexed `[naisargika][tatkalika]` → resulting compound relationship.
 *
 * | Naisargika \ Tatkalika | Friend       | Neutral | Enemy        |
 * |-----------------------|--------------|---------|--------------|
 * | Friend                | great_friend | friend  | neutral      |
 * | Neutral               | friend       | neutral | enemy        |
 * | Enemy                 | neutral      | enemy   | great_enemy  |
 *
 * @source BPHS 3.61–62 (Santhanam tr.).
 */
export const PANCHADHA_MAITRI: PanchadhaMaitriMatrix = {
  friend: {
    friend: "great_friend",
    neutral: "friend",
    enemy: "neutral",
  },
  neutral: {
    friend: "friend",
    neutral: "neutral",
    enemy: "enemy",
  },
  enemy: {
    friend: "neutral",
    neutral: "enemy",
    enemy: "great_enemy",
  },
} as const;
