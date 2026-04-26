"use client";

import * as React from "react";

import { IndexHeader } from "@/components/index/IndexHeader";
import { HoraInputForm } from "@/components/hora/HoraInputForm";
import { HoraSummary } from "@/components/hora/HoraSummary";
import { HoraTable } from "@/components/hora/HoraTable";
import { DEFAULT_CITY } from "@/lib/hora/cities";
import {
  computeHoraDay,
  currentHora,
  todayIsoInTimezone,
} from "@/lib/hora/compute";
import type { Location } from "@/lib/hora/types";

export default function HoraPage() {
  const [location, setLocation] = React.useState<Location>(DEFAULT_CITY);
  const [date, setDate] = React.useState<string>(() =>
    todayIsoInTimezone(DEFAULT_CITY.timezone),
  );

  // "Now" updates every minute so the highlighted-current-hora stays accurate.
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const day = React.useMemo(
    () => computeHoraDay(date, location),
    [date, location],
  );

  // Highlight current hora only if the table date is today (in the loc tz).
  const isToday = date === todayIsoInTimezone(location.timezone);
  const active = isToday ? currentHora(day, now) : null;

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-8 pt-2">
      <IndexHeader
        numeral="V"
        eyebrow="Planetary Hours"
        title="Hora"
        sanskritTitle="Horā"
        deva="होरा"
        count={24}
        description="Each civil day is divided into 24 horas — 12 between sunrise and sunset, 12 between sunset and the next sunrise. Each hora is ruled by one of the seven classical planets, advancing through the Chaldean order from the day-lord."
      />

      <HoraInputForm
        date={date}
        location={location}
        onChange={({ date: d, location: l }) => {
          setDate(d);
          setLocation(l);
        }}
      />

      <HoraSummary
        day={day}
        location={{ name: location.name, timezone: location.timezone }}
        currentHora={active}
      />

      <HoraTable
        day={day}
        timezone={location.timezone}
        currentHoraIndex={active?.index ?? null}
      />
    </div>
  );
}
