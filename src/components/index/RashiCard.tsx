import Link from "next/link";
import { Calendar } from "lucide-react";

import { Sanskrit } from "@/components/Sanskrit";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getPlanetById } from "@/lib/data";
import type { Rashi } from "@/lib/data";

interface RashiCardProps {
  rashi: Rashi;
}

const ELEMENT_VARIANT: Record<
  Rashi["element"],
  "rose" | "gold" | "indigo" | "muted"
> = {
  fire: "rose",
  earth: "gold",
  air: "indigo",
  water: "muted",
  // Pancha-bhuta `ether` is not classically used by rashis, but the union
  // requires a fallback so the lookup is exhaustive.
  ether: "muted",
};

const ELEMENT_LABEL: Record<Rashi["element"], string> = {
  fire: "Fire",
  earth: "Earth",
  air: "Air",
  water: "Water",
  ether: "Ether",
};

const MODALITY_LABEL: Record<Rashi["modality"], string> = {
  chara: "Chara",
  sthira: "Sthira",
  dwiswabhava: "Dwiswabhava",
};

const REGION_LABEL: Record<Rashi["bodyRegion"], string> = {
  upper: "Upper body",
  middle: "Middle body",
  lower: "Lower body",
};

/**
 * Index-grid card for a single rashi. Whole card is a navigation link to
 * /rashis/[id]. Glyph dominates; element is colour-coded; the Tamil month
 * and ruling planet sit beneath as quieter metadata.
 */
export function RashiCard({ rashi }: RashiCardProps) {
  const ruler = getPlanetById(rashi.ruler);
  const elementVariant = ELEMENT_VARIANT[rashi.element];
  const elementLabel = ELEMENT_LABEL[rashi.element];
  const modalityLabel = MODALITY_LABEL[rashi.modality];
  const regionLabel = REGION_LABEL[rashi.bodyRegion];

  return (
    <Link
      href={`/rashis/${rashi.id}`}
      aria-label={`${rashi.englishName} (${rashi.sanskritName})`}
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
        {/* Glyph + symbol caption */}
        <div className="flex items-start gap-4">
          <div
            aria-hidden
            className="flex size-16 shrink-0 flex-col items-center justify-center rounded-xl border border-cosmos-line bg-background/40"
          >
            <span className="font-display text-5xl leading-none text-foreground/90">
              {rashi.glyph}
            </span>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <Sanskrit className="not-italic text-2xl font-light leading-tight text-foreground">
              {rashi.sanskritName}
            </Sanskrit>
            <p className="text-xs text-muted-foreground">
              {rashi.englishName}
              <span className="mx-1.5 text-foreground/30">·</span>
              <Sanskrit className="not-italic text-muted-foreground">
                {rashi.tamilName}
              </Sanskrit>
            </p>
            <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground/80">
              {rashi.symbol}
            </p>
          </div>
        </div>

        {/* Tamil month + ruler row */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar aria-hidden className="size-3.5 text-muted-foreground/70" />
            <span>{rashi.tamilMonth}</span>
          </span>
          {ruler ? (
            <span className="inline-flex items-center gap-1.5">
              <span
                aria-hidden
                className="font-display text-base leading-none text-foreground/80"
              >
                {ruler.glyph}
              </span>
              <span>
                Ruled by{" "}
                <Sanskrit className="not-italic text-foreground/85">
                  {ruler.sanskritName}
                </Sanskrit>
              </span>
            </span>
          ) : null}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge variant={elementVariant}>{elementLabel}</Badge>
          <Badge variant="outline">{modalityLabel}</Badge>
        </div>

        {/* Body region */}
        <p className="mt-auto text-[11px] uppercase tracking-[0.14em] text-muted-foreground/80">
          {regionLabel}
        </p>
      </Card>
    </Link>
  );
}
