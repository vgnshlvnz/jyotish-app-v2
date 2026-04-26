import * as React from "react";

import { cn } from "@/lib/utils";

interface EyebrowProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * The brass-toned uppercase eyebrow used above section titles. Pair items
 * inside via `<EyebrowDot />`.
 */
export function Eyebrow({ children, className, ...props }: EyebrowProps) {
  return (
    <div className={cn("eyebrow-text", className)} {...props}>
      {children}
    </div>
  );
}

/** Decorative diamond separator used inside an Eyebrow. */
export function EyebrowDot({ className }: { className?: string }) {
  return <span aria-hidden className={cn("eyebrow-dot", className)} />;
}
