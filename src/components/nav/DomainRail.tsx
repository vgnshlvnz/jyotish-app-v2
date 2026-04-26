"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Search, BookText } from "lucide-react";

import { cn } from "@/lib/utils";
import { Sanskrit } from "@/components/Sanskrit";
import { DomainCard } from "@/components/nav/DomainCard";
import { DomainGlyphs } from "@/components/nav/domain-glyphs";
import { DOMAINS, getDomainFromPath, type DomainId } from "@/lib/domain";
import { useCommandPalette } from "@/components/search/command-palette-context";

const COMPACT_SCROLL_THRESHOLD = 200;

/**
 * Persistent header navigation. Three numbered tiles in their full form
 * by default; collapses to a compact horizontal bar once the user scrolls
 * past 200px so the rail keeps presence without dominating the page.
 *
 * On mobile (< md) the rail is replaced by a sticky bottom bar — see
 * `DomainBottomBar` rendered alongside in `app/layout.tsx`.
 */
export function DomainRail() {
  const pathname = usePathname();
  const router = useRouter();
  const active = getDomainFromPath(pathname);
  const { open: openPalette } = useCommandPalette();

  const [compact, setCompact] = React.useState(false);

  React.useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setCompact(window.scrollY > COMPACT_SCROLL_THRESHOLD);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Number-key shortcuts: 1, 2, 3 jump domains; "/" focuses search
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
      if (e.key === "1") {
        e.preventDefault();
        router.push("/planets");
      } else if (e.key === "2") {
        e.preventDefault();
        router.push("/rashis");
      } else if (e.key === "3") {
        e.preventDefault();
        router.push("/nakshatras");
      } else if (e.key === "/") {
        e.preventDefault();
        openPalette();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, openPalette]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 hidden md:block transition-all duration-300 ease-smooth-out no-print",
        compact
          ? "border-b border-cosmos-line bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent bg-background/0",
      )}
    >
      <div className="container mx-auto px-6">
        {/* Top utility row */}
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="group flex items-baseline gap-3">
            <span className="font-display text-xl font-medium tracking-tight text-foreground">
              Jyotish
            </span>
            <Sanskrit className="text-sm not-italic text-muted-foreground transition-colors group-hover:text-foreground/85">
              Reference
            </Sanskrit>
          </Link>
          <div className="flex items-center gap-2">
            <SearchTrigger onOpen={openPalette} />
            <Link
              href="/glossary"
              className="inline-flex items-center gap-1.5 rounded-md border border-cosmos-line bg-cosmos-surface px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <BookText className="size-3.5" />
              Glossary
            </Link>
          </div>
        </div>

        {/* The 1-2-3 rail itself */}
        <div
          role="tablist"
          aria-label="Domain navigation"
          className={cn(
            "grid grid-cols-3 gap-4 transition-all duration-300 ease-smooth-out",
            compact ? "py-2.5" : "pb-5 pt-1",
          )}
        >
          {DOMAINS.map((domain) => (
            <DomainCard
              key={domain.id}
              number={domain.number}
              title={domain.title}
              sanskritTitle={domain.sanskritTitle}
              subtitle={domain.subtitle}
              glyphs={<DomainGlyphs id={domain.id} />}
              href={domain.href}
              active={active === domain.id}
              compact={compact}
            />
          ))}
        </div>
      </div>
    </header>
  );
}

function SearchTrigger({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="inline-flex items-center gap-2 rounded-md border border-cosmos-line bg-cosmos-surface px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
    >
      <Search className="size-3.5" />
      <span>Search</span>
      <kbd className="hidden md:inline ml-1 rounded border border-cosmos-line bg-background/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
        ⌘K
      </kbd>
    </button>
  );
}

/**
 * Mobile-only sticky bottom bar with three numbered tabs.
 */
export function DomainBottomBar() {
  const pathname = usePathname();
  const active = getDomainFromPath(pathname);
  return (
    <nav
      role="tablist"
      aria-label="Domain navigation (mobile)"
      className="fixed inset-x-0 bottom-0 z-40 md:hidden no-print border-t border-cosmos-line bg-background/90 backdrop-blur-xl"
    >
      <div className="grid grid-cols-3">
        {DOMAINS.map((domain) => (
          <BottomTab
            key={domain.id}
            href={domain.href}
            number={domain.number}
            title={domain.title}
            sanskritTitle={domain.sanskritTitle}
            active={active === domain.id}
          />
        ))}
      </div>
    </nav>
  );
}

function BottomTab({
  href,
  number,
  title,
  sanskritTitle,
  active,
}: {
  href: string;
  number: 1 | 2 | 3;
  title: string;
  sanskritTitle: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      role="tab"
      aria-selected={active}
      className={cn(
        "flex flex-col items-center gap-0.5 px-2 py-3 transition-colors",
        active ? "text-foreground" : "text-muted-foreground active:text-foreground",
      )}
    >
      <span
        className={cn(
          "font-display text-2xl font-light leading-none transition-colors",
          active ? "text-foreground" : "text-muted-foreground/80",
        )}
      >
        {number}
      </span>
      <span className="text-[10px] font-medium uppercase tracking-[0.14em]">
        {title}
      </span>
      <Sanskrit
        className={cn(
          "text-[9px] not-italic",
          active ? "text-cosmos-indigo" : "text-muted-foreground/60",
        )}
      >
        {sanskritTitle}
      </Sanskrit>
    </Link>
  );
}

/**
 * Re-export for convenience: a non-rail variant for use on the landing page,
 * which renders the cards centered and large without the sticky chrome.
 */
export function DomainHero({ active }: { active: DomainId | null }) {
  return (
    <div
      role="tablist"
      aria-label="Choose a domain"
      className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6"
    >
      {DOMAINS.map((domain) => (
        <DomainCard
          key={domain.id}
          number={domain.number}
          title={domain.title}
          sanskritTitle={domain.sanskritTitle}
          subtitle={domain.subtitle}
          glyphs={<DomainGlyphs id={domain.id} />}
          href={domain.href}
          active={active === domain.id}
        />
      ))}
    </div>
  );
}
