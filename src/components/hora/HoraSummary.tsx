"use client";

import * as React from "react";

import { Sanskrit } from "@/components/Sanskrit";
import { Deva } from "@/components/devanagari-context";
import { Tablet } from "@/components/temple/Tablet";
import { Eyebrow } from "@/components/temple/Eyebrow";
import { BrassRule } from "@/components/temple/BrassRule";
import { getPlanetById } from "@/lib/data";
import { PLANET_DEVA } from "@/lib/data/devanagari";
import { PLANET_LINE_COLOR } from "@/lib/chart/planet-color";
import {
  formatDateInTimezone,
  formatTimeInTimezone,
} from "@/lib/hora/compute";
import type { HoraDay, HoraInterval } from "@/lib/hora/types";

interface HoraSummaryProps {
  day: HoraDay;
  location: { name: string; timezone: string };
  currentHora: HoraInterval | null;
}

const VARA_NAME: Record<number, { sanskrit: string; deva: string }> = {
  0: { sanskrit: "Ravivāra",     deva: "रविवार" },
  1: { sanskrit: "Somavāra",     deva: "सोमवार" },
  2: { sanskrit: "Maṅgalavāra",  deva: "मङ्गलवार" },
  3: { sanskrit: "Budhavāra",    deva: "बुधवार" },
  4: { sanskrit: "Guruvāra",     deva: "गुरुवार" },
  5: { sanskrit: "Śukravāra",    deva: "शुक्रवार" },
  6: { sanskrit: "Śanivāra",     deva: "शनिवार" },
};

export function HoraSummary({ day, location, currentHora }: HoraSummaryProps) {
  const lord = getPlanetById(day.dayLord);
  const lordColor = PLANET_LINE_COLOR[day.dayLord];
  const vara = VARA_NAME[day.weekday];

  const dayLengthMs = day.sunset.getTime() - day.sunrise.getTime();
  const nightLengthMs = day.nextSunrise.getTime() - day.sunset.getTime();
  const dayHrMin = msToHM(dayLengthMs);
  const nightHrMin = msToHM(nightLengthMs);

  return (
    <Tablet corners className="px-5 py-4 flex flex-col gap-4">
      <Eyebrow className="normal-case">
        <span className="font-titling uppercase tracking-[0.22em] text-brass">
          Today's Hora · Now
        </span>
      </Eyebrow>

      {/* Top: date + location + day-lord */}
      <div className="flex flex-col gap-1">
        <p className="font-display text-2xl text-bone leading-tight">
          {formatDateInTimezone(day.sunrise, location.timezone)}
        </p>
        <p className="font-titling text-[11px] uppercase tracking-[0.2em] text-bone-3">
          {location.name}
        </p>
        {vara ? (
          <p className="mt-1 inline-flex items-baseline gap-2 font-display text-base text-bone-2">
            <Sanskrit className="not-italic font-display text-bone">
              {vara.sanskrit}
            </Sanskrit>
            <Deva className="text-sm text-brass">{vara.deva}</Deva>
          </p>
        ) : null}
      </div>

      <BrassRule />

      {/* Sun stats grid */}
      <dl className="grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
        <Stat label="Sunrise" value={formatTimeInTimezone(day.sunrise, location.timezone)} />
        <Stat label="Sunset"  value={formatTimeInTimezone(day.sunset,  location.timezone)} />
        <Stat label="Day length"   value={dayHrMin} />
        <Stat label="Night length" value={nightHrMin} />
      </dl>

      <BrassRule />

      {/* Day lord + current hora */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <p className="font-titling text-[10px] uppercase tracking-[0.2em] text-bone-3">
            Day lord · Vāreśa
          </p>
          <p style={{ color: lordColor }} className="inline-flex items-baseline gap-2">
            <span aria-hidden className="font-display text-2xl">
              {lord?.glyph}
            </span>
            <Sanskrit className="not-italic font-display text-xl">
              {lord?.sanskritName ?? day.dayLord}
            </Sanskrit>
            <Deva className="text-base">{PLANET_DEVA[day.dayLord]}</Deva>
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="font-titling text-[10px] uppercase tracking-[0.2em] text-bone-3">
            Hora now · Hora-Pati
          </p>
          {currentHora ? (
            <p
              style={{ color: PLANET_LINE_COLOR[currentHora.planet] }}
              className="inline-flex items-baseline gap-2"
            >
              <span aria-hidden className="font-display text-2xl">
                {getPlanetById(currentHora.planet)?.glyph}
              </span>
              <Sanskrit className="not-italic font-display text-xl">
                {getPlanetById(currentHora.planet)?.sanskritName ?? currentHora.planet}
              </Sanskrit>
              <Deva className="text-base">
                {PLANET_DEVA[currentHora.planet]}
              </Deva>
              <span className="font-titling text-[10px] uppercase tracking-[0.18em] text-bone-3">
                ({formatTimeInTimezone(currentHora.start, location.timezone)} –{" "}
                {formatTimeInTimezone(currentHora.end, location.timezone)})
              </span>
            </p>
          ) : (
            <p className="font-display italic text-bone-3 text-sm">
              Outside this day's sunrise–sunrise window.
            </p>
          )}
        </div>
      </div>
    </Tablet>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="font-titling text-[10px] uppercase tracking-[0.2em] text-bone-3">
        {label}
      </dt>
      <dd className="font-display text-lg tabular-nums text-bone">{value}</dd>
    </div>
  );
}

function msToHM(ms: number): string {
  const totalMin = Math.round(ms / 60000);
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return `${h}h ${String(m).padStart(2, "0")}m`;
}
