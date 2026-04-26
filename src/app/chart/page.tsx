"use client";

import * as React from "react";

import { IndexHeader } from "@/components/index/IndexHeader";
import { SouthIndianChart } from "@/components/chart/SouthIndianChart";
import { AspectLegend } from "@/components/chart/AspectLegend";
import { ChartControls } from "@/components/chart/ChartControls";
import { SelectedDetail } from "@/components/chart/SelectedDetail";
import { ChartInputForm } from "@/components/chart/ChartInputForm";
import { PDF_SAMPLE_CHART } from "@/lib/chart/sample-chart";
import type { BirthChart } from "@/lib/chart/types";
import type { HouseNumber, PlanetId } from "@/lib/data/types";

export default function ChartPage() {
  const [chart, setChart] = React.useState<BirthChart>(PDF_SAMPLE_CHART);
  // Tracks the user's currently-pinned highlight ("locked" via click).
  const [lockedPlanet, setLockedPlanet] = React.useState<PlanetId | null>(null);
  const [lockedHouse, setLockedHouse] = React.useState<HouseNumber | null>(null);
  // Hover transient (planet only — house highlight requires a click).
  const [hoveredPlanet, setHoveredPlanet] = React.useState<PlanetId | null>(null);
  const [showAll, setShowAll] = React.useState(false);

  // Effective highlight: locked wins over hovered.
  const highlightedPlanet = lockedPlanet ?? hoveredPlanet;
  const highlightedHouse = lockedHouse;

  const hasActive = highlightedPlanet !== null || highlightedHouse !== null;

  const clearAll = React.useCallback(() => {
    setLockedPlanet(null);
    setLockedHouse(null);
    setHoveredPlanet(null);
  }, []);

  // Esc clears every highlight.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") clearAll();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [clearAll]);

  const handlePlanetClick = (id: PlanetId) => {
    // Clicking a planet locks (or toggles off if already locked); clears any house lock.
    setLockedHouse(null);
    setLockedPlanet((current) => (current === id ? null : id));
  };

  const handleHouseClick = (h: HouseNumber) => {
    // Clicking a house locks (or toggles off); clears any planet lock.
    setLockedPlanet(null);
    setLockedHouse((current) => (current === h ? null : h));
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 pt-2">
      <IndexHeader
        numeral="IV"
        eyebrow="The Drishti Chart"
        title="Chart"
        sanskritTitle="Dṛṣṭi Cakra"
        deva="दृष्टि चक्र"
        count={9}
        description="An interactive D-1 with the nine grahas drawn into a south-Indian rāśi square. Hover a planet to trace its drishti (aspect) lines — full to the 7th, plus the special aspects of Maṅgala, Bṛhaspati, and Śani."
      />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Chart + input form column */}
        <div className="flex flex-col gap-6">
          <SouthIndianChart
            chart={chart}
            highlightedPlanet={highlightedPlanet}
            highlightedHouse={highlightedHouse}
            showAll={showAll}
            onPlanetHover={setHoveredPlanet}
            onPlanetClick={handlePlanetClick}
            onHouseClick={handleHouseClick}
          />
          <ChartInputForm
            chart={chart}
            onApply={(c) => {
              setChart(c);
              clearAll();
            }}
            onReset={() => {
              setChart(PDF_SAMPLE_CHART);
              clearAll();
            }}
          />
        </div>

        {/* Right rail */}
        <aside className="flex flex-col gap-6">
          <AspectLegend
            active={highlightedPlanet}
            onHover={setHoveredPlanet}
            onSelect={(id) => {
              setLockedHouse(null);
              setLockedPlanet(id);
            }}
          />
          <ChartControls
            showAll={showAll}
            onToggleShowAll={() => setShowAll((v) => !v)}
            onClear={clearAll}
            hasActive={hasActive}
          />
          <SelectedDetail
            chart={chart}
            highlightedPlanet={highlightedPlanet}
            highlightedHouse={highlightedHouse}
          />
        </aside>
      </div>
    </div>
  );
}
