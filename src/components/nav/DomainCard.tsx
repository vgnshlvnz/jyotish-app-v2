"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { Sanskrit } from "@/components/Sanskrit";

interface DomainCardProps {
  number: 1 | 2 | 3;
  title: string;
  sanskritTitle: string;
  subtitle: string;
  /** Pre-rendered glyph row — caller chooses the visual treatment per domain. */
  glyphs: React.ReactNode;
  href: string;
  active: boolean;
  /** Compact rail variant — used after the user scrolls past 200px. */
  compact?: boolean;
}

/**
 * One of the three numbered tiles. Renders as a Link, fully keyboard-
 * accessible, and reflects active/idle state via border + lift.
 */
export function DomainCard({
  number,
  title,
  sanskritTitle,
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
          "group relative flex items-center gap-3 rounded-lg px-4 py-2 transition-all duration-200 ease-out",
          "border border-cosmos-line bg-cosmos-surface backdrop-blur",
          "hover:border-primary/40 hover:bg-cosmos-indigo/10",
          active && "glow-active border-cosmos-indigo/70",
        )}
      >
        <span className="font-display text-2xl font-light leading-none text-foreground/90 tabular-nums">
          {number}
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-xs font-medium uppercase tracking-[0.16em] text-foreground">
            {title}
          </span>
          <Sanskrit className="text-[10px] not-italic text-muted-foreground">
            {sanskritTitle}
          </Sanskrit>
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
        "group relative flex items-center gap-5 rounded-2xl p-5 transition-all duration-300 ease-smooth-out",
        "border border-cosmos-line bg-cosmos-surface backdrop-blur",
        "hover:border-primary/35 hover:-translate-y-0.5 hover:bg-cosmos-indigo/8",
        active && "glow-active border-cosmos-indigo/70 -translate-y-0.5",
      )}
    >
      {/* Large number — left column, vertically centered */}
      <span
        aria-hidden
        className={cn(
          "font-display text-6xl font-light leading-none tabular-nums transition-colors duration-200 shrink-0 w-12 text-center",
          active ? "text-foreground" : "text-foreground/60 group-hover:text-foreground/85",
        )}
      >
        {number}
      </span>

      {/* Right column — name + subtitle + glyphs stacked tight */}
      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
              {title}
            </span>
            <Sanskrit className="text-sm not-italic text-muted-foreground">
              {sanskritTitle}
            </Sanskrit>
          </div>
          <span
            aria-hidden
            className={cn(
              "size-1.5 rounded-full mt-1.5 shrink-0 transition-colors duration-200",
              active ? "bg-cosmos-indigo" : "bg-foreground/15 group-hover:bg-foreground/25",
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {subtitle}
          </span>
          <div
            className={cn(
              "transition-colors duration-200 [&_svg]:size-7",
              active ? "text-foreground/85" : "text-muted-foreground/70",
            )}
          >
            {glyphs}
          </div>
        </div>
      </div>
    </Link>
  );
}
