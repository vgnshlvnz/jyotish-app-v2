/**
 * Chara Karakas — the seven moving significators of Jaimini astrology.
 *
 * **Calculation rule** (Parashari / Jaimini 7-karaka scheme):
 * Rank the seven non-nodal grahas (Sun, Moon, Mars, Mercury, Jupiter, Venus,
 * Saturn) by their degrees within their occupied sign — *not* by absolute
 * longitude. Whichever planet has the highest degree (closest to 30°) becomes
 * the Atmakaraka. The next highest becomes the Amatyakaraka, then
 * Bhratrukaraka, Matrukaraka, Putrakaraka, Gnatikaraka, and the lowest degree
 * is the Darakaraka. Because each rank is a *position*, not a fixed planet,
 * the karakas are "chara" (moving) — they vary chart to chart.
 *
 * **Eight-karaka extension**: some Jaimini commentators include Rahu as an
 * eighth participant (using its degree calculated as 30° minus its actual
 * degree, since Rahu moves retrograde). When Rahu is included, the lowest
 * resulting karaka is named Pitrukaraka (significator of father). This list
 * documents the seven-karaka scheme with a `notes` flag on Pitrukaraka for
 * the optional eighth.
 *
 * @source Jaimini Sutras (Upadeshasutram); Brihat Parashara Hora Shastra
 *         (Santhanam tr.) on Sthira and Chara karakas; Krishna Mishra's
 *         Phaladeepika.
 */

import type { CharaKaraka } from "./types";

export const CHARA_KARAKAS = [
  {
    id: "atmakaraka",
    name: "Atmakaraka",
    sanskritName: "Atmakaraka",
    abbreviation: "AK",
    calculationOrder: 1,
    role: "Significator of the soul (atma) and the chart's central life-purpose. The most influential chara karaka — its placement, dignity, and yogas reveal what the soul has come to learn and accomplish.",
    significations: [
      "the soul (atma)",
      "the central life-purpose",
      "self-realization and ego-dissolution work",
      "the planet whose lessons cannot be avoided",
      "the karmic axis of the chart",
      "ishta-devata clues (via 12th from AK in Karakamsa)",
    ],
  },
  {
    id: "amatyakaraka",
    name: "Amatyakaraka",
    sanskritName: "Amatyakaraka",
    abbreviation: "AmK",
    calculationOrder: 2,
    role: "Significator of the minister, career, and the soul's working partner. The Atmakaraka is the king; the Amatyakaraka advises and executes — together they shape vocation and worldly action.",
    significations: [
      "career and profession",
      "the minister or counselor of the soul",
      "right livelihood (samyak-ajiva)",
      "skills that support the AK's purpose",
      "the dharma of action",
    ],
  },
  {
    id: "bhratrukaraka",
    name: "Bhratrukaraka",
    sanskritName: "Bhratru-karaka",
    abbreviation: "BK",
    calculationOrder: 3,
    role: "Significator of siblings (bhratru), particularly co-borns who share life's effort. Also rules courage, initiative, and the strength to persevere.",
    significations: [
      "siblings (especially same-generation peers)",
      "courage and personal effort (parakrama)",
      "skill and self-application",
      "short journeys",
      "communication with peers",
    ],
  },
  {
    id: "matrukaraka",
    name: "Matrukaraka",
    sanskritName: "Matru-karaka",
    abbreviation: "MK",
    calculationOrder: 4,
    role: "Significator of the mother (matru) and emotional foundation. Indicates the quality of nurture received and the inner emotional life.",
    significations: [
      "mother and mother-figures",
      "emotional foundation",
      "home and homeland",
      "inner sense of security",
      "nurture and being nurtured",
    ],
  },
  {
    id: "putrakaraka",
    name: "Putrakaraka",
    sanskritName: "Putra-karaka",
    abbreviation: "PK",
    calculationOrder: 5,
    role: "Significator of children (putra) and the creative-intellectual progeny — both biological children and works of the mind.",
    significations: [
      "children and progeny",
      "creative intellect (medha)",
      "works of the mind as offspring",
      "purva-punya — merit from past lives",
      "devotional practice (mantra)",
    ],
  },
  {
    id: "gnatikaraka",
    name: "Gnatikaraka",
    sanskritName: "Gnati-karaka",
    abbreviation: "GK",
    calculationOrder: 6,
    role: "Significator of cousins, relatives, and rivals (gnati). Also rules disease, debt, and obstacles overcome through service and effort.",
    significations: [
      "cousins and extended relatives",
      "enemies and rivals",
      "disease and chronic challenge",
      "debt and obligation",
      "service and discipline",
      "obstacles that strengthen",
    ],
  },
  {
    id: "darakaraka",
    name: "Darakaraka",
    sanskritName: "Dara-karaka",
    abbreviation: "DK",
    calculationOrder: 7,
    role: "Significator of the spouse (dara) and partnerships. The lowest-degreed planet — its sign and house indicate the nature of the marital partner and the dynamics of long-term partnership.",
    significations: [
      "spouse and marriage partner",
      "the qualities sought in a partner",
      "long-term business partnerships",
      "the public face of the chart-holder",
      "trade and exchange with the other",
    ],
    notes: "In the eight-karaka scheme (with Rahu included via 30°-minus-degree), the lowest-ranked planet becomes Pitrukaraka (significator of father). When that scheme is used, the seven roles above shift up by one rank and the spouse-significator role passes to what was previously sixth. Most modern practitioners use the seven-karaka scheme documented here.",
  },
] as const satisfies readonly CharaKaraka[];
