import Link from "next/link";

import { Sanskrit } from "@/components/Sanskrit";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Planet, PlanetNatureClass } from "@/lib/data";

interface PlanetCardProps {
  planet: Planet;
}

const NATURE_VARIANT: Record<PlanetNatureClass, "gold" | "rose" | "indigo"> = {
  benefic: "gold",
  malefic: "rose",
  conditional: "indigo",
};

const NATURE_LABEL: Record<PlanetNatureClass, string> = {
  benefic: "Benefic",
  malefic: "Malefic",
  conditional: "Conditional",
};

const CABINET_LABEL: Record<Planet["cabinetRole"], string> = {
  king: "King",
  queen: "Queen",
  commander: "Commander",
  prince: "Prince",
  minister: "Minister",
  advisor: "Advisor",
  shadow: "Shadow",
};

/**
 * Index-grid card for a single planet. Whole card is a navigation link to
 * /planets/[id]. Visually mirrors the cosmic-glass treatment from the rest
 * of the app: glyph on the left, names + badges + a clipped description on
 * the right.
 */
export function PlanetCard({ planet }: PlanetCardProps) {
  const natureVariant = NATURE_VARIANT[planet.nature.classification];
  const natureLabel = NATURE_LABEL[planet.nature.classification];
  const cabinetLabel = CABINET_LABEL[planet.cabinetRole];

  // First sentence of the description, gracefully falling back to the full
  // text if there is no clean sentence break.
  const firstSentence = (() => {
    const match = planet.description.match(/^[^.!?]+[.!?]/);
    return match ? match[0] : planet.description;
  })();

  return (
    <Link
      href={`/planets/${planet.id}`}
      aria-label={`${planet.englishName} (${planet.sanskritName})`}
      className="group block focus:outline-none"
    >
      <Card
        className={cn(
          "h-full p-5",
          "hover:-translate-y-0.5 hover:border-primary/40",
          "group-focus-visible:border-primary/60 group-focus-visible:-translate-y-0.5",
          "transition-all duration-200 ease-out",
        )}
      >
        <div className="flex items-start gap-5">
          <span
            aria-hidden
            className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-cosmos-line bg-background/40 font-display text-5xl leading-none text-foreground/90"
          >
            {planet.glyph}
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <Sanskrit className="not-italic text-2xl font-light leading-tight text-foreground">
              {planet.sanskritName}
            </Sanskrit>
            <p className="text-xs text-muted-foreground">
              {planet.englishName}
              <span className="mx-1.5 text-foreground/30">·</span>
              <Sanskrit className="not-italic text-muted-foreground">
                {planet.tamilName}
              </Sanskrit>
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <Badge variant="muted">{cabinetLabel}</Badge>
              <Badge variant={natureVariant}>{natureLabel}</Badge>
            </div>
          </div>
        </div>
        <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {firstSentence}
        </p>
      </Card>
    </Link>
  );
}
