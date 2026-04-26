import * as React from "react";

import { cn } from "@/lib/utils";

interface BrassRuleProps {
  className?: string;
  /** Skip the central diamond glyph — leaves a clean horizontal fade. */
  bare?: boolean;
}

/**
 * The brass-leaf decorative divider — a horizontal hairline that fades to
 * transparent at both ends, with a small rotated diamond at the centre.
 */
export function BrassRule({ className, bare = false }: BrassRuleProps) {
  return (
    <div className={cn("brass-rule", className)} aria-hidden>
      {!bare ? <span className="brass-rule-glyph" /> : null}
    </div>
  );
}
