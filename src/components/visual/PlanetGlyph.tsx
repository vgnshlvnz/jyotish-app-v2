import { Yantra, type YantraFrame } from "./Yantra";
import type { PlanetId } from "@/lib/data/types";

interface PlanetGlyphProps {
  id: PlanetId;
  size?: number;
  stroke?: number;
  className?: string;
}

interface PlanetSpec {
  frame: YantraFrame;
  spokes: number;
  /** Inner seed glyph drawn inside the yantra (centered on viewBox 60,60). */
  seed: React.ReactNode;
}

const PLANET_SPECS: Record<PlanetId, PlanetSpec> = {
  sun: {
    frame: "lotus",
    spokes: 12,
    seed: (
      <>
        <circle cx={60} cy={60} r={14} />
        <circle cx={60} cy={60} r={3.5} fill="currentColor" />
      </>
    ),
  },
  moon: {
    frame: "circle",
    spokes: 8,
    seed: <path d="M68 44 a 18 18 0 1 0 0 32 a 14 14 0 1 1 0 -32 z" />,
  },
  mars: {
    frame: "triangle-up",
    spokes: 4,
    seed: (
      <>
        <circle cx={56} cy={64} r={12} />
        <line x1={65} y1={55} x2={78} y2={42} />
        <path d="M78 42 L78 50 M78 42 L70 42" />
      </>
    ),
  },
  mercury: {
    frame: "hexagram",
    spokes: 6,
    seed: (
      <>
        <circle cx={60} cy={60} r={10} />
        <path d="M53 53 a10 10 0 0 1 14 0" opacity={0.7} transform="translate(0 -16)" />
        <path d="M60 70 L60 80 M54 76 L66 76" />
      </>
    ),
  },
  jupiter: {
    frame: "lotus",
    spokes: 9,
    seed: (
      <>
        <path d="M48 48 L48 76" />
        <path d="M48 48 Q60 48 60 60 Q60 72 48 72" />
        <path d="M44 76 L74 76" />
      </>
    ),
  },
  venus: {
    frame: "circle",
    spokes: 6,
    seed: (
      <>
        <circle cx={60} cy={54} r={11} />
        <path d="M60 65 L60 80 M54 73 L66 73" />
      </>
    ),
  },
  saturn: {
    frame: "square",
    spokes: 3,
    seed: <path d="M48 46 L72 46 M60 46 L60 76 Q60 82 66 82" />,
  },
  rahu: {
    frame: "triangle-down",
    spokes: 5,
    seed: (
      <>
        <path d="M46 70 Q46 50 60 50 Q74 50 74 70" />
        <circle cx={46} cy={74} r={3.5} />
        <circle cx={74} cy={74} r={3.5} />
      </>
    ),
  },
  ketu: {
    frame: "triangle-up",
    spokes: 5,
    seed: (
      <>
        <path d="M46 50 Q46 70 60 70 Q74 70 74 50" />
        <circle cx={46} cy={46} r={3.5} />
        <circle cx={74} cy={46} r={3.5} />
      </>
    ),
  },
};

/**
 * Yantra-framed planet glyph — line-art seed inside the sacred-geometric
 * frame. Color flows from `currentColor` (set on the parent via text-*).
 *
 * @source ported from the Claude Design "Vedic Rune" prototype
 */
export function PlanetGlyph({ id, size = 120, stroke, className }: PlanetGlyphProps) {
  const spec = PLANET_SPECS[id];
  return (
    <Yantra
      frame={spec.frame}
      spokes={spec.spokes}
      size={size}
      {...(stroke !== undefined ? { stroke } : {})}
      {...(className !== undefined ? { className } : {})}
    >
      {spec.seed}
    </Yantra>
  );
}
