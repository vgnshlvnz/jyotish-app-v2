"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Sanskrit } from "@/components/Sanskrit";
import { Deva } from "@/components/devanagari-context";
import { RASHIS, getPlanetById, getRashiById } from "@/lib/data";
import { RASHI_DEVA } from "@/lib/data/devanagari";
import type {
  HouseNumber,
  PlanetId,
  RashiId,
} from "@/lib/data/types";
import {
  PLANET_ABBR,
  PLANET_LINE_COLOR,
} from "@/lib/chart/planet-color";
import {
  OUTER_RASHIS,
  RASHI_GRID_POS,
} from "@/lib/chart/layout";
import { houseOfRashi, planetsInHouse } from "@/lib/chart/aspects";
import type { BirthChart, Placement } from "@/lib/chart/types";

import { AspectOverlay } from "./AspectOverlay";

interface SouthIndianChartProps {
  chart: BirthChart;
  highlightedPlanet: PlanetId | null;
  highlightedHouse: HouseNumber | null;
  showAll: boolean;
  onPlanetHover?: (id: PlanetId | null) => void;
  onPlanetClick?: (id: PlanetId) => void;
  onHouseClick?: (h: HouseNumber) => void;
}

/**
 * South Indian D-1 chart — a 4×4 CSS grid where the 12 outer cells hold
 * the rashis (in classical clockwise-from-Pisces order) and the inner 2×2
 * holds the chart title. Houses are computed from the chart's lagna.
 *
 * The component itself is presentational; hover/click handlers raise events
 * to the parent. Aspect lines are drawn by `AspectOverlay`, mounted as a
 * sibling SVG layer with the same bounding box.
 */
