"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Sanskrit } from "@/components/Sanskrit";
import { Deva } from "@/components/devanagari-context";
import { QuickStat } from "@/components/QuickStat";
import { Eyebrow } from "@/components/temple/Eyebrow";
import { Seal } from "@/components/temple/Seal";
import { BrassRule } from "@/components/temple/BrassRule";

export interface QuickStatItem {
  label: string;
  value: React.ReactNode;
  sanskritLabel?: string;
}

interface DetailHeaderProps {
  /** Domain badge: roman numeral seal + label (e.g. "I" + "Graha · 03 of 09"). */
  eyebrow: {
    /** Roman numeral inside the seal. */
    numeral: "I" | "II" | "III";
    label: string;
  };
  /** Main visual identifier — yantra portrait or large glyph. */
  glyph: React.ReactNode;
  sanskritName: string;
  /** Devanāgarī rendering shown beneath the sanskrit name. */
  deva?: string;
  englishName: string;
  tamilName?: string;
  /** Optional one-line subtitle under the name (e.g. role / English meaning). */
  meaning?: string;
  quickStats: readonly QuickStatItem[];
  /** Previous item's href (null at the first item — chevron disabled). */
  prevHref: string | null;
  /** Next item's href (null at the last item). */
  nextHref: string | null;
  /** Labels for prev/next so users see what they'd jump to. */
  prevLabel?: string;
  nextLabel?: string;
}

/**
 * Header used by every detail page. Provides the visual rhythm
 * (glyph on the left, name on the right, quick-stat strip beneath, prev/next
 * chevrons in the corner) that the spec calls out as the unifying element
 * across the three domain detail templates.
 *
 * Arrow-key navigation between items is wired up here.
 */
export function DetailHeader({
  eyebrow,
  glyph,
  sanskritName,
  deva,
  englishName,
  tamilName,
  meaning,
  quickStats,
  prevHref,
  nextHref,
  prevLabel,
  nextLabel,
}: DetailHeaderProps) {
  const router = useRouter();

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowLeft" && prevHref) {
        e.preventDefault();
        router.push(prevHref);
      } else if (e.key === "ArrowRight" && nextHref) {
        e.preventDefault();
        router.push(nextHref);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, prevHref, nextHref]);

  return (
    <header className="flex flex-col gap-5 pb-2">
      {/* Eyebrow + nav */}
      <div className="flex items-center justify-between">
        <Eyebrow className="flex items-center gap-3 normal-case">
          <Seal size="sm">{eyebrow.numeral}</Seal>
          <span className="font-titling uppercase tracking-[0.22em] text-brass">
            {eyebrow.label}
          </span>
        </Eyebrow>
        <div className="flex items-center gap-1">
          <NavChevron href={prevHref} label={prevLabel} direction="prev" />
          <NavChevron href={nextHref} label={nextLabel} direction="next" />
        </div>
      </div>

      {/* Glyph + names */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
        <div
          aria-hidden
          className="flex size-28 shrink-0 items-center justify-center rounded-sm border border-brass/30 bg-ink-2/70 text-brass-hi md:size-32"
        >
          {glyph}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <h1 className="font-display text-5xl font-normal leading-[1.05] text-bone md:text-6xl">
            <Sanskrit className="not-italic font-display">{sanskritName}</Sanskrit>
          </h1>
          {deva ? (
            <Deva className="text-2xl text-brass-hi">{deva}</Deva>
          ) : null}
          <p className="font-titling text-xs uppercase tracking-[0.22em] text-bone-3">
            {englishName}
            {tamilName ? (
              <>
                <span className="mx-2 text-bone-4">·</span>
                <Sanskrit className="not-italic font-titling text-bone-3">
                  {tamilName}
                </Sanskrit>
              </>
            ) : null}
          </p>
          {meaning ? (
            <p className="mt-1 font-display text-base italic text-bone-2">
              {meaning}
            </p>
          ) : null}
        </div>
      </div>

      <BrassRule />

      {/* Quick stats — 3-col grid */}
      {quickStats.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
          {quickStats.map((s) => (
            <QuickStat
              key={s.label}
              label={s.label}
              value={s.value}
              {...(s.sanskritLabel ? { sanskritLabel: s.sanskritLabel } : {})}
            />
          ))}
        </div>
      ) : null}

      <BrassRule className="mt-1" />
    </header>
  );
}

function NavChevron({
  href,
  label,
  direction,
}: {
  href: string | null;
  label?: string;
  direction: "prev" | "next";
}) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const arrow = direction === "prev" ? "←" : "→";
  const className = cn(
    "group inline-flex h-9 items-center gap-1.5 rounded-sm border border-brass/35 bg-ink-2 px-2.5 font-titling text-[10px] uppercase tracking-[0.2em] text-bone-2 transition-colors",
    href ? "hover:border-brass hover:text-brass-hi" : "opacity-40 cursor-not-allowed",
  );
  if (!href) {
    return (
      <span aria-disabled className={className}>
        {direction === "prev" ? <Icon className="size-3.5" /> : null}
        <span className="hidden sm:inline">{label ?? (direction === "prev" ? "First" : "Last")}</span>
        {direction === "next" ? <Icon className="size-3.5" /> : null}
      </span>
    );
  }
  return (
    <Link
      href={href}
      className={className}
      aria-label={`${direction === "prev" ? "Previous" : "Next"}: ${label ?? ""} (${arrow} arrow key)`}
    >
      {direction === "prev" ? <Icon className="size-3.5" /> : null}
      <span className="hidden sm:inline max-w-[8rem] truncate">{label ?? (direction === "prev" ? "Prev" : "Next")}</span>
      {direction === "next" ? <Icon className="size-3.5" /> : null}
    </Link>
  );
}
