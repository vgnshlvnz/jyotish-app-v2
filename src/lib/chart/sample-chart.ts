import type { BirthChart } from "./types";

/**
 * The sample chart from "Jyotish Ārambha" Assignment #11
 * (`Name - JA1-Assignment#11-25042026.pdf`).
 *
 *   Body            Longitude
 *   ──────────────  ────────────────────
 *   Lagna           15° Ta 13' 24.58"   (Taurus)
 *   Sun (PK)        13° Ar 34' 33.44"
 *   Moon (DK)        1° Vi 41' 01.71"
 *   Mars (BK)       19° Pi 54' 41.65"
 *   Mercury (AK)    26° Pi 24' 00.40"
 *   Jupiter (AmK)   24° Ge 18' 23.55"
 *   Venus (GK)      10° Ta 30' 58.34"
 *   Saturn (PiK)    14° Pi 36' 28.01"
 *   Rahu (MK)       11° Aq 45' 43.63"
 *   Ketu            11° Le 45' 43.63"
 *
 * Degrees are stored as decimal-degrees (minutes/seconds collapsed) for
 * brevity; the UI re-formats to deg-min for display.
 */
export const PDF_SAMPLE_CHART: BirthChart = {
  lagna: "vrishabha",
  placements: [
    { planet: "sun",     rashi: "mesha",      degree: 13.576 },
    { planet: "moon",    rashi: "kanya",      degree: 1.684 },
    { planet: "mars",    rashi: "meena",      degree: 19.911 },
    { planet: "mercury", rashi: "meena",      degree: 26.400 },
    { planet: "jupiter", rashi: "mithuna",    degree: 24.306 },
    { planet: "venus",   rashi: "vrishabha",  degree: 10.516 },
    { planet: "saturn",  rashi: "meena",      degree: 14.608 },
    { planet: "rahu",    rashi: "kumbha",     degree: 11.762 },
    { planet: "ketu",    rashi: "simha",      degree: 11.762 },
  ],
} as const;
