"use client";

import type { ReactNode } from "react";

import type { NakshatraId } from "@/lib/data/types";
import { Yantra, type YantraFrame } from "./Yantra";
import { cn } from "@/lib/utils";

interface NakshatraSymbolProps {
  id: NakshatraId;
  size?: "sm" | "md" | "lg" | number;
  /** Render without the outer Yantra frame — used in compact contexts. */
  bare?: boolean;
  className?: string;
}

const SIZE_MAP = { sm: 48, md: 96, lg: 192 } as const;

const LABELS: Record<NakshatraId, string> = {
  ashwini: "Ashwini",
  bharani: "Bharani",
  krittika: "Krittika",
  rohini: "Rohini",
  mrigashira: "Mrigashira",
  ardra: "Ardra",
  punarvasu: "Punarvasu",
  pushya: "Pushya",
  ashlesha: "Ashlesha",
  magha: "Magha",
  purva_phalguni: "Purva Phalguni",
  uttara_phalguni: "Uttara Phalguni",
  hasta: "Hasta",
  chitra: "Chitra",
  swati: "Swati",
  vishakha: "Vishakha",
  anuradha: "Anuradha",
  jyeshtha: "Jyeshtha",
  mula: "Mula",
  purva_ashadha: "Purva Ashadha",
  uttara_ashadha: "Uttara Ashadha",
  shravana: "Shravana",
  dhanishta: "Dhanishta",
  shatabhisha: "Shatabhisha",
  purva_bhadrapada: "Purva Bhadrapada",
  uttara_bhadrapada: "Uttara Bhadrapada",
  revati: "Revati",
};

/**
 * Per-nakshatra Yantra frame and spoke count.
 *
 * First 9 (Ashwini–Ashlesha) follow the Claude Design "Vedic Rune" prototype
 * exactly. The remaining 18 are extended in the same vocabulary, picked
 * thematically from each nakshatra's symbol (e.g. magha-throne → square,
 * shatabhisha-100-stars → 12 spokes, anuradha-lotus → lotus frame).
 */
const FRAMES: Record<NakshatraId, { frame: YantraFrame; spokes: number }> = {
  ashwini:           { frame: "triangle-up",   spokes: 3 },
  bharani:           { frame: "triangle-down", spokes: 3 },
  krittika:          { frame: "triangle-up",   spokes: 6 },
  rohini:            { frame: "square",        spokes: 4 },
  mrigashira:        { frame: "circle",        spokes: 3 },
  ardra:             { frame: "circle",        spokes: 4 },
  punarvasu:         { frame: "triangle-up",   spokes: 5 },
  pushya:            { frame: "lotus",         spokes: 6 },
  ashlesha:          { frame: "circle",        spokes: 5 },
  magha:             { frame: "square",        spokes: 5 },
  purva_phalguni:    { frame: "triangle-up",   spokes: 4 },
  uttara_phalguni:   { frame: "triangle-down", spokes: 4 },
  hasta:             { frame: "lotus",         spokes: 5 },
  chitra:            { frame: "hexagram",      spokes: 6 },
  swati:             { frame: "circle",        spokes: 5 },
  vishakha:          { frame: "square",        spokes: 4 },
  anuradha:          { frame: "lotus",         spokes: 8 },
  jyeshtha:          { frame: "circle",        spokes: 5 },
  mula:              { frame: "triangle-down", spokes: 5 },
  purva_ashadha:     { frame: "triangle-up",   spokes: 4 },
  uttara_ashadha:    { frame: "triangle-down", spokes: 4 },
  shravana:          { frame: "circle",        spokes: 3 },
  dhanishta:         { frame: "square",        spokes: 4 },
  shatabhisha:       { frame: "circle",        spokes: 12 },
  purva_bhadrapada:  { frame: "triangle-up",   spokes: 4 },
  uttara_bhadrapada: { frame: "triangle-down", spokes: 4 },
  revati:            { frame: "circle",        spokes: 4 },
};

