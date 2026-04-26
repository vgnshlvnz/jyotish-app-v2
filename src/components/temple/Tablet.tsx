import * as React from "react";

import { cn } from "@/lib/utils";

interface TabletProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Marks the tablet as the active item — adds the brass leaf-glow. */
  active?: boolean;
  /** Adds the small brass-tick corner motifs in each corner of the tablet. */
  corners?: boolean;
  asChild?: false;
  children: React.ReactNode;
}

/**
 * The rune-tablet card — gradient panel from ink-3 to ink-2 with a thin
 * brass border. Optional corner motifs and an active/glow state.
 */
export function Tablet({
  active = false,
  corners = true,
  className,
  children,
  ...props
}: TabletProps) {
  return (
    <div
      className={cn("tablet relative", className)}
      data-active={active || undefined}
      {...props}
    >
      {corners ? (
        <span aria-hidden className="tablet-corners absolute inset-0 pointer-events-none">
          <i />
          <i />
        </span>
      ) : null}
      {children}
    </div>
  );
}
