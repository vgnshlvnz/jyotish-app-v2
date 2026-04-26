"use client";

import * as React from "react";

import type { HouseNumber, PlanetId } from "@/lib/data/types";
import {
  PLANET_LINE_COLOR,
} from "@/lib/chart/planet-color";
import {
  RASHI_GRID_POS,
  cellCenter,
  houseCellCenter,
} from "@/lib/chart/layout";
import { allAspects, planetsInHouse, rashiOfHouse } from "@/lib/chart/aspects";
import type { AspectArrow, BirthChart } from "@/lib/chart/types";

interface AspectOverlayProps {
  chart: BirthChart;
  highlightedPlanet: PlanetId | null;
  highlightedHouse: HouseNumber | null;
  /** When true, render every aspect arrow at low opacity even if nothing is highlighted. */
  showAll: boolean;
}

/**
 * SVG layer drawn on top of the chart grid. Renders one line per active
 * aspect arrow, color-coded by planet, with a small arrowhead at the
 * target end. Lines are dashed for special aspects (Mars 4/8, Jupiter 5/9,
 * Saturn 3/10, Nodes 5/9) and solid for full (7th) aspects.
 *
 * The viewBox is `0 0 4 4` so coordinates align directly with the 4×4
 * grid cells. Cell centres come from `houseCellCenter`.
 */
export function AspectOverlay({
  chart,
  highlightedPlanet,
  highlightedHouse,
  showAll,
}: AspectOverlayProps) {
  const arrows = React.useMemo(() => allAspects(chart), [chart]);

  const visibleArrows = React.useMemo(() => {
    if (highlightedPlanet) {
      return arrows.filter((a) => a.planet === highlightedPlanet);
    }
    if (highlightedHouse) {
      return arrows.filter((a) => a.toHouse === highlightedHouse);
    }
    if (showAll) return arrows;
    return [];
  }, [arrows, highlightedPlanet, highlightedHouse, showAll]);

  // For "show all" + no highlight, dim all arrows
  const dimNonHighlighted = showAll && !highlightedPlanet && !highlightedHouse;

  return (
    <svg
      viewBox="0 0 4 4"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        {Object.entries(PLANET_LINE_COLOR).map(([planetId, color]) => (
          <marker
            key={planetId}
            id={`arrowhead-${planetId}`}
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
            markerUnits="strokeWidth"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill={color} />
          </marker>
        ))}
      </defs>

      {visibleArrows.map((arrow, i) => (
        <AspectLine
          key={`${arrow.planet}-${arrow.fromHouse}-${arrow.toHouse}-${i}`}
          arrow={arrow}
          chart={chart}
          opacity={dimNonHighlighted ? 0.55 : 1.0}
        />
      ))}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// One arrow
// ─────────────────────────────────────────────────────────────────────────

interface AspectLineProps {
  arrow: AspectArrow;
  chart: BirthChart;
  opacity: number;
}

function AspectLine({ arrow, chart, opacity }: AspectLineProps) {
  const sourceRashi = rashiOfHouse(arrow.fromHouse, chart.lagna);
  const targetRashi = rashiOfHouse(arrow.toHouse, chart.lagna);
  const source = cellCenter(RASHI_GRID_POS[sourceRashi]);
  const target = cellCenter(RASHI_GRID_POS[targetRashi]);

  // Inset the endpoints so the line and arrowhead don't overlap glyphs.
  // Move both ends inward along the line by ~22% of the cell.
  const dx = target.x - source.x;
  const dy = target.y - source.y;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const insetSrc = 0.28;
  const insetTgt = 0.34;
  const x1 = source.x + (dx / len) * insetSrc;
  const y1 = source.y + (dy / len) * insetSrc;
  const x2 = target.x - (dx / len) * insetTgt;
  const y2 = target.y - (dy / len) * insetTgt;

  const color = PLANET_LINE_COLOR[arrow.planet];
  const dash = arrow.type === "special" ? "0.06 0.045" : undefined;

  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth={0.022}
      strokeLinecap="round"
      strokeOpacity={opacity}
      markerEnd={`url(#arrowhead-${arrow.planet})`}
      {...(dash ? { strokeDasharray: dash } : {})}
    />
  );
}

/** Helper for the parent — placement degree formatted as "13°34'". */
export function formatDegMin(degree: number): string {
  const wholeDeg = Math.floor(degree);
  const minutes = Math.round((degree - wholeDeg) * 60);
  return `${wholeDeg}°${String(minutes).padStart(2, "0")}'`;
}

// Suppress unused warnings for re-exports we keep around for callers.
void houseCellCenter;
void planetsInHouse;
