import Link from "next/link";

import { DomainHero } from "@/components/nav/DomainRail";
import { Sanskrit } from "@/components/Sanskrit";

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-14 pt-10 md:pt-16">
      {/* Intro */}
      <section className="flex max-w-3xl flex-col gap-5">
        <p className="font-display text-sm uppercase tracking-[0.24em] text-cosmos-indigo">
          A reference, not a forecast
        </p>
        <h1 className="font-display text-4xl font-light leading-[1.1] text-foreground md:text-6xl">
          The classical structure of <Sanskrit className="not-italic font-light">Jyotiṣa</Sanskrit> —
          one click away.
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Three master datasets sit at the heart of Vedic astrology: the nine{" "}
          <Sanskrit className="not-italic">grahas</Sanskrit>, the twelve{" "}
          <Sanskrit className="not-italic">rāśis</Sanskrit>, and the
          twenty-seven <Sanskrit className="not-italic">nakṣatras</Sanskrit>.
          Pick any one to begin — every detail page links back to the others, so
          the navigation closes the triangle no matter where you start.
        </p>
      </section>

      {/* The 1-2-3 hero */}
      <section aria-label="Pick a domain" className="md:hidden">
        <DomainHero active={null} />
      </section>

      {/* Hint footer */}
      <section className="flex flex-col gap-3 border-t border-cosmos-line pt-10 text-sm text-muted-foreground">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <KeyboardHint keys={["1"]} description="Planets" />
          <KeyboardHint keys={["2"]} description="Rashis" />
          <KeyboardHint keys={["3"]} description="Nakshatras" />
          <KeyboardHint keys={["⌘", "K"]} description="Search" />
          <KeyboardHint keys={["/"]} description="Quick search" />
        </div>
        <p className="text-xs text-muted-foreground/80">
          Sources: Brihat Parashara Hora Shastra (Santhanam tr.), Jaimini
          Sutras, Phaladeepika, Brihat Samhita. Tamil names per traditional
          Tamil Pañcāṅgam.{" "}
          <Link
            href="/glossary"
            className="text-cosmos-indigo underline-offset-4 hover:underline"
          >
            Glossary →
          </Link>
        </p>
      </section>
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
            className="inline-flex items-center justify-center min-w-[1.5rem] rounded border border-cosmos-line bg-cosmos-surface px-1.5 py-0.5 font-mono text-[10px] text-foreground"
          >
            {k}
          </kbd>
        ))}
      </span>
      <span className="text-xs text-muted-foreground">{description}</span>
    </span>
  );
}
