import { notFound } from "next/navigation";

import { Sanskrit } from "@/components/Sanskrit";
import { Badge } from "@/components/ui/badge";
import { DetailHeader, type QuickStatItem } from "@/components/detail/DetailHeader";
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
import { NakshatraSymbol } from "@/components/visual/NakshatraSymbol";
import { NAKSHATRA_DEVA } from "@/lib/data/devanagari";
import {
  NAKSHATRAS,
  getNakshatraById,
  getPlanetById,
  getRashiById,
} from "@/lib/data";
import type {
  Dosha,
  Gana,
  GandantaPosition,
  Mahabhuta,
  Nadi,
  NakshatraId,
  NakshatraNature,
  NakshatraOrientation,
} from "@/lib/data";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function degreesToDM(d: number): string {
  const deg = Math.floor(d);
  const min = Math.round((d - deg) * 60);
  return `${deg}°${String(min).padStart(2, "0")}'`;
}

function capitalize(s: string): string {
  return s.length === 0 ? s : s[0]!.toUpperCase() + s.slice(1);
}

const NATURE_GLOSS: Record<NakshatraNature, string> = {
  laghu: "Light / swift",
  mridu: "Gentle",
  dhruva: "Fixed / permanent",
  chara: "Movable",
  ugra: "Fierce / severe",
  mishra: "Mixed",
  tikshna: "Sharp / harsh",
};

const ORIENTATION_GLOSS: Record<NakshatraOrientation, string> = {
  "urdhva-mukha": "Upward-facing",
  "adho-mukha": "Downward-facing",
  "tiryan-mukha": "Level",
};

const GANA_GLOSS: Record<Gana, string> = {
  deva: "Divine",
  manushya: "Human",
  rakshasa: "Demonic",
};

const MAHABHUTA_GLOSS: Record<Mahabhuta, string> = {
  prithvi: "Earth",
  apas: "Water",
  tejas: "Fire",
  vayu: "Air",
  akasha: "Ether",
};

const NADI_GLOSS: Record<Nadi, string> = {
  adi: "Adi (vata pulse-stream)",
  madhya: "Madhya (pitta)",
  antya: "Antya (kapha)",
};

const GANDANTA_LABEL: Record<GandantaPosition, string> = {
  start: "start",
  end: "end",
  both: "both",
};

const DEITY_GLOSS: Partial<Record<NakshatraId, string>> = {
  ashwini: "Twin physicians of the gods; healers and swift bringers of dawn.",
  bharani: "Lord of death and dharma; presides over the boundary between worlds.",
  krittika: "The fire god; agent of cooking, transformation, and sacrificial offering.",
  rohini: "The creator; the seat from which all forms unfold.",
  mrigashira: "The moon principle; lord of soma, plants, and gentle delight.",
  ardra: "Storm form of Shiva; the cleansing tear that breaks attachment.",
  punarvasu: "Mother of the gods; the boundless, unbroken sky.",
  pushya: "Guru of the gods; teacher, priest, and giver of spiritual wealth.",
  ashlesha: "The serpent powers — kundalini, hypnosis, and the wisdom that strikes from coil.",
  magha: "The honored ancestors; the ancient lineage from which authority descends.",
  purva_phalguni: "God of fortune, marriage, and the sweet enjoyment of life.",
  uttara_phalguni: "God of contracts and friendship; patron of marriage and patronage.",
  hasta: "The solar craftsman; skill of the hand and the cunning that brings what is sought.",
  chitra: "Vishvakarma the divine architect; pattern-maker of jewels and worlds.",
  swati: "The wind; independent motion, scattering, and the breath of life.",
  vishakha: "Paired deities of fire and lightning; concentrated will and triumphant achievement.",
  anuradha: "God of friendship and contracts of light; cooperative devotion.",
  jyeshtha: "King of the gods; courage in battle and the lonely weight of seniority.",
  mula: "Goddess of dissolution; uprooter who lays bare the foundation.",
  purva_ashadha: "The water deities; invigoration that floods and cleanses.",
  uttara_ashadha: "The collective universal gods; the unanimous, unchallengeable victory.",
  shravana: "The preserver; god of listening, of vow, and of the sacred footstep.",
  dhanishta: "The eight luminous forces of nature; abundance through resonance and rhythm.",
  shatabhisha: "Lord of cosmic waters; veiler and revealer, healer of the hundred.",
  purva_bhadrapada: "One-footed serpent form of Rudra; the ascetic fire that lifts.",
  uttara_bhadrapada: "Serpent of the deep; the kundalini that brings the cosmic rain.",
  revati: "The nourisher; protector of travellers and shepherd of safe passage.",
};

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return NAKSHATRAS.map((n) => ({ id: n.id }));
}

