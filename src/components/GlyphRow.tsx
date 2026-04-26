import { cn } from "@/lib/utils";

interface GlyphRowProps {
  glyphs: readonly string[];
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Soften unselected glyphs to recede visually. */
  muted?: boolean;
}

const SIZE_CLASS: Record<NonNullable<GlyphRowProps["size"]>, string> = {
  sm: "text-base gap-2",
  md: "text-2xl gap-3",
  lg: "text-3xl gap-4",
};

/**
 * Horizontal row of planet/rashi glyphs (Unicode symbols).
 *
 * Used inside DomainCard and elsewhere as a compact representation of a
 * domain's contents. Glyphs render in the display serif so they look like
 * typography, not emoji.
 */
export function GlyphRow({
  glyphs,
  size = "md",
  className,
  muted = false,
}: GlyphRowProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex items-center font-display leading-none tabular-nums",
        SIZE_CLASS[size],
        muted ? "text-muted-foreground/70" : "text-foreground/85",
        className,
      )}
    >
      {glyphs.map((g, i) => (
        // U+FE0E (Variation Selector-15) forces text presentation on Unicode
        // codepoints that browsers otherwise render as colored system emoji
        // (notably the zodiac glyphs ♈–♓). This keeps the rail monochrome.
        <span key={`${g}-${i}`}>{g + "︎"}</span>
      ))}
    </div>
  );
}
