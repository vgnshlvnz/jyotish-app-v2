/**
 * Domain meta — the three master datasets the app navigates between.
 *
 * The 1-2-3 rail in the header reads from this list. Order is fixed —
 * the user types `1` to jump to planets, `2` to rashis, `3` to nakshatras.
 */

import { NAKSHATRAS, PLANETS, RASHIS } from "@/lib/data";

export type DomainId = "planets" | "rashis" | "nakshatras";

export interface DomainMeta {
  readonly id: DomainId;
  readonly number: 1 | 2 | 3;
  /** Roman numeral for the temple seal (I, II, III). */
  readonly numeral: "I" | "II" | "III";
  readonly title: string;
  readonly sanskritTitle: string;
  /** Devanāgarī rendering of the domain name. */
  readonly deva: string;
  readonly subtitle: string;
  readonly count: number;
  readonly href: string;
  /** Representative glyphs for the rail tile. */
  readonly glyphs: readonly string[];
  readonly description: string;
}

export const DOMAINS: readonly [DomainMeta, DomainMeta, DomainMeta] = [
  {
    id: "planets",
    number: 1,
    numeral: "I",
    title: "Planets",
    sanskritTitle: "Grahas",
    deva: "ग्रह",
    subtitle: "9 Grahas",
    count: PLANETS.length,
    href: "/planets",
    glyphs: PLANETS.slice(0, 7).map((p) => p.glyph),
    description:
      "The nine cosmic forces — Sun, Moon, the five visible planets, and the lunar nodes — that shape character, life-circumstance, and dharma.",
  },
  {
    id: "rashis",
    number: 2,
    numeral: "II",
    title: "Rashis",
    sanskritTitle: "Rāśayaḥ",
    deva: "राशि",
    subtitle: "12 Signs",
    count: RASHIS.length,
    href: "/rashis",
    glyphs: RASHIS.slice(0, 6).map((r) => r.glyph),
    description:
      "Twelve 30° segments of the zodiac, each ruled by a planet and corresponding to a Tamil solar month and a region of the cosmic body.",
  },
  {
    id: "nakshatras",
    number: 3,
    numeral: "III",
    title: "Nakshatras",
    sanskritTitle: "Nakṣatrāṇi",
    deva: "नक्षत्र",
    subtitle: "27 Stars",
    count: NAKSHATRAS.length,
    href: "/nakshatras",
    glyphs: ["Aśvinī", "Bharaṇī", "Kṛttikā", "Rohiṇī", "Mṛga", "Ārdrā"],
    description:
      "Twenty-seven lunar mansions of 13°20' each, each governed by a deity, a presiding planet, and an animal yoni — the Moon's nightly resting places.",
  },
] as const;

export const DOMAIN_BY_ID: Readonly<Record<DomainId, DomainMeta>> = {
  planets: DOMAINS[0],
  rashis: DOMAINS[1],
  nakshatras: DOMAINS[2],
};

/** Lookup by route segment — accepts the current pathname's first segment. */
export function getDomainFromPath(pathname: string | null): DomainId | null {
  if (!pathname) return null;
  const seg = pathname.split("/").filter(Boolean)[0];
  if (seg === "planets" || seg === "rashis" || seg === "nakshatras") {
    return seg;
  }
  return null;
}
