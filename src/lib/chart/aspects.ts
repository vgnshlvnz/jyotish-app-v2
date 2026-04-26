/**
 * Pure aspect-math helpers for the interactive chart.
 *
 * The data layer's `Planet.aspects` is the canonical source of which houses
 * each planet aspects, counted from the planet's own house (1 = same house,
 * 7 = opposite, etc.). All helpers below derive AspectArrows from that.
 */

import {
  PLANETS,
  RASHIS,
  getPlanetById,
} from "@/lib/data";
import type {
  HouseNumber,
  Planet,
  PlanetId,
  RashiId,
} from "@/lib/data/types";

import type { AspectArrow, AspectType, BirthChart, Placement } from "./types";

const HOUSE_NUMBERS: readonly HouseNumber[] = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
];

function asHouseNumber(n: number): HouseNumber {
  // Normalize to [1..12] — caller guarantees the input is already an int.
  const wrapped = ((n - 1) % 12 + 12) % 12 + 1;
  return wrapped as HouseNumber;
}

/**
 * House number of a rashi given the lagna sign. Counts forward from the
 * lagna (lagna's rashi = house 1, next rashi = house 2, …).
 */
export function houseOfRashi(rashi: RashiId, lagna: RashiId): HouseNumber {
  const lagnaIndex = RASHIS.findIndex((r) => r.id === lagna);
  const rashiIndex = RASHIS.findIndex((r) => r.id === rashi);
  if (lagnaIndex < 0 || rashiIndex < 0) {
    throw new Error(`houseOfRashi: invalid rashi (${rashi}) or lagna (${lagna})`);
  }
  // forward distance, then 1-indexed
  const distance = (rashiIndex - lagnaIndex + 12) % 12;
  return (distance + 1) as HouseNumber;
}

/** Convenience: house number for a placement under the chart's lagna. */
export function placementToHouse(p: Placement, lagna: RashiId): HouseNumber {
  return houseOfRashi(p.rashi, lagna);
}

/** Reverse mapping: which rashi sits in a given house, given the lagna. */
export function rashiOfHouse(house: HouseNumber, lagna: RashiId): RashiId {
  const lagnaIndex = RASHIS.findIndex((r) => r.id === lagna);
  if (lagnaIndex < 0) {
    throw new Error(`rashiOfHouse: invalid lagna (${lagna})`);
  }
  const targetIndex = (lagnaIndex + (house - 1)) % 12;
  // RASHIS is a non-empty const array of length 12; targetIndex is in [0..11]
  // so this lookup is total. The non-null assertion is safe.
  return RASHIS[targetIndex]!.id;
}

function classify(n: number): AspectType {
  return n === 7 ? "full" : "special";
}

/**
 * The aspects a single planet casts from its current house.
 *
 * The `Planet.aspects` array contains aspect-distances counted from the
 * planet's own house (where 1 = same, 7 = opposite, etc.). For each entry
 * we compute the absolute house it lands on and tag it as "full" (7th) or
 * "special" (3, 4, 5, 8, 9, 10).
 */
export function aspectsFromPlanet(
  planet: Planet,
  fromHouse: HouseNumber,
): AspectArrow[] {
  return planet.aspects.map((n) => ({
    planet: planet.id,
    fromHouse,
    toHouse: asHouseNumber(fromHouse + n - 1),
    type: classify(n),
  }));
}

/**
 * Every aspect arrow in a chart. Iterates over each placed planet and emits
 * its arrows. Planets not present in the placements array are skipped.
 */
export function allAspects(chart: BirthChart): AspectArrow[] {
  const arrows: AspectArrow[] = [];
  for (const placement of chart.placements) {
    const planet = getPlanetById(placement.planet);
    if (!planet) continue;
    const fromHouse = placementToHouse(placement, chart.lagna);
    arrows.push(...aspectsFromPlanet(planet, fromHouse));
  }
  return arrows;
}

/**
 * Aspect arrows targeting a specific house (used for "click a house" mode).
 */
export function aspectsTargetingHouse(
  chart: BirthChart,
  house: HouseNumber,
): AspectArrow[] {
  return allAspects(chart).filter((a) => a.toHouse === house);
}

/** Convenience: which planets sit in a given house? */
export function planetsInHouse(
  chart: BirthChart,
  house: HouseNumber,
): readonly PlanetId[] {
  return chart.placements
    .filter((p) => placementToHouse(p, chart.lagna) === house)
    .map((p) => p.planet);
}

/** Re-export for callers that want to enumerate or label houses. */
export { HOUSE_NUMBERS };

/** Re-export so callers don't need both `@/lib/data` and `@/lib/chart`. */
export { PLANETS };
