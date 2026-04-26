import * as React from "react";

import { cn } from "@/lib/utils";

export type YantraFrame =
  | "circle"
  | "square"
  | "triangle-up"
  | "triangle-down"
  | "hexagram"
  | "lotus";

interface YantraProps {
  /** Inner seed glyph (the planet / sign / nakshatra symbol). */
  children: React.ReactNode;
  /** Render dimension in pixels. */
  size?: number;
  /** Outer ornament style. */
  frame?: YantraFrame;
  /** Number of radial spokes between inner seed and outer ring. */
  spokes?: number;
  /** Stroke width — defaults to 1.25 (matching the prototype). */
  stroke?: number;
  /** Pass-through className for color (use `text-*`). */
  className?: string;
  /** Skip the inner seed circle (for very dense glyphs). */
  noSeedCircle?: boolean;
}

/**
 * Yantra wrapper — the sacred-geometric "rune" frame.
 *
 * Composes: outer ring + frame variant (lotus/triangle/hexagram/square) +
 * radial spokes + inner seed circle, all stroked in `currentColor`. The
 * caller passes the actual symbol glyph as children (drawn within the
 * 120×120 viewBox, centered on (60, 60)).
 *
 * @source ported from the Claude Design "Vedic Rune" prototype
 */
export function Yantra({
  children,
  size = 120,
  frame = "circle",
  spokes = 0,
  stroke = 1.25,
  className,
  noSeedCircle = false,
}: YantraProps) {
  const c = 60;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("overflow-visible", className)}
      role="img"
      aria-hidden
    >
      {/* Outer ring — twin concentric circles */}
      <circle cx={c} cy={c} r={56} opacity={0.5} />
      <circle cx={c} cy={c} r={52} opacity={0.85} />

      {/* Frame variant */}
      {frame === "square" && (
        <g opacity={0.6}>
          <rect x={14} y={14} width={92} height={92} />
          <rect x={20} y={20} width={80} height={80} opacity={0.4} />
        </g>
      )}
      {frame === "triangle-up" && (
        <g opacity={0.55}>
          <path d="M60 12 L106 96 L14 96 Z" />
        </g>
      )}
      {frame === "triangle-down" && (
        <g opacity={0.55}>
          <path d="M60 108 L14 24 L106 24 Z" />
        </g>
      )}
      {frame === "hexagram" && (
        <g opacity={0.55}>
          <path d="M60 14 L102 86 L18 86 Z" />
          <path d="M60 106 L18 34 L102 34 Z" />
        </g>
      )}
      {frame === "lotus" && (
        <g opacity={0.5}>
          {Array.from({ length: 8 }).map((_, i) => {
            const a = ((i * 45) * Math.PI) / 180;
            const x = c + Math.cos(a) * 46;
            const y = c + Math.sin(a) * 46;
            return <circle key={i} cx={x} cy={y} r={9} opacity={0.45} />;
          })}
        </g>
      )}

      {/* Spokes — radial ticks between inner seed and outer ring */}
      {spokes > 0 &&
        Array.from({ length: spokes }).map((_, i) => {
          const a = (((i * 360) / spokes - 90) * Math.PI) / 180;
          const x1 = c + Math.cos(a) * 36;
          const y1 = c + Math.sin(a) * 36;
          const x2 = c + Math.cos(a) * 52;
          const y2 = c + Math.sin(a) * 52;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} opacity={0.45} />;
        })}

      {/* Inner seed circle — the bindu boundary */}
      {!noSeedCircle && <circle cx={c} cy={c} r={32} opacity={0.7} />}

      {/* The seed symbol */}
      <g>{children}</g>
    </svg>
  );
}
