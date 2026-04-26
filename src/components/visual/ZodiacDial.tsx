import { RASHIS } from "@/lib/data";
import { cn } from "@/lib/utils";

interface DegreeMarker {
  degree: number;
  /** Visible label rendered alongside the marker. */
  label?: string;
  /** Color tone — gold = beneficial (exaltation), rose = afflicted (debilitation), indigo = own sign / moolatrikona. */
  tone: "gold" | "rose" | "indigo" | "muted";
  /** Optional second degree to draw an arc instead of a point (e.g. moolatrikona span). */
  toDegree?: number;
}

interface ZodiacDialProps {
  /** Degree markers to render on the dial. */
  markers?: readonly DegreeMarker[];
  /** Highlight specific rashis with a soft sector tint. */
  highlightedRashis?: readonly { rashi: string; tone: DegreeMarker["tone"] }[];
  size?: number;
  className?: string;
}

const TONE_FILL: Record<DegreeMarker["tone"], string> = {
  gold: "hsl(var(--cosmos-gold))",
  rose: "hsl(var(--cosmos-rose))",
  indigo: "hsl(var(--cosmos-indigo))",
  muted: "hsl(var(--muted-foreground))",
};

const TONE_FILL_SOFT: Record<DegreeMarker["tone"], string> = {
  gold: "hsl(var(--cosmos-gold) / 0.18)",
  rose: "hsl(var(--cosmos-rose) / 0.18)",
  indigo: "hsl(var(--cosmos-indigo) / 0.16)",
  muted: "hsl(var(--muted-foreground) / 0.12)",
};

/**
 * Circular zodiac dial — 360° divided into 12 rashi sectors with optional
 * degree markers for exaltation / debilitation / moolatrikona spans.
 *
 * Render order: outer ring + 12-sector grid + glyphs at each sector → arc
 * highlights for spans → point markers for individual degrees.
 */
export function ZodiacDial({
  markers = [],
  highlightedRashis = [],
  size = 320,
  className,
}: ZodiacDialProps) {
  const cx = size / 2;
  const cy = size / 2;
  const outerR = size * 0.46;
  const innerR = size * 0.34;
  const glyphR = (outerR + innerR) / 2;
  const arcR = outerR + 6;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={cn("max-w-full", className)}
      role="img"
      aria-label="Zodiac dial"
    >
      {/* Outer + inner rings */}
      <circle
        cx={cx}
        cy={cy}
        r={outerR}
        fill="none"
        stroke="hsl(var(--cosmos-line))"
        strokeWidth={1}
      />
      <circle
        cx={cx}
        cy={cy}
        r={innerR}
        fill="none"
        stroke="hsl(var(--cosmos-line))"
        strokeWidth={1}
      />

      {/* Rashi sector tints (background) */}
      {highlightedRashis.map(({ rashi, tone }) => {
        const r = RASHIS.find((x) => x.id === rashi);
        if (!r) return null;
        return (
          <path
            key={rashi}
            d={describeArc(cx, cy, innerR, outerR, r.span.startDegree, r.span.endDegree)}
            fill={TONE_FILL_SOFT[tone]}
          />
        );
      })}

      {/* Sector dividers (every 30°) */}
      {RASHIS.map((r) => {
        const { x, y } = polarToCartesian(cx, cy, outerR, r.span.startDegree);
        const inner = polarToCartesian(cx, cy, innerR, r.span.startDegree);
        return (
          <line
            key={`div-${r.id}`}
            x1={inner.x}
            y1={inner.y}
            x2={x}
            y2={y}
            stroke="hsl(var(--cosmos-line))"
            strokeWidth={1}
          />
        );
      })}

      {/* Rashi glyphs at sector center */}
      {RASHIS.map((r) => {
        const mid = (r.span.startDegree + r.span.endDegree) / 2;
        const { x, y } = polarToCartesian(cx, cy, glyphR, mid);
        return (
          <text
            key={`glyph-${r.id}`}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            fill="hsl(var(--foreground) / 0.9)"
            fontSize={size * 0.05}
            style={{ fontFamily: "var(--font-cormorant), serif" }}
          >
            {r.glyph}
          </text>
        );
      })}

      {/* Arc-style markers (degree-spans like moolatrikona) */}
      {markers
        .filter((m) => m.toDegree !== undefined)
        .map((m, i) => (
          <path
            key={`arc-${i}-${m.degree}`}
            d={describeArcStroke(cx, cy, arcR, m.degree, m.toDegree as number)}
            fill="none"
            stroke={TONE_FILL[m.tone]}
            strokeWidth={3}
            strokeLinecap="round"
            opacity={0.85}
          />
        ))}

      {/* Point markers (single degrees) */}
      {markers
        .filter((m) => m.toDegree === undefined)
        .map((m, i) => {
          const p = polarToCartesian(cx, cy, arcR, m.degree);
          const labelP = polarToCartesian(cx, cy, arcR + 16, m.degree);
          return (
            <g key={`point-${i}-${m.degree}`}>
              <circle
                cx={p.x}
                cy={p.y}
                r={5}
                fill={TONE_FILL[m.tone]}
                stroke="hsl(var(--background))"
                strokeWidth={2}
              />
              {m.label ? (
                <text
                  x={labelP.x}
                  y={labelP.y}
                  textAnchor={textAnchorForDegree(m.degree)}
                  dominantBaseline="central"
                  fill={TONE_FILL[m.tone]}
                  fontSize={size * 0.038}
                  style={{ fontFamily: "var(--font-inter), sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" }}
                >
                  {m.label}
                </text>
              ) : null}
            </g>
          );
        })}

      {/* Center dot */}
      <circle cx={cx} cy={cy} r={1.5} fill="hsl(var(--foreground) / 0.4)" />
    </svg>
  );
}

// Convert sidereal degree (0° at Mesha = top of dial, going clockwise) to
// SVG cartesian. SVG 0° is at the +x axis going clockwise, so we rotate -90°
// and flip handedness.
function polarToCartesian(cx: number, cy: number, r: number, degree: number) {
  // Place 0° (start of Mesha) at the top, then sweep clockwise.
  const rad = ((degree - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startDeg: number,
  endDeg: number,
): string {
  const startOuter = polarToCartesian(cx, cy, outerR, startDeg);
  const endOuter = polarToCartesian(cx, cy, outerR, endDeg);
  const startInner = polarToCartesian(cx, cy, innerR, endDeg);
  const endInner = polarToCartesian(cx, cy, innerR, startDeg);
  const largeArc = endDeg - startDeg <= 180 ? 0 : 1;
  return [
    `M ${startOuter.x} ${startOuter.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${endOuter.x} ${endOuter.y}`,
    `L ${startInner.x} ${startInner.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${endInner.x} ${endInner.y}`,
    "Z",
  ].join(" ");
}

function describeArcStroke(
  cx: number,
  cy: number,
  r: number,
  startDeg: number,
  endDeg: number,
): string {
  const start = polarToCartesian(cx, cy, r, startDeg);
  const end = polarToCartesian(cx, cy, r, endDeg);
  const largeArc = endDeg - startDeg <= 180 ? 0 : 1;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

function textAnchorForDegree(deg: number): "start" | "middle" | "end" {
  // Right side: deg in (0, 180) excluding poles → "start"; left side → "end"
  const normalized = ((deg % 360) + 360) % 360;
  if (normalized < 10 || normalized > 350) return "middle";
  if (normalized > 170 && normalized < 190) return "middle";
  return normalized < 180 ? "start" : "end";
}
