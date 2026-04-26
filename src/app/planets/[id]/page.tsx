import { notFound } from "next/navigation";

import { Sanskrit } from "@/components/Sanskrit";
import { ConnectionLinks, type ConnectionItem } from "@/components/detail/ConnectionLinks";
import { DetailHeader } from "@/components/detail/DetailHeader";
import {
  DetailRows,
  DetailSection,
  DetailTabs,
  type DetailTab,
} from "@/components/detail/DetailTabs";
import { Badge } from "@/components/ui/badge";
import { ZodiacDial } from "@/components/visual/ZodiacDial";
import {
  KARAKATWAS,
  NAKSHATRAS,
  PLANETS,
  getPlanetById,
  getRashiById,
  type Karakatwa,
  type Planet,
  type PlanetId,
  type RashiId,
} from "@/lib/data";

interface PlanetDetailPageProps {
  params: Promise<{ id: string }>;
}

const CABINET_LABEL: Record<Planet["cabinetRole"], string> = {
  king: "King",
  queen: "Queen",
  commander: "Commander",
  prince: "Prince",
  minister: "Minister",
  advisor: "Advisor",
  shadow: "Shadow",
};

const CABINET_SANSKRIT: Record<Planet["cabinetRole"], string> = {
  king: "raja",
  queen: "rani",
  commander: "senapati",
  prince: "kumara",
  minister: "mantri",
  advisor: "amatya",
  shadow: "chhaya",
};

const KARAKATWA_TITLES: Record<
  Karakatwa["domain"],
  { title: string; sanskrit: string }
> = {
  career: { title: "Career", sanskrit: "Karma" },
  relationships: { title: "Relationships", sanskrit: "Sambandha" },
  health: { title: "Health", sanskrit: "Arogya" },
  wealth: { title: "Wealth", sanskrit: "Dhana" },
  spirituality: { title: "Spirituality", sanskrit: "Adhyatma" },
  family: { title: "Family", sanskrit: "Kutumba" },
};

function capitalize(s: string): string {
  if (!s) return s;
  const first = s.charAt(0);
  return first.toUpperCase() + s.slice(1);
}

function rashiSanskrit(id: RashiId): string {
  return getRashiById(id)?.sanskritName ?? id;
}

function rashiNumber(id: RashiId): number {
  return getRashiById(id)?.number ?? 1;
}

/** Compute absolute zodiac degree (0–360) from a rashi id and degree-in-sign. */
function absoluteDegree(rashi: RashiId, degreeInSign: number): number {
  return (rashiNumber(rashi) - 1) * 30 + degreeInSign;
}

/** Format an exaltation/debilitation as e.g. "10° Mesha". */
function formatDegreeInSign(rashi: RashiId, degree: number): string {
  return `${degree}° ${rashiSanskrit(rashi)}`;
}

export function generateStaticParams() {
  return PLANETS.map((p) => ({ id: p.id }));
}

