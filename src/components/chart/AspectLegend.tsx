"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Sanskrit } from "@/components/Sanskrit";
import { Deva } from "@/components/devanagari-context";
import { Tablet } from "@/components/temple/Tablet";
import { Eyebrow } from "@/components/temple/Eyebrow";
import { BrassRule } from "@/components/temple/BrassRule";
import { PLANETS } from "@/lib/data";
import { PLANET_DEVA } from "@/lib/data/devanagari";
import type { PlanetId } from "@/lib/data/types";
import { PLANET_LINE_COLOR } from "@/lib/chart/planet-color";

interface AspectLegendProps {
  active: PlanetId | null;
  onHover?: (id: PlanetId | null) => void;
  onSelect?: (id: PlanetId | null) => void;
}

/**
 * Right-rail card listing per-planet aspect rules. Each row is a small
 * brass-toned tablet — hover to preview, click to lock the highlight.
 */
export function AspectLegend({ active, onHover, onSelect }: AspectLegendProps) {
  return (
    <Tablet corners className="px-5 py-4">
      <Eyebrow className="mb-1.5 normal-case">
        <span className="font-titling uppercase tracking-[0.22em] text-brass">
          Aspects
        </span>
        <Deva className="ml-2 text-xs text-brass-hi">दृष्टि</Deva>
      </Eyebrow>
      <p className="mb-3 font-display text-xs italic text-bone-3">
        Hover to preview · click to lock
      </p>

      <BrassRule className="mb-3" />

      <ul className="flex flex-col gap-1.5">
        {PLANETS.map((p) => {
          const color = PLANET_LINE_COLOR[p.id];
          const isActive = active === p.id;
          // Format the aspect set: split full (=7) from special (others)
          const fullAspects = p.aspects.filter((n) => n === 7);
          const specialAspects = p.aspects.filter((n) => n !== 7);
          return (
            <li key={p.id}>
              <button
                type="button"
                onMouseEnter={() => onHover?.(p.id)}
                onMouseLeave={() => onHover?.(null)}
                onClick={() => onSelect?.(isActive ? null : p.id)}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-sm border px-2.5 py-2 text-left transition-colors",
                  isActive
                    ? "border-brass-hi/60 bg-ink-2"
                    : "border-brass/15 hover:border-brass/40 hover:bg-ink-2/50",
                )}
              >
                {/* Color swatch + glyph */}
                <span
                  aria-hidden
                  style={{ color }}
                  className="flex flex-col items-center leading-none"
                >
                  <span className="font-display text-base">{p.glyph}</span>
                </span>

                {/* Name + Devanāgarī */}
                <span className="flex min-w-0 flex-1 flex-col leading-tight">
                  <span className="flex items-baseline gap-1.5">
                    <Sanskrit className="not-italic font-display text-sm text-bone">
                      {p.sanskritName}
                    </Sanskrit>
                    <Deva className="text-[10px] text-brass">
                      {PLANET_DEVA[p.id]}
                    </Deva>
                  </span>
                  <span className="font-titling text-[9px] uppercase tracking-[0.18em] text-bone-4">
                    {p.englishName}
                  </span>
                </span>

                {/* Aspect set */}
                <span
                  style={{ color }}
                  className="font-titling text-[10px] tracking-[0.1em] tabular-nums"
                >
                  {fullAspects.length > 0 ? "7" : ""}
                  {specialAspects.length > 0 ? (
                    <span className="ml-1 text-bone-3">
                      ·{" "}
                      <span style={{ color }}>
                        {specialAspects.join(",")}
                      </span>
                    </span>
                  ) : null}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </Tablet>
  );
}
