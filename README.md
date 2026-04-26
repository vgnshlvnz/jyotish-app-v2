# Jyotish Reference

A static Vedic-astrology reference web app built around the three master datasets — nine **grahas** (planets), twelve **rāśis** (signs), and twenty-seven **nakṣatras** (lunar mansions).

The defining UX is the **1-2-3 rail**: a persistent header navigation that lets users jump between domains in one click. Every detail page closes the triangle through a "Connections" tab — from a planet you can pivot to its rashis and nakshatras, from a rashi you can see its planets and nakshatras, and so on.

## Tech stack

- **Next.js 15** (App Router, TypeScript, RSC by default)
- **Tailwind CSS v3** with a custom cosmic palette (CSS-variable tokens)
- **shadcn/ui-style primitives** (handwritten — Card, Tabs, Sheet, Command, Badge, Tooltip, ScrollArea, Separator, Dialog, Button, Input)
- **Radix UI** primitives under shadcn
- **cmdk** for the command palette
- **Lucide** for iconography
- Pure SVG for the visual components (no canvas, no images)
- No backend — fully static, deployable as a Next.js static export

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run typecheck
```

## Design language

**Cosmic minimalism.** Dark mode only. Deep midnight background (`#0A0612`) with two extremely subtle radial gradients hinting at depth — no decorative imagery. Indigo-violet accent (`#7C6FE8`) for active states; warm gold (`#E8B96F`) for benefic / exaltation cues; muted rose (`#E86F9C`) for malefic / debilitation cues.

Surface cards are translucent glass: `background: rgba(255 255 255 / 0.03)` with a 1px hairline border and `backdrop-filter: blur(20px)`. The `surface-glass` Tailwind class applies this in one place.

Typography: **Inter** for UI, **Cormorant Garamond** (light weight, italic for emphasis) for display and Sanskrit. Sanskrit-origin text is wrapped in `<Sanskrit>{…}</Sanskrit>`, which adds `lang="sa-Latn"` and the display serif.

Motion: 200ms ease-out for hovers, 400ms `cubic-bezier(0.22, 1, 0.36, 1)` for tab transitions. `prefers-reduced-motion` collapses all transitions to ~0ms.

## The navigation model

```
   ╭─── 1 PLANETS ───╮
   │                 │
   │                 │
2 RASHIS ───── 3 NAKSHATRAS
```

Three vertices. From any one, the other two are reachable in **one** of these ways:

1. **The persistent rail** at the top of every page — three numbered tiles, always visible. Clicking the tile jumps to that domain's index. Pressing `1`, `2`, or `3` (when not in an input) does the same.
2. **The Connections tab** at the end of every detail page — a curated list of cross-domain links from the current item. A planet detail links to the rashis it rules / exalts / debilitates and the nakshatras it lords. A rashi links to its ruler and the nakshatras within it. A nakshatra links to its dasha lord and its parent rashi(s).
3. **The command palette** (⌘K or `/`) — searches all three domains plus the glossary in one input.

The rail collapses to a compact horizontal bar after the user scrolls past 200px so it remains present without dominating the page. On mobile (< 768px) the rail is replaced by a sticky bottom bar with three numbered tabs.

## Routes

| Route                      | Purpose                                                |
|----------------------------|--------------------------------------------------------|
| `/`                        | Landing — short intro + (mobile) the 1-2-3 hero        |
| `/planets`                 | Index of 9 grahas with filter chips                    |
| `/planets/[id]`            | Deep dive: 7 tabs (Identity, Body, Material, Strengths, Significations, Lore, Connections) |
| `/rashis`                  | Index of 12 rashis with filter chips                   |
| `/rashis/[id]`             | Deep dive: 6 tabs (Identity, Kalapurusha, Nature, Rising, Material, Connections) |
| `/nakshatras`              | Index of 27 nakshatras grouped by dasha cycle (1, 2, 3) |
| `/nakshatras/[id]`         | Deep dive: 6 tabs (Identity, Symbol & Deity, Nature, Living World, Body & Health, Connections) |
| `/glossary`                | 132 alphabetical Sanskrit/Tamil terms with category filter |
| `/print`                   | A4-optimized reference tables for all 48 entries       |

