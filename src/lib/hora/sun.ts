import SunCalc from "suncalc";

/**
 * Thin wrapper around `suncalc` that returns just the apparent sunrise and
 * sunset for a given UTC date and geographic location. SunCalc implements
 * the NOAA Solar Position Algorithm — accurate to the minute under typical
 * atmospheric refraction assumptions, which matches the precision used by
 * Drik Pañcāṅga and other classical Hora sources.
 *
 * The `noon` reference date should be a UTC instant clearly inside the
 * civil day at the requested location (we use 12:00 local time by
 * convention, calculated as a UTC offset).
 */
export function sunriseSunset(
  noonUtc: Date,
  latitude: number,
  longitude: number,
): { sunrise: Date; sunset: Date } {
  const times = SunCalc.getTimes(noonUtc, latitude, longitude);
  return { sunrise: times.sunrise, sunset: times.sunset };
}
