import Link from "next/link";

import { Sanskrit } from "@/components/Sanskrit";
import { Deva } from "@/components/devanagari-context";
import { BrassRule } from "@/components/temple/BrassRule";
import { Eyebrow, EyebrowDot } from "@/components/temple/Eyebrow";
import { Seal } from "@/components/temple/Seal";
import { Tablet } from "@/components/temple/Tablet";
import { Yantra } from "@/components/visual/Yantra";

interface Pillar {
  numeral: "I" | "II" | "III";
  count: string;
  countDeva: string;
  name: string;
  deva: string;
  sub: string;
  href: string;
  glyph: React.ReactNode;
}

const PILLARS: readonly Pillar[] = [
  {
    numeral: "I",
    count: "9",
    countDeva: "९",
    name: "Grahas",
    deva: "ग्रह",
    sub: "planets",
    href: "/planets",
    glyph: (
      <Yantra spokes={9} frame="lotus" size={120}>
        <circle cx={60} cy={60} r={14} />
        <circle cx={60} cy={60} r={3.5} fill="currentColor" />
      </Yantra>
    ),
  },
  {
    numeral: "II",
    count: "12",
    countDeva: "१२",
    name: "Rāśis",
    deva: "राशि",
    sub: "signs",
    href: "/rashis",
    glyph: (
      <Yantra spokes={12} frame="circle" size={120}>
        <path
          d="M40 60 L80 60 M60 40 L60 80 M44 44 L76 76 M44 76 L76 44"
          opacity={0.7}
        />
        <circle cx={60} cy={60} r={14} />
      </Yantra>
    ),
  },
  {
    numeral: "III",
    count: "27",
    countDeva: "२७",
    name: "Nakṣatras",
    deva: "नक्षत्र",
    sub: "lunar mansions",
    href: "/nakshatras",
    glyph: (
      <Yantra spokes={27} frame="hexagram" size={120}>
        <circle cx={60} cy={60} r={6} fill="currentColor" />
      </Yantra>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 pt-6 md:pt-10">
      {/* Eyebrow */}
      <Eyebrow className="flex items-center justify-center gap-0">
        The Three Pillars
        <EyebrowDot />
        A Reference, Not a Forecast
      </Eyebrow>

      {/* Devanāgarī subtitle */}
      <Deva className="text-2xl tracking-wide text-brass">
        ज्योतिष आरम्भ
      </Deva>

      {/* Hero */}
      <h1 className="font-display max-w-4xl text-center text-4xl font-normal leading-[1.15] text-bone md:text-6xl">
        The classical structure of{" "}
        <em className="not-italic text-brass-hi font-display">
          <Sanskrit className="not-italic">Jyotiṣa</Sanskrit>
        </em>
        ,
        <br className="hidden md:block" />
        <span className="md:inline"> </span>inscribed on three walls.
      </h1>

      <BrassRule className="w-80" />

      {/* Three pillars */}
      <div
        role="tablist"
        aria-label="Choose a domain"
        className="grid w-full grid-cols-1 gap-5 md:grid-cols-3 md:gap-7"
      >
        {PILLARS.map((p) => (
          <Link key={p.name} href={p.href} className="block group">
            <Tablet
              corners
              className="px-6 py-7 transition-transform duration-200 ease-out group-hover:-translate-y-0.5"
            >
              {/* Top row: seal + Devanāgarī count */}
              <div className="flex items-start justify-between mb-5">
                <Seal size="lg">{p.numeral}</Seal>
                <Deva className="text-2xl text-brass leading-none">
                  {p.countDeva}
                </Deva>
              </div>

              {/* Glyph centered */}
              <div className="flex justify-center text-brass-hi my-3">
                {p.glyph}
              </div>

              {/* Name block */}
              <div className="mt-5 text-center">
                <div className="font-display text-3xl text-bone leading-none">
                  <Sanskrit className="not-italic font-display">{p.name}</Sanskrit>
                </div>
                <Deva className="mt-1.5 block text-base text-bone-2">{p.deva}</Deva>
                <div className="mt-2.5 font-titling text-[11px] uppercase tracking-[0.22em] text-bone-3">
                  {p.count} {p.sub}
                </div>
              </div>
            </Tablet>
          </Link>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-6 flex flex-wrap items-center justify-center font-titling text-[10px] uppercase tracking-[0.22em] text-bone-4">
        <span>Sourced from Bṛhat Parāśara Horā Śāstra</span>
        <EyebrowDot className="bg-bone-4" />
        <span>Phaladīpikā</span>
        <EyebrowDot className="bg-bone-4" />
        <span>Tamil Pañcāṅgam</span>
      </div>

      {/* Keyboard hints */}
      <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-bone-3">
        <KeyboardHint keys={["1"]} description="Planets" />
        <KeyboardHint keys={["2"]} description="Rashis" />
        <KeyboardHint keys={["3"]} description="Nakshatras" />
        <KeyboardHint keys={["⌘", "K"]} description="Search" />
        <Link
          href="/glossary"
          className="font-titling text-[10px] uppercase tracking-[0.22em] text-brass underline-offset-4 hover:underline"
        >
          Glossary →
        </Link>
      </div>
    </div>
  );
}

function KeyboardHint({
  keys,
  description,
}: {
  keys: readonly string[];
  description: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="flex items-center gap-0.5">
        {keys.map((k) => (
          <kbd
            key={k}
            className="inline-flex min-w-[1.5rem] items-center justify-center rounded border border-brass/30 bg-ink-2 px-1.5 py-0.5 font-ui font-mono text-[10px] text-bone"
          >
            {k}
          </kbd>
        ))}
      </span>
      <span className="font-titling text-[10px] uppercase tracking-[0.18em]">
        {description}
      </span>
    </span>
  );
}
