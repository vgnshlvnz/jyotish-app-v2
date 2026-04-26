import { cn } from "@/lib/utils";
import { Sanskrit } from "./Sanskrit";

interface QuickStatProps {
  label: string;
  value: React.ReactNode;
  /** Sanskrit transliteration of the label, shown in small italics below. */
  sanskritLabel?: string;
  className?: string;
}

/**
 * Label-value pair used in the detail-page header strip.
 *
 * Layout: an upper-case eyebrow label, the value beneath it in display serif,
 * and (optionally) the Sanskrit term in italic small print under the label.
 */
export function QuickStat({
  label,
  value,
  sanskritLabel,
  className,
}: QuickStatProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <div className="flex items-baseline gap-2 text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        <span>{label}</span>
        {sanskritLabel ? (
          <Sanskrit className="not-italic text-muted-foreground/70">
            {sanskritLabel}
          </Sanskrit>
        ) : null}
      </div>
      <div className="font-display text-lg leading-tight text-foreground">
        {value}
      </div>
    </div>
  );
}
