import * as React from "react";

import { cn } from "@/lib/utils";
import { Deva } from "@/components/devanagari-context";

interface AttrProps {
  label: string;
  /** Devanāgarī rendering of the label, hidden when the deva toggle is off. */
  deva?: string;
  value: React.ReactNode;
  /** Tone the value with a temple accent color. */
  accent?: "brass" | "brass-hi" | "turmeric" | "vermilion" | "maroon" | "indigo" | "leaf";
  className?: string;
}

const ACCENT_CLASS: Record<NonNullable<AttrProps["accent"]>, string> = {
  brass: "text-brass",
  "brass-hi": "text-brass-hi",
  turmeric: "text-turmeric",
  vermilion: "text-vermilion",
  maroon: "text-maroon",
  indigo: "text-indigo-cloth",
  leaf: "text-leaf",
};

/**
 * Attribute key/value pair used in detail-page attribute matrices.
 * Renders an uppercase brass-toned label (with optional Devanāgarī term
 * appended), a thin brass top-rule, then the value in serif.
 */
export function Attr({ label, deva, value, accent, className }: AttrProps) {
  return (
    <div
      className={cn(
        "border-t border-brass/15 py-3.5",
        className,
      )}
    >
      <div className="flex flex-wrap items-baseline gap-x-2 mb-1.5 font-titling text-[10px] uppercase tracking-[0.22em] text-bone-3">
        <span className="whitespace-nowrap">{label}</span>
        {deva ? (
          <Deva className="text-[13px] tracking-normal text-bone-4 normal-case whitespace-nowrap">
            {deva}
          </Deva>
        ) : null}
      </div>
      <div
        className={cn(
          "font-display text-lg leading-snug text-bone",
          accent ? ACCENT_CLASS[accent] : "",
        )}
      >
        {value}
      </div>
    </div>
  );
}
