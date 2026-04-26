import type { HouseNumber, RashiId } from "@/lib/data/types";

import { rashiOfHouse } from "./aspects";

/**
 * South Indian chart layout — fixed sign positions in a 4×4 grid.
 *
 *   col:    1          2         3        4
 *   row 1:  Pisces    Aries     Taurus   Gemini
 *   row 2:  Aquarius                     Cancer
 *   row 3:  Capricorn                    Leo
 *   row 4:  Sagittarius Scorpio Libra    Virgo
 *
 * Center 2×2 (rows 2–3, cols 2–3) is reserved for the chart title.
 *
 * Coordinates use a [0, 4] grid space; convert to a viewBox by multiplying
 * by the cell size when rendering the SVG overlay.
 */

export type GridCol = 1 | 2 | 3 | 4;
export type GridRow = 1 | 2 | 3 | 4;
export interface GridCell {
  readonly row: GridRow;
  readonly col: GridCol;
}

export const RASHI_GRID_POS: Record<RashiId, GridCell> = {
  meena:      { row: 1, col: 1 },  // Pisces
  mesha:      { row: 1, col: 2 },  // Aries
  vrishabha:  { row: 1, col: 3 },  // Taurus
  mithuna:    { row: 1, col: 4 },  // Gemini
  kumbha:     { row: 2, col: 1 },  // Aquarius
  karka:      { row: 2, col: 4 },  // Cancer
  makara:     { row: 3, col: 1 },  // Capricorn
  simha:      { row: 3, col: 4 },  // Leo
  dhanu:      { row: 4, col: 1 },  // Sagittarius
  vrishchika: { row: 4, col: 2 },  // Scorpio
  tula:       { row: 4, col: 3 },  // Libra
  kanya:      { row: 4, col: 4 },  // Virgo
};

/** Centre of a cell in the 4×4 grid, in `[0, 4]`-coordinates. */
export function cellCenter(cell: GridCell): { x: number; y: number } {
  return { x: cell.col - 0.5, y: cell.row - 0.5 };
}

/** Centre of the cell containing a given house, given the lagna. */
export function houseCellCenter(
  house: HouseNumber,
  lagna: RashiId,
): { x: number; y: number } {
  const rashi = rashiOfHouse(house, lagna);
  return cellCenter(RASHI_GRID_POS[rashi]);
}

/** Twelve outer rashis in render order (top-left → top-right → right → bottom → left). */
export const OUTER_RASHIS: readonly RashiId[] = [
  "meena", "mesha", "vrishabha", "mithuna",
  "kumbha", "karka",
  "makara", "simha",
  "dhanu", "vrishchika", "tula", "kanya",
];