/**
 * Yantra-framed nakshatra symbol. The 27 inner seeds use a unified line-art
 * vocabulary (single 64-coord viewBox, 1.5 stroke, round caps/joins, ≤6
 * primitives each); they're translated 28 units to center inside the 120
 * Yantra frame.
 *
 * Use `bare={true}` to render just the seed without the surrounding yantra
 * (e.g. for very small contexts like the rail glyph row).
 */
export function NakshatraSymbol({ id, size = "md", bare = false, className }: NakshatraSymbolProps) {
  const px = typeof size === "number" ? size : SIZE_MAP[size];

  if (bare) {
    return (
      <svg
        viewBox="0 0 64 64"
        width={px}
        height={px}
        role="img"
        aria-label={`${LABELS[id]} symbol`}
        className={cn("text-foreground/85", className)}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {renderSeed(id)}
      </svg>
    );
  }

  const { frame, spokes } = FRAMES[id];
  return (
    <Yantra
      frame={frame}
      spokes={spokes}
      size={px}
      className={cn("text-current", className)}
    >
      {/* Existing 64-viewBox seed centered inside the 120-viewBox yantra. */}
      <g transform="translate(28 28)">{renderSeed(id)}</g>
    </Yantra>
  );
}

function renderSeed(id: NakshatraId): ReactNode {
  switch (id) {
    // 1. Ashwini — horse's head: arched profile + eye + ear
    case "ashwini":
      return (
        <>
          <path d="M 14 50 Q 14 22 30 18 Q 48 18 50 36" />
          <line x1={30} y1={18} x2={26} y2={10} />
          <circle cx={42} cy={30} r={1.4} fill="currentColor" />
        </>
      );

    // 2. Bharani — yoni: vertical ellipse bisected
    case "bharani":
      return (
        <>
          <path d="M 32 10 Q 16 32 32 54 Q 48 32 32 10 Z" />
          <line x1={32} y1={14} x2={32} y2={50} />
        </>
      );

    // 3. Krittika — flame / razor: tapering curved blade
    case "krittika":
      return (
        <>
          <path d="M 32 10 Q 22 28 24 44 Q 28 54 32 54 Q 36 54 40 44 Q 42 28 32 10 Z" />
          <line x1={32} y1={22} x2={32} y2={42} />
        </>
      );

    // 4. Rohini — chariot: rectangle on two wheels
    case "rohini":
      return (
        <>
          <rect x={14} y={20} width={36} height={18} rx={1.5} />
          <circle cx={22} cy={46} r={5} />
          <circle cx={42} cy={46} r={5} />
        </>
      );

    // 5. Mrigashira — deer's head: arc face + two antler lines
    case "mrigashira":
      return (
        <>
          <path d="M 18 50 Q 18 28 32 26 Q 46 28 46 50" />
          <path d="M 24 26 L 18 12 L 24 18" />
          <path d="M 40 26 L 46 12 L 40 18" />
        </>
      );

    // 6. Ardra — teardrop: single drop shape
    case "ardra":
      return (
        <>
          <path d="M 32 10 Q 18 32 22 46 Q 28 56 32 56 Q 36 56 42 46 Q 46 32 32 10 Z" />
          <circle cx={32} cy={44} r={1.4} fill="currentColor" />
        </>
      );

    // 7. Punarvasu — bow & quiver: arc bow + vertical shaft + arrow tips
    case "punarvasu":
      return (
        <>
          <path d="M 18 14 Q 50 32 18 50" />
          <line x1={32} y1={10} x2={32} y2={54} />
          <line x1={28} y1={14} x2={32} y2={10} />
          <line x1={36} y1={14} x2={32} y2={10} />
        </>
      );

    // 8. Pushya — flower / udder: 4 petal arcs around a center
    case "pushya":
      return (
        <>
          <circle cx={32} cy={32} r={3} />
          <path d="M 32 18 Q 26 24 32 30 Q 38 24 32 18 Z" />
          <path d="M 32 46 Q 26 40 32 34 Q 38 40 32 46 Z" />
          <path d="M 18 32 Q 24 26 30 32 Q 24 38 18 32 Z" />
          <path d="M 46 32 Q 40 26 34 32 Q 40 38 46 32 Z" />
        </>
      );

    // 9. Ashlesha — coiled serpent: spiral made of arcs + small head
    case "ashlesha":
      return (
        <>
          <path d="M 14 50 Q 14 36 28 36 Q 40 36 40 28 Q 40 20 30 20 Q 22 20 22 28" />
          <circle cx={14} cy={50} r={1.6} fill="currentColor" />
          <line x1={14} y1={50} x2={10} y2={54} />
        </>
      );

    // 10. Magha — royal throne: rectangle base with two crown spikes
    case "magha":
      return (
        <>
          <rect x={16} y={26} width={32} height={26} rx={1} />
          <line x1={22} y1={26} x2={22} y2={16} />
          <line x1={42} y1={26} x2={42} y2={16} />
          <line x1={32} y1={26} x2={32} y2={20} />
        </>
      );

    // 11. Purva Phalguni — front legs of bed: two verticals joined by top bar
    case "purva_phalguni":
      return (
        <>
          <line x1={20} y1={20} x2={44} y2={20} />
          <line x1={22} y1={20} x2={22} y2={50} />
          <line x1={42} y1={20} x2={42} y2={50} />
        </>
      );

    // 12. Uttara Phalguni — back legs of bed: bar at bottom, slightly wider stance
    case "uttara_phalguni":
      return (
        <>
          <line x1={16} y1={44} x2={48} y2={44} />
          <line x1={20} y1={14} x2={20} y2={44} />
          <line x1={44} y1={14} x2={44} y2={44} />
        </>
      );

    // 13. Hasta — closed hand: palm circle + four small folded fingers
    case "hasta":
      return (
        <>
          <path d="M 18 36 Q 18 22 32 22 Q 46 22 46 36 Q 46 50 32 50 Q 18 50 18 36 Z" />
          <line x1={24} y1={22} x2={24} y2={16} />
          <line x1={30} y1={22} x2={30} y2={14} />
          <line x1={36} y1={22} x2={36} y2={14} />
          <line x1={42} y1={22} x2={42} y2={16} />
        </>
      );

    // 14. Chitra — bright jewel: rhombus / diamond
    case "chitra":
      return (
        <>
          <polyline points="32,10 52,32 32,54 12,32 32,10" />
          <circle cx={32} cy={32} r={1.6} fill="currentColor" />
        </>
      );

    // 15. Swati — young sprout: vertical stem with two upward curves
    case "swati":
      return (
        <>
          <line x1={32} y1={54} x2={32} y2={26} />
          <path d="M 32 28 Q 18 22 18 10" />
          <path d="M 32 28 Q 46 22 46 10" />
        </>
      );

    // 16. Vishakha — triumphal arch: semicircle on two posts
    case "vishakha":
      return (
        <>
          <path d="M 16 50 L 16 32 Q 32 14 48 32 L 48 50" />
          <line x1={12} y1={50} x2={52} y2={50} />
        </>
      );

    // 17. Anuradha — lotus: 5 petal arcs around a center
    case "anuradha":
      return (
        <>
          <circle cx={32} cy={36} r={2.5} />
          <path d="M 32 16 Q 28 26 32 33" />
          <path d="M 32 16 Q 36 26 32 33" />
          <path d="M 14 30 Q 22 30 30 35" />
          <path d="M 50 30 Q 42 30 34 35" />
          <path d="M 18 50 Q 26 44 31 38" />
          <path d="M 46 50 Q 38 44 33 38" />
        </>
      );

    // 18. Jyeshtha — circular amulet / earring: ring with central dot
    case "jyeshtha":
      return (
        <>
          <circle cx={32} cy={32} r={18} />
          <circle cx={32} cy={32} r={2} fill="currentColor" />
        </>
      );

    // 19. Mula — bunch of roots: three wavy lines from a single point
    case "mula":
      return (
        <>
          <path d="M 32 12 Q 22 26 18 52" />
          <path d="M 32 12 Q 32 28 32 52" />
          <path d="M 32 12 Q 42 26 46 52" />
          <circle cx={32} cy={12} r={1.6} fill="currentColor" />
        </>
      );

    // 20. Purva Ashadha — elephant tusk / fan: curved triangle, tip up-left
    case "purva_ashadha":
      return (
        <>
          <path d="M 16 14 Q 50 18 50 50 Q 28 46 16 14 Z" />
        </>
      );

    // 21. Uttara Ashadha — elephant tusk: mirror tip up-right, slightly slimmer
    case "uttara_ashadha":
      return (
        <>
          <path d="M 48 14 Q 14 18 14 50 Q 36 46 48 14 Z" />
          <line x1={22} y1={36} x2={40} y2={28} />
        </>
      );

    // 22. Shravana — three footprints / ear: 3 small ovals stacked
    case "shravana":
      return (
        <>
          <path d="M 26 14 Q 26 22 32 22 Q 38 22 38 14 Q 38 8 32 8 Q 26 8 26 14 Z" />
          <path d="M 26 32 Q 26 40 32 40 Q 38 40 38 32 Q 38 26 32 26 Q 26 26 26 32 Z" />
          <path d="M 26 50 Q 26 58 32 58 Q 38 58 38 50 Q 38 44 32 44 Q 26 44 26 50 Z" />
        </>
      );

    // 23. Dhanishta — drum: horizontal cylinder body with two drum heads
    case "dhanishta":
      return (
        <>
          <line x1={18} y1={22} x2={46} y2={22} />
          <line x1={18} y1={42} x2={46} y2={42} />
          <circle cx={18} cy={32} r={10} />
          <circle cx={46} cy={32} r={10} />
        </>
      );

    // 24. Shatabhisha — empty circle with scattered dots inside
    case "shatabhisha":
      return (
        <>
          <circle cx={32} cy={32} r={20} />
          <circle cx={24} cy={24} r={1.2} fill="currentColor" />
          <circle cx={38} cy={22} r={1.2} fill="currentColor" />
          <circle cx={42} cy={36} r={1.2} fill="currentColor" />
          <circle cx={26} cy={40} r={1.2} fill="currentColor" />
          <circle cx={32} cy={32} r={1.2} fill="currentColor" />
          <circle cx={20} cy={32} r={1.2} fill="currentColor" />
          <circle cx={36} cy={44} r={1.2} fill="currentColor" />
        </>
      );

    // 25. Purva Bhadrapada — front legs of cot
    case "purva_bhadrapada":
      return (
        <>
          <line x1={26} y1={12} x2={26} y2={52} />
          <line x1={38} y1={12} x2={38} y2={52} />
          <line x1={26} y1={12} x2={38} y2={12} />
        </>
      );

    // 26. Uttara Bhadrapada — back legs of cot
    case "uttara_bhadrapada":
      return (
        <>
          <line x1={18} y1={12} x2={18} y2={52} />
          <line x1={46} y1={12} x2={46} y2={52} />
          <line x1={18} y1={52} x2={46} y2={52} />
        </>
      );

    // 27. Revati — fish: oval body with triangular tail
    case "revati":
      return (
        <>
          <path d="M 14 32 Q 26 18 42 32 Q 26 46 14 32 Z" />
          <path d="M 42 32 L 54 22 L 50 32 L 54 42 Z" />
          <circle cx={22} cy={30} r={1.2} fill="currentColor" />
        </>
      );

    default: {
      const _exhaustive: never = id;
      return _exhaustive;
    }
  }
}
