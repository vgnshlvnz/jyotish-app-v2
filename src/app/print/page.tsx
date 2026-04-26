import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { NAKSHATRAS, PLANETS, RASHIS, getPlanetById } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Sanskrit } from "@/components/Sanskrit";
import { PrintButton } from "./PrintButton";

/**
 * Single long printable reference. All 9 planets, 12 rashis, 27 nakshatras
 * laid out as compact tables. The @media print rules in globals.css strip
 * the cosmic background and the `.no-print` class hides screen-only chrome.
 */
export default function PrintPage() {
  return (
    <div className="flex flex-col gap-10 print:gap-6 print:text-[10pt]">
      {/* Screen-only header */}
      <header className="no-print flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-light leading-tight md:text-4xl">
            Print reference
            <Sanskrit className="ml-3 text-lg not-italic text-muted-foreground">
              Sandarbha
            </Sanskrit>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Compact tables of all 9 grahas, 12 rashis, and 27 nakshatras.
            Optimized for A4 / Letter.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/glossary">
              <ArrowLeft className="size-3.5" />
              Glossary
            </Link>
          </Button>
          <PrintButton />
        </div>
      </header>

      {/* Print-only title */}
      <div className="hidden print:block print:border-b print:border-black/20 print:pb-2">
        <h1 className="text-2xl font-medium">Jyotish Reference</h1>
        <p className="text-xs italic">
          9 Grahas · 12 Rashis · 27 Nakshatras — based on Brihat Parashara Hora
          Shastra (Santhanam tr.) and other classical sources.
        </p>
      </div>

      {/* PLANETS TABLE */}
      <section className="flex flex-col gap-4 print:break-inside-avoid">
        <h2 className="font-display text-2xl font-light text-foreground print:text-xl print:text-black">
          1 · Planets <Sanskrit className="not-italic text-base text-muted-foreground">Grahas · 9</Sanskrit>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground print:text-black/70">
              <tr className="border-b border-cosmos-line print:border-black/30">
                <Th>Glyph</Th>
                <Th>Sanskrit</Th>
                <Th>English</Th>
                <Th>Tamil</Th>
                <Th>Cabinet</Th>
                <Th>Nature</Th>
                <Th>Element</Th>
                <Th>Guna</Th>
                <Th>Exalt</Th>
                <Th>Debil</Th>
                <Th>Moolatrikona</Th>
                <Th>Own</Th>
              </tr>
            </thead>
            <tbody>
              {PLANETS.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-cosmos-line/50 align-top text-foreground print:border-black/15 print:text-black"
                >
                  <Td>
                    <span className="font-display text-base">{p.glyph}</span>
                  </Td>
                  <Td>
                    <Sanskrit className="not-italic font-medium">
                      {p.sanskritName}
                    </Sanskrit>
                  </Td>
                  <Td>{p.englishName}</Td>
                  <Td>{p.tamilName}</Td>
                  <Td className="capitalize">{p.cabinetRole}</Td>
                  <Td className="capitalize">{p.nature.classification}</Td>
                  <Td className="capitalize">{p.element}</Td>
                  <Td className="capitalize">{p.guna}</Td>
                  <Td>
                    {p.exaltation
                      ? `${p.exaltation.degree}° ${cap(p.exaltation.rashi)}`
                      : "—"}
                  </Td>
                  <Td>
                    {p.debilitation
                      ? `${p.debilitation.degree}° ${cap(p.debilitation.rashi)}`
                      : "—"}
                  </Td>
                  <Td>
                    {p.moolatrikona
                      ? `${cap(p.moolatrikona.rashi)} ${p.moolatrikona.startDegree}–${p.moolatrikona.endDegree}°`
                      : "—"}
                  </Td>
                  <Td>{p.ownSigns.length ? p.ownSigns.map(cap).join(", ") : "—"}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* RASHIS TABLE */}
      <section className="flex flex-col gap-4 print:break-inside-avoid">
        <h2 className="font-display text-2xl font-light text-foreground print:text-xl print:text-black">
          2 · Rashis <Sanskrit className="not-italic text-base text-muted-foreground">Rashayah · 12</Sanskrit>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground print:text-black/70">
              <tr className="border-b border-cosmos-line print:border-black/30">
                <Th>#</Th>
                <Th>Glyph</Th>
                <Th>Sanskrit</Th>
                <Th>English</Th>
                <Th>Tamil</Th>
                <Th>Tamil month</Th>
                <Th>Symbol</Th>
                <Th>Element</Th>
                <Th>Modality</Th>
                <Th>Ruler</Th>
                <Th>Body part</Th>
                <Th>Purushartha</Th>
              </tr>
            </thead>
            <tbody>
              {RASHIS.map((r) => {
                const ruler = getPlanetById(r.ruler);
                return (
                  <tr
                    key={r.id}
                    className="border-b border-cosmos-line/50 align-top text-foreground print:border-black/15 print:text-black"
                  >
                    <Td>{r.number}</Td>
                    <Td>
                      <span className="font-display text-base">{r.glyph}</span>
                    </Td>
                    <Td>
                      <Sanskrit className="not-italic font-medium">
                        {r.sanskritName}
                      </Sanskrit>
                    </Td>
                    <Td>{r.englishName}</Td>
                    <Td>{r.tamilName}</Td>
                    <Td>{r.tamilMonth}</Td>
                    <Td>{r.symbol}</Td>
                    <Td className="capitalize">{r.element}</Td>
                    <Td className="capitalize">{r.modality}</Td>
                    <Td>
                      <Sanskrit className="not-italic">
                        {ruler?.sanskritName ?? r.ruler}
                      </Sanskrit>
                    </Td>
                    <Td>{r.bodyPart}</Td>
                    <Td className="capitalize">{r.purushartha}</Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* NAKSHATRAS TABLE */}
      <section className="flex flex-col gap-4">
        <h2 className="font-display text-2xl font-light text-foreground print:text-xl print:text-black">
          3 · Nakshatras <Sanskrit className="not-italic text-base text-muted-foreground">Nakshatrani · 27</Sanskrit>
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-[11px]">
            <thead className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground print:text-black/70">
              <tr className="border-b border-cosmos-line print:border-black/30">
                <Th>#</Th>
                <Th>Sanskrit</Th>
                <Th>Tamil</Th>
                <Th>Meaning</Th>
                <Th>Span</Th>
                <Th>Lord</Th>
                <Th>Deity</Th>
                <Th>Symbol</Th>
                <Th>Gana</Th>
                <Th>Yoni</Th>
                <Th>Nadi</Th>
                <Th>Dosha</Th>
              </tr>
            </thead>
            <tbody>
              {NAKSHATRAS.map((n) => {
                const lord = getPlanetById(n.lord);
                return (
                  <tr
                    key={n.id}
                    className="border-b border-cosmos-line/50 align-top text-foreground print:border-black/15 print:text-black"
                  >
                    <Td>{n.number}</Td>
                    <Td>
                      <Sanskrit className="not-italic font-medium">
                        {n.sanskritName}
                      </Sanskrit>
                    </Td>
                    <Td>{n.tamilName}</Td>
                    <Td className="italic">{n.englishMeaning}</Td>
                    <Td>{degDM(n.span.startDegree)}–{degDM(n.span.endDegree)}</Td>
                    <Td>
                      <span className="font-display mr-1">{lord?.glyph}</span>
                      <Sanskrit className="not-italic">
                        {lord?.sanskritName ?? n.lord}
                      </Sanskrit>
                    </Td>
                    <Td>{n.deity}</Td>
                    <Td>{n.symbol}</Td>
                    <Td className="capitalize">{n.gana}</Td>
                    <Td>{n.yoni.animal} ({n.yoni.gender.charAt(0)})</Td>
                    <Td className="capitalize">{n.nadi}</Td>
                    <Td className="capitalize">{n.dosha}</Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <footer className="hidden print:block print:border-t print:border-black/20 print:pt-2 text-[9pt] italic text-black/60">
        Sources: Brihat Parashara Hora Shastra (Santhanam tr.); Jaimini Sutras;
        Phaladeepika; Brihat Samhita. Tamil names per traditional Tamil Pañcāṅgam.
      </footer>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="px-2 py-2 text-left font-medium">{children}</th>;
}

function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`px-2 py-2 ${className}`}>{children}</td>;
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function degDM(d: number): string {
  const deg = Math.floor(d);
  const min = Math.round((d - deg) * 60);
  return `${deg}°${String(min).padStart(2, "0")}'`;
}
