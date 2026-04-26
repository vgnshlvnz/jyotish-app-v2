/**
 * Sambandha — the four classical types of planetary connection.
 *
 * A sambandha is a verifiable structural link between two planets in a chart.
 * Yogas, raja-yogas, and dhana-yogas are built from sambandhas: when two
 * planets owning auspicious houses form a sambandha, their joint result is
 * activated. The strength order below (very_strong → moderate) reflects the
 * classical consensus on yoga-formation potency.
 *
 * @source Brihat Parashara Hora Shastra (Santhanam tr.) on yoga-formation
 *         and graha-sambandha; Phaladeepika; Saravali.
 */

import type { Sambandha } from "./types";

export const SAMBANDHAS = [
  {
    id: "parivartana",
    name: "Mutual sign exchange",
    sanskritName: "Parivartana yoga",
    definition:
      "Two planets occupy each other's signs. Planet A sits in Planet B's sign, and Planet B sits in Planet A's sign. Equivalent in strength to both planets being in their own signs simultaneously — they fully empower each other.",
    example:
      "Sun in Vrishabha (Venus's sign) and Venus in Simha (Sun's sign). The two planets exchange significations, lending each other dignity. Sun gains Venus's comforts; Venus gains Sun's authority.",
    strengthLevel: "very_strong",
  },
  {
    id: "mutual_aspect",
    name: "Mutual aspect",
    sanskritName: "Paraspara drishti sambandha",
    definition:
      "Each planet aspects the sign occupied by the other. Because aspects are calculated from sign to sign (not from degree to degree in classical Parashari), this means the two planets fall on each other's drishti-houses. The relationship is symmetric and the planets influence each other's significations directly.",
    example:
      "Mars in Mesha and Saturn in Tula — they oppose each other and so each aspects the other's sign by the 7th-house drishti. Each modifies the other's expression: Mars heats Saturn; Saturn restrains Mars.",
    strengthLevel: "strong",
  },
  {
    id: "conjunction",
    name: "Conjunction in the same sign",
    sanskritName: "Yuti sambandha",
    definition:
      "Two planets occupy the same sign. Their significations blend and condition each other. The closer the degrees, the more intimate the blend — when within one degree, the stronger graha may eclipse the weaker (graha-yuddha or planetary war applies).",
    example:
      "Jupiter and Venus together in Karka. Both benefics in a friendly water sign — wisdom and beauty fuse, often producing artistic, philosophical, or teaching gifts.",
    strengthLevel: "strong",
  },
  {
    id: "one_way_aspect",
    name: "One-way aspect",
    sanskritName: "Ekapaksha drishti",
    definition:
      "Planet A casts a special aspect onto the sign occupied by Planet B, but B does not aspect A's sign in return. The relationship is asymmetric — A influences B, but B is not directly returning the influence. Effective for activating B's significations through A's character, but weaker than mutual sambandhas.",
    example:
      "Saturn in Mesha aspects the 10th house (Makara, Saturn's own sign). If Sun is in Makara, Saturn's 10th-aspect falls on Sun, but Sun (which only has the 7th-aspect) does not aspect Mesha in return. Saturn shapes Sun's significations, but Sun does not equally shape Saturn's.",
    strengthLevel: "moderate",
  },
] as const satisfies readonly Sambandha[];
