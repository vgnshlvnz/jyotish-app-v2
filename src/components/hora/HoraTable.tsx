"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Sanskrit } from "@/components/Sanskrit";
import { Deva } from "@/components/devanagari-context";
import { Tablet } from "@/components/temple/Tablet";
import { getPlanetById } from "@/lib/data";
import { PLANET_DEVA } from "@/lib/data/devanagari";
import { PLANET_LINE_COLOR } from "@/lib/chart/planet-color";
import { formatTimeInTimezone } from "@/lib/hora/compute";
import type { HoraDay, HoraInterval } from "@/lib/hora/types";

interface HoraTableProps {
  day: HoraDay;
  timezone: string;
  /** When set, the matching hora row gets highlighted as "now". */
  currentHoraIndex: number | null;
}

export function HoraTable({ day, timezone, currentHoraIndex }: HoraTableProps) {
  return (
    <Tablet corners className="px-0 py-0 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-brass/20 text-bone-3 font-titling text-[9px] uppercase tracking-[0.18em]">
              <th className="px-4 py-3 text-left">Hora</th>
              <th className="px-2 py-3 text-left">Half</th>
              <th className="px-2 py-3 text-left">Start</th>
              <th className="px-2 py-3 text-left">End</th>
              <th className="px-2 py-3 text-left">Duration</th>
              <th className="px-4 py-3 text-left">Ruling Planet</th>
            </tr>
          </thead>
          <tbody>
            {day.horas.map((h) => (
              <HoraRow
                key={h.index}
                hora={h}
                timezone={timezone}
                isCurrent={h.index === currentHoraIndex}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Tablet>
  );
}

interface HoraRowProps {
  hora: HoraInterval;
  timezone: string;
  isCurrent: boolean;
}

function HoraRow({ hora, timezone, isCurrent }: HoraRowProps) {
  const planet = getPlanetById(hora.planet);
  const color = PLANET_LINE_COLOR[hora.planet];
  const durationMin = (hora.end.getTime() - hora.start.getTime()) / 60000;
  const minutes = Math.floor(durationMin);
  const seconds = Math.round((durationMin - minutes) * 60);

  return (
    <tr
      className={cn(
        "border-b border-brass/10 transition-colors",
        isCurrent
          ? "bg-brass/10 ring-1 ring-inset ring-brass-hi/40"
          : "hover:bg-ink-4/40",
      )}
    >
      <td className="px-4 py-2.5 font-titling tabular-nums text-bone-2">
        <span className="inline-flex items-baseline gap-2">
          {String(hora.index).padStart(2, "0")}
          {isCurrent ? (
            <span className="font-titling text-[9px] uppercase tracking-[0.2em] text-brass-hi">
              ← now
            </span>
          ) : null}
        </span>
      </td>
      <td className="px-2 py-2.5">
        <span
          className={cn(
            "inline-block rounded-sm px-1.5 py-0.5 font-titling text-[9px] uppercase tracking-[0.18em]",
            hora.half === "day"
              ? "bg-turmeric/15 text-turmeric"
              : "bg-indigo-cloth/20 text-bone-2",
          )}
        >
          {hora.half}
        </span>
      </td>
      <td className="px-2 py-2.5 font-ui font-mono text-xs tabular-nums text-bone">
        {formatTimeInTimezone(hora.start, timezone)}
      </td>
      <td className="px-2 py-2.5 font-ui font-mono text-xs tabular-nums text-bone">
        {formatTimeInTimezone(hora.end, timezone)}
      </td>
      <td className="px-2 py-2.5 font-ui font-mono text-xs tabular-nums text-bone-3">
        {minutes}m {String(seconds).padStart(2, "0")}s
      </td>
      <td className="px-4 py-2.5">
        <span
          style={{ color }}
          className="inline-flex items-center gap-2 leading-none"
        >
          <span aria-hidden className="font-display text-base">
            {planet?.glyph ?? "·"}
          </span>
          <Sanskrit className="not-italic font-display text-base">
            {planet?.sanskritName ?? hora.planet}
          </Sanskrit>
          <Deva className="text-xs">{PLANET_DEVA[hora.planet]}</Deva>
        </span>
      </td>
    </tr>
  );
}
