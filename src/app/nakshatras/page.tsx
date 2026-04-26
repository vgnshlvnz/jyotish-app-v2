"use client";

import * as React from "react";

import { FilterChips, type FilterChip } from "@/components/index/FilterChips";
import { IndexHeader } from "@/components/index/IndexHeader";
import { NakshatraCard } from "@/components/index/NakshatraCard";
import { Sanskrit } from "@/components/Sanskrit";
import { NAKSHATRAS } from "@/lib/data";
import type { Nakshatra } from "@/lib/data";

type NakshatraFilterId =
  | "all"
  | "deva"
  | "manushya"
  | "rakshasa"
  | "urdhva-mukha"
  | "adho-mukha"
  | "tiryan-mukha";

function matches(n: Nakshatra, filter: NakshatraFilterId): boolean {
  switch (filter) {
    case "all":
      return true;
    case "deva":
    case "manushya":
    case "rakshasa":
      return n.gana === filter;
    case "urdhva-mukha":
    case "adho-mukha":
    case "tiryan-mukha":
      return n.orientation === filter;
  }
}

const devaCount = NAKSHATRAS.filter((n) => n.gana === "deva").length;
const manushyaCount = NAKSHATRAS.filter((n) => n.gana === "manushya").length;
const rakshasaCount = NAKSHATRAS.filter((n) => n.gana === "rakshasa").length;
const urdhvaCount = NAKSHATRAS.filter(
  (n) => n.orientation === "urdhva-mukha",
).length;
const adhoCount = NAKSHATRAS.filter(
  (n) => n.orientation === "adho-mukha",
).length;
const tiryanCount = NAKSHATRAS.filter(
  (n) => n.orientation === "tiryan-mukha",
).length;

const CHIPS: readonly FilterChip<NakshatraFilterId>[] = [
  { id: "all", label: "All", count: NAKSHATRAS.length },
  { id: "deva", label: "Deva gana", count: devaCount },
  { id: "manushya", label: "Manushya gana", count: manushyaCount },
  { id: "rakshasa", label: "Rakshasa gana", count: rakshasaCount },
  { id: "urdhva-mukha", label: "Urdhva-mukha", count: urdhvaCount },
  { id: "adho-mukha", label: "Adho-mukha", count: adhoCount },
  { id: "tiryan-mukha", label: "Tiryan-mukha", count: tiryanCount },
];

interface CycleSection {
  title: string;
  sanskritSubtitle: string;
  nakshatras: readonly Nakshatra[];
}

const SECTIONS: readonly CycleSection[] = [
  {
    title: "Ashwini → Ashlesha",
    sanskritSubtitle: "Cycle 1",
    nakshatras: NAKSHATRAS.filter((n) => n.number >= 1 && n.number <= 9),
  },
  {
    title: "Magha → Jyeshtha",
    sanskritSubtitle: "Cycle 2",
    nakshatras: NAKSHATRAS.filter((n) => n.number >= 10 && n.number <= 18),
  },
  {
    title: "Mula → Revati",
    sanskritSubtitle: "Cycle 3",
    nakshatras: NAKSHATRAS.filter((n) => n.number >= 19 && n.number <= 27),
  },
];

export default function NakshatrasIndexPage() {
  const [active, setActive] = React.useState<NakshatraFilterId>("all");

  const filteredSections = React.useMemo(
    () =>
      SECTIONS.map((section) => ({
        ...section,
        items: section.nakshatras.filter((n) => matches(n, active)),
      })),
    [active],
  );

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 pt-8 md:pt-12">
      <IndexHeader
        number={3}
        title="Nakshatras"
        sanskritTitle="Nakṣatrāṇi"
        count={27}
        description="The twenty-seven lunar mansions, each thirteen-twenty wide, governed by a deity, a presiding dasha lord, and an animal yoni — the Moon's nightly resting places."
      />
      <FilterChips
        chips={CHIPS}
        active={active}
        onChange={setActive}
        ariaLabel="Filter nakshatras by gana or orientation"
      />

      <div className="flex flex-col gap-12">
        {filteredSections.map((section) => (
          <section key={section.title} className="flex flex-col gap-5">
            <header className="flex items-baseline gap-4 border-b border-cosmos-line pb-3">
              <h2 className="font-display text-2xl font-light leading-tight text-foreground">
                {section.title}
              </h2>
              <Sanskrit className="not-italic text-xs text-muted-foreground">
                {section.sanskritSubtitle}
              </Sanskrit>
              <span className="ml-auto tabular-nums text-[11px] uppercase tracking-[0.14em] text-muted-foreground/80">
                {section.items.length} of {section.nakshatras.length}
              </span>
            </header>

            {section.items.length === 0 ? (
              <p className="text-sm italic text-muted-foreground">
                No matches in this cycle.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {section.items.map((nakshatra) => (
                  <NakshatraCard key={nakshatra.id} nakshatra={nakshatra} />
                ))}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
