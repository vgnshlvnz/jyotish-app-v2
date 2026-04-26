# Design kit — Jyotish Reference

A self-contained snapshot of the visual design language for the **jyotish-app-v2** Vedic-astrology reference web app. Drag this folder into Claude (or another design tool) to iterate on the look without needing the rest of the codebase.

The live design source is in `/src/app/globals.css`, `/src/components/nav/DomainCard.tsx`, and `/src/components/visual/*`. This folder is a **snapshot**; if the live app evolves, re-copy the four `.tsx` files and update `tokens.css`.

---

## Design philosophy: Cosmic Minimalism

A reference, not a forecast. The aesthetic must feel **considered and quiet**, never busy or mystical-cliché. Specifically:

**Forbidden:**
- Purple-pink gradients
- Decorative mandalas / yantras / lotus flourishes
- Excessive glow or neon
- Colored emoji renderings of zodiac glyphs
- Crystal-ball / astrology-app visual tropes

**Required:**
- Dark mode only (no light-mode toggle)
- Generous spacing — never crowded
- Sanskrit and Tamil names treated as **first-class** (display serif, never parenthetical afterthoughts)
- A single soft outline-glow on active items only
- Respects `prefers-reduced-motion`

The first-time user lands on `/` and immediately understands "there are three things here, and I can get to any of them in one click." That's the prime directive.

---

## The 1-2-3 navigation model

```
   ╭─── 1 PLANETS ───╮
   │                 │
2 RASHIS ───── 3 NAKSHATRAS
```

A persistent header with three numbered tiles ("the rail"). Three vertices; from any one, the other two are reachable in one click via the rail OR via every detail page's "Connections" tab. The number — `1` / `2` / `3` — is the dominant typographic element of each tile.

The rail collapses to a compact horizontal bar after 200 px of scroll, and is replaced by a sticky bottom bar on mobile.

---

## Palette

See `tokens.css` for the full CSS-variable definitions. Summary:

| Token              | Hex / HSL           | Use                                          |
|--------------------|---------------------|----------------------------------------------|
| `--background`     | `#0A0612` (265 47% 5%) | Deep midnight base                       |
| `--cosmos-indigo`  | `#7C6FE8`           | Primary accent — active states, links        |
| `--cosmos-gold`    | `#E8B96F`           | Benefic cues — exaltation, Jupiter, Venus    |
| `--cosmos-rose`    | `#E86F9C`           | Malefic cues — debilitation, Saturn, Rahu    |
| `--cosmos-surface` | `rgba(255,255,255,0.03)` | Glass card surface                       |
| `--cosmos-line`    | `rgba(255,255,255,0.08)` | Hairline borders                         |

The two-radial body gradient (in `tokens.css` `body { … }`) provides extremely subtle depth without any imagery. Never replace with a starfield, mandala, or photographic background.

---

## Typography

Two faces only:

- **Inter** — UI sans-serif, for labels, body text, badges, navigation
- **Cormorant Garamond** (light weight, italic for emphasis) — display serif, for Sanskrit names, large numerals (`1` `2` `3`), page titles

Sanskrit and Tamil terms are wrapped in `<Sanskrit>{…}</Sanskrit>`, which adds `lang="sa-Latn"` and the display serif. The wrapper renders italic by default; set `className="not-italic"` to display upright (which we do for proper-noun usage like names).

Type scale (used in detail-page `<h1>`):
- `text-5xl` (3 rem) on mobile → `text-6xl` (3.75 rem) on `md`+
- Light weight (`font-light` / 300)
- Tight leading (`leading-[1.05]`)

The big tile numbers use `text-6xl font-light tabular-nums` in Cormorant — it's the visual anchor of the rail.

---

## Motion language

| Speed     | Duration | Easing                          | Use                            |
|-----------|----------|---------------------------------|--------------------------------|
| Hover     | 200ms    | `ease-out`                      | Card lift, color hint          |
| Tab swap  | 400ms    | `cubic-bezier(0.22, 1, 0.36, 1)` | Detail-page tab transitions   |
| Rail collapse | 300ms | `cubic-bezier(0.22, 1, 0.36, 1)` | Sticky compact mode trigger |

`prefers-reduced-motion: reduce` collapses every animation to ~0 ms.

---

## Components in this folder

`components/DomainCard.tsx` — **the rail tile.** Renders one of the three numbered tiles. Two layouts: full (default) and `compact={true}` (post-scroll). The full layout has the giant number on the left, name + subtitle stacked top-right, and the glyph row at the bottom-right. This is the most identity-defining component.

`components/NakshatraSymbol.tsx` — **27 unified geometric SVGs**, one per nakshatra. Strict vocabulary: 64×64 viewBox, `currentColor` stroke, 1.5 stroke-width, round caps/joins, primitives limited to circle / line / path / polyline / rect, ≤ 6 primitives per symbol (Shatabhisha needs 8 — the "100 stars" essence requires it). Goal: all 27 read as a typographic family, not 27 amateur illustrations.

`components/ZodiacDial.tsx` — **360° circular dial** divided into 12 rashi sectors. Renders sector tints (for "highlight this rashi"), arc strokes (for moolatrikona spans), and point markers (for exaltation / debilitation degrees). Used on the planet detail page's Strengths tab.

`components/KalapurushaFigure.tsx` — **stylized human silhouette** with 12 body regions (Mesha → Meena, head → feet). One region can be `highlight`-ed; renders in indigo with a soft glow. Used on the rashi and nakshatra detail pages to show body-part correspondence.

---

## Known visual pain points / design questions worth Claude's input

1. **The 27 nakshatra symbols** — do they read as a coherent family at small sizes? A few (Hasta, Anuradha, Ashlesha) approached abstract within the 6-primitive constraint. Worth a critical eye on whether they hold up next to each other on `/nakshatras`.

2. **The rail tile compactness** was iterated once — original tiles were 280px tall and felt hollow; current version is ~115px with the number on the left and content on the right. Does it still feel "1-2-3 dominant" or has the number lost prominence?

3. **The compact-rail transition** (after 200 px scroll) is functional but the visual feel of the morph hasn't been heavily tuned. Could be more graceful.

4. **The `KalapurushaFigure`** is intentionally simple — a stylized silhouette built from circles and Q-curves. It's recognizably a body but could be more refined. Open to a more elegant figure as long as it stays line-art (no fill, no shading).

5. **Print view** at `/print` works but is utilitarian. If a more elegant print stylesheet would help (typography, classical column layout, page breaks), worth a pass.

---

## How to use this folder with Claude

1. **Upload the whole `design/` folder** to a Claude conversation.
2. Tell Claude what you want to iterate on (e.g. "improve the nakshatra symbol family" or "propose a more refined Kalapurusha figure").
3. Ask for **TSX with the same imports and props as the existing component** so you can drop the file directly back into `/src/components/visual/`.
4. Iterate, then copy the updated TSX into the live app and re-screenshot.

The four `.tsx` files in `components/` use these imports from the live app:
- `import { cn } from "@/lib/utils"` — `tailwind-merge + clsx` helper
- `import type { NakshatraId } from "@/lib/data/types"` — literal-union of 27 slugs
- `import { RASHIS } from "@/lib/data"` — used by ZodiacDial for sector geometry

If iterating standalone (without the data layer), stub these imports.

---

## Sources for the data this design serves

The visuals exist to surface: 9 grahas (planets), 12 rashis (signs), 27 nakshatras (lunar mansions). The classical attributes — gana, yoni, shakti, deity, body part, etc. — drive the visual choices. When in doubt, the design should **defer to the depth of the classical material** rather than inventing modern flourishes.
