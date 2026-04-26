import { Yantra, type YantraFrame } from "./Yantra";
import type { RashiId } from "@/lib/data/types";

interface RashiGlyphProps {
  id: RashiId;
  size?: number;
  stroke?: number;
  className?: string;
}

interface RashiSpec {
  frame: YantraFrame;
  spokes: number;
  seed: React.ReactNode;
}

const RASHI_SPECS: Record<RashiId, RashiSpec> = {
  mesha: {
    frame: "triangle-up",
    spokes: 4,
    seed: <path d="M48 70 Q48 50 54 50 Q60 50 60 60 Q60 50 66 50 Q72 50 72 70" />,
  },
  vrishabha: {
    frame: "circle",
    spokes: 4,
    seed: (
      <>
        <circle cx={60} cy={68} r={8} />
        <path d="M52 60 Q44 50 44 44 M68 60 Q76 50 76 44" />
      </>
    ),
  },
  mithuna: {
    frame: "square",
    spokes: 6,
    seed: <path d="M50 48 L50 72 M70 48 L70 72 M46 48 L74 48 M46 72 L74 72" />,
  },
  karka: {
    frame: "circle",
    spokes: 4,
    seed: (
      <>
        <circle cx={50} cy={58} r={5} />
        <circle cx={70} cy={62} r={5} />
        <path d="M44 58 Q44 48 60 48 Q72 48 72 58" />
        <path d="M76 62 Q76 72 60 72 Q48 72 48 62" />
      </>
    ),
  },
  simha: {
    frame: "lotus",
    spokes: 5,
    seed: (
      <>
        <circle cx={56} cy={68} r={6} />
        <path d="M56 62 Q56 50 64 46 Q72 44 72 56 Q72 64 66 64" />
      </>
    ),
  },
  kanya: {
    frame: "circle",
    spokes: 6,
    seed: (
      <path d="M44 50 L44 72 M44 50 Q50 50 50 56 L50 72 M50 56 Q56 56 56 62 L56 72 Q56 78 64 76 Q72 72 70 60 Q68 52 60 56" />
    ),
  },
  tula: {
    frame: "triangle-up",
    spokes: 4,
    seed: (
      <path d="M40 70 L80 70 M44 62 L76 62 M52 62 Q52 50 60 50 Q68 50 68 62" />
    ),
  },
  vrishchika: {
    frame: "circle",
    spokes: 8,
    seed: (
      <path d="M44 50 L44 70 Q44 76 50 76 M50 50 L50 70 Q50 76 56 76 M56 50 L56 70 Q56 76 64 76 L72 70 L70 64 M72 70 L78 72" />
    ),
  },
  dhanu: {
    frame: "triangle-up",
    spokes: 5,
    seed: (
      <>
        <path d="M44 76 L76 44" />
        <path d="M76 44 L76 54 M76 44 L66 44" />
        <path d="M52 60 L60 68" />
      </>
    ),
  },
  makara: {
    frame: "square",
    spokes: 4,
    seed: (
      <path d="M44 50 Q44 60 50 60 Q56 60 56 50 L56 70 Q56 76 64 76 Q72 76 72 68 Q72 60 64 60" />
    ),
  },
  kumbha: {
    frame: "hexagram",
    spokes: 6,
    seed: (
      <>
        <path d="M44 54 L52 50 L60 54 L68 50 L76 54" />
        <path d="M44 64 L52 60 L60 64 L68 60 L76 64" />
      </>
    ),
  },
  meena: {
    frame: "circle",
    spokes: 4,
    seed: (
      <>
        <path d="M44 44 Q44 60 50 60 Q44 60 44 76" />
        <path d="M76 44 Q76 60 70 60 Q76 60 76 76" />
        <path d="M50 60 L70 60" />
      </>
    ),
  },
};

/**
 * Yantra-framed rashi glyph — line-art zodiac seed inside the sacred frame.
 *
 * @source ported from the Claude Design "Vedic Rune" prototype
 */
export function RashiGlyph({ id, size = 120, stroke, className }: RashiGlyphProps) {
  const spec = RASHI_SPECS[id];
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
