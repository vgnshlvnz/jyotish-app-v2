import type { PlanetId } from "@/lib/data/types";

/**
 * Per-planet line / accent color used by the aspect overlay, the chart
 * planet glyphs, and the legend swatches. CSS color values — pass straight
 * to `stroke=` / `fill=` / `style.color`.
 *
 * Reuses the temple palette where possible. Venus needs a one-off
 * rose-pink that doesn't exist as a global token, since otherwise Venus
 * and Moon would both render in bone and the lines would merge.
 */
export const PLANET_LINE_COLOR: Record<PlanetId, string> = {
  sun:     "var(--turmeric)",
  moon:    "var(--bone)",
  mars:    "var(--vermilion)",
  mercury: "var(--leaf)",
  jupiter: "var(--brass-hi)",
  venus:   "#d8a4c4",
  saturn:  "var(--indigo-2)",
  rahu:    "var(--indigo)",
  ketu:    "var(--maroon)",
};

/** Two-letter planet abbreviation for in-chart badges (matches the PDF). */
export const PLANET_ABBR: Record<PlanetId, string> = {
  sun:     "Su",
  moon:    "Mo",
  mars:    "Ma",
  mercury: "Me",
  jupiter: "Ju",
  venus:   "Ve",
  saturn:  "Sa",
  rahu:    "Ra",
  ketu:    "Ke",
};
