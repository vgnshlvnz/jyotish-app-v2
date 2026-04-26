import { GlyphRow } from "@/components/GlyphRow";
import { NakshatraSymbol } from "@/components/visual/NakshatraSymbol";
import { DOMAINS, type DomainId } from "@/lib/domain";
import { NAKSHATRAS } from "@/lib/data";

/**
 * Per-domain glyph row rendered inside DomainCard.
 *
 * Planets and rashis use Unicode glyphs (forced to text presentation by
 * GlyphRow's variation-selector trick). Nakshatras have no Unicode
 * representation, so we render the first six geometric symbols from the
 * `NakshatraSymbol` family — visually consistent with how the other two
 * tiles preview their domain.
 */
export function DomainGlyphs({ id, size = "md" }: { id: DomainId; size?: "sm" | "md" }) {
  const meta = DOMAINS.find((d) => d.id === id);
  if (!meta) return null;

  if (id === "nakshatras") {
    const ids = NAKSHATRAS.slice(0, 6).map((n) => n.id);
    return (
      <div
        aria-hidden
        className={size === "sm" ? "flex items-center gap-2" : "flex items-center gap-3"}
      >
        {ids.map((nakId) => (
          <NakshatraSymbol key={nakId} id={nakId} size={size === "sm" ? "sm" : "md"} />
        ))}
      </div>
    );
  }

  return <GlyphRow glyphs={meta.glyphs} size={size} />;
}
