"use client";

import * as React from "react";
import Link from "next/link";
import { Printer, Search } from "lucide-react";

import { GLOSSARY } from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sanskrit } from "@/components/Sanskrit";
import { FilterChips } from "@/components/index/FilterChips";
import { cn } from "@/lib/utils";

type Category = "all" | string;

const ALL_CATEGORIES = Array.from(
  new Set(GLOSSARY.map((g) => g.category)),
).sort();

const ENTRIES_BY_LETTER = (() => {
  const buckets = new Map<string, typeof GLOSSARY[number][]>();
  for (const entry of GLOSSARY) {
    const letter = (entry.term[0] ?? "?").toUpperCase();
    const bucket = buckets.get(letter) ?? [];
    bucket.push(entry);
    buckets.set(letter, bucket);
  }
  for (const bucket of buckets.values()) {
    bucket.sort((a, b) => a.term.localeCompare(b.term));
  }
  return Array.from(buckets.entries()).sort(([a], [b]) => a.localeCompare(b));
})();

export default function GlossaryPage() {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<Category>("all");

  const chips = React.useMemo(() => {
    const all = { id: "all", label: "All", count: GLOSSARY.length };
    const cats = ALL_CATEGORIES.map((c) => ({
      id: c,
      label: c.replace(/-/g, " "),
      count: GLOSSARY.filter((g) => g.category === c).length,
    }));
    return [all, ...cats];
  }, []);

  const filteredBuckets = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return ENTRIES_BY_LETTER.map(([letter, entries]) => {
      const filtered = entries.filter((e) => {
        if (category !== "all" && e.category !== category) return false;
        if (!q) return true;
        const tamil = "tamil" in e ? e.tamil : undefined;
        const sanskrit = "sanskrit" in e ? e.sanskrit : undefined;
        return (
          e.term.toLowerCase().includes(q) ||
          e.meaning.toLowerCase().includes(q) ||
          (tamil ? tamil.toLowerCase().includes(q) : false) ||
          (sanskrit ? sanskrit.toLowerCase().includes(q) : false)
        );
      });
      return [letter, filtered] as const;
    }).filter(([, entries]) => entries.length > 0);
  }, [query, category]);

  const totalShown = filteredBuckets.reduce((acc, [, e]) => acc + e.length, 0);

  return (
    <div className="flex flex-col gap-8 pt-2">
      {/* Header */}
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-cosmos-indigo">
            Reference
          </p>
          <h1 className="mt-2 font-display text-4xl font-light leading-tight text-foreground md:text-5xl">
            Glossary
            <Sanskrit className="ml-3 text-xl not-italic text-muted-foreground">
              Shabdakosha
            </Sanskrit>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            {GLOSSARY.length} Sanskrit and Tamil terms used across the planets,
            rashis, and nakshatras data layer.
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href="/print" className="gap-1.5">
            <Printer className="size-3.5" />
            Print reference
          </Link>
        </Button>
      </header>

      {/* Search + filter */}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search terms, Tamil names, or meanings…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 h-11 text-base"
          />
        </div>
        <FilterChips
          chips={chips}
          active={category}
          onChange={setCategory}
          ariaLabel="Filter by category"
        />
        <div className="text-xs text-muted-foreground">
          Showing {totalShown} of {GLOSSARY.length} terms
        </div>
      </div>

      {/* Letter sections */}
      <div className="flex flex-col gap-12 pt-2">
        {filteredBuckets.length === 0 ? (
          <p className="py-12 text-center text-sm italic text-muted-foreground">
            No terms match your search.
          </p>
        ) : (
          filteredBuckets.map(([letter, entries]) => (
            <section
              key={letter}
              id={`section-${letter}`}
              className="flex flex-col gap-5"
            >
              <div className="flex items-baseline gap-3 border-b border-cosmos-line pb-2">
                <span className="font-display text-3xl font-light leading-none text-cosmos-indigo">
                  {letter}
                </span>
                <span className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {entries.length} {entries.length === 1 ? "term" : "terms"}
                </span>
              </div>
              <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {entries.map((e) => {
                  const tamil = "tamil" in e ? e.tamil : undefined;
                  const seeAlso = "seeAlso" in e ? e.seeAlso : undefined;
                  return (
                    <li
                      key={e.term}
                      id={slug(e.term)}
                      className={cn(
                        "surface-glass flex flex-col gap-2 rounded-lg p-4",
                        "scroll-mt-32",
                      )}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <Sanskrit className="not-italic text-lg font-medium text-foreground">
                          {e.term}
                        </Sanskrit>
                        <Badge variant="muted">{e.category}</Badge>
                      </div>
                      {tamil ? (
                        <div className="text-xs text-muted-foreground">
                          <span className="text-muted-foreground/60">Tamil: </span>
                          <Sanskrit className="not-italic">{tamil}</Sanskrit>
                        </div>
                      ) : null}
                      <p className="text-sm leading-relaxed text-foreground/85">
                        {e.meaning}
                      </p>
                      {seeAlso && seeAlso.length > 0 ? (
                        <div className="mt-1 flex flex-wrap gap-1.5 pt-1">
                          {seeAlso.map((ref) => (
                            <Link
                              key={ref}
                              href={refToHref(ref)}
                              className="text-[10px] uppercase tracking-[0.12em] text-cosmos-indigo hover:underline"
                            >
                              → {ref.replace(/_/g, " ")}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))
        )}
      </div>
    </div>
  );
}

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Maps a `seeAlso` entry (planet/rashi/nakshatra/house id) to its detail href. */
function refToHref(ref: string): string {
  if (ref.startsWith("house_")) return "/"; // no /houses/[id] route in this build
  // Heuristic: planet ids are short, rashi ids are 12 known, nakshatra ids contain underscores or are unique.
  const planetIds = ["sun", "moon", "mars", "mercury", "jupiter", "venus", "saturn", "rahu", "ketu"];
  const rashiIds = [
    "mesha", "vrishabha", "mithuna", "karka", "simha", "kanya",
    "tula", "vrishchika", "dhanu", "makara", "kumbha", "meena",
  ];
  if (planetIds.includes(ref)) return `/planets/${ref}`;
  if (rashiIds.includes(ref)) return `/rashis/${ref}`;
  return `/nakshatras/${ref}`;
}
