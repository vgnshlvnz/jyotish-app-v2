import * as React from "react";

import { cn } from "@/lib/utils";

interface SealProps {
  /** Roman numeral or short label inscribed on the seal. */
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_CLASS: Record<NonNullable<SealProps["size"]>, string> = {
  sm: "size-5 text-[9px]",
  md: "size-7 text-[11px]",
  lg: "size-9 text-[13px]",
};

/**
 * Vermilion sindoor seal — the small circular maroon disc that prefixes
 * eyebrow rows on detail headers and landing-page tile counters.
 */
export function Seal({ children, size = "md", className }: SealProps) {
  return (
    <span className={cn("seal", SIZE_CLASS[size], className)}>{children}</span>
  );
}
