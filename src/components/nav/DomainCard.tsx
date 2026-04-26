"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { Sanskrit } from "@/components/Sanskrit";
import { Deva } from "@/components/devanagari-context";
import { Seal } from "@/components/temple/Seal";

interface DomainCardProps {
  number: 1 | 2 | 3;
  /** Roman numeral (I, II, III) for the seal. */
  numeral: "I" | "II" | "III";
  title: string;
  sanskritTitle: string;
  /** Devanāgarī rendering of the title. */
  deva: string;
  subtitle: string;
  /** Pre-rendered glyph row — caller chooses the visual treatment per domain. */
  glyphs: React.ReactNode;
  href: string;
  active: boolean;
  /** Compact rail variant — used after the user scrolls past 200px. */
  compact?: boolean;
}

/**
 * One of the three numbered tablets — vermilion seal, brass-toned name,
 * Devanāgarī subtitle, glyph row.
 */
export function DomainCard({
  numeral,
  title,
  sanskritTitle,
  deva,
  subtitle,
  glyphs,
  href,
  active,
  compact = false,
}: DomainCardProps) {
  if (compact) {
    return (
      <Link
        href={href}
        role="tab"
        aria-selected={active}
        data-active={active}
        className={cn(
          "tablet group relative flex items-center gap-3 px-3.5 py-2 rounded-sm",
          active && "glow-active",
        )}
      >
        <Seal size="sm">{numeral}</Seal>
        <span className="flex flex-col leading-tight">
          <span className="font-titling text-[11px] uppercase tracking-[0.2em] text-bone">
            {title}
          </span>
          <Deva className="text-[10px] tracking-normal text-bone-3">
            {deva}
          </Deva>
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      role="tab"
      aria-selected={active}
      data-active={active}
      className={cn(
        "tablet group relative flex items-center gap-5 px-5 py-4 rounded-sm transition-transform duration-200 ease-out",
        "hover:-translate-y-0.5",
        active && "glow-active",
      )}
    >
      {/* Tablet corners */}
      <span
        aria-hidden
        className="tablet-corners pointer-events-none absolute inset-0"
      >
        <i />
        <i />
      </span>

      <Seal size="lg">{numeral}</Seal>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-baseline gap-2">
          <span className="font-titling text-[11px] font-semibold uppercase tracking-[0.2em] text-bone">
            {title}
          </span>
          <Deva className="text-xs text-brass">{deva}</Deva>
        </div>
        <Sanskrit className="text-xs not-italic text-bone-3">
          {sanskritTitle}
        </Sanskrit>
        <div className="mt-1 font-titling text-[10px] uppercase tracking-[0.2em] text-bone-4">
          {subtitle}
        </div>
        <div
          className={cn(
            "mt-1 transition-colors duration-200 [&_svg]:size-7",
            active ? "text-brass-hi" : "text-bone-3 group-hover:text-bone-2",
          )}
        >
          {glyphs}
        </div>
      </div>
    </Link>
  );
}
