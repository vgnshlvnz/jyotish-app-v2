"use client";

import * as React from "react";

import { FilterChips, type FilterChip } from "@/components/index/FilterChips";
import { IndexHeader } from "@/components/index/IndexHeader";
import { RashiCard } from "@/components/index/RashiCard";
import { RASHIS } from "@/lib/data";
import type { Rashi } from "@/lib/data";

type RashiFilterId =
  | "all"
  | "fire"
  | "earth"
  | "air"
  | "water"
  | "chara"
  | "sthira"
  | "dwiswabhava";

function matches(rashi: Rashi, filter: RashiFilterId): boolean {
  switch (filter) {
    case "all":
      return true;
    case "fire":
    case "earth":
    case "air":
    case "water":
      return rashi.element === filter;
    case "chara":
    case "sthira":
    case "dwiswabhava":
      return rashi.modality === filter;
  }
}

const fireCount = RASHIS.filter((r) => r.element === "fire").length;
const earthCount = RASHIS.filter((r) => r.element === "earth").length;
const airCount = RASHIS.filter((r) => r.element === "air").length;
const waterCount = RASHIS.filter((r) => r.element === "water").length;
const charaCount = RASHIS.filter((r) => r.modality === "chara").length;
const sthiraCount = RASHIS.filter((r) => r.modality === "sthira").length;
const dwiswabhavaCount = RASHIS.filter(
  (r) => r.modality === "dwiswabhava",
).length;

const CHIPS: readonly FilterChip<RashiFilterId>[] = [
  { id: "all", label: "All", count: RASHIS.length },
  { id: "fire", label: "Fire", count: fireCount },
  { id: "earth", label: "Earth", count: earthCount },
  { id: "air", label: "Air", count: airCount },
  { id: "water", label: "Water", count: waterCount },
  { id: "chara", label: "Chara", count: charaCount },
  { id: "sthira", label: "Sthira", count: sthiraCount },
  { id: "dwiswabhava", label: "Dwiswabhava", count: dwiswabhavaCount },
];

export default function RashisIndexPage() {
  const [active, setActive] = React.useState<RashiFilterId>("all");

  const filtered = React.useMemo(
    () => RASHIS.filter((r) => matches(r, active)),
    [active],
  );

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 pt-8 md:pt-12">
      <IndexHeader
        numeral="II"
        eyebrow="The Twelve Rāśis"
        title="Rashis"
        sanskritTitle="Rāśayaḥ"
        deva="राशयः"
        count={12}
        description="Twelve thirty-degree segments of the ecliptic. Each ruled by a graha, holds an element and modality, and corresponds to a region of the cosmic body of Kālapuruṣa."
      />
      <FilterChips
        chips={CHIPS}
        active={active}
        onChange={setActive}
        ariaLabel="Filter rashis by element or modality"
      />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((r, i) => (
          <RashiCard key={r.id} rashi={r} index={i} />
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="text-sm italic text-muted-foreground">
          No rashis match the current filter.
        </p>
      ) : null}
    </div>
  );
}
