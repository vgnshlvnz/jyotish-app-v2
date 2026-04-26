import { Sanskrit } from "@/components/Sanskrit";
import { Deva } from "@/components/devanagari-context";
import { Eyebrow } from "@/components/temple/Eyebrow";
import { Seal } from "@/components/temple/Seal";
import { BrassRule } from "@/components/temple/BrassRule";

interface IndexHeaderProps {
  numeral: "I" | "II" | "III" | "IV";
  /** Eyebrow line above the title (e.g. "The Nine Grahas"). */
  eyebrow: string;
  title: string;
  sanskritTitle: string;
  /** Devanāgarī rendering of the title. */
  deva: string;
  count: number;
  description: string;
}

/**
 * Big-serif page header used at the top of each index route. Echoes the
 * prototype's "Navagrahā" / "Rāśayaḥ" / "Nakṣatrāṇi" titling — uppercase
 * eyebrow with vermilion seal + classical-display serif name + Devanāgarī
 * subtitle, with the descriptive blurb right-aligned beside it.
 */
export function IndexHeader({
  numeral,
  eyebrow,
  title,
  sanskritTitle,
  deva,
  count,
  description,
}: IndexHeaderProps) {
  return (
    <header className="flex flex-col gap-5 pb-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-10">
        <div className="flex flex-col gap-3">
          <Eyebrow className="flex items-center gap-3 normal-case">
            <Seal size="sm">{numeral}</Seal>
            <span className="font-titling uppercase tracking-[0.22em] text-brass">
              {eyebrow}
            </span>
          </Eyebrow>
          <h1 className="font-display text-5xl font-normal leading-none text-bone md:text-7xl">
            <Sanskrit className="not-italic font-display">{sanskritTitle}</Sanskrit>
          </h1>
          <Deva className="text-2xl text-brass">{deva}</Deva>
          <p className="font-titling text-[11px] uppercase tracking-[0.2em] text-bone-3">
            {title} · {count}
          </p>
        </div>
        <p className="max-w-md font-display text-base italic leading-relaxed text-bone-2 md:text-right">
          {description}
        </p>
      </div>
      <BrassRule />
    </header>
  );
}
