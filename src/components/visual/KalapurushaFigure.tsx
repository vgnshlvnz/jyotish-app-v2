import { cn } from "@/lib/utils";

/**
 * Stylized human silhouette divided into the 12 Kalapurusha body regions
 * (Mesha → Meena, head → feet). One region can be "highlighted" — drawn in
 * indigo with a soft glow — while the rest are rendered in muted line art.
 *
 * The rashi mode maps each rashi number (1–12) to a body band. The
 * nakshatra mode is supported via the same `region` prop, since nakshatra
 * Purusha mappings are also body-part strings; the caller chooses which
 * region key to highlight.
 */

export type KalapurushaRegion =
  | "head"
  | "face"
  | "shoulders"
  | "chest"
  | "stomach"
  | "hips"
  | "pelvis"
  | "genitals"
  | "thighs"
  | "knees"
  | "calves"
  | "feet";

interface KalapurushaFigureProps {
  highlight?: KalapurushaRegion | null;
  className?: string;
  /** Total SVG width; the figure scales to this. */
  size?: number;
}

interface RegionDef {
  /** Display label rendered in a small caption. */
  label: string;
  /** Bounding y range as fraction of figure height (0 = top, 1 = bottom). */
  y0: number;
  y1: number;
  /** Rashi (1–12) governing this region. */
  rashiNumber: number;
}

const REGIONS: Record<KalapurushaRegion, RegionDef> = {
  head: { label: "Head · Mesha", y0: 0.0, y1: 0.1, rashiNumber: 1 },
  face: { label: "Face / Neck · Vrishabha", y0: 0.1, y1: 0.16, rashiNumber: 2 },
  shoulders: { label: "Shoulders / Arms · Mithuna", y0: 0.16, y1: 0.27, rashiNumber: 3 },
  chest: { label: "Chest / Heart · Karka", y0: 0.27, y1: 0.38, rashiNumber: 4 },
  stomach: { label: "Stomach · Simha", y0: 0.38, y1: 0.46, rashiNumber: 5 },
  hips: { label: "Hips / Intestines · Kanya", y0: 0.46, y1: 0.55, rashiNumber: 6 },
  pelvis: { label: "Pelvis · Tula", y0: 0.55, y1: 0.62, rashiNumber: 7 },
  genitals: { label: "Genitals · Vrishchika", y0: 0.62, y1: 0.68, rashiNumber: 8 },
  thighs: { label: "Thighs · Dhanu", y0: 0.68, y1: 0.78, rashiNumber: 9 },
  knees: { label: "Knees · Makara", y0: 0.78, y1: 0.84, rashiNumber: 10 },
  calves: { label: "Calves / Ankles · Kumbha", y0: 0.84, y1: 0.93, rashiNumber: 11 },
  feet: { label: "Feet · Meena", y0: 0.93, y1: 1.0, rashiNumber: 12 },
};

const ALL_REGIONS = Object.keys(REGIONS) as KalapurushaRegion[];

