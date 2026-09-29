# Natal Axis Reader

**Unfold your birth chart.**

A browser-based natal chart explorer that unfolds twelve houses into six opposing axes. Proportional sign spans, planetary positions, interceptions, and distribution make the relationships across a chart easier to see.

## Run locally

Requires Node.js 22.12+ (Node 24 recommended).

```sh
npm install
npm run dev
```

Open the local URL printed by Vite.

```sh
npm test          # deterministic geometry and input validation
npm run build    # TypeScript checks and static production bundle
npm run preview  # serve the production bundle
npm run test:e2e # browser checks (requires Google Chrome installed)
```

## First prototype

- Explore a clearly labeled illustrative chart, or enter your own twelve cusps and planetary positions.
- View six opposing axes, with proportional sign segments and correctly positioned planet markers.
- Expand an axis for precise cusps, sign spans, placements, and static educational context.
- Switch to architecture view for planetary distribution.
- Inspect interceptions, repeated cusp signs, luminaries, concentrations, and optional chart angles.
- Use the responsive interface with keyboard navigation, reduced motion, and light/dark themes.
- Save derived chart positions in this browser using localStorage; clear them with **Clear saved chart**. No accounts or birth details required.

The example is synthetic; it is not a verified chart for a real birth. No AI interpretation, image parsing, or birth-to-chart calculation is included. General symbolic explanations are distinct from calculated structural facts. Omitted bodies are unknown, not assumed absent.

## Calculation conventions

- Longitudes are numbers in `[0, 360)`. Geometry is isolated in `src/geometry/chart.ts`.
- All twelve cusps must be distinct, ordered through the zodiac, and span exactly one revolution. Invalid input is rejected before rendering or loading saved data.
- Houses use **[start cusp, next cusp)** intervals. A planet exactly on a cusp belongs to the house beginning there. No rounding tolerance moves a planet across a cusp.
- Sign segments are calculated from zodiac boundaries, including Pisces → Aries wraparound. Each displayed house uses its own scale; planet positions and sign widths are proportional within it.
- A sign is intercepted only when its entire 30° span falls inside a house and no cusp lies in that sign. Cusp-aligned signs are not interceptions.
- Repeated cusp signs require consecutive cusps, including houses 12 and 1.
- Planet counts include Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, and Pluto. Nodes and Chiron are separate points. A concentration means at least three of these planets in a house, without claiming a stellium or an aspect.
- ASC and MC are optional independent inputs; DSC and IC are their opposites. Angles are not inferred from houses 1 and 10.
- The house-system selector labels supplied cusps; it does not calculate new cusps.
- Positions retain JavaScript numeric precision internally. Display labels round minutes to two decimals without changing the underlying geometry.

## Deploy to GitHub Pages

The Vite build uses relative asset paths, so it works at a repository subpath. The included workflow tests and builds on pushes to `main`, then deploys `dist`. In repository **Settings → Pages**, choose **GitHub Actions** as the source. For manual hosting, publish `dist` after `npm run build`.

Chart data is processed locally and never sent to a service. The interface requests fonts from Google Fonts, with local fallbacks if unavailable. AI, uploads, wheel animation, and other later phases are deferred until the core experience is validated.

The full product specification is in [PROJECT_BIBLE.md](PROJECT_BIBLE.md); the reading framework is in [Natal_Chart_Axis_Reader.md](Natal_Chart_Axis_Reader.md).