export default async function NakshatraDetailPage({ params }: PageProps) {
  const { id } = await params;
  const n = getNakshatraById(id as NakshatraId);
  if (!n) notFound();

  const index = NAKSHATRAS.findIndex((x) => x.id === n.id);
  const prev = index > 0 ? NAKSHATRAS[index - 1] : undefined;
  const next = index >= 0 && index < NAKSHATRAS.length - 1
    ? NAKSHATRAS[index + 1]
    : undefined;

  const lord = getPlanetById(n.lord);
  const spanLabel = `${degreesToDM(n.span.startDegree)}–${degreesToDM(n.span.endDegree)}`;

  // ───────────────────────────────────────────────────────────────────────────
  // Quick stats
  // ───────────────────────────────────────────────────────────────────────────

  const quickStats: readonly QuickStatItem[] = [
    {
      label: "Lord",
      sanskritLabel: "Svāmī",
      value: lord ? (
        <span className="inline-flex items-center gap-2">
          <span aria-hidden className="text-xl leading-none">
            {lord.glyph}
          </span>
          <Sanskrit className="not-italic">{lord.sanskritName}</Sanskrit>
        </span>
      ) : (
        n.lord
      ),
    },
    {
      label: "Deity",
      sanskritLabel: "Devatā",
      value: <span className="text-base">{n.deity}</span>,
    },
    {
      label: "Gana",
      value: (
        <span>
          {capitalize(n.gana)}
          <span className="ml-1 text-xs text-muted-foreground">
            ({GANA_GLOSS[n.gana]})
          </span>
        </span>
      ),
    },
    {
      label: "Yoni",
      value: (
        <span>
          {capitalize(n.yoni.animal)}
          <span className="ml-1 text-xs text-muted-foreground">
            ({n.yoni.gender})
          </span>
        </span>
      ),
    },
    {
      label: "Nadi",
      value: capitalize(n.nadi),
    },
    {
      label: "Span",
      value: <span className="tabular-nums">{spanLabel}</span>,
    },
  ];

  // ───────────────────────────────────────────────────────────────────────────
  // Tabs
  // ───────────────────────────────────────────────────────────────────────────

  const identityTab: DetailTab = {
    id: "identity",
    label: "Identity",
    sanskritLabel: "Swarupa",
    content: (
      <div className="flex flex-col gap-10 pt-6">
        <DetailSection>
          <DetailRows
            rows={[
              { label: "Number", value: <span className="tabular-nums">{n.number}</span> },
              { label: "English meaning", value: n.englishMeaning },
              {
                label: "Span",
                value: <span className="tabular-nums">{spanLabel}</span>,
              },
              {
                label: "Lord",
                sanskritLabel: "Svāmī",
                value: lord ? (
                  <span className="inline-flex items-center gap-2">
                    <span aria-hidden>{lord.glyph}</span>
                    <Sanskrit className="not-italic">{lord.sanskritName}</Sanskrit>
                    <span className="text-xs text-muted-foreground">
                      (Vimshottari dasha lord)
                    </span>
                  </span>
                ) : (
                  n.lord
                ),
              },
              { label: "Deity", value: n.deity },
              { label: "Symbol", value: n.symbol },
              { label: "Tamil name", value: <Sanskrit className="not-italic">{n.tamilName}</Sanskrit> },
            ]}
          />
        </DetailSection>

        <DetailSection title="Padas" sanskritTitle="Pāda">
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {n.padas.map((pada) => {
              const navamsa = getRashiById(pada.navamsa);
              const rangeLabel = `${degreesToDM(pada.range.startDegree)} – ${degreesToDM(pada.range.endDegree)}`;
              return (
                <li
                  key={pada.number}
                  className="flex flex-col gap-1.5 rounded-lg border border-cosmos-line bg-cosmos-surface p-4"
                >
                  <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    Pada {pada.number}
                  </p>
                  <p className="font-display tabular-nums text-base text-foreground">
                    {rangeLabel}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Navamsa{" "}
                    <Sanskrit className="not-italic text-foreground/85">
                      {navamsa?.sanskritName ?? pada.navamsa}
                    </Sanskrit>
                    {navamsa ? (
                      <span aria-hidden className="ml-1 text-foreground/60">
                        {navamsa.glyph}
                      </span>
                    ) : null}
                  </p>
                </li>
              );
            })}
          </ul>
        </DetailSection>

        {n.gandanta ? (
          <aside className="rounded-lg border border-cosmos-rose/40 bg-cosmos-rose/10 p-4 text-sm text-foreground/90">
            <p className="text-[10px] uppercase tracking-[0.16em] text-rose">
              Gandanta junction · {GANDANTA_LABEL[n.gandanta]}
            </p>
            <p className="mt-1.5 leading-relaxed">
              Gandanta nakshatras sit at the karmically intense water-fire
              boundaries of the zodiac (Revati-Ashwini, Ashlesha-Magha,
              Jyeshtha-Mula). Transits and births at these knots are classically
              flagged as charged passage points between elements.
            </p>
          </aside>
        ) : null}
      </div>
    ),
  };

  const symbolDeityTab: DetailTab = {
    id: "symbol-deity",
    label: "Symbol & Deity",
    sanskritLabel: "Pratika & Devata",
    content: (
      <div className="grid grid-cols-1 gap-10 pt-6 lg:grid-cols-[260px_1fr] lg:items-start">
        <div className="flex items-center justify-center rounded-2xl border border-cosmos-line bg-cosmos-surface p-8">
          <NakshatraSymbol id={n.id} size="lg" />
        </div>

        <div className="flex flex-col gap-10">
          <DetailSection title="Symbol" sanskritTitle="Pratīka">
            <p className="font-display text-2xl font-light text-foreground">
              {n.symbol}
            </p>
          </DetailSection>

          <DetailSection title="Deity" sanskritTitle="Devatā">
            <p className="font-display text-2xl font-light text-foreground">
              {n.deity}
            </p>
            {DEITY_GLOSS[n.id] ? (
              <p className="text-sm leading-relaxed text-muted-foreground">
                {DEITY_GLOSS[n.id]}
              </p>
            ) : null}
          </DetailSection>

          <DetailSection title="Shakti / Power" sanskritTitle="Śakti">
            <p className="font-display italic text-xl font-light text-foreground">
              {n.shakti.name}
            </p>
            {n.shakti.basisAbove ? (
              <p className="text-sm text-muted-foreground">
                <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground/80">
                  Above (basis)
                </span>{" "}
                <span className="text-foreground/85">
                  {n.shakti.basisAbove}
                </span>
              </p>
            ) : null}
            {n.shakti.basisBelow ? (
              <p className="text-sm text-muted-foreground">
                <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground/80">
                  Below (basis)
                </span>{" "}
                <span className="text-foreground/85">
                  {n.shakti.basisBelow}
                </span>
              </p>
            ) : null}
          </DetailSection>
        </div>
      </div>
    ),
  };

  const natureTab: DetailTab = {
    id: "nature",
    label: "Nature",
    sanskritLabel: "Prakriti",
    content: (
      <div className="flex flex-col gap-8 pt-6">
        <DetailRows
          rows={[
            {
              label: "Nature",
              sanskritLabel: "Prakṛti",
              value: (
                <span>
                  {capitalize(n.nature)}
                  <span className="ml-1 text-xs text-muted-foreground">
                    ({NATURE_GLOSS[n.nature]})
                  </span>
                </span>
              ),
            },
            {
              label: "Orientation",
              value: (
                <span>
                  {n.orientation}
                  <span className="ml-1 text-xs text-muted-foreground">
                    ({ORIENTATION_GLOSS[n.orientation]})
                  </span>
                </span>
              ),
            },
            { label: "Guna", value: capitalize(n.guna) },
            {
              label: "Gana",
              value: (
                <span>
                  {capitalize(n.gana)}
                  <span className="ml-1 text-xs text-muted-foreground">
                    ({GANA_GLOSS[n.gana]})
                  </span>
                </span>
              ),
            },
            { label: "Varna", value: capitalize(n.varna) },
            { label: "Purushartha", value: capitalize(n.purushartha) },
            {
              label: "Mahabhuta",
              value: (
                <span>
                  {capitalize(n.mahabhuta)}
                  <span className="ml-1 text-xs text-muted-foreground">
                    ({MAHABHUTA_GLOSS[n.mahabhuta]})
                  </span>
                </span>
              ),
            },
          ]}
        />
        {n.notes ? (
          <p className="text-xs italic leading-relaxed text-muted-foreground">
            {n.notes}
          </p>
        ) : null}
      </div>
    ),
  };

  const livingWorldTab: DetailTab = {
    id: "living-world",
    label: "Living world",
    sanskritLabel: "Loka",
    content: (
      <div className="flex flex-col gap-10 pt-6">
        <DetailSection title="Yoni / Animal" sanskritTitle="Yoni">
          <div className="flex flex-col gap-2 rounded-lg border border-cosmos-line bg-cosmos-surface p-5 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-baseline gap-3">
              <p className="font-display text-3xl font-light text-foreground">
                {capitalize(n.yoni.animal)}
              </p>
              <span
                aria-hidden
                className="inline-flex items-center justify-center rounded-full border border-cosmos-line px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-muted-foreground"
                title={n.yoni.gender}
              >
                {n.yoni.gender === "male" ? "♂ Male" : "♀ Female"}
              </span>
            </div>
            <p className="text-xs italic text-muted-foreground sm:ml-auto sm:max-w-xs sm:text-right">
              Used in marriage compatibility — yoni-koota.
            </p>
          </div>
        </DetailSection>

        <DetailSection title="Tree / Vriksha" sanskritTitle="Vṛkṣa">
          <p className="font-display text-2xl font-light text-foreground">
            {n.tree}
          </p>
        </DetailSection>

        <DetailSection title="Color palette" sanskritTitle="Varṇa">
          <div className="flex flex-wrap items-center gap-1.5">
            {n.colors.map((c) => (
              <Badge key={c} variant="muted">
                {c}
              </Badge>
            ))}
          </div>
        </DetailSection>

        <DetailSection title="Direction" sanskritTitle="Diś">
          <p className="font-display text-2xl font-light text-foreground">
            {capitalize(n.direction)}
          </p>
        </DetailSection>
      </div>
    ),
  };

  const region = regionFromBodyPart(n.bodyPart);

  const bodyHealthTab: DetailTab = {
    id: "body-health",
    label: "Body & Health",
    sanskritLabel: "Sharira & Arogya",
    content: (
      <div className="grid grid-cols-1 gap-10 pt-6 lg:grid-cols-2 lg:items-start">
        <div className="flex justify-center">
          <KalapurushaFigure highlight={region} size={240} />
        </div>

        <div className="flex flex-col gap-10">
          <DetailSection title="Nakshatra Purusha body part" sanskritTitle="Śarīra">
            <p className="font-display text-2xl font-light text-foreground">
              {n.bodyPart}
            </p>
          </DetailSection>

          <DetailSection title="Tridosha" sanskritTitle="Tridoṣa">
            <p className="font-display text-2xl font-light text-foreground">
              {capitalizeDosha(n.dosha)}
            </p>
          </DetailSection>

          <DetailSection title="Nadi" sanskritTitle="Nāḍī">
            <p className="font-display text-2xl font-light text-foreground">
              {NADI_GLOSS[n.nadi]}
            </p>
            <p className="text-sm italic text-muted-foreground">
              Used in marriage compatibility — nadi-koota. Partners ideally have
              different nadis.
            </p>
          </DetailSection>
        </div>
      </div>
    ),
  };

  // ───────────────────────────────────────────────────────────────────────────
  // Connections
  // ───────────────────────────────────────────────────────────────────────────

  const dashaLordItems: ConnectionItem[] = lord
    ? [
        {
          href: `/planets/${lord.id}`,
          glyph: lord.glyph,
          sanskritName: lord.sanskritName,
          englishName: lord.englishName,
          relation: "This nakshatra's dasha lord",
        },
      ]
    : [];

  const otherUnderLord: ConnectionItem[] = NAKSHATRAS.filter(
    (other) => other.lord === n.lord && other.id !== n.id,
  ).map((other) => ({
    href: `/nakshatras/${other.id}`,
    glyph: <span className="tabular-nums text-base">{other.number}</span>,
    sanskritName: other.sanskritName,
    englishName: other.englishMeaning,
    relation: "Same Vimshottari lord",
  }));

  const rashiItems: ConnectionItem[] = n.rashiSpan.flatMap((rid, idx) => {
    const r = getRashiById(rid);
    if (!r) return [];
    const ruler = getPlanetById(r.ruler);
    const isMulti = n.rashiSpan.length > 1;
    const relation = !isMulti
      ? "Parent rashi"
      : idx === 0
        ? "Parent rashi"
        : "Spans into";
    const item: ConnectionItem = {
      href: `/rashis/${r.id}`,
      glyph: r.glyph,
      sanskritName: r.sanskritName,
      englishName: r.englishName,
      relation,
      ...(ruler ? { meta: `ruled by ${ruler.sanskritName}` } : {}),
    };
    return [item];
  });

  const neighbourItems: ConnectionItem[] = [];
  if (prev) {
    neighbourItems.push({
      href: `/nakshatras/${prev.id}`,
      glyph: <span className="tabular-nums text-base">{prev.number}</span>,
      sanskritName: prev.sanskritName,
      englishName: prev.englishMeaning,
      relation: "Previous nakshatra",
    });
  }
  if (next) {
    neighbourItems.push({
      href: `/nakshatras/${next.id}`,
      glyph: <span className="tabular-nums text-base">{next.number}</span>,
      sanskritName: next.sanskritName,
      englishName: next.englishMeaning,
      relation: "Next nakshatra",
    });
  }

  const connectionsTab: DetailTab = {
    id: "connections",
    label: "Connections",
    sanskritLabel: "Sambandha",
    content: (
      <div className="pt-6">
        <ConnectionLinks
          groups={[
            {
              domain: "planets",
              heading: "Vimshottari dasha lord",
              items: dashaLordItems,
              emptyText: "No dasha lord found.",
            },
            {
              domain: "nakshatras",
              heading: "Other nakshatras under this lord",
              items: otherUnderLord,
              emptyText: "No other nakshatras share this lord.",
            },
            {
              domain: "rashis",
              heading: "Falls within",
              items: rashiItems,
              emptyText: "No parent rashi found.",
            },
            {
              domain: "nakshatras",
              heading: "Adjacent in sequence",
              items: neighbourItems,
              emptyText: "No neighbouring nakshatras.",
            },
          ]}
        />
      </div>
    ),
  };

  const tabs: readonly DetailTab[] = [
    identityTab,
    symbolDeityTab,
    natureTab,
    livingWorldTab,
    bodyHealthTab,
    connectionsTab,
  ];

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 pt-8 md:pt-12">
      <DetailHeader
        eyebrow={{ numeral: "III", label: `Nakṣatra · ${String(n.number).padStart(2, "0")} of 27` }}
        glyph={
          <div className="flex items-center justify-center w-full h-full text-turmeric">
            <NakshatraSymbol id={n.id} size={88} />
          </div>
        }
        sanskritName={n.sanskritName}
        deva={NAKSHATRA_DEVA[n.id]}
        englishName={n.englishMeaning}
        tamilName={n.tamilName}
        meaning={`Lunar mansion ${n.number} of 27 · ${spanLabel}`}
        quickStats={quickStats}
        prevHref={prev ? `/nakshatras/${prev.id}` : null}
        nextHref={next ? `/nakshatras/${next.id}` : null}
        prevLabel={prev?.sanskritName}
        nextLabel={next?.sanskritName}
      />
      <DetailTabs tabs={tabs} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Local helpers
// ─────────────────────────────────────────────────────────────────────────────

function capitalizeDosha(d: Dosha): string {
  // hyphenated forms like "vata-pitta" -> "Vata-Pitta"
  return d
    .split("-")
    .map((part) => capitalize(part))
    .join("-");
}