export function SouthIndianChart({
  chart,
  highlightedPlanet,
  highlightedHouse,
  showAll,
  onPlanetHover,
  onPlanetClick,
  onHouseClick,
}: SouthIndianChartProps) {
  const lagnaRashi = getRashiById(chart.lagna);

  return (
    <div className="relative aspect-square w-full max-w-[640px] mx-auto">
      {/* The grid */}
      <div className="grid h-full w-full grid-cols-4 grid-rows-4 gap-px bg-brass/15 p-px">
        {OUTER_RASHIS.map((rashiId) => (
          <ChartCell
            key={rashiId}
            rashiId={rashiId}
            chart={chart}
            highlighted={
              highlightedHouse === houseOfRashi(rashiId, chart.lagna)
            }
            highlightedPlanet={highlightedPlanet}
            {...(onPlanetHover ? { onPlanetHover } : {})}
            {...(onPlanetClick ? { onPlanetClick } : {})}
            {...(onHouseClick ? { onHouseClick } : {})}
          />
        ))}

        {/* Inner 2×2 title block */}
        <div
          className="col-start-2 col-end-4 row-start-2 row-end-4 flex flex-col items-center justify-center gap-2 bg-ink-2/80 text-center"
          aria-hidden
        >
          <p className="font-titling text-[10px] uppercase tracking-[0.22em] text-bone-3">
            Rāśi Chart
          </p>
          <p className="font-display text-2xl text-bone">D · 1</p>
          <Deva className="text-base text-brass">राशि चक्र</Deva>
          {lagnaRashi ? (
            <p className="mt-1 font-titling text-[10px] uppercase tracking-[0.18em] text-bone-3">
              Lagna ·{" "}
              <Sanskrit className="not-italic font-titling tracking-[0.15em] text-brass-hi">
                {lagnaRashi.sanskritName}
              </Sanskrit>
            </p>
          ) : null}
        </div>
      </div>

      {/* SVG aspect overlay sits on top of the grid */}
      <AspectOverlay
        chart={chart}
        highlightedPlanet={highlightedPlanet}
        highlightedHouse={highlightedHouse}
        showAll={showAll}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// One cell
// ─────────────────────────────────────────────────────────────────────────

interface ChartCellProps {
  rashiId: RashiId;
  chart: BirthChart;
  highlighted: boolean;
  highlightedPlanet: PlanetId | null;
  onPlanetHover?: (id: PlanetId | null) => void;
  onPlanetClick?: (id: PlanetId) => void;
  onHouseClick?: (h: HouseNumber) => void;
}

function ChartCell({
  rashiId,
  chart,
  highlighted,
  highlightedPlanet,
  onPlanetHover,
  onPlanetClick,
  onHouseClick,
}: ChartCellProps) {
  const rashi = getRashiById(rashiId);
  if (!rashi) return null;

  const house = houseOfRashi(rashiId, chart.lagna);
  const cell = RASHI_GRID_POS[rashiId];
  const placements: readonly Placement[] = chart.placements.filter(
    (p) => p.rashi === rashiId,
  );
  const isLagnaCell = rashiId === chart.lagna;

  // Find this cell's planets so we can highlight them when hovered
  const planetIdsHere = planetsInHouse(chart, house);
  const cellHasHighlightedPlanet =
    highlightedPlanet !== null && planetIdsHere.includes(highlightedPlanet);

  return (
    <button
      type="button"
      data-house={house}
      data-rashi={rashiId}
      onClick={() => onHouseClick?.(house)}
      style={{ gridColumn: cell.col, gridRow: cell.row }}
      className={cn(
        "relative flex flex-col bg-ink-3 p-2.5 text-left transition-colors",
        "hover:bg-ink-4",
        highlighted && "ring-1 ring-brass bg-ink-4",
        cellHasHighlightedPlanet && "ring-1 ring-brass-hi/60",
      )}
    >
      {/* Top-left: house number */}
      <div className="flex items-start justify-between gap-1">
        <span
          className={cn(
            "font-titling text-[10px] uppercase tracking-[0.16em] tabular-nums",
            isLagnaCell ? "text-brass-hi" : "text-bone-4",
          )}
        >
          {String(house).padStart(2, "0")}
        </span>
        {isLagnaCell ? (
          <span
            aria-hidden
            title="Lagna"
            className="text-[8px] font-bold uppercase tracking-[0.18em] text-brass-hi"
          >
            ↑
          </span>
        ) : null}
      </div>

      {/* Rashi name + Devanāgarī */}
      <div className="mt-0.5 leading-tight">
        <Sanskrit className="not-italic font-titling text-[9px] uppercase tracking-[0.18em] text-bone-3">
          {rashi.sanskritName}
        </Sanskrit>
        <Deva className="block text-[10px] text-bone-4 leading-none mt-0.5">
          {RASHI_DEVA[rashiId]}
        </Deva>
      </div>

      {/* Planets */}
      <div className="mt-auto flex flex-wrap items-end gap-1.5 pt-2">
        {placements.map((p) => (
          <PlanetBadge
            key={p.planet}
            placement={p}
            isHighlighted={highlightedPlanet === p.planet}
            isAnyHighlighted={highlightedPlanet !== null}
            {...(onPlanetHover ? { onHover: onPlanetHover } : {})}
            {...(onPlanetClick ? { onClick: onPlanetClick } : {})}
          />
        ))}
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Planet badge inside a cell
// ─────────────────────────────────────────────────────────────────────────

interface PlanetBadgeProps {
  placement: Placement;
  isHighlighted: boolean;
  isAnyHighlighted: boolean;
  onHover?: (id: PlanetId | null) => void;
  onClick?: (id: PlanetId) => void;
}

function PlanetBadge({
  placement,
  isHighlighted,
  isAnyHighlighted,
  onHover,
  onClick,
}: PlanetBadgeProps) {
  const planet = getPlanetById(placement.planet);
  if (!planet) return null;
  const color = PLANET_LINE_COLOR[planet.id];

  // Decimal degrees → "13°34'"
  const wholeDeg = Math.floor(placement.degree);
  const minutes = Math.round((placement.degree - wholeDeg) * 60);
  const degLabel = `${wholeDeg}°${String(minutes).padStart(2, "0")}'`;

  return (
    <span
      role="button"
      tabIndex={0}
      data-planet={placement.planet}
      onMouseEnter={() => onHover?.(placement.planet)}
      onMouseLeave={() => onHover?.(null)}
      onClick={(e) => {
        e.stopPropagation();
        onClick?.(placement.planet);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.(placement.planet);
        }
      }}
      title={`${planet.englishName} · ${degLabel}`}
      style={{ color }}
      className={cn(
        "inline-flex flex-col items-center gap-0 px-1 py-0.5 leading-none transition-opacity",
        "rounded-sm cursor-pointer",
        isHighlighted && "bg-ink-2 ring-1 ring-current",
        isAnyHighlighted && !isHighlighted && "opacity-50",
      )}
    >
      <span aria-hidden className="font-display text-base leading-none">
        {planet.glyph}
      </span>
      <span className="font-titling text-[8px] uppercase tracking-[0.1em] mt-0.5">
        {PLANET_ABBR[planet.id]}
      </span>
    </span>
  );
}
