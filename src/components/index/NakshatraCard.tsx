import Link from "next/link";

import { Sanskrit } from "@/components/Sanskrit";
import { Deva } from "@/components/devanagari-context";
import { Capsule, type CapsuleTone } from "@/components/temple/Capsule";
import { Tablet } from "@/components/temple/Tablet";
import { NakshatraSymbol } from "@/components/visual/NakshatraSymbol";
import { NAKSHATRA_DEVA } from "@/lib/data/devanagari";
import { getPlanetById } from "@/lib/data";
import type { Gana, Nakshatra } from "@/lib/data";

interface NakshatraCardProps {
  nakshatra: Nakshatra;
}

const GANA_TONE: Record<Gana, CapsuleTone> = {
  deva: "leaf",
  manushya: "turmeric",
  rakshasa: "maroon",
};

function capitalize(s: string): string {
  if (!s) return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/**
 * Index-grid card for a single nakshatra in the Temple-at-Night vocabulary.
 * The whole card is a navigation link to /nakshatras/[id], wrapped in a
 * Tablet with a brass-framed yantra glyph on the left, and a stack of
 * names (numeral + Sanskrit + Devanāgarī + italic English meaning) plus
 * lord / gana capsule chips on the right.
 */
export function NakshatraCard({ nakshatra: n }: NakshatraCardProps) {
  const lord = getPlanetById(n.lord);
  const lordLabel = lord?.sanskritName ?? n.lord;

  return (
    <Link
      href={`/nakshatras/${n.id}`}
      aria-label={`${n.sanskritName} (${n.englishMeaning})`}
      className="group block focus:outline-none"
    >
      <Tablet
        corners
        className="flex items-center gap-4 px-4 py-3.5 group hover:-translate-y-0.5 transition-transform"
      >
        {/* LEFT — framed yantra glyph */}
        <div
          aria-hidden
          className="flex size-16 shrink-0 items-center justify-center rounded-sm border border-brass/20 bg-ink/35 text-turmeric"
        >
          <NakshatraSymbol id={n.id} size={52} />
        </div>

        {/* CENTER — numeral + names + chips */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-baseline gap-2.5">
            <span className="font-titling text-brass-hi text-sm tracking-[0.1em]">
              {String(n.number).padStart(2, "0")}
            </span>
            <Sanskrit className="not-italic font-display text-xl text-bone leading-none">
              {n.sanskritName}
            </Sanskrit>
          </div>
          <Deva className="text-xs text-brass mt-0.5 block">
            {NAKSHATRA_DEVA[n.id]}
          </Deva>
          <div className="mt-1 font-display text-xs italic text-bone-3">
            {n.englishMeaning}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <Capsule className="!text-[9px]">{lordLabel}</Capsule>
            <Capsule tone={GANA_TONE[n.gana]} className="!text-[9px]">
              {capitalize(n.gana)}
            </Capsule>
          </div>
        </div>
      </Tablet>
    </Link>
  );
}
