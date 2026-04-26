"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Sanskrit } from "@/components/Sanskrit";
import { Deva } from "@/components/devanagari-context";
import { Tablet } from "@/components/temple/Tablet";
import { Eyebrow } from "@/components/temple/Eyebrow";
import { PLANETS, RASHIS } from "@/lib/data";
import { PLANET_DEVA, RASHI_DEVA } from "@/lib/data/devanagari";
import type { PlanetId, RashiId } from "@/lib/data/types";
import type { BirthChart, Placement } from "@/lib/chart/types";

interface ChartInputFormProps {
  chart: BirthChart;
  onApply: (chart: BirthChart) => void;
  onReset: () => void;
}

/**
 * Collapsible form for entering a custom chart. Lagna + 9 planet rows
 * (rashi select + degree input). Apply commits to the parent's chart
 * state; Reset reverts to the PDF sample.
 *
 * Validation is light by design — degree is clamped to [0, 30) on input,
 * and any blank rashi is rejected by the underlying `Record<…>` type. The
 * form starts with the currently-active chart pre-filled so users can
 * tweak rather than re-enter.
 */
export function ChartInputForm({ chart, onApply, onReset }: ChartInputFormProps) {
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState<DraftChart>(() => chartToDraft(chart));

  // When the parent's chart changes (e.g. via Reset), re-sync the draft.
  React.useEffect(() => {
    setDraft(chartToDraft(chart));
  }, [chart]);

  const apply = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(draftToChart(draft));
  };

  return (
    <Tablet corners className="px-5 py-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <Eyebrow className="normal-case">
          <span className="font-titling uppercase tracking-[0.22em] text-brass">
            Custom chart
          </span>
          <Deva className="ml-2 text-xs text-brass-hi">कुंडली</Deva>
        </Eyebrow>
        <ChevronDown
          className={cn(
            "size-4 text-bone-3 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {!open ? (
        <p className="mt-2 font-display text-xs italic text-bone-3">
          Showing the sample chart from JA1 Assignment #11. Open to enter
          your own lagna and planet positions.
        </p>
      ) : (
        <form onSubmit={apply} className="mt-4 flex flex-col gap-4">
          {/* Lagna */}
          <div className="grid grid-cols-[120px_1fr] items-center gap-3">
            <label
              htmlFor="lagna"
              className="font-titling text-[10px] uppercase tracking-[0.2em] text-bone-3"
            >
              Lagna · स्वरूप
            </label>
            <RashiSelect
              id="lagna"
              value={draft.lagna}
              onChange={(v) => setDraft({ ...draft, lagna: v })}
            />
          </div>

          {/* Planet rows */}
          <div className="flex flex-col gap-2">
            {PLANETS.map((p) => {
              const row = draft.placements[p.id];
              return (
                <div
                  key={p.id}
                  className="grid grid-cols-[120px_1fr_88px] items-center gap-3"
                >
                  <label
                    htmlFor={`p-${p.id}`}
                    className="flex items-baseline gap-1.5 font-titling text-[10px] uppercase tracking-[0.2em] text-bone-2"
                  >
                    <span aria-hidden className="font-display text-base text-bone">
                      {p.glyph}
                    </span>
                    <Sanskrit className="not-italic font-titling tracking-[0.1em]">
                      {p.sanskritName}
                    </Sanskrit>
                    <Deva className="ml-1 text-[10px] tracking-normal text-brass">
                      {PLANET_DEVA[p.id]}
                    </Deva>
                  </label>
                  <RashiSelect
                    id={`p-${p.id}`}
                    value={row.rashi}
                    onChange={(v) =>
                      setDraft({
                        ...draft,
                        placements: {
                          ...draft.placements,
                          [p.id]: { ...row, rashi: v },
                        },
                      })
                    }
                  />
                  <input
                    type="number"
                    min={0}
                    max={29.99}
                    step={0.01}
                    value={Number.isFinite(row.degree) ? row.degree : 0}
                    onChange={(e) => {
                      const raw = Number.parseFloat(e.target.value);
                      const clamped = Number.isFinite(raw)
                        ? Math.max(0, Math.min(29.999, raw))
                        : 0;
                      setDraft({
                        ...draft,
                        placements: {
                          ...draft.placements,
                          [p.id]: { ...row, degree: clamped },
                        },
                      });
                    }}
                    className="w-full rounded-sm border border-brass/30 bg-ink-2 px-2 py-1.5 font-ui font-mono text-xs tabular-nums text-bone outline-none focus:border-brass-hi"
                    aria-label={`${p.englishName} degree`}
                  />
                </div>
              );
            })}
          </div>

          {/* Actions */}
          <div className="mt-1 flex items-center gap-2">
            <button
              type="submit"
              className="rounded-sm border border-brass bg-brass/15 px-4 py-2 font-titling text-[10px] uppercase tracking-[0.22em] text-brass-hi transition-colors hover:bg-brass/25"
            >
              Apply
            </button>
            <button
              type="button"
              onClick={onReset}
              className="rounded-sm border border-brass/30 px-4 py-2 font-titling text-[10px] uppercase tracking-[0.22em] text-bone-2 transition-colors hover:border-brass hover:text-brass-hi"
            >
              Reset to sample
            </button>
          </div>
        </form>
      )}
    </Tablet>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Internals
// ─────────────────────────────────────────────────────────────────────────

interface DraftChart {
  lagna: RashiId;
  placements: Record<PlanetId, { rashi: RashiId; degree: number }>;
}

function chartToDraft(chart: BirthChart): DraftChart {
  const placements = {} as Record<PlanetId, { rashi: RashiId; degree: number }>;
  for (const p of PLANETS) {
    const existing = chart.placements.find((pl) => pl.planet === p.id);
    placements[p.id] = existing
      ? { rashi: existing.rashi, degree: existing.degree }
      : { rashi: chart.lagna, degree: 0 };
  }
  return { lagna: chart.lagna, placements };
}

function draftToChart(draft: DraftChart): BirthChart {
  const placements: Placement[] = PLANETS.map((p) => {
    const row = draft.placements[p.id];
    return { planet: p.id, rashi: row.rashi, degree: row.degree };
  });
  return { lagna: draft.lagna, placements };
}

function RashiSelect({
  id,
  value,
  onChange,
}: {
  id?: string;
  value: RashiId;
  onChange: (v: RashiId) => void;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value as RashiId)}
      className="w-full rounded-sm border border-brass/30 bg-ink-2 px-2 py-1.5 font-ui text-xs text-bone outline-none focus:border-brass-hi"
    >
      {RASHIS.map((r) => (
        <option key={r.id} value={r.id} className="bg-ink-2 text-bone">
          {r.sanskritName} · {r.englishName} ({RASHI_DEVA[r.id]})
        </option>
      ))}
    </select>
  );
}
