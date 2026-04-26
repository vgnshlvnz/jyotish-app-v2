import { sunriseSunset } from "./sun";
import { DAY_LORD, horaPlanetAt } from "./rules";
import type { HoraDay, HoraInterval, Location, Weekday } from "./types";

/**
 * Compute the 24-hora table for a given civil date at a location.
 *
 * Steps:
 *   1. Resolve sunrise + sunset for the requested date at the location.
 *   2. Resolve the next day's sunrise (used to size the night horas).
 *   3. Divide sunrise→sunset into 12 equal day-horas.
 *   4. Divide sunset→nextSunrise into 12 equal night-horas.
 *   5. Tag each hora with its ruling planet — first hora = day-lord,
 *      then advance through the Chaldean order one step per hora.
 *
 * @param dateIso  YYYY-MM-DD interpreted in the location's timezone.
 * @param loc      Location with lat / lon / IANA timezone.
 */
export function computeHoraDay(dateIso: string, loc: Location): HoraDay {
  // Treat the requested civil date as a noon-local instant. We approximate
  // "noon local" by combining the YYYY-MM-DD with 12:00 in the location's
  // timezone, then converting to UTC via Intl. SunCalc only needs the UTC
  // instant — it doesn't care about timezones for its internal math.
  const noonLocalUtc = noonInTimezoneToUtc(dateIso, loc.timezone);
  const { sunrise, sunset } = sunriseSunset(
    noonLocalUtc,
    loc.latitude,
    loc.longitude,
  );

  // Next-day sunrise (for sizing the night horas)
  const nextNoon = new Date(noonLocalUtc.getTime() + 24 * 3600 * 1000);
  const { sunrise: nextSunrise } = sunriseSunset(
    nextNoon,
    loc.latitude,
    loc.longitude,
  );

  const weekday = weekdayInTimezone(noonLocalUtc, loc.timezone);
  const dayLord = DAY_LORD[weekday];

  const horas: HoraInterval[] = [];

  // Day horas: 12 equal segments from sunrise to sunset
  const dayLengthMs = sunset.getTime() - sunrise.getTime();
  const dayHoraMs = dayLengthMs / 12;
  for (let i = 0; i < 12; i++) {
    const start = new Date(sunrise.getTime() + i * dayHoraMs);
    const end = new Date(sunrise.getTime() + (i + 1) * dayHoraMs);
    horas.push({
      index: (i + 1) as HoraInterval["index"],
      start,
      end,
      planet: horaPlanetAt(dayLord, i + 1),
      half: "day",
    });
  }

  // Night horas: 12 equal segments from sunset to next sunrise
  const nightLengthMs = nextSunrise.getTime() - sunset.getTime();
  const nightHoraMs = nightLengthMs / 12;
  for (let i = 0; i < 12; i++) {
    const start = new Date(sunset.getTime() + i * nightHoraMs);
    const end = new Date(sunset.getTime() + (i + 1) * nightHoraMs);
    horas.push({
      index: (i + 13) as HoraInterval["index"],
      start,
      end,
      planet: horaPlanetAt(dayLord, i + 13),
      half: "night",
    });
  }

  return {
    date: dateIso,
    weekday,
    dayLord,
    sunrise,
    sunset,
    nextSunrise,
    horas,
  };
}

/**
 * Returns the hora that contains the given instant, or null if the instant
 * falls outside the day's sunrise→nextSunrise window.
 */
export function currentHora(day: HoraDay, now: Date): HoraInterval | null {
  for (const h of day.horas) {
    if (now >= h.start && now < h.end) return h;
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────
// Date / timezone helpers
// ─────────────────────────────────────────────────────────────────────────

/**
 * Convert a YYYY-MM-DD date in a target timezone to the UTC instant
 * representing 12:00 noon in that timezone on that date.
 *
 * We construct a candidate UTC date and iteratively correct it until its
 * formatted-in-target-timezone parts read "12:00" on the requested civil
 * date. One iteration is usually enough; we cap at 3 to be safe.
 */
function noonInTimezoneToUtc(dateIso: string, timezone: string): Date {
  const [yearStr, monthStr, dayStr] = dateIso.split("-");
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  if (
    !Number.isFinite(year) ||
    !Number.isFinite(month) ||
    !Number.isFinite(day)
  ) {
    throw new Error(`noonInTimezoneToUtc: invalid date ${dateIso}`);
  }

  // Initial guess: treat the inputs as if they were UTC.
  let guess = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));

  for (let iter = 0; iter < 3; iter++) {
    const offsetMs = timezoneOffsetMs(guess, timezone);
    const correction = -offsetMs;
    const corrected = new Date(guess.getTime() + correction);
    if (Math.abs(corrected.getTime() - guess.getTime()) < 1) break;
    guess = corrected;
  }

  return guess;
}

/**
 * Returns the offset (UTC - local) in milliseconds for the given instant
 * in the given timezone. Positive when the timezone is behind UTC,
 * negative when ahead.
 *
 * Computed by formatting the instant in the target timezone, parsing the
 * result back as if it were UTC, and taking the difference.
 */
function timezoneOffsetMs(instant: Date, timezone: string): number {
  // Format the instant as parts in the target timezone.
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(instant);

  const get = (type: Intl.DateTimeFormatPartTypes): number => {
    const p = parts.find((x) => x.type === type);
    return p ? Number(p.value) : NaN;
  };

  // Intl quirk: hourCycle 23 returns "24" for midnight; normalise to 0.
  let hour = get("hour");
  if (hour === 24) hour = 0;

  const localAsUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    hour,
    get("minute"),
    get("second"),
  );

  return instant.getTime() - localAsUtc;
}

/** Day-of-week (0=Sun .. 6=Sat) for a UTC instant in a target timezone. */
function weekdayInTimezone(instant: Date, timezone: string): Weekday {
  const wd = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "short",
  }).format(instant);
  const map: Record<string, Weekday> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const w = map[wd];
  if (w === undefined) {
    throw new Error(`weekdayInTimezone: unparseable weekday "${wd}"`);
  }
  return w;
}

/** Format a Date in a given timezone as "HH:MM" or "HH:MM:SS". */
export function formatTimeInTimezone(
  instant: Date,
  timezone: string,
  withSeconds = false,
): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    ...(withSeconds ? { second: "2-digit" } : {}),
    hour12: false,
  }).format(instant);
}

/** Format a Date in a given timezone as "Mon, 27 Apr 2026". */
export function formatDateInTimezone(instant: Date, timezone: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(instant);
}

/** Today's date as YYYY-MM-DD in a given timezone. */
export function todayIsoInTimezone(timezone: string): string {
  const now = new Date();
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(now);
  // en-CA gives ISO YYYY-MM-DD natively
  return parts;
}
