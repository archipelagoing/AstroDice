# Natal Axis Reader / AstroDice

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

Calculated charts support 1900–2100 and latitudes below 66° north/south. Chiron is unavailable in the astronomy engine and is explicitly omitted; manual entry supports it. Unknown birth time does not produce fabricated houses or a house-axis quiz. Aspect interpretation, automated chart-image reading, and AI synthesis are not implemented. Readings are authored symbolic learning material, not forecasts; editorial review remains a follow-up.

The example is synthetic, not a verified birth chart. It is labeled separately from user calculations.

## Accuracy and privacy

Planet calculations use the MIT-licensed Astronomy Engine. Our house solver is checked against independent Swiss Ephemeris reference outputs for seven dates/locations. See [CALCULATIONS.md](CALCULATIONS.md) for methods, tolerances, dependencies, limits, and reference provenance.

City search sends the place name to Open-Meteo/GeoNames. Birth date/time are processed locally. If you choose to save, this browser retains chart positions, UTC time, timezone, and coordinates; **Clear saved chart** removes them. Draft birth forms are memory-only. Google Fonts supplies interface fonts, with local fallbacks.

## GitHub Pages

The Vite build uses relative asset paths. The included workflow tests/builds on pushes to `main` and deploys `dist`. Set repository **Settings → Pages → Source** to **GitHub Actions**. The workflow is prepared; a live deployment still needs verification. City lookup requires network access, but manual coordinate input and calculations do not require an external chart service.

## Project documents

- [todo.md](todo.md): implementation status and remaining work.
- [PROJECT_BIBLE.md](PROJECT_BIBLE.md): product direction and geometry principles.
- [Natal_Chart_Axis_Reader.md](Natal_Chart_Axis_Reader.md): detailed axis-reading framework.

Astrology is treated as a symbolic interpretive framework, not established scientific causation. Deterministic chart facts and educational interpretations remain separate.
