/**
 * Karakatwas — domain-grouped significations for each of the 9 grahas.
 *
 * Each planet's significations are grouped into six life domains: career,
 * relationships, health, wealth, spirituality, and family. This grouping is a
 * UI convenience so that a planet detail page can render per-domain accordions
 * without re-segmenting at render time.
 *
 * @source Brihat Parashara Hora Shastra (Santhanam tr.), Karakadhyaya;
 *         Phaladeepika; Saravali. Per-planet domain breakdowns synthesized
 *         from classical karakatwa lists.
 */

import type { Karakatwa, PlanetId } from "./types";

export const KARAKATWAS = {
  sun: [
    {
      domain: "career",
      significations: [
        "government and statecraft",
        "executive authority and command",
        "royal patronage and recognition",
        "public office and high position",
        "leadership of organizations",
        "fame and visibility",
        "medicine (especially heart and bones)",
      ],
    },
    {
      domain: "relationships",
      significations: [
        "father (pitru karaka)",
        "kings and superiors",
        "paternal figures and authority figures",
        "the eldest member of any group",
      ],
    },
    {
      domain: "health",
      significations: [
        "vitality and life-force (prana)",
        "heart and circulation",
        "bones and skeletal frame",
        "right eye",
        "fevers and pitta disorders",
        "headaches and baldness",
      ],
    },
    {
      domain: "wealth",
      significations: [
        "gold (suvarna)",
        "copper",
        "wealth derived from status or grants",
        "royal favor and patronage",
      ],
    },
    {
      domain: "spirituality",
      significations: [
        "atma — the soul",
        "dharma and self-knowledge",
        "agnihotra and the sacred fire",
        "Surya namaskar and solar worship",
        "Gayatri mantra",
      ],
    },
    {
      domain: "family",
      significations: [
        "father",
        "paternal lineage and ancestors on the father's side",
        "the soul of the family",
        "the eldest son",
      ],
    },
  ],
  moon: [
    {
      domain: "career",
      significations: [
        "nursing and caregiving",
        "hospitality and food service",
        "agriculture and dairy",
        "water-related professions (sailors, fisheries)",
        "tourism and travel",
        "public-facing work",
        "real estate (especially residential)",
      ],
    },
    {
      domain: "relationships",
      significations: [
        "mother (matru karaka)",
        "women in general",
        "the masses and the public",
        "nurturers and caretakers",
      ],
    },
    {
      domain: "health",
      significations: [
        "manas — the mind and emotions",
        "blood and bodily fluids",
        "lungs and chest",
        "breast and breastfeeding",
        "left eye",
        "menstruation and fertility",
        "sleep and dream-state",
      ],
    },
    {
      domain: "wealth",
      significations: [
        "pearls and white gems",
        "silver",
        "white commodities (rice, sugar, milk)",
        "agricultural produce",
      ],
    },
    {
      domain: "spirituality",
      significations: [
        "manas — devotional mind",
        "bhakti and emotion-based devotion",
        "chanting (japa) and mantra repetition",
        "worship of the Divine Mother",
      ],
    },
    {
      domain: "family",
      significations: [
        "mother",
        "maternal lineage",
        "infants and small children",
        "the comfort and emotional warmth of home",
      ],
    },
  ],
  mars: [
    {
      domain: "career",
      significations: [
        "military and martial professions",
        "police and law enforcement",
        "surgery and dentistry",
        "engineering and construction",
        "sports and athletics",
        "fire-related professions (chefs, foundries)",
        "real estate (land transactions)",
      ],
    },
    {
      domain: "relationships",
      significations: [
        "younger brothers (bhratru karaka in Parashari sense)",
        "enemies and rivals",
        "competitors and adversaries",
        "comrades-in-arms",
      ],
    },
    {
      domain: "health",
      significations: [
        "muscles and physical strength",
        "bone marrow",
        "blood and circulation",
        "wounds, cuts, accidents",
        "inflammation and acute fevers",
        "surgery and surgical recovery",
      ],
    },
    {
      domain: "wealth",
      significations: [
        "red coral (praval)",
        "copper and brass",
        "land and real estate",
        "gains through enterprise and risk",
      ],
    },
    {
      domain: "spirituality",
      significations: [
        "courage and tapas",
        "conquest of base impulses",
        "worship of Subrahmanya / Karttikeya",
        "Hanuman bhakti",
      ],
    },
    {
      domain: "family",
      significations: [
        "younger siblings",
        "the protector role within the family",
        "courage of the household",
      ],
    },
  ],
  mercury: [
    {
      domain: "career",
      significations: [
        "writing and journalism",
        "accounting and mathematics",
        "mediation and brokerage",
        "trade and commerce",
        "teaching and tutoring",
        "IT, software, telecommunications",
        "publishing and printing",
      ],
    },
    {
      domain: "relationships",
      significations: [
        "friends and peers",
        "business partners (intellectual partnerships)",
        "maternal uncle (matula)",
        "students and teachers",
      ],
    },
    {
      domain: "health",
      significations: [
        "skin and complexion",
        "nervous system",
        "speech and tongue",
        "breath and respiration",
        "intellectual fatigue and anxiety",
      ],
    },
    {
      domain: "wealth",
      significations: [
        "emerald (panna)",
        "green commodities",
        "intellectual property and royalties",
        "brokerage and commission income",
      ],
    },
    {
      domain: "spirituality",
      significations: [
        "viveka — discrimination",
        "study of scripture",
        "Vishnu Sahasranama",
        "buddhi-yoga (yoga of intellect)",
      ],
    },
    {
      domain: "family",
      significations: [
        "maternal uncles",
        "peers and intellectual companions",
        "step-relations",
      ],
    },
  ],
  jupiter: [
    {
      domain: "career",
      significations: [
        "teaching and academia",
        "law and the judiciary",
        "finance and banking",
        "religious office and priesthood",
        "counseling and advisory roles",
        "philosophy and writing on dharma",
        "wealth management",
      ],
    },
    {
      domain: "relationships",
      significations: [
        "husband (for women — pati karaka)",
        "guru and spiritual teacher",
        "advisor and counselor",
        "elder brother (in some traditions)",
      ],
    },
    {
      domain: "health",
      significations: [
        "liver and biliary system",
        "fat tissue (medas dhatu)",
        "weight and body mass",
        "ears and hearing",
        "hips and thighs",
        "growth in childhood",
        "diabetes and glandular issues",
      ],
    },
    {
      domain: "wealth",
      significations: [
        "yellow sapphire (pukhraj)",
        "gold and treasury",
        "savings and long-term wealth",
        "inheritance",
        "philanthropy received",
      ],
    },
    {
      domain: "spirituality",
      significations: [
        "dharma and ethical living",
        "scripture and shastra",
        "ritual worship and yajna",
        "guru-disciple lineage (parampara)",
        "Brihaspati mantra",
      ],
    },
    {
      domain: "family",
      significations: [
        "children (putra karaka)",
        "husband (for women)",
        "expansion of the family lineage",
        "elder advisors of the family",
      ],
    },
  ],
  venus: [
    {
      domain: "career",
      significations: [
        "arts — music, dance, painting",
        "fashion and design",
        "beauty industry and cosmetics",
        "entertainment and film",
        "hospitality and luxury services",
        "jewelry and gems",
        "automobile and vehicle trade",
      ],
    },
    {
      domain: "relationships",
      significations: [
        "wife (for men — kalatra karaka)",
        "romantic and sexual partners",
        "close female friendships",
        "kama — pleasurable companionship",
      ],
    },
    {
      domain: "health",
      significations: [
        "reproductive system and semen (shukra dhatu)",
        "kidneys and bladder",
        "throat and sense of taste",
        "facial beauty and skin radiance",
        "diabetes (sweetness disorders)",
      ],
    },
    {
      domain: "wealth",
      significations: [
        "diamond (heera)",
        "silk and fine fabrics",
        "perfumes and cosmetics",
        "vehicles and transport",
        "luxury goods",
      ],
    },
    {
      domain: "spirituality",
      significations: [
        "bhakti through love and beauty",
        "devotion to Mahalakshmi",
        "Shukra mantra",
        "the bhakti-marga of sweetness",
      ],
    },
    {
      domain: "family",
      significations: [
        "wife (for men)",
        "love-marriage and romantic partnership",
        "conjugal happiness (dampatya sukha)",
      ],
    },
  ],
  saturn: [
    {
      domain: "career",
      significations: [
        "labor and manual work",
        "mining, oil, and extractive industries",
        "iron and steel work",
        "agriculture (slow long-term)",
        "masonry and construction",
        "bureaucracy and government service",
        "monastic and ascetic professions",
        "work with the elderly or the marginalized",
      ],
    },
    {
      domain: "relationships",
      significations: [
        "servants and employees",
        "the elderly",
        "the suffering and the marginalized",
        "outcastes and the dispossessed",
      ],
    },
    {
      domain: "health",
      significations: [
        "chronic and long-standing illness",
        "paralysis and degenerative conditions",
        "depression and melancholia",
        "joints, knees, ankles",
        "teeth and bones",
        "nerves and sinews",
        "longevity (ayur karaka)",
        "the aging process",
      ],
    },
    {
      domain: "wealth",
      significations: [
        "blue sapphire (neelam)",
        "iron and lead",
        "oil and petroleum",
        "wealth accumulated slowly through austerity",
      ],
    },
    {
      domain: "spirituality",
      significations: [
        "vairagya — detachment",
        "asceticism (sannyasa)",
        "yama-niyama discipline",
        "yoga of restraint",
        "worship of Lord Shani",
      ],
    },
    {
      domain: "family",
      significations: [
        "elderly parents and their care",
        "ancestors in their suffering aspect (pitris)",
        "servants and dependents of the household",
      ],
    },
  ],
  rahu: [
    {
      domain: "career",
      significations: [
        "foreign work and overseas assignments",
        "technology and electronics",
        "photography, film, smoke",
        "aviation and aerospace",
        "drugs and pharmaceuticals",
        "espionage and intelligence work",
        "anomalous and unconventional fields",
      ],
    },
    {
      domain: "relationships",
      significations: [
        "foreigners and outsiders",
        "the marginal and unconventional",
        "illicit or hidden partners",
        "paternal grandfather (in many sources)",
      ],
    },
    {
      domain: "health",
      significations: [
        "poisoning and toxicity",
        "mysterious and undiagnosed illness",
        "skin disease",
        "intoxication and addiction",
        "mental confusion and hallucination",
      ],
    },
    {
      domain: "wealth",
      significations: [
        "hessonite garnet (gomedh)",
        "foreign exchange and overseas income",
        "sudden and unexpected wealth",
        "lottery and speculative gain",
      ],
    },
    {
      domain: "spirituality",
      significations: [
        "tantra and esoteric paths",
        "intense, obsessive sadhana",
        "Durga upasana",
        "breakthrough through crisis",
      ],
    },
    {
      domain: "family",
      significations: [
        "paternal grandfather",
        "foreign in-laws",
        "step-relations and unconventional kin",
      ],
    },
  ],
  ketu: [
    {
      domain: "career",
      significations: [
        "research and deep investigation",
        "healing, herbal medicine, ayurveda",
        "mathematics and abstract sciences",
        "esoteric arts and divination",
        "spirituality as profession",
        "intelligence and analytical work",
      ],
    },
    {
      domain: "relationships",
      significations: [
        "maternal grandfather (in many sources)",
        "ascetic teachers and renunciants",
        "mysterious or hidden figures",
      ],
    },
    {
      domain: "health",
      significations: [
        "spinal injuries",
        "abdominal and intestinal disorders",
        "blood disorders",
        "sudden surgical events",
        "undiagnosed and karmic illnesses",
      ],
    },
    {
      domain: "wealth",
      significations: [
        "cat's eye (lehsunia)",
        "gains arising from past-life merit (purva-punya)",
        "sudden unexpected gains and losses",
      ],
    },
    {
      domain: "spirituality",
      significations: [
        "moksha — final liberation",
        "jnana and self-inquiry (atma-vichara)",
        "Ganesha worship",
        "Subrahmanya bhakti",
        "the path of the recluse",
      ],
    },
    {
      domain: "family",
      significations: [
        "maternal grandfather",
        "spiritual lineage rather than blood lineage",
        "the renunciant in the family",
      ],
    },
  ],
} as const satisfies Record<PlanetId, readonly Karakatwa[]>;
