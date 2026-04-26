"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Tablet } from "@/components/temple/Tablet";
import { Eyebrow } from "@/components/temple/Eyebrow";

interface ChartControlsProps {
  showAll: boolean;
  onToggleShowAll: () => void;
  onClear: () => void;
  hasActive: boolean;
}

export function ChartControls({
  showAll,
  onToggleShowAll,
  onClear,
  hasActive,
}: ChartControlsProps) {
  return (
    <Tablet corners className="px-5 py-4 flex flex-col gap-3">
      <Eyebrow className="normal-case">
        <span className="font-titling uppercase tracking-[0.22em] text-brass">
          Controls
        </span>
      </Eyebrow>

      <button
        type="button"
        role="switch"
        aria-checked={showAll}
        onClick={onToggleShowAll}
        className={cn(
          "flex items-center justify-between rounded-sm border px-3 py-2 transition-colors",
          showAll
            ? "border-brass bg-ink-2 text-brass-hi"
            : "border-brass/30 hover:border-brass hover:text-bone",
        )}
      >
        <span className="font-titling text-[10px] uppercase tracking-[0.2em]">
          Show all aspects
        </span>
        <span
          aria-hidden
          className={cn(
            "h-4 w-7 rounded-full border transition-colors",
            showAll
              ? "border-brass-hi bg-brass/40"
              : "border-bone-4 bg-ink",
          )}
        >
          <span
            className={cn(
              "block h-3 w-3 translate-y-[1px] rounded-full transition-transform duration-200",
              showAll
                ? "translate-x-[14px] bg-brass-hi"
                : "translate-x-[1px] bg-bone-3",
            )}
          />
        </span>
      </button>

      <button
        type="button"
        onClick={onClear}
        disabled={!hasActive}
        className={cn(
          "rounded-sm border px-3 py-2 text-left font-titling text-[10px] uppercase tracking-[0.2em] transition-colors",
          hasActive
            ? "border-brass/30 text-bone-2 hover:border-brass hover:text-brass-hi"
            : "border-brass/15 text-bone-4 cursor-not-allowed",
        )}
      >
        Clear highlight
      </button>

      <p className="mt-1 font-display text-xs italic leading-relaxed text-bone-3">
        Hover or click a planet — or click a house to see what aspects it.
        Press{" "}
        <kbd className="rounded-sm border border-brass/30 bg-ink-2 px-1 py-0.5 font-ui font-mono text-[9px] tracking-normal text-bone">
          Esc
        </kbd>{" "}
        to clear.
      </p>
    </Tablet>
  );
}
