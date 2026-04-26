import { notFound } from "next/navigation";

import { Sanskrit } from "@/components/Sanskrit";
import { Badge } from "@/components/ui/badge";
import { DetailHeader } from "@/components/detail/DetailHeader";
import {
  DetailRows,
  DetailSection,
  DetailTabs,
  type DetailTab,
} from "@/components/detail/DetailTabs";
import {
  ConnectionLinks,
  type ConnectionItem,
} from "@/components/detail/ConnectionLinks";
import {
  KalapurushaFigure,
  regionFromBodyPart,
} from "@/components/visual/KalapurushaFigure";
import {
  NAKSHATRAS,
  PLANETS,
  RASHIS,
  getPlanetById,
  getRashiById,
} from "@/lib/data";
import type {
  AscensionDuration,
  Dosha,
  Fertility,
  Modality,
  Parity,
  Planet,
  Purushartha,
  Rashi,
  RashiId,
  RisingMode,
  TimeOfStrength,
} from "@/lib/data";

// PLANETS is a deeply-typed `as const satisfies readonly Planet[]`, which
// narrows e.g. `ownSigns` to `readonly []` for the nodes — making the
// `.includes(rashiId)` arity checks fail. Iterating through the widened
// view restores `readonly RashiId[]` and friends.
const PLANETS_WIDE: readonly Planet[] = PLANETS;

interface RashiDetailPageProps {
  params: Promise<{ id: string }>;
}

const ELEMENT_LABEL: Record<Rashi["element"], string> = {
  fire: "Fire",
  earth: "Earth",
  air: "Air",
  water: "Water",
  ether: "Ether",
};

const MODALITY_LABEL: Record<Modality, string> = {
  chara: "Chara (movable)",
  sthira: "Sthira (fixed)",
  dwiswabhava: "Dwiswabhava (dual)",
};

const PURUSHARTHA_LABEL: Record<Purushartha, string> = {
  dharma: "Dharma",
  artha: "Artha",
  kama: "Kama",
  moksha: "Moksha",
};

const PARITY_LABEL: Record<Parity, string> = {
  odd: "Odd (visham)",
  even: "Even (sama)",
};

const REGION_LABEL: Record<Rashi["bodyRegion"], string> = {
  upper: "Upper body",
  middle: "Middle body",
  lower: "Lower body",
};

const RISING_LABEL: Record<RisingMode, string> = {
  prishtodaya: "Prishtodaya (back-rising / weak)",
  shirshodaya: "Shirshodaya (head-rising / strong)",
  ubhayodaya: "Ubhayodaya (both / intermediate)",
};

const ASCENSION_NOTE: Record<AscensionDuration, string> = {
  shortest: "Shortest — fastest ascension",
  short: "Short",
  medium: "Medium",
  long: "Long",
  longest: "Longest — slowest ascension",
};

const FERTILITY_LABEL: Record<Fertility, string> = {
  fruitful: "Fruitful",
  barren: "Barren",
  "semi-fruitful": "Semi-fruitful",
  neutral: "Neutral",
};

const DOSHA_LABEL: Record<Dosha, string> = {
  vata: "Vata",
  pitta: "Pitta",
  kapha: "Kapha",
  "vata-pitta": "Vata–Pitta",
  "pitta-kapha": "Pitta–Kapha",
  "vata-kapha": "Vata–Kapha",
  tridosha: "Tridosha",
};

const TIME_LABEL: Record<TimeOfStrength, string> = {
  sunrise: "Sunrise",
  midday: "Midday",
  sunset: "Sunset",
  midnight: "Midnight",
};

function capitalize(s: string): string {
  return s.length === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1);
}

function formatDegree(d: number): string {
  // The data uses integer degrees for rashi spans / dignity points and
  // fractional 13°20'-style values only for nakshatras, but format defensively.
  if (Number.isInteger(d)) return `${d}°`;
  return `${d.toFixed(2).replace(/\.?0+$/, "")}°`;
}

export function generateStaticParams() {
  return RASHIS.map((r) => ({ id: r.id }));
}

