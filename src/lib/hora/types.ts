import type { PlanetId } from "@/lib/data/types";

/** Day-of-week index — 0 = Sunday, 6 = Saturday (matches `Date.getDay()`). */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/**
 * The seven classical hora-ruling planets (luminaries + 5 visible).
 * Rāhu and Ketu do not rule horas in the classical scheme.
 */
export type HoraPlanet =
  | "sun"
  | "moon"
  | "mars"
  | "mercury"
  | "jupiter"
  | "venus"
  | "saturn";

export interface HoraInterval {
  /** 1–24, in temporal order from sunrise. */
  readonly index: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;
  readonly start: Date;
  readonly end: Date;
  readonly planet: HoraPlanet;
  /** "day" = sunrise→sunset (horas 1–12); "night" = sunset→next sunrise (horas 13–24). */
  readonly half: "day" | "night";
}

export interface HoraDay {
  /** Civil date this table is for, expressed as YYYY-MM-DD in the location's timezone. */
  readonly date: string;
  readonly weekday: Weekday;
  /** The day's ruling planet (also the planet of the first hora). */
  readonly dayLord: HoraPlanet;
  readonly sunrise: Date;
  readonly sunset: Date;
  /** Sunrise on the next civil day (used to size the night horas). */
  readonly nextSunrise: Date;
  readonly horas: readonly HoraInterval[];
}

export interface Location {
  readonly name: string;
  readonly latitude: number;
  readonly longitude: number;
  /** IANA timezone (e.g. "Asia/Kolkata"). */
  readonly timezone: string;
}

/** Helper for `PlanetId`-typed lookups (HoraPlanet is a strict subset). */
export function asPlanetId(p: HoraPlanet): PlanetId {
  return p;
}
