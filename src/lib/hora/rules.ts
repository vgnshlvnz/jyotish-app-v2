import type { HoraPlanet, Weekday } from "./types";

/**
 * Day-lord by weekday — the planet ruling the entire civil day, and
 * therefore the first hora of that day.
 *
 * Sunday = Sūrya (Sun), Monday = Candra (Moon), and so on through the
 * classical seven-day week. This mapping is universal across Vedic and
 * Hellenistic traditions.
 */
export const DAY_LORD: Record<Weekday, HoraPlanet> = {
  0: "sun",     // Sunday    — Ravivāra
  1: "moon",    // Monday    — Somavāra
  2: "mars",    // Tuesday   — Maṅgalavāra
  3: "mercury", // Wednesday — Budhavāra
  4: "jupiter", // Thursday  — Guruvāra
  5: "venus",   // Friday    — Śukravāra
  6: "saturn",  // Saturday  — Śanivāra
};

/**
 * Chaldean order — the planetary sequence that horas follow.
 *
 * Ordered fastest-to-slowest from a geocentric perspective in the
 * classical tradition: Saturn (slowest) → Jupiter → Mars → Sun →
 * Venus → Mercury → Moon (fastest). Horas advance in this order
 * starting from the day-lord.
 *
 * The brilliance of the system: 24 horas later, the cycle lands on
 * the planet whose day comes next. e.g. Sunday (Sun-day) hora-1 = Sun;
 * 24 horas later (Monday hora-1) = Moon ✓.
 */
export const CHALDEAN_ORDER: readonly HoraPlanet[] = [
  "saturn",
  "jupiter",
  "mars",
  "sun",
  "venus",
  "mercury",
  "moon",
] as const;

/**
 * Returns the planet ruling the n-th hora (1-indexed) starting from a
 * given day-lord. Walks the Chaldean cycle FORWARD: each successive hora
 * advances to the next planet in the slowest-first order, wrapping from
 * Moon back to Saturn.
 *
 * Verified against the canonical reference:
 *   - Sunday (Sun-day) horas 1–7 = Sun, Venus, Mercury, Moon, Saturn,
 *     Jupiter, Mars (then cycle repeats).
 *   - Sunday hora 25 = Moon = Monday hora 1 ✓.
 */
export function horaPlanetAt(dayLord: HoraPlanet, n: number): HoraPlanet {
  const startIdx = CHALDEAN_ORDER.indexOf(dayLord);
  if (startIdx < 0) {
    throw new Error(`horaPlanetAt: unknown day lord ${dayLord}`);
  }
  const len = CHALDEAN_ORDER.length;
  const targetIdx = (startIdx + (n - 1)) % len;
  // Safe non-null: targetIdx is always in [0, 6] and CHALDEAN_ORDER has 7 entries.
  return CHALDEAN_ORDER[targetIdx]!;
}
