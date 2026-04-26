"use client";

import * as React from "react";

import { Sanskrit } from "@/components/Sanskrit";
import { Tablet } from "@/components/temple/Tablet";
import { Eyebrow } from "@/components/temple/Eyebrow";
import { Capsule } from "@/components/temple/Capsule";
import { getPlanetById, getRashiById } from "@/lib/data";
import type { HouseNumber, PlanetId } from "@/lib/data/types";
import type { BirthChart } from "@/lib/chart/types";
import {
  aspectsFromPlanet,
  aspectsTargetingHouse,
  placementToHouse,
  rashiOfHouse,
} from "@/lib/chart/aspects";

interface SelectedDetailProps {
  chart: BirthChart;
  highlightedPlanet: PlanetId | null;
  highlightedHouse: HouseNumber | null;
}

/**
 * Prose summary of the active highlight — describes either:
 *   - the houses a planet aspects (when a planet is active), or
 *   - the planets aspecting a house (when a house is active).
 *
 * Empty state is a short hint matching the temple-aesthetic voice.
 */
export function SelectedDetail({
  chart,
  highlightedPlanet,
  highlightedHouse,
}: SelectedDetailProps) {
  if (highlightedPlanet) {
    const placement = chart.placements.find((p) => p.planet === highlightedPlanet);
    const planet = getPlanetById(highlightedPlanet);
    if (!planet || !placement) return null;
    const fromHouse = placementToHouse(placement, chart.lagna);
    const arrows = aspectsFromPlanet(planet, fromHouse);
    return (
      <Tablet corners className="px-5 py-4 flex flex-col gap-3">
        <Eyebrow className="normal-case">
          <span className="font-titling uppercase tracking-[0.22em] text-brass">
            Selection
          </span>
        </Eyebrow>
        <div>
          <p className="font-display text-lg text-bone leading-tight">
            <Sanskrit className="not-italic">{planet.sanskritName}</Sanskrit>
            <span className="ml-2 font-titling text-xs uppercase tracking-[0.18em] text-bone-3">
              {planet.englishName}
            </span>
          </p>
          <p className="mt-0.5 font-display text-sm italic text-bone-3">
            in house {fromHouse} —{" "}
            <Sanskrit className="not-italic">
              {getRashiById(placement.rashi)?.sanskritName ?? placement.rashi}
            </Sanskrit>
          </p>
        </div>
        <ul className="flex flex-col gap-1.5">
          {arrows.map((a, i) => {
            const targetRashi = rashiOfHouse(a.toHouse, chart.lagna);
            const r = getRashiById(targetRashi);
            return (
              <li
                key={i}
                className="flex items-baseline gap-2 font-display text-sm text-bone-2"
              >
                <span className="font-titling text-[10px] uppercase tracking-[0.18em] text-bone-3 w-12">
                  H {String(a.toHouse).padStart(2, "0")}
                </span>
                <Sanskrit className="not-italic">
                  {r?.sanskritName ?? targetRashi}
                </Sanskrit>
                <span className="ml-auto">
                  <Capsule
                    tone={a.type === "full" ? "brass" : "vermilion"}
                  >
                    {a.type === "full" ? "7th" : "special"}
                  </Capsule>
                </span>
              </li>
            );
          })}
        </ul>
      </Tablet>
    );
  }

  if (highlightedHouse) {
    const rashi = rashiOfHouse(highlightedHouse, chart.lagna);
    const r = getRashiById(rashi);
    const arrows = aspectsTargetingHouse(chart, highlightedHouse);
    return (
      <Tablet corners className="px-5 py-4 flex flex-col gap-3">
        <Eyebrow className="normal-case">
          <span className="font-titling uppercase tracking-[0.22em] text-brass">
            Selection
          </span>
        </Eyebrow>
        <div>
          <p className="font-display text-lg text-bone leading-tight">
            House {highlightedHouse}
          </p>
          <p className="mt-0.5 font-display text-sm italic text-bone-3">
            <Sanskrit className="not-italic">
              {r?.sanskritName ?? rashi}
            </Sanskrit>
          </p>
        </div>
        {arrows.length === 0 ? (
          <p className="font-display text-sm italic text-bone-3">
            No planets aspect this house.
          </p>
        ) : (
          <ul className="flex flex-col gap-1.5">
            {arrows.map((a, i) => {
              const planet = getPlanetById(a.planet);
              return (
                <li
                  key={i}
                  className="flex items-baseline gap-2 font-display text-sm text-bone-2"
                >
                  <span aria-hidden className="font-display text-base">
                    {planet?.glyph}
                  </span>
                  <Sanskrit className="not-italic">
                    {planet?.sanskritName ?? a.planet}
                  </Sanskrit>
                  <span className="font-titling text-[10px] uppercase tracking-[0.18em] text-bone-4">
                    from H {String(a.fromHouse).padStart(2, "0")}
                  </span>
                  <span className="ml-auto">
                    <Capsule
                      tone={a.type === "full" ? "brass" : "vermilion"}
                    >
                      {a.type === "full" ? "7th" : "special"}
                    </Capsule>
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </Tablet>
    );
  }

  return (
    <Tablet corners className="px-5 py-4">
      <p className="font-display text-sm italic text-bone-3">
        No selection. Hover or click a planet, or click a house, to see its
        aspects here.
      </p>
    </Tablet>
  );
}
