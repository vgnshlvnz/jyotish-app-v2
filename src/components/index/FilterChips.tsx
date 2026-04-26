"use client";

import { cn } from "@/lib/utils";

export interface FilterChip<TId extends string> {
  id: TId;
  label: string;
  /** Optional count to show as a small badge after the label. */
  count?: number;
}

interface FilterChipsProps<TId extends string> {
  chips: readonly FilterChip<TId>[];
  active: TId;
  onChange: (id: TId) => void;
  className?: string;
  ariaLabel?: string;
}

/**
 * Horizontal chip row used above index grids. Single-select; first chip
 * is canonically "all".
 */
export function FilterChips<TId extends string>({
  chips,
  active,
  onChange,
  className,
  ariaLabel = "Filter",
}: FilterChipsProps<TId>) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={cn("flex flex-wrap items-center gap-1.5", className)}
    >
      {chips.map((chip) => {
        const isActive = chip.id === active;
        return (
          <button
            key={chip.id}
            role="radio"
            type="button"
            aria-checked={isActive}
            onClick={() => onChange(chip.id)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] transition-all duration-200 ease-out",
              isActive
                ? "border-cosmos-indigo/70 bg-cosmos-indigo/15 text-foreground"
                : "border-cosmos-line bg-transparent text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            {chip.label}
            {chip.count !== undefined ? (
              <span
                className={cn(
                  "tabular-nums text-[10px]",
                  isActive ? "text-cosmos-indigo" : "text-muted-foreground/70",
                )}
              >
                {chip.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