export default async function RashiDetailPage({ params }: RashiDetailPageProps) {
  const { id } = await params;
  const index = RASHIS.findIndex((r) => r.id === id);
  if (index === -1) notFound();
  // Round-trip through `getRashiById` to get the widened `Rashi` shape
  // (the literal-typed `RASHIS[index]` element loses optional fields like
  // `coRuler` and `notes` for entries that don't define them).
  const rashi: Rashi = getRashiById(RASHIS[index]!.id)!;

  const prev: Rashi | null =
    index > 0 ? getRashiById(RASHIS[index - 1]!.id) ?? null : null;
  const next: Rashi | null =
    index < RASHIS.length - 1
      ? getRashiById(RASHIS[index + 1]!.id) ?? null
      : null;

  const ruler = getPlanetById(rashi.ruler);
  const coRuler = rashi.coRuler ? getPlanetById(rashi.coRuler) : undefined;
  const region = regionFromBodyPart(rashi.bodyPart);

  // ── Quick stats ──────────────────────────────────────────────────────────
  const quickStats = [
    { label: "Element", value: ELEMENT_LABEL[rashi.element] },
    {
      label: "Modality",
      sanskritLabel: rashi.modality,
      value: capitalize(rashi.modality),
    },
    {
      label: "Ruler",
      value: ruler ? (
        <span className="inline-flex items-baseline gap-1.5">
          <span aria-hidden className="font-display text-base text-foreground/80">
            {ruler.glyph}
          </span>
          <Sanskrit className="not-italic">{ruler.sanskritName}</Sanskrit>
        </span>
      ) : (
        rashi.ruler
      ),
    },
    {
      label: "Body region",
      value: REGION_LABEL[rashi.bodyRegion],
    },
    {
      label: "Purushartha",
      value: PURUSHARTHA_LABEL[rashi.purushartha],
    },
    {
      label: "Tamil month",
      value: rashi.tamilMonth,
    },
  ] as const;

  // ── Tab 1 · Identity ─────────────────────────────────────────────────────
  const identityRows = [
    { label: "Element", value: ELEMENT_LABEL[rashi.element] },
    {
      label: "Modality",
      sanskritLabel: rashi.modality,
      value: MODALITY_LABEL[rashi.modality],
    },
    { label: "Gender", value: capitalize(rashi.gender) },
    { label: "Parity", value: PARITY_LABEL[rashi.parity] },
    { label: "Varna", value: capitalize(rashi.varna) },
    { label: "Direction", value: capitalize(rashi.direction) },
    { label: "Purushartha", value: PURUSHARTHA_LABEL[rashi.purushartha] },
    {
      label: "Ruler",
      sanskritLabel: "Swami",
      value: ruler ? (
        <span className="inline-flex items-baseline gap-1.5">
          <span aria-hidden className="font-display text-foreground/80">
            {ruler.glyph}
          </span>
          <Sanskrit className="not-italic">{ruler.sanskritName}</Sanskrit>
          <span className="text-muted-foreground"> · {ruler.englishName}</span>
        </span>
      ) : (
        rashi.ruler
      ),
    },
  ];

  if (coRuler) {
    identityRows.push({
      label: "Co-ruler",
      sanskritLabel: "Sahasvami",
      value: (
        <span className="flex flex-col gap-0.5">
          <span className="inline-flex items-baseline gap-1.5">
            <span aria-hidden className="font-display text-foreground/80">
              {coRuler.glyph}
            </span>
            <Sanskrit className="not-italic">{coRuler.sanskritName}</Sanskrit>
            <span className="text-muted-foreground">
              {" "}
              · {coRuler.englishName}
            </span>
          </span>
          {rashi.notes ? (
            <span className="text-xs italic text-muted-foreground/85">
              {rashi.notes}
            </span>
          ) : null}
        </span>
      ),
    });
  }

  const identityContent = (
    <DetailSection>
      <DetailRows rows={identityRows} />
    </DetailSection>
  );

  // ── Tab 2 · Kalapurusha ──────────────────────────────────────────────────
  const kalapurushaContent = (
    <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
      <div className="flex justify-center">
        <KalapurushaFigure highlight={region} />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Body part · Anga
          </p>
          <p className="font-display text-2xl font-light text-foreground">
            {capitalize(rashi.bodyPart)}
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Region
          </p>
          <p className="text-base text-foreground">
            {REGION_LABEL[rashi.bodyRegion]}
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            Absolute span
          </p>
          <p className="font-display text-base text-foreground tabular-nums">
            {formatDegree(rashi.span.startDegree)} –{" "}
            {formatDegree(rashi.span.endDegree)}
          </p>
        </div>
        <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
          The twelve rashis form the body of the{" "}
          <Sanskrit className="not-italic">Kālapuruṣa</Sanskrit> — the cosmic
          person whose head is Mesha and whose feet are Meena. Each sign
          governs the part of the human body that falls in the same position
          along that head-to-feet axis, so afflictions to a rashi are read as
          afflictions to its corresponding limb or organ.
        </p>
        {region === null ? (
          <p className="text-xs italic text-muted-foreground/80">
            (No exact figure highlight is available for this body description.)
          </p>
        ) : null}
      </div>
    </div>
  );

  // ── Tab 3 · Nature ───────────────────────────────────────────────────────
  const natureRows = [
    {
      label: "Constitution",
      sanskritLabel: "Dosha",
      value: DOSHA_LABEL[rashi.constitution],
    },
    {
      label: "Fertility",
      value: FERTILITY_LABEL[rashi.fertility],
    },
    {
      label: "Day / Night strength",
      value: capitalize(rashi.dayNight),
    },
    {
      label: "Time of strength",
      value: TIME_LABEL[rashi.timeOfStrength],
    },
  ];

  const natureContent = (
    <div className="flex flex-col gap-10">
      <DetailSection>
        <DetailRows rows={natureRows} />
      </DetailSection>
      <DetailSection title="Functions" sanskritTitle="Karyāṇi">
        <ul className="flex flex-wrap gap-1.5">
          {rashi.functions.map((fn) => (
            <li key={fn}>
              <Badge variant="muted">{fn}</Badge>
            </li>
          ))}
        </ul>
      </DetailSection>
      <DetailSection title="Physique" sanskritTitle="Sharīra">
        <blockquote className="max-w-2xl border-l-2 border-cosmos-line pl-4 text-base italic leading-relaxed text-foreground/85">
          {rashi.physique}
        </blockquote>
      </DetailSection>
    </div>
  );

  // ── Tab 4 · Rising ───────────────────────────────────────────────────────
  const risingRows = [
    {
      label: "Rising mode",
      sanskritLabel: "Udaya",
      value: RISING_LABEL[rashi.risingMode],
    },
    {
      label: "Ascension duration",
      sanskritLabel: "Kāla",
      value: (
        <span className="flex flex-col gap-0.5">
          <span>{capitalize(rashi.ascensionDuration)}</span>
          <span className="text-xs text-muted-foreground">
            {ASCENSION_NOTE[rashi.ascensionDuration]}
          </span>
        </span>
      ),
    },
    {
      label: "Day / Night strength",
      value: capitalize(rashi.dayNight),
    },
    {
      label: "Time of strength",
      value: TIME_LABEL[rashi.timeOfStrength],
    },
  ];

  const risingContent = (
    <div className="flex flex-col gap-8">
      <DetailSection>
        <DetailRows rows={risingRows} />
      </DetailSection>
      <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
        Rising mode (<Sanskrit className="not-italic">udaya</Sanskrit>) and
        ascension duration (<Sanskrit className="not-italic">kāla</Sanskrit>)
        describe how the sign comes over the horizon. Shirshodaya signs are
        classically considered stronger; prishtodaya weaker; ubhayodaya
        intermediate. Absolute durations vary by latitude — these are
        relative.
      </p>
    </div>
  );

  // ── Tab 5 · Material ─────────────────────────────────────────────────────
  const materialContent = (
    <div className="flex flex-col gap-10">
      <DetailSection title="Places" sanskritTitle="Sthāna">
        <ul className="flex flex-wrap gap-1.5">
          {rashi.places.map((place) => (
            <li key={place}>
              <Badge variant="muted">{place}</Badge>
            </li>
          ))}
        </ul>
      </DetailSection>
      <DetailSection title="Colors" sanskritTitle="Varṇa">
        <ul className="flex flex-wrap gap-1.5">
          {rashi.colors.map((c) => (
            <li key={c}>
              <Badge variant="muted">{c}</Badge>
            </li>
          ))}
        </ul>
      </DetailSection>
      <DetailSection title="Significance" sanskritTitle="Mahattva">
        <p className="max-w-2xl text-base leading-relaxed text-foreground/85">
          {rashi.significance}
        </p>
      </DetailSection>
    </div>
  );

  // ── Tab 6 · Connections ──────────────────────────────────────────────────
  const rulerItems: ConnectionItem[] = [];
  if (ruler) {
    rulerItems.push({
      href: `/planets/${ruler.id}`,
      glyph: ruler.glyph,
      sanskritName: ruler.sanskritName,
      englishName: ruler.englishName,
      relation: "Sign lord",
    });
  }
  if (coRuler) {
    rulerItems.push({
      href: `/planets/${coRuler.id}`,
      glyph: coRuler.glyph,
      sanskritName: coRuler.sanskritName,
      englishName: coRuler.englishName,
      relation: "Co-ruler (some traditions)",
    });
  }

  const rashiId: RashiId = rashi.id;
  const dignityItems: ConnectionItem[] = [];
  for (const planet of PLANETS_WIDE) {
    if (planet.exaltation && planet.exaltation.rashi === rashiId) {
      dignityItems.push({
        href: `/planets/${planet.id}`,
        glyph: planet.glyph,
        sanskritName: planet.sanskritName,
        englishName: planet.englishName,
        relation: `Exalted at ${formatDegree(planet.exaltation.degree)}`,
      });
    }
    if (planet.debilitation && planet.debilitation.rashi === rashiId) {
      dignityItems.push({
        href: `/planets/${planet.id}`,
        glyph: planet.glyph,
        sanskritName: planet.sanskritName,
        englishName: planet.englishName,
        relation: `Debilitated at ${formatDegree(planet.debilitation.degree)}`,
      });
    }
    if (planet.moolatrikona && planet.moolatrikona.rashi === rashiId) {
      dignityItems.push({
        href: `/planets/${planet.id}`,
        glyph: planet.glyph,
        sanskritName: planet.sanskritName,
        englishName: planet.englishName,
        relation: `Moolatrikona ${formatDegree(planet.moolatrikona.startDegree)}–${formatDegree(planet.moolatrikona.endDegree)}`,
      });
    }
    if (planet.ownSigns.includes(rashiId)) {
      dignityItems.push({
        href: `/planets/${planet.id}`,
        glyph: planet.glyph,
        sanskritName: planet.sanskritName,
        englishName: planet.englishName,
        relation: "Owns this sign",
      });
    }
  }

  const nakshatraItems: ConnectionItem[] = NAKSHATRAS.filter((n) =>
    n.rashiSpan.includes(rashiId),
  ).map((n) => {
    const entirely = n.rashiSpan.length === 1;
    const item: ConnectionItem = {
      href: `/nakshatras/${n.id}`,
      glyph: (
        <span className="font-display tabular-nums">{n.number}</span>
      ),
      sanskritName: n.sanskritName,
      englishName: n.englishMeaning,
      relation: entirely ? "Falls entirely within" : "Spans this rashi",
      meta: `${formatDegree(n.span.startDegree)} – ${formatDegree(n.span.endDegree)}`,
    };
    return item;
  });

  const connectionsContent = (
    <ConnectionLinks
      groups={[
        {
          domain: "planets",
          heading: "Ruling planet",
          items: rulerItems,
          emptyText: "No ruler recorded.",
        },
        {
          domain: "planets",
          heading: "Planets dignified here",
          items: dignityItems,
          emptyText: "No planets are exalted, debilitated, or own this sign.",
        },
        {
          domain: "nakshatras",
          heading: "Nakshatras within this rashi",
          items: nakshatraItems,
          emptyText: "No nakshatras fall within this rashi.",
        },
      ]}
    />
  );

  const tabs: readonly DetailTab[] = [
    {
      id: "identity",
      label: "Identity",
      sanskritLabel: "Swarupa",
      content: identityContent,
    },
    {
      id: "kalapurusha",
      label: "Kalapurusha",
      sanskritLabel: "Kalapurusha",
      content: kalapurushaContent,
    },
    {
      id: "nature",
      label: "Nature",
      sanskritLabel: "Prakriti",
      content: natureContent,
    },
    {
      id: "rising",
      label: "Rising",
      sanskritLabel: "Udaya",
      content: risingContent,
    },
    {
      id: "material",
      label: "Material",
      sanskritLabel: "Dravya",
      content: materialContent,
    },
    {
      id: "connections",
      label: "Connections",
      sanskritLabel: "Sambandha",
      content: connectionsContent,
    },
  ];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 pt-8 md:pt-12">
      <DetailHeader
        eyebrow={{ number: 2, label: "Rashayah" }}
        glyph={
          <span className="font-display text-7xl leading-none">
            {rashi.glyph}
          </span>
        }
        sanskritName={rashi.sanskritName}
        englishName={rashi.englishName}
        tamilName={rashi.tamilName}
        meaning={`${rashi.symbol} · ${rashi.tamilMonth}`}
        quickStats={quickStats}
        prevHref={prev ? `/rashis/${prev.id}` : null}
        nextHref={next ? `/rashis/${next.id}` : null}
        prevLabel={prev?.sanskritName}
        nextLabel={next?.sanskritName}
      />
      <DetailTabs tabs={tabs} />
    </div>
  );
}