## Keyboard shortcuts

| Key               | Action                                          |
|-------------------|-------------------------------------------------|
| `1` / `2` / `3`   | Jump to Planets / Rashis / Nakshatras           |
| `⌘K` (or `Ctrl+K`)| Open command palette                            |
| `/`               | Open command palette (alternate)                |
| `←` / `→`         | Previous / Next item on a detail page           |
| `Esc`             | Close any open dialog / sheet                   |

## Component map

```
src/
├── app/
│   ├── layout.tsx              # Root layout: rail, fonts, palette providers
│   ├── page.tsx                # Landing
│   ├── globals.css             # Cosmic palette, fonts, base styles
│   ├── planets/page.tsx        # Index
│   ├── planets/[id]/page.tsx   # Detail
│   ├── rashis/...              # Same shape
│   ├── nakshatras/...          # Same shape
│   ├── glossary/page.tsx
│   └── print/{page,PrintButton}.tsx
│
├── lib/
│   ├── data/                   # The pure-data layer (planets, rashis, nakshatras, etc.)
│   ├── domain.ts               # Three-domain meta (numbers, glyphs, hrefs)
│   └── utils.ts                # cn() helper
│
└── components/
    ├── ui/                     # shadcn primitives (button, card, tabs, sheet, command, …)
    ├── nav/
    │   ├── DomainCard.tsx      # The numbered tile (used in rail and hero)
    │   └── DomainRail.tsx      # Persistent header + mobile bottom bar
    ├── detail/
    │   ├── DetailHeader.tsx    # Glyph + names + quick stats + prev/next chevrons
    │   ├── DetailTabs.tsx      # Tabs wrapper, DetailSection, DetailRows
    │   └── ConnectionLinks.tsx # Cross-domain link grid (used in every Connections tab)
    ├── index/
    │   ├── IndexHeader.tsx     # Big-number page header
    │   ├── FilterChips.tsx     # Generic radiogroup chip row
    │   ├── PlanetCard.tsx
    │   ├── RashiCard.tsx
    │   └── NakshatraCard.tsx
    ├── visual/
    │   ├── ZodiacDial.tsx      # 360° dial with sector tints + degree markers
    │   ├── KalapurushaFigure.tsx # Stylized cosmic-body silhouette
    │   └── NakshatraSymbol.tsx # 27 unified-vocabulary geometric SVGs
    ├── search/
    │   ├── command-palette-context.tsx
    │   └── CommandPalette.tsx  # ⌘K palette over all four datasets
    ├── Sanskrit.tsx            # Display-serif `lang="sa-Latn"` wrapper
    ├── GlyphRow.tsx
    └── QuickStat.tsx
```

## Data layer

The `/src/lib/data/` directory contains the pure-data layer — `PLANETS`, `RASHIS`, `NAKSHATRAS`, `HOUSES`, `KARAKATWAS`, `CHARA_KARAKAS`, `NAISARGIKA`, `TATKALIKA_RULE`, `PANCHADHA_MAITRI`, `BALADI_AVASTHAS`, `JAGRADADI_AVASTHAS`, `DEEPTADI_AVASTHAS`, `SAMBANDHAS`, `GLOSSARY` — plus shared TypeScript types. All exports are immutable, FK-typed, and class-source attributed via JSDoc. See [the data plan](.claude/plans/polished-prancing-bear.md) for details.

## Sources

- Brihat Parashara Hora Shastra (Santhanam translation) — primary
- Jaimini Sutras — for chara karakas
- Phaladeepika (Mantreswara), Saravali, Jataka Parijata — secondary
- Brihat Samhita (Varahamihira) — for nakshatra deities and shaktis
- Traditional Tamil Pañcāṅgam — for Tamil month and nakshatra names

Where classical sources disagree (Rahu/Ketu exaltations, varna assignments, mahabhuta-nakshatra mapping), BPHS is treated as authoritative and alternatives are documented in per-record `notes` fields.
