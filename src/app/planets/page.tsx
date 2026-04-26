"use client";

import * as React from "react";

import { FilterChips, type FilterChip } from "@/components/index/FilterChips";
import { IndexHeader } from "@/components/index/IndexHeader";
import { PlanetCard } from "@/components/index/PlanetCard";
import { PLANETS } from "@/lib/data";
import type { Planet, PlanetId } from "@/lib/data";

type PlanetFilterId =
  | "all"
  | "benefic"
  | "malefic"
  | "conditional"
  | "luminaries"
  | "personal"
  | "outer"
  | "shadow";

const LUMINARIES: readonly PlanetId[] = ["sun", "moon"];
const PERSONAL: readonly PlanetId[] = ["mars", "mercury", "venus"];
const OUTER: readonly PlanetId[] = ["jupiter", "saturn"];
const SHADOW: readonly PlanetId[] = ["rahu", "ketu"];

function matches(planet: Planet, filter: PlanetFilterId): boolean {
  switch (filter) {
    case "all":
      return true;
    case "benefic":
    case "malefic":
    case "conditional":
      return planet.nature.classification === filter;
    case "luminaries":
      return LUMINARIES.includes(planet.id);
    case "personal":
      return PERSONAL.includes(planet.id);
    case "outer":
      return OUTER.includes(planet.id);
    case "shadow":
      return SHADOW.includes(planet.id);
  }
}

const benificCount = PLANETS.filter((p) => p.nature.classification === "benefic").length;
const maleficCount = PLANETS.filter((p) => p.nature.classification === "malefic").length;
const conditionalCount = PLANETS.filter(
  (p) => p.nature.classification === "conditional",
).length;

const CHIPS: readonly FilterChip<PlanetFilterId>[] = [
  { id: "all", label: "All", count: PLANETS.length },
  { id: "benefic", label: "Benefic", count: benificCount },
  { id: "malefic", label: "Malefic", count: maleficCount },
  { id: "conditional", label: "Conditional", count: conditionalCount },
  { id: "luminaries", label: "Luminaries", count: LUMINARIES.length },
  { id: "personal", label: "Personal", count: PERSONAL.length },
  { id: "outer", label: "Outer", count: OUTER.length },
  { id: "shadow", label: "Shadow", count: SHADOW.length },
];

export default function PlanetsIndexPage() {
  const [active, setActive] = React.useState<PlanetFilterId>("all");

  const filtered = React.useMemo(
    () => PLANETS.filter((p) => matches(p, active)),
    [active],
  );

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 pt-8 md:pt-12">
      <IndexHeader
        numeral="I"
        eyebrow="The Nine Grahas"
        title="Planets"
        sanskritTitle="Navagrahā"
        deva="नवग्रह"
        count={9}
        description="The cabinet of nine. Two luminaries, five tārā-grahas, and the two shadow nodes — the cast of every horoscope, each with a fixed archetypal office."
      />
      <FilterChips
        chips={CHIPS}
        active={active}
        onChange={setActive}
        ariaLabel="Filter planets by nature or grouping"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((planet, i) => (
          <PlanetCard key={planet.id} planet={planet} index={i} />
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="text-sm italic text-muted-foreground">
          No planets match the current filter.
        </p>
      ) : null}
    </div>
  );
}
