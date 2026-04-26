# Screenshots

Drop current-state screenshots here so Claude (or another design tool) can see what landed. Suggested set:

- `landing.png` — `/` (the 1-2-3 rail in its full form + intro)
- `planets-index.png` — `/planets` (9-card grid + filter chips)
- `planet-detail.png` — `/planets/sun` (header + tabs + ZodiacDial on Strengths tab)
- `rashi-detail.png` — `/rashis/mesha` (header + KalapurushaFigure on Kalapurusha tab)
- `nakshatra-detail.png` — `/nakshatras/ashwini` (header with NakshatraSymbol + tabs)
- `nakshatras-index.png` — `/nakshatras` (27 cards in three dasha-cycle sections)
- `compact-rail.png` — any page scrolled past 200 px (rail in collapsed mode)
- `command-palette.png` — `Cmd+K` palette open over a detail page

## Capturing

```bash
# From the repo root, with the dev server already running:
google-chrome --headless --no-sandbox --hide-scrollbars \
  --window-size=1400,1000 \
  --screenshot=design/screenshots/landing.png \
  http://localhost:3000/
```

Repeat with each route. The `--window-size=1400,1000` matches the desktop breakpoint we designed against.
