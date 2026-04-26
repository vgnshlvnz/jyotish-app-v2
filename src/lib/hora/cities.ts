import type { Location } from "./types";

/**
 * Preset locations covering the major Indian metros (where most users of a
 * Vedic Jyotiṣa app will live) plus a handful of global cities so the
 * calculator works anywhere. Coordinates are city-centre approximations
 * accurate to ~1 km, which is well within the precision the hora system
 * cares about (sunrise shifts ~4 minutes per degree of longitude).
 */
export const CITIES: readonly Location[] = [
  // ── India ──────────────────────────────────────────────────────────
  { name: "Chennai, India",    latitude: 13.0843, longitude: 80.2705, timezone: "Asia/Kolkata" },
  { name: "Bengaluru, India",  latitude: 12.9716, longitude: 77.5946, timezone: "Asia/Kolkata" },
  { name: "Mumbai, India",     latitude: 19.0760, longitude: 72.8777, timezone: "Asia/Kolkata" },
  { name: "Delhi, India",      latitude: 28.6139, longitude: 77.2090, timezone: "Asia/Kolkata" },
  { name: "Kolkata, India",    latitude: 22.5726, longitude: 88.3639, timezone: "Asia/Kolkata" },
  { name: "Hyderabad, India",  latitude: 17.3850, longitude: 78.4867, timezone: "Asia/Kolkata" },
  { name: "Pune, India",       latitude: 18.5204, longitude: 73.8567, timezone: "Asia/Kolkata" },
  { name: "Ahmedabad, India",  latitude: 23.0225, longitude: 72.5714, timezone: "Asia/Kolkata" },
  { name: "Coimbatore, India", latitude: 11.0168, longitude: 76.9558, timezone: "Asia/Kolkata" },
  { name: "Madurai, India",    latitude: 9.9252,  longitude: 78.1198, timezone: "Asia/Kolkata" },
  { name: "Trivandrum, India", latitude: 8.5241,  longitude: 76.9366, timezone: "Asia/Kolkata" },
  { name: "Varanasi, India",   latitude: 25.3176, longitude: 82.9739, timezone: "Asia/Kolkata" },
  { name: "Tirupati, India",   latitude: 13.6288, longitude: 79.4192, timezone: "Asia/Kolkata" },

  // ── Other South Asia ──────────────────────────────────────────────
  { name: "Colombo, Sri Lanka",   latitude: 6.9271,  longitude: 79.8612, timezone: "Asia/Colombo" },
  { name: "Kathmandu, Nepal",     latitude: 27.7172, longitude: 85.3240, timezone: "Asia/Kathmandu" },
  { name: "Dhaka, Bangladesh",    latitude: 23.8103, longitude: 90.4125, timezone: "Asia/Dhaka" },

  // ── Global ─────────────────────────────────────────────────────────
  { name: "Singapore",         latitude: 1.3521,  longitude: 103.8198, timezone: "Asia/Singapore" },
  { name: "Dubai, UAE",        latitude: 25.2048, longitude: 55.2708,  timezone: "Asia/Dubai" },
  { name: "London, UK",        latitude: 51.5074, longitude: -0.1278,  timezone: "Europe/London" },
  { name: "New York, USA",     latitude: 40.7128, longitude: -74.0060, timezone: "America/New_York" },
  { name: "San Francisco, USA",latitude: 37.7749, longitude: -122.4194, timezone: "America/Los_Angeles" },
  { name: "Toronto, Canada",   latitude: 43.6532, longitude: -79.3832, timezone: "America/Toronto" },
  { name: "Sydney, Australia", latitude: -33.8688, longitude: 151.2093, timezone: "Australia/Sydney" },
  { name: "Tokyo, Japan",      latitude: 35.6762, longitude: 139.6503, timezone: "Asia/Tokyo" },
];

/** Default location for first-time visitors. */
export const DEFAULT_CITY: Location = CITIES[0]!;

/** Look up a preset city by exact name; null if not in the list. */
export function findCity(name: string): Location | null {
  return CITIES.find((c) => c.name === name) ?? null;
}
