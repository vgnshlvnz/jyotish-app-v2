import Link from "next/link";

import { Sanskrit } from "@/components/Sanskrit";
import { Card } from "@/components/ui/card";
import { NakshatraSymbol } from "@/components/visual/NakshatraSymbol";
import { cn } from "@/lib/utils";
import { getPlanetById } from "@/lib/data";
import type { Nakshatra } from "@/lib/data";

interface NakshatraCardProps {
  nakshatra: Nakshatra;
}

/**
 * Convert a decimal degree value to a `D°MM'` string
 * (e.g. `13.3333` → `"13°20'"`).
 */
function degreesToDM(d: number): string {
  const deg = Math.floor(d);
  const min = Math.round((d - deg) * 60);
  return `${deg}°${String(min).padStart(2, "0")}'`;
}

/**
 * Index-grid card for a single nakshatra. Whole card is a navigation link to
 * /nakshatras/[id]. Number sits prominently on the left, names + meaning in the
 * middle, the geometric NakshatraSymbol on the right. The dasha lord glyph and
 * deity name appear underneath as quieter metadata, with the formatted span
 * pinned to the bottom.
 */
export function NakshatraCard({ nakshatra: n }: NakshatraCardProps) {
  const lord = getPlanetById(n.lord);
  const spanLabel = `${degreesToDM(n.span.startDegree)} – ${degreesToDM(n.span.endDegree)}`;
  const lordTooltip = lord ? `Lord: ${lord.sanskritName}` : undefined;

  return (
    <Link
      href={`/nakshatras/${n.id}`}
      aria-label={`${n.sanskritName} (${n.englishMeaning})`}
      className="group block focus:outline-none"
    >
      <Card
        className={cn(
          "h-full p-5",
          "hover:-translate-y-0.5 hover:border-primary/40",
          "group-focus-visible:border-primary/60 group-focus-visible:-translate-y-0.5",
          "transition-all duration-200 ease-out",
          "flex flex-col gap-4",
        )}
      >
        {/* Top row: number + names + symbol */}
        <div className="flex items-start gap-4">
          <span
            aria-hidden
            className="font-display text-5xl font-light leading-none tabular-nums text-foreground/90"
          >
            {n.number}
          </span>

          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <Sanskrit className="not-italic text-2xl font-light leading-tight text-foreground">
              {n.sanskritName}
            </Sanskrit>
            <Sanskrit className="not-italic text-xs text-muted-foreground">
              {n.tamilName}
            </Sanskrit>
            <p className="mt-1 text-xs italic font-light text-muted-foreground/85 line-clamp-1">
              {n.englishMeaning}
            </p>
          </div>

          <div
            aria-hidden
            className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-cosmos-line bg-background/40"
          >
            <NakshatraSymbol id={n.id} size="md" />
          </div>
        </div>

        {/* Lord + deity row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          {lord ? (
            <span
              className="inline-flex items-center gap-1.5"
              title={lordTooltip}
            >
              <span
                aria-hidden
                className="font-display text-base leading-none text-foreground/80"
              >
                {lord.glyph}
              </span>
              <span>
                Lord{" "}
                <Sanskrit className="not-italic text-foreground/85">
                  {lord.sanskritName}
                </Sanskrit>
              </span>
            </span>
          ) : null}
          <span className="min-w-0 flex-1 truncate">{n.deity}</span>
        </div>

        {/* Span footer */}
        <p className="mt-auto font-display tabular-nums text-[11px] uppercase tracking-[0.14em] text-muted-foreground/80">
          {spanLabel}
        </p>
      </Card>
    </Link>
  );
}
