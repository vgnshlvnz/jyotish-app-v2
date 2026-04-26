"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Sanskrit } from "@/components/Sanskrit";
import { useCommandPalette } from "./command-palette-context";
import {
  GLOSSARY,
  NAKSHATRAS,
  PLANETS,
  RASHIS,
} from "@/lib/data";

type Tab = "all" | "planets" | "rashis" | "nakshatras" | "glossary";

const TABS: readonly { id: Tab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "planets", label: "Planets" },
  { id: "rashis", label: "Rashis" },
  { id: "nakshatras", label: "Nakshatras" },
  { id: "glossary", label: "Glossary" },
];

/**
 * Global command palette. Mounted once at the root layout and triggered via
 * Cmd+K (handled in the context provider) or the SearchBar in the header.
 */
export function CommandPalette() {
  const { isOpen, setOpen } = useCommandPalette();
  const router = useRouter();
  const [tab, setTab] = React.useState<Tab>("all");

  const go = React.useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router, setOpen],
  );

  // Reset tab to "all" on each open
  React.useEffect(() => {
    if (isOpen) setTab("all");
  }, [isOpen]);

  const showPlanets = tab === "all" || tab === "planets";
  const showRashis = tab === "all" || tab === "rashis";
  const showNakshatras = tab === "all" || tab === "nakshatras";
  const showGlossary = tab === "all" || tab === "glossary";

  return (
    <CommandDialog open={isOpen} onOpenChange={setOpen}>
      <CommandInput placeholder="Search planets, rashis, nakshatras, or glossary terms…" />
      <div className="border-b border-cosmos-line px-3 py-2">
        <div className="flex flex-wrap items-center gap-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={
                "rounded-md px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] transition-colors " +
                (t.id === tab
                  ? "bg-cosmos-indigo/20 text-foreground"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>

        {showPlanets ? (
          <CommandGroup heading="Planets · Grahas">
            {PLANETS.map((p) => (
              <CommandItem
                key={p.id}
                value={`planet ${p.id} ${p.englishName} ${p.sanskritName} ${p.tamilName}`}
                onSelect={() => go(`/planets/${p.id}`)}
              >
                <span className="font-display text-lg w-6 text-center">
                  {p.glyph}
                </span>
                <span className="flex-1 truncate">
                  <Sanskrit className="not-italic text-foreground">
                    {p.sanskritName}
                  </Sanskrit>
                  <span className="ml-2 text-xs text-muted-foreground">
                    {p.englishName} · {p.tamilName}
                  </span>
                </span>
                <Badge variant="indigo">Planet</Badge>
              </CommandItem>
            ))}
          </CommandGroup>
        ) : null}

        {showRashis ? (
          <CommandGroup heading="Rashis · Signs">
            {RASHIS.map((r) => (
              <CommandItem
                key={r.id}
                value={`rashi ${r.id} ${r.englishName} ${r.sanskritName} ${r.tamilName} ${r.tamilMonth}`}
                onSelect={() => go(`/rashis/${r.id}`)}
              >
                <span className="font-display text-lg w-6 text-center">
                  {r.glyph}
                </span>
                <span className="flex-1 truncate">
                  <Sanskrit className="not-italic text-foreground">
                    {r.sanskritName}
                  </Sanskrit>
                  <span className="ml-2 text-xs text-muted-foreground">
                    {r.englishName} · {r.tamilName} · {r.tamilMonth}
                  </span>
                </span>
                <Badge variant="indigo">Rashi</Badge>
              </CommandItem>
            ))}
          </CommandGroup>
        ) : null}

        {showNakshatras ? (
          <CommandGroup heading="Nakshatras · Stars">
            {NAKSHATRAS.map((n) => (
              <CommandItem
                key={n.id}
                value={`nakshatra ${n.id} ${n.sanskritName} ${n.tamilName} ${n.englishMeaning}`}
                onSelect={() => go(`/nakshatras/${n.id}`)}
              >
                <span className="text-xs w-6 text-center text-muted-foreground tabular-nums">
                  {n.number}
                </span>
                <span className="flex-1 truncate">
                  <Sanskrit className="not-italic text-foreground">
                    {n.sanskritName}
                  </Sanskrit>
                  <span className="ml-2 text-xs text-muted-foreground">
                    {n.tamilName} · {n.englishMeaning}
                  </span>
                </span>
                <Badge variant="indigo">Nakshatra</Badge>
              </CommandItem>
            ))}
          </CommandGroup>
        ) : null}

        {showGlossary ? (
          <CommandGroup heading="Glossary">
            {GLOSSARY.map((g) => (
              <CommandItem
                key={g.term}
                value={`glossary ${g.term} ${("tamil" in g ? g.tamil : "") ?? ""} ${g.meaning} ${g.category}`}
                onSelect={() => go(`/glossary#${slug(g.term)}`)}
              >
                <span className="w-6 text-center text-xs text-muted-foreground">
                  {g.term[0]}
                </span>
                <span className="flex-1 truncate">
                  <Sanskrit className="not-italic text-foreground">
                    {g.term}
                  </Sanskrit>
                  <span className="ml-2 text-xs text-muted-foreground truncate">
                    {g.meaning.slice(0, 80)}
                  </span>
                </span>
                <Badge variant="muted">{g.category}</Badge>
              </CommandItem>
            ))}
          </CommandGroup>
        ) : null}
      </CommandList>
    </CommandDialog>
  );
}

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
