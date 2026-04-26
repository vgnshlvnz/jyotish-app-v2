"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Sanskrit } from "@/components/Sanskrit";
import { QuickStat } from "@/components/QuickStat";
import { Badge } from "@/components/ui/badge";

export interface QuickStatItem {
  label: string;
  value: React.ReactNode;
  sanskritLabel?: string;
}

interface DetailHeaderProps {
  /** Domain badge displayed above the name (e.g. "1 / Planets"). */
  eyebrow: { number: 1 | 2 | 3; label: string };
  /** Main visual identifier — large glyph, number, or symbol. */
  glyph: React.ReactNode;
  sanskritName: string;
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
        <Badge variant="indigo" className="font-display text-[11px] tracking-[0.16em]">
          <span className="font-medium tabular-nums">{eyebrow.number}</span>
          <span className="mx-1.5 opacity-60">·</span>
          <span>{eyebrow.label}</span>
        </Badge>
        <div className="flex items-center gap-1">
          <NavChevron href={prevHref} label={prevLabel} direction="prev" />
          <NavChevron href={nextHref} label={nextLabel} direction="next" />
        </div>
      </div>

      {/* Glyph + names */}
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
        <div
          aria-hidden
          className="flex size-24 shrink-0 items-center justify-center rounded-2xl border border-cosmos-line bg-cosmos-surface text-foreground/90 backdrop-blur md:size-28"
        >
          {glyph}
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <h1 className="font-display text-5xl font-light leading-[1.05] text-foreground md:text-6xl">
            <Sanskrit className="not-italic">{sanskritName}</Sanskrit>
          </h1>
          <p className="text-base text-muted-foreground md:text-lg">
            {englishName}
            {tamilName ? (
              <>
                <span className="mx-2 text-foreground/30">·</span>
                <Sanskrit className="not-italic text-muted-foreground">
                  {tamilName}
                </Sanskrit>
              </>
            ) : null}
          </p>
          {meaning ? (
            <p className="mt-0.5 text-sm italic text-muted-foreground/85">
              {meaning}
            </p>
          ) : null}
        </div>
      </div>

      {/* Quick stats — 2/3 col grid; never crammed into 6 wide because long
          values (deities, multi-word phrases) ragged the baseline at lg:6. */}
      {quickStats.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-8 gap-y-5 border-y border-cosmos-line py-5 sm:grid-cols-3">
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
    "group inline-flex h-9 items-center gap-1.5 rounded-md border border-cosmos-line bg-cosmos-surface px-2.5 text-xs text-muted-foreground transition-colors",
    href ? "hover:border-primary/40 hover:text-foreground" : "opacity-40 cursor-not-allowed",
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
