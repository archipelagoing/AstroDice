# Astro-Dice

**Unfold your birth chart. Learn it one roll at a time.**

Enter your birth date, local birth time, and birthplace to calculate a natal chart. Explore the full wheel and read how each planet's sign and house work together. Then roll a six-sided die to practice remembering your chart through its six opposing house axes.

The original AstroDice idea is an active-recall exercise: a die chooses which part of your own chart to revisit. It does not generate random placements or predict an event.

| Die face | House pair | Theme                       |
| -------- | ---------- | --------------------------- |
| 1        | 1 ↔ 7      | Self ↔ Other                |
| 2        | 2 ↔ 8      | Mine ↔ Ours                 |
| 3        | 3 ↔ 9      | Information ↔ Worldview     |
| 4        | 4 ↔ 10     | Roots ↔ Public life         |
| 5        | 5 ↔ 11     | Creation ↔ Community        |
| 6        | 6 ↔ 12     | Daily systems ↔ Inner world |

**Roll → recall → reveal → understand → roll again.** You can also roll a physical die and select its result in the app.

## Try it locally

Node.js 22.12+ (24 recommended):

```sh
npm install
npm run dev
```

```sh
npm test          # geometry, time conversion, independent reference charts, learning logic
npm run build    # TypeScript and production bundle
npm run preview  # production preview
npm run test:e2e # browser flows; requires Google Chrome installed
```

## What works

- Birth-detail input with city search, historical timezone conversion, and explicit DST ambiguity handling.
- Local calculation of ten planets, mean lunar nodes, twelve cusps, and ASC/DSC/IC/MC.
- Tropical zodiac, with Placidus or Whole Sign houses.
- Interactive wheel, accessible placement list, proportional axes, and architecture view using one chart model.
- House readings distinguishing cusp signs, additional spans, and interceptions.
- Integrated planet–sign–house explanations, examples, and reflection questions.
- A six-sided die with fixed mappings, unbiased rolls, physical-die selection, and concealed answers before reveal.
- Optional local saving, recovery from corrupt saved data, light/dark layouts, keyboard controls, and reduced motion.
- Advanced manual chart entry for existing charts; earlier saved manual charts remain compatible.

## Current limits

Calculated charts support 1900–2100 and latitudes below 66° north/south. Chiron is unavailable in the astronomy engine and is explicitly omitted; manual entry supports it. Unknown birth time does not produce fabricated houses or a house-axis quiz. Aspect interpretation, automated chart-image reading, and AI synthesis are not implemented. Readings are authored symbolic learning material, not forecasts; the first editorial pass is complete, with independent educator review still pending.

The example is synthetic, not a verified birth chart. It is labeled separately from user calculations.

## Accuracy and privacy

Planet calculations use the MIT-licensed Astronomy Engine. Our house solver is checked against independent Swiss Ephemeris reference outputs for seven dates/locations. See [calculation reference](docs/CALCULATIONS.md) for methods, tolerances, dependencies, limits, and reference provenance.

City search sends the place name to Open-Meteo/GeoNames. Birth date/time are processed locally. If you choose to save, this browser retains chart positions, UTC time, timezone, and coordinates; **Clear saved chart** removes them. Draft birth forms are memory-only. Google Fonts supplies interface fonts, with local fallbacks.

## GitHub Pages

The Vite build uses relative asset paths. The included workflow tests/builds on pushes to `main` and deploys `dist`. Set repository **Settings → Pages → Source** to **GitHub Actions**. The live site is [archipelagoing.github.io/AstroDice](https://archipelagoing.github.io/AstroDice/). City lookup requires network access, but manual coordinate input and calculations do not require an external chart service.

## Repository guide

| Location             | Contents                                                                 |
| -------------------- | ------------------------------------------------------------------------ |
| `src/`               | React app, styles, calculation, geometry, interpretation, and dice logic |
| `public/`            | Assets served by Vite, including the dice favicon                        |
| `assets/branding/`   | Original/reference artwork; not automatically shipped to the site        |
| `tests/`             | Unit tests and independent chart fixtures                                |
| `e2e/`               | Playwright browser flows and visual checks                               |
| `docs/`              | Theme guide, product direction, roadmap, and calculation reference       |
| `docs/reference/`    | Detailed axis-reading reference                                          |
| `docs/archive/`      | Historical drafts, retained for context                                  |
| `.github/workflows/` | GitHub Pages build and deployment                                        |

Keep the entry HTML, package manifests, and build/test configuration at the root so standard tooling works without extra path configuration. Generated output (`dist/`, `test-results/`, and `node_modules/`) is ignored.

## Project documents

- [Theme & brand guide](docs/THEMING.md): branding, palettes, typography, symbols, components, motion, and responsive behavior.
- [Project bible](docs/PROJECT_BIBLE.md): product direction and geometry principles.
- [Roadmap](docs/TODO.md): audited Complete, Partial, Pending, Optional, and Superseded requirements, with a legacy phase crosswalk.
- [Interpretation review](docs/INTERPRETATION_REVIEW.md): editorial changes, source limitations, and remaining independent review.
- [Calculation reference](docs/CALCULATIONS.md): methods, accuracy checks, and limits.
- [Axis-reading framework](docs/reference/AXIS_READING.md): reference material for chart interpretation.
- [Archived README draft](docs/archive/README_DRAFT.md): historical product copy, not current setup instructions.

Astrology is treated as a symbolic interpretive framework, not established scientific causation. Deterministic chart facts and educational interpretations remain separate.

## Sabian symbols

Placement readings include a Sabian card for planets, nodes, and house cusps. The card converts the unrounded zodiac position to degrees 1–30 (`floor(degrees within sign) + 1`). Selecting **Read symbol** submits just the sign and zero-based whole degree to [Lynda Hill’s official lookup](https://sabiansymbols.com/list-of-symbols/) and displays its live page in a sandboxed reader. **Open on Sabian Symbols** submits the same lookup in a new tab. No birth date, time, or coordinates are submitted.

This uses the source’s public HTML form, not a copied interpretation database or a proxy. It requires an internet connection and depends on the source continuing to support that form and embedding. The official reader includes the source website’s own navigation and styling.

The sticky Astro-Dice header uses raised dice controls and contracts on scroll, with reduced-motion preferences respected. **Your chart** opens the wheel, **Axis-Dice** opens recall practice, and **Planets through signs** opens a compact side-by-side picker: ten planets by symbol and name on the left, all twelve signs on the right. Choose a planet, then a sign to jump to its reading, or use **Explore all 12 signs** for the complete reference page. The supplied chart’s placement is marked separately. **North / South Node** opens the paired lunar-node readings for the supplied chart, with missing positions labeled explicitly. The six hero dice open dedicated pages for their corresponding house pairs, with links to the other axes and back to practice. Hash-based page links support refresh, browser history, and GitHub Pages hosting.
