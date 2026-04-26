"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { Sanskrit } from "@/components/Sanskrit";
import { Badge } from "@/components/ui/badge";
import { DetailSection } from "@/components/detail/DetailTabs";

export interface ConnectionItem {
  href: string;
  /** Glyph or short visual marker (string or React node). */
  glyph?: React.ReactNode;
  sanskritName: string;
  englishName?: string;
  /** Why this item is being linked (e.g. "Exalted here", "Dasha lord"). */
  relation: string;
  /** Optional secondary attribute (e.g. degrees, count). */
  meta?: string;
}

interface ConnectionGroup {
  domain: "planets" | "rashis" | "nakshatras";
  heading: string;
  items: readonly ConnectionItem[];
  /** Empty-state message when items[] is empty. */
  emptyText?: string;
}

interface ConnectionLinksProps {
  groups: readonly ConnectionGroup[];
}

const DOMAIN_BADGE: Record<ConnectionGroup["domain"], { label: string; variant: "indigo" | "gold" | "rose" }> = {
  planets: { label: "1 · Planets", variant: "indigo" },
  rashis: { label: "2 · Rashis", variant: "indigo" },
  nakshatras: { label: "3 · Nakshatras", variant: "indigo" },
};

/**
 * Cross-domain link grid rendered as the last tab on every detail page.
 * Makes the navigation "triangular" — from any item you can reach related
 * items in the other two domains in one click.
 */
export function ConnectionLinks({ groups }: ConnectionLinksProps) {
  return (
    <div className="flex flex-col gap-10">
      {groups.map((group) => {
        const badge = DOMAIN_BADGE[group.domain];
        return (
          <DetailSection key={`${group.domain}-${group.heading}`} title={group.heading}>
            <div className="flex items-center gap-2">
              <Badge variant={badge.variant}>{badge.label}</Badge>
              <span className="text-xs text-muted-foreground">
                {group.items.length} {group.items.length === 1 ? "item" : "items"}
              </span>
            </div>
            {group.items.length === 0 ? (
              <p className="text-sm italic text-muted-foreground">
                {group.emptyText ?? "No connections."}
              </p>
            ) : (
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <li key={`${item.href}-${item.relation}`}>
                    <ConnectionRow item={item} />
                  </li>
                ))}
              </ul>
            )}
          </DetailSection>
        );
      })}
    </div>
  );
}

function ConnectionRow({ item }: { item: ConnectionItem }) {
  return (
    <Link
      href={item.href}
      className={cn(
        "group flex items-center gap-4 rounded-lg border border-cosmos-line bg-cosmos-surface p-4 transition-all duration-200 ease-out",
        "hover:border-primary/40 hover:bg-cosmos-indigo/8 hover:-translate-y-0.5",
      )}
    >
      {item.glyph ? (
        <span
          aria-hidden
          className="flex size-10 shrink-0 items-center justify-center rounded-md border border-cosmos-line bg-background/50 font-display text-2xl text-foreground/85"
        >
          {item.glyph}
        </span>
      ) : null}
      <span className="flex min-w-0 flex-1 flex-col">
        <Sanskrit className="not-italic text-base font-medium text-foreground truncate">
          {item.sanskritName}
        </Sanskrit>
        {item.englishName ? (
          <span className="text-xs text-muted-foreground truncate">
            {item.englishName}
          </span>
        ) : null}
        <span className="mt-1 text-[10px] uppercase tracking-[0.14em] text-cosmos-indigo/85">
          {item.relation}
          {item.meta ? <span className="text-muted-foreground/70 normal-case ml-2">{item.meta}</span> : null}
        </span>
      </span>
    </Link>
  );
}
