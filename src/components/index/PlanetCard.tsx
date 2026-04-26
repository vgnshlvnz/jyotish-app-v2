import Link from "next/link";

import { Sanskrit } from "@/components/Sanskrit";
import { Deva } from "@/components/devanagari-context";
import { Capsule, type CapsuleTone } from "@/components/temple/Capsule";
import { Tablet } from "@/components/temple/Tablet";
import { PlanetGlyph } from "@/components/visual/PlanetGlyph";
import { PLANET_DEVA } from "@/lib/data/devanagari";
import { cn } from "@/lib/utils";
import type { Planet, PlanetId, PlanetNatureClass } from "@/lib/data";

interface PlanetCardProps {
  planet: Planet;
  /** 0-based position in the rendered list, used for the "01"–"09" tag. */
  index: number;
}

/** Per-planet accent color — drives the yantra glyph via currentColor. */
const PLANET_ACCENT: Record<PlanetId, string> = {
  sun: "text-turmeric",
  moon: "text-bone",
  mars: "text-vermilion",
  mercury: "text-leaf",
  jupiter: "text-turmeric",
  venus: "text-bone",
  saturn: "text-indigo-cloth",
  rahu: "text-indigo-cloth",
  ketu: "text-maroon",
};

const NATURE_TONE: Record<PlanetNatureClass, CapsuleTone> = {
  benefic: "leaf",
  malefic: "maroon",
  conditional: "turmeric",
};

const NATURE_LABEL: Record<PlanetNatureClass, string> = {
  benefic: "Benefic",
  malefic: "Malefic",
  conditional: "Conditional",
};

const ARCHETYPE_LABEL: Record<Planet["cabinetRole"], string> = {
  king: "King",
  queen: "Queen",
  commander: "Commander",
  prince: "Prince",
  minister: "Minister",
  advisor: "Advisor",
  shadow: "Shadow",
};

function capitalize(s: string): string {
  if (!s) return s;
  const first = s.charAt(0);
  return first.toUpperCase() + s.slice(1);
}

/**
 * Index-grid card for a single planet, restyled to the Temple-at-Night
 * aesthetic. The whole tablet is a navigation link to /planets/[id].
 *
 * Layout: framed yantra glyph on the left (tinted to the planet's accent
 * color via currentColor), name + Devanāgarī + archetype eyebrow + capsule
 * chips in the centre, and a small index tag on the right.
 */
export function PlanetCard({ planet, index }: PlanetCardProps) {
  const accent = PLANET_ACCENT[planet.id];
  const natureTone = NATURE_TONE[planet.nature.classification];
  const natureLabel = NATURE_LABEL[planet.nature.classification];
  const archetype = ARCHETYPE_LABEL[planet.cabinetRole];
  const indexTag = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={`/planets/${planet.id}`}
      aria-label={`${planet.englishName} (${planet.sanskritName})`}
      className="group block focus:outline-none"
    >
      <Tablet
        corners
        className="flex items-center gap-5 px-5 py-4 group hover:-translate-y-0.5 transition-transform"
      >
        {/* LEFT — framed yantra glyph */}
        <div
          aria-hidden
          className={cn(
            "flex size-[76px] shrink-0 items-center justify-center rounded-sm border border-brass/20 bg-ink/35",
            accent,
          )}
        >
          <PlanetGlyph id={planet.id} size={64} />
        </div>

        {/* CENTER — names, archetype eyebrow, capsules */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-baseline gap-3">
            <Sanskrit className="not-italic font-display text-2xl text-bone leading-none">
              {planet.sanskritName}
            </Sanskrit>
            <Deva className="text-base text-brass">
              {PLANET_DEVA[planet.id]}
            </Deva>
          </div>
          <div className="font-titling text-[10px] uppercase tracking-[0.22em] text-bone-3 mt-1.5">
            {planet.englishName} · {archetype}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <Capsule tone={natureTone}>{natureLabel}</Capsule>
            <Capsule>{capitalize(planet.guna)}</Capsule>
          </div>
        </div>

        {/* RIGHT — index tag */}
        <div
          aria-hidden
          className="font-titling text-[11px] tracking-[0.2em] text-bone-4"
        >
          {indexTag}
        </div>
      </Tablet>
    </Link>
  );
}
