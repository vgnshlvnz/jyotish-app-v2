/**
 * Chart-domain types.
 *
 * A `BirthChart` is the lagna sign + a list of planet placements (rashi +
 * degree-in-sign). All other chart-derived data — house numbers, aspect
 * arrows — is computed from these via the pure helpers in `./aspects`.
 */

import type { HouseNumber, PlanetId, RashiId } from "@/lib/data/types";

export interface Placement {
  readonly planet: PlanetId;
  readonly rashi: RashiId;
  /** 0–30°. Decimal degrees only — minute/second precision is presentation-layer. */
  readonly degree: number;
}

export interface BirthChart {
  readonly lagna: RashiId;
  /** May omit any subset; helpers handle missing planets gracefully. */
  readonly placements: readonly Placement[];
}

export type AspectType = "full" | "special";

export interface AspectArrow {
  readonly planet: PlanetId;
  readonly fromHouse: HouseNumber;
  readonly toHouse: HouseNumber;
  readonly type: AspectType;
}