export default async function PlanetDetailPage({ params }: PlanetDetailPageProps) {
  const { id } = await params;
  const planet = getPlanetById(id as PlanetId);
  if (!planet) {
    notFound();
  }

  const index = PLANETS.findIndex((p) => p.id === planet.id);
  const prev = index > 0 ? PLANETS[index - 1] : null;
  const next = index >= 0 && index < PLANETS.length - 1 ? PLANETS[index + 1] : null;
  const prevHref = prev ? `/planets/${prev.id}` : null;
  const nextHref = next ? `/planets/${next.id}` : null;

  const cabinetLabel = CABINET_LABEL[planet.cabinetRole];
  const cabinetSanskrit = CABINET_SANSKRIT[planet.cabinetRole];

  const tabs: DetailTab[] = [
    {
      id: "identity",
      label: "Identity",
      sanskritLabel: "Swarupa",
      content: <IdentityTab planet={planet} cabinetLabel={cabinetLabel} />,
    },
    {
      id: "body",
      label: "Body",
      sanskritLabel: "Sharira",
      content: <BodyTab planet={planet} />,
    },
    {
      id: "material",
      label: "Material",
      sanskritLabel: "Dravya",
      content: <MaterialTab planet={planet} />,
    },
    {
      id: "strengths",
      label: "Strengths",
      sanskritLabel: "Bala",
      content: <StrengthsTab planet={planet} />,
    },
    {
      id: "significations",
      label: "Significations",
      sanskritLabel: "Karakatwa",
      content: <SignificationsTab planet={planet} />,
    },
    {
      id: "lore",
      label: "Lore",
      sanskritLabel: "Katha",
      content: (
        <LoreTab planet={planet} cabinetLabel={cabinetLabel} cabinetSanskrit={cabinetSanskrit} />
      ),
    },
    {
      id: "connections",
      label: "Connections",
      sanskritLabel: "Sambandha",
      content: <ConnectionsTab planet={planet} />,
    },
  ];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 pt-8 md:pt-12">
      <DetailHeader
        eyebrow={{ number: 1, label: "Grahas" }}
        glyph={
          <span aria-hidden className="font-display text-7xl leading-none">
            {planet.glyph}
          </span>
        }
        sanskritName={planet.sanskritName}
        englishName={planet.englishName}
        tamilName={planet.tamilName}
        meaning={planet.persuasion}
        quickStats={[
          { label: "Cabinet", value: cabinetLabel, sanskritLabel: cabinetSanskrit },
          { label: "Guna", value: capitalize(planet.guna) },
          { label: "Element", value: capitalize(planet.element) },
          { label: "Varna", value: capitalize(planet.varna) },
          { label: "Direction", value: capitalize(planet.direction) },
          { label: "Dosha", value: capitalize(planet.dosha) },
        ]}
        prevHref={prevHref}
        nextHref={nextHref}
        prevLabel={prev?.sanskritName}
        nextLabel={next?.sanskritName}
      />
      <DetailTabs tabs={tabs} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Tab content
// ─────────────────────────────────────────────────────────────────────────────

function IdentityTab({
  planet,
  cabinetLabel,
}: {
  planet: Planet;
  cabinetLabel: string;
}) {
  return (
    <div className="flex flex-col gap-8 pt-6">
      <DetailRows
        rows={[
          { label: "Gender", value: capitalize(planet.gender) },
          { label: "Guna", sanskritLabel: "Guna", value: capitalize(planet.guna) },
          { label: "Element", sanskritLabel: "Bhuta", value: capitalize(planet.element) },
          { label: "Varna", sanskritLabel: "Varna", value: capitalize(planet.varna) },
          { label: "Direction", sanskritLabel: "Disha", value: capitalize(planet.direction) },
          { label: "Age", sanskritLabel: "Vayas", value: capitalize(planet.age) },
          { label: "Deity", sanskritLabel: "Devata", value: planet.deity },
          { label: "Cabinet role", value: cabinetLabel },
          {
            label: "Persuasion",
            sanskritLabel: "Karaka",
            value: planet.persuasion,
          },
        ]}
      />
    </div>
  );
}

function BodyTab({ planet }: { planet: Planet }) {
  return (
    <div className="flex flex-col gap-10 pt-6">
      <DetailRows
        rows={[
          { label: "Dosha", sanskritLabel: "Dosha", value: capitalize(planet.dosha) },
          { label: "Body parts", value: planet.bodyParts.join(", ") },
          { label: "Dhatu", sanskritLabel: "Dhatu", value: capitalize(planet.dhatu) },
          { label: "Sense", sanskritLabel: "Indriya", value: capitalize(planet.sense) },
          { label: "Taste", sanskritLabel: "Rasa", value: planet.taste },
          { label: "Height", value: capitalize(planet.height) },
          { label: "Complexion", value: planet.complexion },
        ]}
      />
      <DetailSection title="Diseases" sanskritTitle="Roga">
        <div className="flex flex-wrap gap-1.5">
          {planet.diseases.map((d) => (
            <Badge key={d} variant="rose">
              {d}
            </Badge>
          ))}
        </div>
      </DetailSection>
    </div>
  );
}

function MaterialTab({ planet }: { planet: Planet }) {
  return (
    <div className="flex flex-col gap-10 pt-6">
      <DetailSection title="Colors" sanskritTitle="Varna">
        <div className="flex flex-wrap gap-1.5">
          {planet.colors.map((c) => (
            <Badge key={c} variant="muted">
              {c}
            </Badge>
          ))}
        </div>
      </DetailSection>

      <DetailRows
        rows={[
          { label: "Clothes", value: planet.clothes },
          { label: "Metal", sanskritLabel: "Loha", value: planet.metal },
          { label: "Gem", sanskritLabel: "Ratna", value: planet.gem },
          { label: "Shape", sanskritLabel: "Akara", value: planet.shape },
          { label: "Season", sanskritLabel: "Ritu", value: capitalize(planet.season) },
        ]}
      />

      <DetailSection title="Flora" sanskritTitle="Vanaspati">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <FloraList label="Flowers" items={planet.flora.flowers} />
          <FloraList label="Grains" items={planet.flora.grains} />
          <FloraList label="Trees" items={planet.flora.trees} />
        </div>
      </DetailSection>
    </div>
  );
}

function FloraList({
  label,
  items,
}: {
  label: string;
  items: readonly string[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </div>
      {items.length > 0 ? (
        <ul className="flex flex-col gap-1 text-sm text-foreground/85">
          {items.map((it) => (
            <li key={it} className="leading-snug">
              {it}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm italic text-muted-foreground">—</p>
      )}
    </div>
  );
}

function StrengthsTab({ planet }: { planet: Planet }) {
  const isNode = planet.id === "rahu" || planet.id === "ketu";

  // Build dial markers from exaltation / debilitation / moolatrikona.
  const markers: {
    degree: number;
    tone: "gold" | "rose" | "indigo" | "muted";
    label?: string;
    toDegree?: number;
  }[] = [];

  if (planet.exaltation) {
    markers.push({
      degree: absoluteDegree(planet.exaltation.rashi, planet.exaltation.degree),
      tone: "gold",
      label: "Exalt",
    });
  }
  if (planet.debilitation) {
    markers.push({
      degree: absoluteDegree(
        planet.debilitation.rashi,
        planet.debilitation.degree,
      ),
      tone: "rose",
      label: "Debil",
    });
  }
  if (planet.moolatrikona) {
    markers.push({
      degree: absoluteDegree(
        planet.moolatrikona.rashi,
        planet.moolatrikona.startDegree,
      ),
      toDegree: absoluteDegree(
        planet.moolatrikona.rashi,
        planet.moolatrikona.endDegree,
      ),
      tone: "indigo",
      label: "Mula",
    });
  }

  const highlightedRashis = planet.ownSigns.map((r) => ({
    rashi: r as string,
    tone: "indigo" as const,
  }));

  return (
    <div className="grid grid-cols-1 gap-8 pt-6 lg:grid-cols-2">
      <div className="flex flex-col items-center gap-4">
        {isNode && markers.length === 0 ? (
          <div className="surface-glass flex aspect-square w-full max-w-sm flex-col items-center justify-center rounded-2xl p-8 text-center">
            <p className="font-display text-xl font-light text-foreground">
              Nodes
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Assignments vary across schools; see notes below.
            </p>
          </div>
        ) : (
          <ZodiacDial markers={markers} highlightedRashis={highlightedRashis} />
        )}
      </div>

      <div className="flex flex-col gap-6">
        <DetailRows
          className="lg:grid-cols-2"
          rows={[
            {
              label: "Exaltation",
              sanskritLabel: "Uccha",
              value: planet.exaltation
                ? formatDegreeInSign(planet.exaltation.rashi, planet.exaltation.degree)
                : "—",
            },
            {
              label: "Debilitation",
              sanskritLabel: "Neecha",
              value: planet.debilitation
                ? formatDegreeInSign(
                    planet.debilitation.rashi,
                    planet.debilitation.degree,
                  )
                : "—",
            },
            {
              label: "Moolatrikona",
              sanskritLabel: "Mulatrikona",
              value: planet.moolatrikona
                ? `${planet.moolatrikona.startDegree}°–${planet.moolatrikona.endDegree}° ${rashiSanskrit(planet.moolatrikona.rashi)}`
                : "—",
            },
            {
              label: "Own signs",
              sanskritLabel: "Swakshetra",
              value:
                planet.ownSigns.length > 0
                  ? planet.ownSigns.map((r) => rashiSanskrit(r)).join(", ")
                  : "—",
            },
            {
              label: "Directional strength",
              sanskritLabel: "Digbala",
              value: planet.directionalStrength
                ? `${ordinal(planet.directionalStrength)} house`
                : "—",
            },
          ]}
        />
        {planet.notes ? (
          <p className="max-w-prose text-sm italic leading-relaxed text-muted-foreground">
            {planet.notes}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function ordinal(n: number): string {
  const j = n % 10;
  const k = n % 100;
  if (j === 1 && k !== 11) return `${n}st`;
  if (j === 2 && k !== 12) return `${n}nd`;
  if (j === 3 && k !== 13) return `${n}rd`;
  return `${n}th`;
}

function SignificationsTab({ planet }: { planet: Planet }) {
  const groups = KARAKATWAS[planet.id];
  return (
    <div className="grid grid-cols-1 gap-8 pt-6 lg:grid-cols-2">
      {groups.map((group) => {
        const meta = KARAKATWA_TITLES[group.domain];
        return (
          <DetailSection
            key={group.domain}
            title={meta.title}
            sanskritTitle={meta.sanskrit}
          >
            <ul className="flex flex-col gap-2">
              {group.significations.map((sig) => (
                <li
                  key={sig}
                  className="flex items-start gap-2 text-sm text-foreground/85"
                >
                  <span
                    aria-hidden
                    className="mt-2 inline-block size-1 shrink-0 rounded-full bg-cosmos-indigo/60"
                  />
                  <span className="leading-relaxed">{sig}</span>
                </li>
              ))}
            </ul>
          </DetailSection>
        );
      })}
    </div>
  );
}

function LoreTab({
  planet,
  cabinetLabel,
  cabinetSanskrit,
}: {
  planet: Planet;
  cabinetLabel: string;
  cabinetSanskrit: string;
}) {
  return (
    <div className="flex max-w-2xl flex-col gap-6 pt-6 text-base leading-relaxed text-foreground/85">
      <p>{planet.description}</p>
      <p className="italic text-muted-foreground">
        In the celestial cabinet, <Sanskrit className="not-italic">{planet.sanskritName}</Sanskrit>{" "}
        is the {cabinetLabel.toLowerCase()} (
        <Sanskrit className="not-italic">{cabinetSanskrit}</Sanskrit>).
      </p>
      <div className="flex flex-col gap-2">
        <h3 className="font-display text-2xl font-light text-foreground">
          Body constitution
          <Sanskrit className="ml-3 text-base not-italic text-muted-foreground">
            Sharira
          </Sanskrit>
        </h3>
        <p>{planet.bodyConstitution}.</p>
      </div>
    </div>
  );
}

function ConnectionsTab({ planet }: { planet: Planet }) {
  // 1. Rashis ruled
  const ruledItems: ConnectionItem[] = planet.ownSigns.flatMap((rid) => {
    const rashi = getRashiById(rid);
    if (!rashi) return [];
    return [
      {
        href: `/rashis/${rashi.id}`,
        glyph: rashi.glyph,
        sanskritName: rashi.sanskritName,
        englishName: rashi.englishName,
        relation: "Owns this sign",
        meta: rashi.tamilMonth,
      },
    ];
  });

  // 2. Exaltation / debilitation
  const exaltDebilItems: ConnectionItem[] = [];
  if (planet.exaltation) {
    const r = getRashiById(planet.exaltation.rashi);
    if (r) {
      exaltDebilItems.push({
        href: `/rashis/${r.id}`,
        glyph: r.glyph,
        sanskritName: r.sanskritName,
        englishName: r.englishName,
        relation: `Exalted at ${planet.exaltation.degree}°`,
      });
    }
  }
  if (planet.debilitation) {
    const r = getRashiById(planet.debilitation.rashi);
    if (r) {
      exaltDebilItems.push({
        href: `/rashis/${r.id}`,
        glyph: r.glyph,
        sanskritName: r.sanskritName,
        englishName: r.englishName,
        relation: `Debilitated at ${planet.debilitation.degree}°`,
      });
    }
  }

  // 3. Nakshatras lorded by this planet
  const nakshatraItems: ConnectionItem[] = NAKSHATRAS.filter(
    (n) => n.lord === planet.id,
  ).map((n) => ({
    href: `/nakshatras/${n.id}`,
    glyph: <span className="font-display text-xl tabular-nums">{n.number}</span>,
    sanskritName: n.sanskritName,
    englishName: n.englishMeaning,
    relation: "Vimshottari dasha lord",
  }));

  return (
    <div className="pt-6">
      <ConnectionLinks
        groups={[
          {
            domain: "rashis",
            heading: "Signs ruled by this planet",
            items: ruledItems,
            emptyText:
              "This planet does not own any rashi in the classical scheme.",
          },
          {
            domain: "rashis",
            heading: "Exaltation & debilitation",
            items: exaltDebilItems,
            emptyText:
              "Exaltation and debilitation assignments vary across schools and are left undefined here.",
          },
          {
            domain: "nakshatras",
            heading: "Nakshatras under this planet's dasha",
            items: nakshatraItems,
            emptyText: "No nakshatras assigned to this dasha lord.",
          },
        ]}
      />
    </div>
  );
}