export function KalapurushaFigure({
  highlight,
  className,
  size = 280,
}: KalapurushaFigureProps) {
  const w = size;
  const h = size * 1.6;

  return (
    <div className={cn("flex w-full flex-col items-center gap-4", className)}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        width={w}
        height={h}
        className="max-w-full"
        role="img"
        aria-label={
          highlight
            ? `Kalapurusha figure with ${REGIONS[highlight].label} highlighted`
            : "Kalapurusha figure showing the cosmic body and its rashi correspondences"
        }
      >
        {/* Body region bands — drawn behind the silhouette */}
        {ALL_REGIONS.map((id) => {
          const r = REGIONS[id];
          const y = r.y0 * h;
          const height = (r.y1 - r.y0) * h;
          const isOn = highlight === id;
          return (
            <rect
              key={id}
              x={0}
              y={y}
              width={w}
              height={height}
              fill={
                isOn
                  ? "hsl(var(--cosmos-indigo) / 0.18)"
                  : "transparent"
              }
              stroke={isOn ? "hsl(var(--cosmos-indigo) / 0.5)" : "transparent"}
              strokeWidth={1}
            />
          );
        })}

        {/* Silhouette */}
        <g
          fill="none"
          stroke="hsl(var(--foreground) / 0.55)"
          strokeWidth={1.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Head */}
          <circle cx={w / 2} cy={h * 0.06} r={h * 0.05} />
          {/* Neck */}
          <line
            x1={w / 2}
            y1={h * 0.11}
            x2={w / 2}
            y2={h * 0.14}
          />
          {/* Torso outline (chest + stomach + hips, tapering) */}
          <path
            d={`
              M ${w * 0.32} ${h * 0.16}
              Q ${w * 0.30} ${h * 0.32} ${w * 0.34} ${h * 0.46}
              L ${w * 0.36} ${h * 0.56}
              L ${w * 0.40} ${h * 0.62}
              L ${w * 0.60} ${h * 0.62}
              L ${w * 0.64} ${h * 0.56}
              L ${w * 0.66} ${h * 0.46}
              Q ${w * 0.70} ${h * 0.32} ${w * 0.68} ${h * 0.16}
              Z
            `}
          />
          {/* Arms */}
          <path
            d={`M ${w * 0.32} ${h * 0.18} Q ${w * 0.18} ${h * 0.30} ${w * 0.22} ${h * 0.46}`}
          />
          <path
            d={`M ${w * 0.68} ${h * 0.18} Q ${w * 0.82} ${h * 0.30} ${w * 0.78} ${h * 0.46}`}
          />
          {/* Legs */}
          <path
            d={`M ${w * 0.40} ${h * 0.62} L ${w * 0.40} ${h * 0.78} L ${w * 0.42} ${h * 0.92} L ${w * 0.39} ${h * 0.99}`}
          />
          <path
            d={`M ${w * 0.60} ${h * 0.62} L ${w * 0.60} ${h * 0.78} L ${w * 0.58} ${h * 0.92} L ${w * 0.61} ${h * 0.99}`}
          />
        </g>

        {/* Highlight overlay — re-stroke the band's portion of the silhouette */}
        {highlight ? (
          <rect
            x={0}
            y={REGIONS[highlight].y0 * h}
            width={w}
            height={(REGIONS[highlight].y1 - REGIONS[highlight].y0) * h}
            fill="hsl(var(--cosmos-indigo) / 0.12)"
            stroke="hsl(var(--cosmos-indigo) / 0.7)"
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />
        ) : null}
      </svg>

      {highlight ? (
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.18em] text-cosmos-indigo">
            Highlighted region
          </p>
          <p className="mt-1 font-display text-base text-foreground">
            {REGIONS[highlight].label}
          </p>
        </div>
      ) : null}
    </div>
  );
}

/**
 * Helper: try to map a free-text body-part string from the data layer to a
 * canonical KalapurushaRegion. Returns null when no clean match.
 *
 * The data uses strings like "head", "face/neck", "lower abdomen/pelvis",
 * "knees", "calves/ankles" etc. — this fuzzy matcher handles the common
 * variations we see across rashis and nakshatras.
 */
export function regionFromBodyPart(part: string): KalapurushaRegion | null {
  const s = part.toLowerCase();
  if (/(head|brain|skull)/.test(s) && !/forehead/.test(s)) return "head";
  if (/(face|neck|jaw|throat|mouth|chin|lips|teeth|tongue|cheek)/.test(s)) return "face";
  if (/(shoulder|arm|hand|finger|nail|elbow)/.test(s)) return "shoulders";
  if (/(chest|heart|breast|lung|nipple)/.test(s)) return "chest";
  if (/(stomach|liver|navel|abdomen)/.test(s) && !/lower/.test(s)) return "stomach";
  if (/(hip|intestine|side|waist|spine|back)/.test(s)) return "hips";
  if (/(pelvis|kidney|lower abdomen|ribs)/.test(s)) return "pelvis";
  if (/(genital|reproductive|anus|secret)/.test(s)) return "genitals";
  if (/(thigh)/.test(s)) return "thighs";
  if (/(knee|joint)/.test(s)) return "knees";
  if (/(calf|calves|ankle|shin)/.test(s)) return "calves";
  if (/(feet|foot|sole|toe)/.test(s)) return "feet";
  return null;
}
