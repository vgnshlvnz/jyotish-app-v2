"use client";

import * as React from "react";
import { MapPin } from "lucide-react";

import { cn } from "@/lib/utils";
import { Tablet } from "@/components/temple/Tablet";
import { Eyebrow } from "@/components/temple/Eyebrow";
import { CITIES, findCity } from "@/lib/hora/cities";
import type { Location } from "@/lib/hora/types";

interface HoraInputFormProps {
  date: string;
  location: Location;
  onChange: (next: { date: string; location: Location }) => void;
}

const CUSTOM_OPTION = "__custom__";

/**
 * Date + location picker. City dropdown is the primary path; selecting
 * "Custom…" reveals lat/lon/timezone fields. A "use my location" button
 * fills the form from the browser geolocation API (with a graceful fallback
 * to the previous selection on denial).
 */
export function HoraInputForm({ date, location, onChange }: HoraInputFormProps) {
  const isPresetCity = CITIES.some((c) => c.name === location.name);
  const [showCustom, setShowCustom] = React.useState(!isPresetCity);

  const onCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === CUSTOM_OPTION) {
      setShowCustom(true);
      return;
    }
    const next = findCity(e.target.value);
    if (next) {
      setShowCustom(false);
      onChange({ date, location: next });
    }
  };

  const onCustomFieldChange = (
    field: keyof Location,
    raw: string,
  ) => {
    let value: string | number = raw;
    if (field === "latitude" || field === "longitude") {
      const n = Number.parseFloat(raw);
      if (!Number.isFinite(n)) return;
      value = n;
    }
    onChange({ date, location: { ...location, [field]: value } });
  };

  const useMyLocation = () => {
    if (typeof navigator === "undefined" || !navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const tz =
          Intl.DateTimeFormat().resolvedOptions().timeZone || location.timezone;
        const next: Location = {
          name: "My location",
          latitude: Number(pos.coords.latitude.toFixed(4)),
          longitude: Number(pos.coords.longitude.toFixed(4)),
          timezone: tz,
        };
        setShowCustom(true);
        onChange({ date, location: next });
      },
      () => {
        // Silently ignore denial.
      },
    );
  };

  return (
    <Tablet corners className="px-5 py-4 flex flex-col gap-4">
      <Eyebrow className="normal-case">
        <span className="font-titling uppercase tracking-[0.22em] text-brass">
          Date &amp; Place
        </span>
      </Eyebrow>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.4fr] gap-3">
        {/* Date */}
        <label className="flex flex-col gap-1.5">
          <span className="font-titling text-[10px] uppercase tracking-[0.2em] text-bone-3">
            Date · Tithi
          </span>
          <input
            type="date"
            value={date}
            onChange={(e) => onChange({ date: e.target.value, location })}
            className="rounded-sm border border-brass/30 bg-ink-2 px-2 py-1.5 font-ui text-sm text-bone outline-none focus:border-brass-hi"
          />
        </label>

        {/* City dropdown */}
        <label className="flex flex-col gap-1.5">
          <span className="font-titling text-[10px] uppercase tracking-[0.2em] text-bone-3">
            Place · Sthāna
          </span>
          <select
            value={isPresetCity ? location.name : CUSTOM_OPTION}
            onChange={onCityChange}
            className="rounded-sm border border-brass/30 bg-ink-2 px-2 py-1.5 font-ui text-sm text-bone outline-none focus:border-brass-hi"
          >
            {CITIES.map((c) => (
              <option key={c.name} value={c.name} className="bg-ink-2 text-bone">
                {c.name}
              </option>
            ))}
            <option value={CUSTOM_OPTION} className="bg-ink-2 text-bone">
              Custom coordinates…
            </option>
          </select>
        </label>
      </div>

      {showCustom ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <NumberField
            label="Latitude"
            value={location.latitude}
            onChange={(v) => onCustomFieldChange("latitude", v)}
            step="0.0001"
            min={-90}
            max={90}
          />
          <NumberField
            label="Longitude"
            value={location.longitude}
            onChange={(v) => onCustomFieldChange("longitude", v)}
            step="0.0001"
            min={-180}
            max={180}
          />
          <label className="flex flex-col gap-1.5">
            <span className="font-titling text-[10px] uppercase tracking-[0.2em] text-bone-3">
              Timezone (IANA)
            </span>
            <input
              type="text"
              value={location.timezone}
              onChange={(e) => onCustomFieldChange("timezone", e.target.value)}
              placeholder="Asia/Kolkata"
              className="rounded-sm border border-brass/30 bg-ink-2 px-2 py-1.5 font-ui font-mono text-xs text-bone outline-none focus:border-brass-hi"
            />
          </label>
        </div>
      ) : null}

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={useMyLocation}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-sm border border-brass/30 px-3 py-1.5 font-titling text-[10px] uppercase tracking-[0.2em] text-bone-2 transition-colors",
            "hover:border-brass hover:text-brass-hi",
          )}
        >
          <MapPin className="size-3.5" />
          Use my location
        </button>
        <p className="font-display text-xs italic text-bone-3 text-right">
          Sunrise / sunset via NOAA solar algorithm (suncalc).
        </p>
      </div>
    </Tablet>
  );
}

function NumberField({
  label,
  value,
  onChange,
  step,
  min,
  max,
}: {
  label: string;
  value: number;
  onChange: (raw: string) => void;
  step: string;
  min?: number;
  max?: number;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-titling text-[10px] uppercase tracking-[0.2em] text-bone-3">
        {label}
      </span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        step={step}
        {...(min !== undefined ? { min } : {})}
        {...(max !== undefined ? { max } : {})}
        className="rounded-sm border border-brass/30 bg-ink-2 px-2 py-1.5 font-ui font-mono text-xs tabular-nums text-bone outline-none focus:border-brass-hi"
      />
    </label>
  );
}
