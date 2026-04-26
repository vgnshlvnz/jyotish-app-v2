import Link from "next/link";

import { Sanskrit } from "@/components/Sanskrit";
import { Deva } from "@/components/devanagari-context";
import { Capsule, type CapsuleTone } from "@/components/temple/Capsule";
import { Tablet } from "@/components/temple/Tablet";
import { RashiGlyph } from "@/components/visual/RashiGlyph";
import { RASHI_DEVA } from "@/lib/data/devanagari";
import { cn } from "@/lib/utils";
import { getPlanetById } from "@/lib/data";
import type { Rashi, RashiId } from "@/lib/data";

interface RashiCardProps {
  rashi: Rashi;
  /** 0-based position in the rendered list, used for the "01"–"12" tag. */
  index: number;
}

/** Per-rashi accent color, aligned with element. Drives the yantra glyph via currentColor. */
const RASHI_ACCENT: Record<RashiId, string> = {
  // fire
  mesha: "text-vermilion",
  simha: "text-vermilion",
  dhanu: "text-vermilion",
  // earth
  vrishabha: "text-leaf",
  kanya: "text-leaf",
  makara: "text-leaf",
  // air
  mithuna: "text-bone",
  tula: "text-bone",
  kumbha: "text-bone",
  // water
  karka: "text-indigo-cloth",
  vrishchika: "text-indigo-cloth",
  meena: "text-indigo-cloth",
};

const ELEMENT_TONE: Record<Rashi["element"], CapsuleTone> = {
  fire: "vermilion",
  earth: "leaf",
  air: "default",
  water: "indigo",
  // `ether` is not used by rashis classically; fall back to default.
  ether: "default",
};

function capitalize(s: string): string {
  if (!s) return s;
  const first = s.charAt(0);
  return first.toUpperCase() + s.slice(1);
}

/**
 * Index-grid card for a single rashi, restyled to the Temple-at-Night
 * aesthetic. The whole tablet is a navigation link to /rashis/[id].
 *
 * Layout: framed yantra glyph on the left (tinted to the rashi's element
 * accent via currentColor), Sanskrit name + Devanāgarī + meta line in the
 * centre, small index tag on the right; a chip row + ruling-planet line
 * sit beneath.
 */
export function RashiCard({ rashi, index }: RashiCardProps) {
  const accent = RASHI_ACCENT[rashi.id];
  const elementTone = ELEMENT_TONE[rashi.element];
  const indexTag = String(index + 1).padStart(2, "0");
  const ruler = getPlanetById(rashi.ruler);
  const rulerSanskrit = ruler?.sanskritName ?? rashi.ruler;

  return (
    <Link
      href={`/rashis/${rashi.id}`}
      aria-label={`${rashi.englishName} (${rashi.sanskritName})`}
      className="group block focus:outline-none"
    >
      <Tablet
        corners
        className="flex flex-col gap-0 px-4 py-4 group hover:-translate-y-0.5 transition-transform"
      >
        {/* Top row — glyph · names · index */}
        <div className="flex items-center gap-3">
          {/* LEFT — framed yantra glyph */}
          <div
            aria-hidden
            className={cn(
              "flex size-14 shrink-0 items-center justify-center border border-brass/20 bg-ink/35",
              accent,
            )}
          >
            <RashiGlyph id={rashi.id} size={46} />
          </div>

          {/* CENTER — Sanskrit name, Devanāgarī, English · symbol */}
          <div className="flex min-w-0 flex-1 flex-col">
            <Sanskrit className="not-italic font-display text-xl text-bone leading-none">
              {rashi.sanskritName}
            </Sanskrit>
            <Deva className="text-xs text-brass mt-0.5 block">
              {RASHI_DEVA[rashi.id]}
            </Deva>
            <div className="font-titling text-[9px] uppercase tracking-[0.2em] text-bone-3 mt-1">
              {rashi.englishName} · {rashi.symbol}
            </div>
          </div>

          {/* RIGHT — index tag */}
          <div
            aria-hidden
            className="font-titling text-[10px] tracking-[0.2em] text-bone-4"
          >
            {indexTag}
          </div>
        </div>

        {/* Capsule chips row */}
        <div className="pt-2.5 flex flex-wrap items-center gap-1.5">
          <Capsule tone={elementTone} className="!text-[9px]">
            {capitalize(rashi.element)}
          </Capsule>
          <Capsule className="!text-[9px]">
            {capitalize(rashi.modality)}
          </Capsule>
        </div>

        {/* Ruler line */}
        <div className="mt-2 font-display text-xs italic text-bone-3">
          ruled by{" "}
          <Sanskrit className="not-italic">{rulerSanskrit}</Sanskrit>
        </div>
      </Tablet>
    </Link>
  );
}
