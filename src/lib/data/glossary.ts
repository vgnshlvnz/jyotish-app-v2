/**
 * Glossary — alphabetical Sanskrit (and Tamil where applicable) terms used
 * across the data layer.
 *
 * Each entry has a `category` for filterable UI grouping. The `seeAlso` array
 * carries follow-on IDs (planet/rashi/nakshatra/house/karaka/avastha) so a UI
 * can deep-link from a glossary entry into the full master record.
 *
 * @source Brihat Parashara Hora Shastra (Santhanam tr.); Jaimini Sutras;
 *         Phaladeepika; classical Tamil Panchangam usage. Definitions
 *         synthesized from these sources.
 */

import type { GlossaryEntry } from "./types";

export const GLOSSARY = [
  {
    term: "Adho-mukha",
    sanskrit: "Adho-mukha",
    meaning:
      "Downward-facing — a nakshatra orientation. Auspicious for digging, mining, foundation work, and any activity going downward.",
    category: "nakshatra-attribute",
  },
  {
    term: "Agni",
    sanskrit: "Agni",
    meaning:
      "The fire god, presiding deity of Krittika nakshatra. The transformative principle that purifies and reveals.",
    category: "deity",
  },
  {
    term: "Akasha",
    sanskrit: "Akasha",
    meaning:
      "Ether or space — the fifth and most subtle of the pancha mahabhuta. The element of Jupiter and of Jupiter-ruled nakshatras.",
    category: "element",
  },
  {
    term: "Amatyakaraka",
    sanskrit: "Amatya-karaka",
    meaning:
      "Minister-significator. The planet with the second-highest degree in a chart — the AK's working partner, signifying career and right livelihood.",
    category: "karaka",
    seeAlso: ["amatyakaraka"],
  },
  {
    term: "Antya nadi",
    sanskrit: "Antya-nadi",
    meaning:
      "Kapha pulse-stream — the third of the three nadis used in marriage compatibility (nadi-koota). Includes Krittika, Rohini, Ashlesha, Magha, Swati, Vishakha, Uttara Ashadha, Shravana, Revati.",
    category: "nakshatra-attribute",
  },
  {
    term: "Apas",
    sanskrit: "Apas",
    meaning:
      "Water — one of the pancha mahabhuta. Element of the Moon and Venus, and of their nakshatras in the lord-derived scheme.",
    category: "element",
  },
  {
    term: "Ari",
    tamil: "Ari",
    sanskrit: "Ari",
    meaning:
      "Enemy. Alternative name for the 6th house (also called shatru, roga, rina). Significator of disease, debt, service, and overcome obstacles.",
    category: "house",
    seeAlso: ["house_6"],
  },
  {
    term: "Artha",
    sanskrit: "Artha",
    meaning:
      "Wealth and material prosperity — the second of the four purusharthas. Earth-trine signs (Vrishabha, Kanya, Makara) carry the artha aim.",
    category: "purushartha",
  },
  {
    term: "Atma",
    sanskrit: "Atma",
    meaning:
      "The soul. Significated by the Sun and by the Atmakaraka. The central self that endures across lives.",
    category: "concept",
  },
  {
    term: "Atmakaraka",
    sanskrit: "Atma-karaka",
    meaning:
      "Soul-significator. The planet with the highest degree in a chart — the most influential chara karaka. Reveals the soul's central life-purpose.",
    category: "karaka",
    seeAlso: ["atmakaraka"],
  },
  {
    term: "Avastha",
    sanskrit: "Avastha",
    meaning:
      "Planetary state. Three classical avastha systems exist: Baladi (5 states by degree), Jagradadi (3 states by dignity), and Deeptadi (9 mood states).",
    category: "concept",
  },
  {
    term: "Ayu",
    sanskrit: "Ayu",
    meaning:
      "Longevity. Alternative name for the 8th house (also called randhra, mrityu). The primary ayur-bhava together with the 1st and 3rd.",
    category: "house",
    seeAlso: ["house_8"],
  },
  {
    term: "Bala",
    sanskrit: "Bala",
    meaning:
      "Strength. Also the first Baladi avastha — infant — when a planet's degree is in the first 0–6° of an odd sign or last 24–30° of an even sign. Gives one-quarter results.",
    category: "avastha",
  },
  {
    term: "Bhava",
    sanskrit: "Bhava",
    meaning:
      "House. The 12 bhavas of a chart, beginning with the lagna (1st) and proceeding counter-clockwise. Each bhava has its own significations and karaka.",
    category: "concept",
  },
  {
    term: "Bhratrukaraka",
    sanskrit: "Bhratru-karaka",
    meaning:
      "Sibling-significator. The chara karaka of third-highest degree, signifying siblings, courage, and personal effort.",
    category: "karaka",
    seeAlso: ["bhratrukaraka"],
  },
  {
    term: "Brahmin",
    sanskrit: "Brahmana",
    meaning:
      "Priestly / scholarly varna. In Jyotish, attached to Jupiter and Venus among planets, and to the water signs among rashis.",
    category: "varna",
  },
  {
    term: "Buddhi",
    sanskrit: "Buddhi",
    meaning:
      "Discriminating intellect. The faculty governed by Mercury — distinct from manas (emotional mind).",
    category: "concept",
  },
  {
    term: "Chara",
    sanskrit: "Chara",
    meaning:
      "Movable. Used for both rashi modality (Mesha, Karka, Tula, Makara — the cardinal signs) and nakshatra activity-type (Punarvasu, Swati, Shravana, Dhanishta, Shatabhisha — favorable for travel).",
    category: "modality",
  },
  {
    term: "Chithirai",
    tamil: "Chithirai",
    meaning:
      "First Tamil solar month, corresponding to the Sun's transit through Mesha (mid-April to mid-May). Tamil New Year falls at its onset.",
    category: "tamil-month",
    seeAlso: ["mesha"],
  },
  {
    term: "Darakaraka",
    sanskrit: "Dara-karaka",
    meaning:
      "Spouse-significator. The lowest-degreed planet in the seven-karaka scheme — its sign and house describe the marital partner.",
    category: "karaka",
    seeAlso: ["darakaraka"],
  },
  {
    term: "Dasha",
    sanskrit: "Dasha",
    meaning:
      "Planetary period. Vimshottari is the most-used system: a 120-year cycle of nine planetary periods of fixed length, with the active period at birth determined by the Moon's nakshatra.",
    category: "concept",
  },
  {
    term: "Deena",
    sanskrit: "Deena",
    meaning:
      "Depressed — the ninth Deeptadi state. Applies when a planet is in its sign of debilitation (neecha). Causes lowliness, defeat, and failure of significations.",
    category: "avastha",
  },
  {
    term: "Deepta",
    sanskrit: "Deepta",
    meaning:
      "Shining — the first Deeptadi state. Applies when a planet is in its sign of exaltation (uchcha). Confers fame, recognition, and abundant results.",
    category: "avastha",
  },
  {
    term: "Deva gana",
    sanskrit: "Deva-gana",
    meaning:
      "Divine class — one of three nakshatra ganas. Includes Ashwini, Mrigashira, Punarvasu, Pushya, Hasta, Swati, Anuradha, Shravana, Revati. Used in marriage compatibility (gana-koota).",
    category: "nakshatra-attribute",
  },
  {
    term: "Dhana",
    sanskrit: "Dhana",
    meaning:
      "Wealth. The Sanskrit name of the 2nd house, also signifying speech, family of birth, and accumulated assets.",
    category: "house",
    seeAlso: ["house_2"],
  },
  {
    term: "Dharma",
    sanskrit: "Dharma",
    meaning:
      "Righteous duty / cosmic order. The first purushartha and also the 9th house. Fire-trine signs (Mesha, Simha, Dhanu) carry the dharma aim.",
    category: "purushartha",
  },
  {
    term: "Dhatu",
    sanskrit: "Dhatu",
    meaning:
      "Body tissue in Ayurveda. The seven dhatus are bone, blood, marrow, skin, fat, muscle, and semen — each ruled by a specific planet.",
    category: "ayurveda",
  },
  {
    term: "Digbala",
    sanskrit: "Dig-bala",
    meaning:
      "Directional strength. A planet earns digbala when posited in a specific kendra: Sun and Mars in the 10th, Jupiter and Mercury in the 1st, Saturn in the 7th, Moon and Venus in the 4th.",
    category: "strength",
  },
  {
    term: "Drishti",
    sanskrit: "Drishti",
    meaning:
      "Aspect — a planet's gaze. Every planet aspects the 7th house from itself. Mars adds 4th and 8th, Jupiter adds 5th and 9th, Saturn adds 3rd and 10th.",
    category: "concept",
  },
  {
    term: "Dusthana",
    sanskrit: "Dusthana",
    meaning:
      "Difficult houses — 6, 8, and 12. Houses of disease, transformation, and loss. Planets here typically give difficult results unless they are functional benefics or have neutralizing yogas.",
    category: "house-classification",
  },
  {
    term: "Dwiswabhava",
    sanskrit: "Dwiswabhava",
    meaning:
      "Dual / mutable modality. The four signs of dual nature — Mithuna, Kanya, Dhanu, Meena — combining qualities of cardinal and fixed signs.",
    category: "modality",
  },
  {
    term: "Gana",
    sanskrit: "Gana",
    meaning:
      "Class — one of three temperamental categories assigned to each nakshatra: deva (divine), manushya (human), rakshasa (demonic). Critical in gana-koota marriage matching.",
    category: "nakshatra-attribute",
  },
  {
    term: "Gandanta",
    sanskrit: "Gandanta",
    meaning:
      "Knot. The transitional zones between the last 3°20' of a water sign and the first 3°20' of the following fire sign — at Revati-Ashwini, Ashlesha-Magha, and Jyeshtha-Mula. Considered karmically intense.",
    category: "concept",
  },
  {
    term: "Garvita",
    sanskrit: "Garvita",
    meaning:
      "Proud — the eighth Deeptadi state. Applies when a planet is in its moolatrikona. Strong but ego-tinged results.",
    category: "avastha",
  },
  {
    term: "Gnatikaraka",
    sanskrit: "Gnati-karaka",
    meaning:
      "Relative-significator. The chara karaka of sixth-highest degree, signifying cousins, rivals, disease, and obstacles overcome through service.",
    category: "karaka",
    seeAlso: ["gnatikaraka"],
  },
  {
    term: "Graha",
    sanskrit: "Graha",
    meaning:
      "Planet — literally 'the grasper.' The nine grahas are Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu.",
    category: "concept",
  },
  {
    term: "Guna",
    sanskrit: "Guna",
    meaning:
      "Quality. The three gunas are sattva (clarity, harmony), rajas (activity, passion), tamas (inertia, density). Every planet, sign, and nakshatra carries a guna assignment.",
    category: "concept",
  },
  {
    term: "Hora",
    sanskrit: "Hora",
    meaning:
      "Hour. Also the name of the D-2 divisional chart, used to assess wealth.",
    category: "concept",
  },
  {
    term: "Jagrat",
    sanskrit: "Jagrat",
    meaning:
      "Awake — the first Jagradadi state. A planet in own sign, moolatrikona, or exaltation gives full results.",
    category: "avastha",
  },
  {
    term: "Jaimini",
    sanskrit: "Jaimini",
    meaning:
      "The sage author of the Jaimini Sutras (Upadeshasutram). Founder of the Jaimini system of astrology, which differs from Parashari in its use of chara karakas and rashi-aspects.",
    category: "concept",
  },
  {
    term: "Jataka",
    sanskrit: "Jataka",
    meaning:
      "Natal chart — also the term for the native (the person born). Jataka shastra is the science of natal astrology.",
    category: "concept",
  },
  {
    term: "Kalapurusha",
    sanskrit: "Kala-purusha",
    meaning:
      "The Cosmic Person whose body is the zodiac. Each rashi maps to a body region: Mesha to the head, descending through the signs to Meena at the feet.",
    category: "concept",
  },
  {
    term: "Kalatra",
    sanskrit: "Kalatra",
    meaning:
      "Spouse — one of the Sanskrit names of the 7th house, alongside yuvati and jaya. Also the planetary karaka role of Venus.",
    category: "house",
    seeAlso: ["house_7"],
  },
  {
    term: "Kama",
    sanskrit: "Kama",
    meaning:
      "Desire / pleasure — the third purushartha. Air-trine signs (Mithuna, Tula, Kumbha) carry the kama aim. Significated by Venus.",
    category: "purushartha",
  },
  {
    term: "Karaka",
    sanskrit: "Karaka",
    meaning:
      "Significator. A planet that signifies a particular life domain (Sun for father, Venus for spouse, etc.) or, in Jaimini, a planet whose role is determined by relative degree.",
    category: "concept",
  },
  {
    term: "Karakamsa",
    sanskrit: "Karakamsa",
    meaning:
      "The sign occupied by the Atmakaraka in the navamsa (D-9) chart. A central reference point in Jaimini chart-reading and a clue to ishta-devata (chosen deity).",
    category: "concept",
  },
  {
    term: "Karakatwa",
    sanskrit: "Karakatwa",
    meaning:
      "Signification — the things a planet rules and brings into a chart. Plural form encompasses all the domains a planet karaka-fies.",
    category: "concept",
  },
  {
    term: "Karma",
    sanskrit: "Karma",
    meaning:
      "Action — the Sanskrit name of the 10th house. Career, social position, and the actions one takes in the world.",
    category: "house",
    seeAlso: ["house_10"],
  },
  {
    term: "Kendra",
    sanskrit: "Kendra",
    meaning:
      "Angular house. The four kendras are 1, 4, 7, and 10 — pillars of the chart. Planets in kendras gain strength (kendra-bala) and prominence.",
    category: "house-classification",
  },
  {
    term: "Khala",
    sanskrit: "Khala",
    meaning:
      "Wicked — the seventh Deeptadi state. Applies when a planet is in an enemy sign. Significations turn destructive.",
    category: "avastha",
  },
  {
    term: "Kshatriya",
    sanskrit: "Kshatriya",
    meaning:
      "Warrior / ruler varna. Attached to Sun and Mars among planets, and to fire signs among rashis.",
    category: "varna",
  },
  {
    term: "Kumara",
    sanskrit: "Kumara",
    meaning:
      "Child — the second Baladi avastha. Planet at 6–12° of odd signs or 18–24° of even signs. Gives half results.",
    category: "avastha",
  },
  {
    term: "Kundali",
    sanskrit: "Kundali",
    meaning:
      "Natal chart. Used both for the visual diagram and for the chart-reading itself.",
    category: "concept",
  },
  {
    term: "Labha",
    sanskrit: "Labha",
    meaning:
      "Gain — the Sanskrit name of the 11th house. Income, fulfillment of desires, elder siblings.",
    category: "house",
    seeAlso: ["house_11"],
  },
  {
    term: "Laghu",
    sanskrit: "Laghu",
    meaning:
      "Light / swift — a nakshatra activity-type covering Ashwini, Pushya, Hasta. Auspicious for muhurta-selection of light, quick activities (travel, trade, study).",
    category: "nakshatra-attribute",
  },
  {
    term: "Lagna",
    sanskrit: "Lagna",
    meaning:
      "Ascendant — the rising sign at the moment of birth. Also the name of the 1st house (tanu-bhava). The lagna lord is the most important planet for the chart-holder.",
    category: "concept",
  },
  {
    term: "Madhya nadi",
    sanskrit: "Madhya-nadi",
    meaning:
      "Pitta pulse-stream — the second nadi. Includes Bharani, Mrigashira, Pushya, Purva Phalguni, Chitra, Anuradha, Purva Ashadha, Dhanishta, Uttara Bhadrapada.",
    category: "nakshatra-attribute",
  },
  {
    term: "Mahabhuta",
    sanskrit: "Mahabhuta",
    meaning:
      "The five great elements: prithvi (earth), apas (water), tejas (fire), vayu (air), akasha (ether). Distinct from the planet-level four-element scheme that includes ether as a category for Jupiter.",
    category: "element",
  },
  {
    term: "Manas",
    sanskrit: "Manas",
    meaning:
      "Mind — the emotional, sense-coordinating mind. Significated by the Moon. Distinct from buddhi (discriminating intellect).",
    category: "concept",
  },
  {
    term: "Mangala",
    sanskrit: "Mangala",
    meaning:
      "Mars. Also called Kuja, Bhauma, Angaraka. Cabinet-role: commander.",
    category: "planet",
    seeAlso: ["mars"],
  },
  {
    term: "Manushya gana",
    sanskrit: "Manushya-gana",
    meaning:
      "Human class — the second of the three nakshatra ganas. Includes Bharani, Rohini, Ardra, both Phalgunis, both Ashadhas, both Bhadrapadas.",
    category: "nakshatra-attribute",
  },
  {
    term: "Maraka",
    sanskrit: "Maraka",
    meaning:
      "Death-inflicting house. The 2nd and 7th houses are the marakas — their lords gain killing power during the latter portion of life.",
    category: "house-classification",
  },
  {
    term: "Matrukaraka",
    sanskrit: "Matru-karaka",
    meaning:
      "Mother-significator. The chara karaka of fourth-highest degree, signifying the mother and the emotional foundation.",
    category: "karaka",
    seeAlso: ["matrukaraka"],
  },
  {
    term: "Mleccha",
    sanskrit: "Mleccha",
    meaning:
      "Outcaste / barbarian varna — outside the four-varna system. Attached to Rahu and Ketu, and to certain nakshatras under variant traditions.",
    category: "varna",
  },
  {
    term: "Moksha",
    sanskrit: "Moksha",
    meaning:
      "Liberation — the fourth and final purushartha. Water-trine signs (Karka, Vrishchika, Meena) carry the moksha aim. The 12th house signifies moksha.",
    category: "purushartha",
  },
  {
    term: "Moolatrikona",
    sanskrit: "Mula-trikona",
    meaning:
      "Root-trine — a planet's secondary best position, just below exaltation in strength. Each planet has a specific moolatrikona range within one of its own signs.",
    category: "strength",
  },
  {
    term: "Mridu",
    sanskrit: "Mridu",
    meaning:
      "Gentle — a nakshatra activity-type covering Mrigashira, Chitra, Anuradha, Revati. Auspicious for friendship, art, romance.",
    category: "nakshatra-attribute",
  },
  {
    term: "Mrita",
    sanskrit: "Mrita",
    meaning:
      "Dead — the fifth Baladi avastha. Planet at 24–30° of odd signs or 0–6° of even signs. Gives no significant results from its own karakatwas.",
    category: "avastha",
  },
  {
    term: "Mudita",
    sanskrit: "Mudita",
    meaning:
      "Joyous — the third Deeptadi state. Applies when a planet is in a friendly sign. Confers happiness and successful undertakings.",
    category: "avastha",
  },
  {
    term: "Nadi",
    sanskrit: "Nadi",
    meaning:
      "Pulse-stream. Each nakshatra is assigned to one of three nadis (adi, madhya, antya), used in marriage-compatibility nadi-koota — partners ideally have different nadis.",
    category: "nakshatra-attribute",
  },
  {
    term: "Naisargika",
    sanskrit: "Naisargika",
    meaning:
      "Natural / permanent. The fixed friend-enemy-neutral relationships among planets, defined by Parashara and unchanging across charts.",
    category: "relationship",
  },
  {
    term: "Nakshatra",
    sanskrit: "Nakshatra",
    meaning:
      "Lunar mansion — one of 27 segments of 13°20' each that divide the zodiac. The Moon's nakshatra at birth determines the Vimshottari dasha sequence.",
    category: "concept",
  },
  {
    term: "Navamsa",
    sanskrit: "Navamsa",
    meaning:
      "Ninth — the D-9 divisional chart. The most important divisional chart for marriage and dharma. Each pada of a nakshatra corresponds to one navamsa rashi.",
    category: "concept",
  },
  {
    term: "Neecha",
    sanskrit: "Neecha",
    meaning:
      "Debilitated. A planet in its specific debilitation degree of its debilitation sign reaches maximum weakness — opposite of uchcha (exalted).",
    category: "strength",
  },
  {
    term: "Nipidita",
    sanskrit: "Nipidita",
    meaning:
      "Distressed — the sixth Deeptadi state. Applies when a planet is defeated in graha-yuddha (planetary war) or combust by the Sun.",
    category: "avastha",
  },
  {
    term: "Pada",
    sanskrit: "Pada",
    meaning:
      "Foot / quarter — one of the four 3°20' subdivisions of a nakshatra. The 108 padas across the zodiac map one-to-one with the navamsa cycle.",
    category: "nakshatra-attribute",
  },
  {
    term: "Panchadha Maitri",
    sanskrit: "Panchadha-maitri",
    meaning:
      "Five-fold friendship — the combined relationship derived from naisargika × tatkalika, yielding one of five levels: great friend, friend, neutral, enemy, great enemy.",
    category: "relationship",
  },
  {
    term: "Panchangam",
    tamil: "Panchangam",
    sanskrit: "Pancha-anga",
    meaning:
      "Five-limb almanac — the daily calendar listing tithi (lunar day), vara (weekday), nakshatra, yoga, and karana. Foundational reference for muhurta.",
    category: "concept",
  },
  {
    term: "Parashara",
    sanskrit: "Parashara",
    meaning:
      "The sage author of the Brihat Parashara Hora Shastra (BPHS), the foundational text of classical Vedic astrology. Father of Vyasa.",
    category: "concept",
  },
  {
    term: "Parivartana",
    sanskrit: "Parivartana",
    meaning:
      "Mutual sign exchange — a sambandha in which two planets occupy each other's signs. The strongest connection, equivalent to both planets being in their own signs.",
    category: "sambandha",
    seeAlso: ["parivartana"],
  },
  {
    term: "Pitru",
    sanskrit: "Pitru",
    meaning:
      "Father / ancestors. Pitru-karaka role belongs to the Sun. The Pitrs (ancestor-spirits) preside over Magha nakshatra.",
    category: "concept",
  },
  {
    term: "Prana",
    sanskrit: "Prana",
    meaning:
      "Vital force / life-breath. Significated by the Sun. Distinct from manas (mind) and atma (soul).",
    category: "concept",
  },
  {
    term: "Prishtodaya",
    sanskrit: "Prishtodaya",
    meaning:
      "Back-rising — a sign rising-mode applying to Mesha, Vrishabha, Karka, Dhanu, Makara. These signs are considered weaker in strength than head-rising signs.",
    category: "rashi-attribute",
  },
  {
    term: "Prithvi",
    sanskrit: "Prithvi",
    meaning:
      "Earth — one of the pancha mahabhuta. The element of Mercury and of Mercury-ruled nakshatras in the lord-derived scheme.",
    category: "element",
  },
  {
    term: "Purushartha",
    sanskrit: "Purushartha",
    meaning:
      "Aim of human life. Four purusharthas: dharma (duty), artha (wealth), kama (pleasure), moksha (liberation). The 12 rashis distribute across them in trines.",
    category: "concept",
  },
  {
    term: "Putra",
    sanskrit: "Putra",
    meaning:
      "Child — the Sanskrit name of the 5th house. Also signifies intelligence, mantra, and merit from past lives (purva-punya).",
    category: "house",
    seeAlso: ["house_5"],
  },
  {
    term: "Putrakaraka",
    sanskrit: "Putra-karaka",
    meaning:
      "Child-significator. The chara karaka of fifth-highest degree, signifying children and creative-intellectual progeny.",
    category: "karaka",
    seeAlso: ["putrakaraka"],
  },
  {
    term: "Rajas",
    sanskrit: "Rajas",
    meaning:
      "The guna of activity, passion, and motion. One of the three gunas. Associated with Mercury and Venus among planets.",
    category: "guna",
  },
  {
    term: "Rakshasa gana",
    sanskrit: "Rakshasa-gana",
    meaning:
      "Demonic class — the third nakshatra gana. Includes Krittika, Ashlesha, Magha, Chitra, Vishakha, Jyeshtha, Mula, Dhanishta, Shatabhisha. Implies intensity, not malevolence.",
    category: "nakshatra-attribute",
  },
  {
    term: "Randhra",
    sanskrit: "Randhra",
    meaning:
      "Opening / aperture — alternative name for the 8th house. Significates transformation, hidden things, and the manner of death.",
    category: "house",
    seeAlso: ["house_8"],
  },
  {
    term: "Rashi",
    sanskrit: "Rashi",
    meaning:
      "Sign — one of the 12 segments of 30° each that divide the zodiac. Also the term for the Moon-sign that becomes the basis for Tamil/north-Indian janma-rashi.",
    category: "concept",
  },
  {
    term: "Sahaja",
    sanskrit: "Sahaja",
    meaning:
      "Co-born — the Sanskrit name of the 3rd house. Younger siblings, courage, communication, and short journeys.",
    category: "house",
    seeAlso: ["house_3"],
  },
  {
    term: "Sambandha",
    sanskrit: "Sambandha",
    meaning:
      "Connection / relationship between two planets in a chart, formed by parivartana, mutual aspect, conjunction, or one-way aspect. Required for yoga formation.",
    category: "concept",
  },
  {
    term: "Sattva",
    sanskrit: "Sattva",
    meaning:
      "The guna of clarity, harmony, and luminosity. One of the three gunas. Associated with the Sun, Moon, and Jupiter.",
    category: "guna",
  },
  {
    term: "Shadbala",
    sanskrit: "Shad-bala",
    meaning:
      "Six-fold strength assessment — the classical method for quantifying a planet's overall strength using six categories (positional, directional, temporal, motional, natural, aspectual).",
    category: "strength",
  },
  {
    term: "Shakta",
    sanskrit: "Shakta",
    meaning:
      "Capable — the fifth Deeptadi state. Applies when a planet is retrograde or in its own navamsa. Confers strength of action.",
    category: "avastha",
  },
  {
    term: "Shanta",
    sanskrit: "Shanta",
    meaning:
      "Peaceful — the fourth Deeptadi state. Applies when a planet is in benefic vargas or aspected by benefics. Confers equanimity.",
    category: "avastha",
  },
  {
    term: "Shirshodaya",
    sanskrit: "Shirshodaya",
    meaning:
      "Head-rising — a sign rising-mode applying to Mithuna, Simha, Kanya, Tula, Vrishchika, Kumbha. Considered stronger than back-rising signs.",
    category: "rashi-attribute",
  },
  {
    term: "Shudra",
    sanskrit: "Shudra",
    meaning:
      "Laborer / service varna. Attached to Saturn among planets and to air signs among rashis.",
    category: "varna",
  },
  {
    term: "Shukra",
    sanskrit: "Shukra",
    meaning:
      "Venus. Cabinet-role: advisor / preceptor of the asuras. Karaka for marriage (kalatra-karaka for men) and for art, beauty, and pleasure.",
    category: "planet",
    seeAlso: ["venus"],
  },
  {
    term: "Sthira",
    sanskrit: "Sthira",
    meaning:
      "Fixed modality. The four signs of fixed nature — Vrishabha, Simha, Vrishchika, Kumbha — characterized by stability and resistance to change.",
    category: "modality",
  },
  {
    term: "Sukha",
    sanskrit: "Sukha",
    meaning:
      "Happiness — the Sanskrit name of the 4th house. Mother, home, vehicles, fixed assets, and emotional security.",
    category: "house",
    seeAlso: ["house_4"],
  },
  {
    term: "Surya",
    sanskrit: "Surya",
    meaning:
      "Sun. Also called Ravi, Aditya, Bhaskara. King of the celestial cabinet and karaka for the soul, father, and authority.",
    category: "planet",
    seeAlso: ["sun"],
  },
  {
    term: "Sushupti",
    sanskrit: "Sushupti",
    meaning:
      "Deep sleep — the third Jagradadi state. Applies when a planet is in an enemy sign or debilitation. Karakatwas largely fail to manifest.",
    category: "avastha",
  },
  {
    term: "Swakshetra",
    sanskrit: "Swa-kshetra",
    meaning:
      "Own sign / own field. A planet in swakshetra is dignified, comfortable, and able to deliver its significations directly.",
    category: "strength",
  },
  {
    term: "Swapna",
    sanskrit: "Swapna",
    meaning:
      "Dream — the second Jagradadi state. Applies when a planet is in a neutral or friendly sign. Delivers significations partially.",
    category: "avastha",
  },
  {
    term: "Swastha",
    sanskrit: "Swastha",
    meaning:
      "Comfortable — the second Deeptadi state. Applies when a planet is in its own sign. Confers material comfort and steady results.",
    category: "avastha",
  },
  {
    term: "Tamas",
    sanskrit: "Tamas",
    meaning:
      "The guna of inertia, density, and obscuration. One of the three gunas. Associated with Mars, Saturn, Rahu, and Ketu among planets.",
    category: "guna",
  },
  {
    term: "Tanu",
    sanskrit: "Tanu",
    meaning:
      "Body — the Sanskrit name of the 1st house. Self, vitality, appearance, and longevity. Also called lagna.",
    category: "house",
    seeAlso: ["house_1"],
  },
  {
    term: "Tatkalika",
    sanskrit: "Tatkalika",
    meaning:
      "Temporary — the chart-time relationship derived from the relative house positions of two planets. Friends in 2nd, 3rd, 4th, 10th, 11th, 12th; enemies in 1st, 5th, 6th, 7th, 8th, 9th.",
    category: "relationship",
  },
  {
    term: "Tattva",
    sanskrit: "Tattva",
    meaning:
      "Element / principle. Used both for the four-element scheme of the rashis (fire, earth, air, water) and for the broader pancha-mahabhuta scheme that adds ether.",
    category: "element",
  },
  {
    term: "Tejas",
    sanskrit: "Tejas",
    meaning:
      "Fire — one of the pancha mahabhuta. The element of Sun, Mars, and Ketu.",
    category: "element",
  },
  {
    term: "Tikshna",
    sanskrit: "Tikshna",
    meaning:
      "Sharp / harsh — a nakshatra activity-type covering Ardra, Ashlesha, Jyeshtha, Mula. Suitable for piercing, surgical, or destructive activities.",
    category: "nakshatra-attribute",
  },
  {
    term: "Tridosha",
    sanskrit: "Tri-dosha",
    meaning:
      "Three humors of Ayurveda: vata (air), pitta (fire), kapha (water/earth). Each planet, sign, and nakshatra has a dosha attribution.",
    category: "ayurveda",
  },
  {
    term: "Trikona",
    sanskrit: "Trikona",
    meaning:
      "Trine — the three trinal houses 1, 5, 9. Houses of dharma, the most auspicious in the chart. Lords of trines bring prosperity and good fortune.",
    category: "house-classification",
  },
  {
    term: "Ubhayodaya",
    sanskrit: "Ubhayodaya",
    meaning:
      "Both-rising — the rising-mode of Meena, the only sign that rises both head- and back-first. Strength is intermediate.",
    category: "rashi-attribute",
  },
  {
    term: "Uchcha",
    sanskrit: "Uchcha",
    meaning:
      "Exalted. A planet in its specific exaltation degree of its exaltation sign reaches maximum strength. Opposite of neecha (debilitated).",
    category: "strength",
  },
  {
    term: "Ugra",
    sanskrit: "Ugra",
    meaning:
      "Fierce — a nakshatra activity-type covering Bharani, Magha, both Phalgunis, Purva Ashadha, Purva Bhadrapada. Suitable for harsh actions, destruction, exorcism.",
    category: "nakshatra-attribute",
  },
  {
    term: "Upachaya",
    sanskrit: "Upachaya",
    meaning:
      "Growing / improving houses — 3, 6, 10, 11. Planets in upachaya houses tend to give better results over time, as one's effort accumulates.",
    category: "house-classification",
  },
  {
    term: "Urdhva-mukha",
    sanskrit: "Urdhva-mukha",
    meaning:
      "Upward-facing — a nakshatra orientation. Auspicious for tall structures, upward growth, and ascension-related activities.",
    category: "nakshatra-attribute",
  },
  {
    term: "Vaishya",
    sanskrit: "Vaishya",
    meaning:
      "Merchant / agriculturalist varna. Attached to Moon and Mercury among planets and to earth signs among rashis.",
    category: "varna",
  },
  {
    term: "Vakra",
    sanskrit: "Vakra",
    meaning:
      "Retrograde. A planet in vakra motion gains strength (cheshta-bala) and intensified expression. Mars, Mercury, Jupiter, Venus, and Saturn can be vakra; Sun and Moon never.",
    category: "concept",
  },
  {
    term: "Varna",
    sanskrit: "Varna",
    meaning:
      "Caste / community classification — brahmin, kshatriya, vaishya, shudra, mleccha. Used as one factor in marriage-compatibility (varna-koota).",
    category: "concept",
  },
  {
    term: "Vasanta",
    sanskrit: "Vasanta",
    meaning:
      "Spring — one of the six Indian seasons. Associated with Venus.",
    category: "season",
  },
  {
    term: "Vayu",
    sanskrit: "Vayu",
    meaning:
      "Air — one of the pancha mahabhuta. The element of Saturn and Rahu.",
    category: "element",
  },
  {
    term: "Vimshottari",
    sanskrit: "Vimsh-uttari",
    meaning:
      "120-year — the most-used dasha system. A 120-year cycle of nine planetary periods of fixed length: Ketu 7, Venus 20, Sun 6, Moon 10, Mars 7, Rahu 18, Jupiter 16, Saturn 19, Mercury 17.",
    category: "concept",
  },
  {
    term: "Vriddha",
    sanskrit: "Vriddha",
    meaning:
      "Old — the fourth Baladi avastha. Planet at 18–24° of odd signs or 6–12° of even signs. Significations are thinning.",
    category: "avastha",
  },
  {
    term: "Vyaya",
    sanskrit: "Vyaya",
    meaning:
      "Expenditure / loss — the Sanskrit name of the 12th house. Also signifies moksha, foreign lands, hospitals, and the bed-pleasure of the chamber.",
    category: "house",
    seeAlso: ["house_12"],
  },
  {
    term: "Yoga",
    sanskrit: "Yoga",
    meaning:
      "Combination — a specific configuration of planets that produces a defined result. Hundreds of named yogas appear in the classical literature (Raja-yoga, Dhana-yoga, Pancha-mahapurusha yogas, etc.).",
    category: "concept",
  },
  {
    term: "Yoni",
    sanskrit: "Yoni",
    meaning:
      "Animal symbol — each nakshatra is associated with an animal of a specific gender. Used in marriage-compatibility yoni-koota: friendly and inimical animal pairs are tabulated classically.",
    category: "nakshatra-attribute",
  },
  {
    term: "Yuti",
    sanskrit: "Yuti",
    meaning:
      "Conjunction — a sambandha in which two planets share the same sign. The closer their degrees, the more intense the blending.",
    category: "sambandha",
    seeAlso: ["conjunction"],
  },
  {
    term: "Yuva",
    sanskrit: "Yuva",
    meaning:
      "Youth — the third Baladi avastha. Planet at 12–18° of any sign. Peak strength; full results.",
    category: "avastha",
  },
] as const satisfies readonly GlossaryEntry[];
