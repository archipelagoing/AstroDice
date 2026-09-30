# Astro-Dice — Audited Roadmap

Audited against the code and tests in September 2026. This is the current work list. The [pre-audit checklist](archive/TODO_PRE_AUDIT.md) preserves the original requirements and phase numbers; its checkboxes are historical, not current status.

Related: [README](../README.md) · [Project bible](PROJECT_BIBLE.md) · [Theme guide](THEMING.md) · [Calculation reference](CALCULATIONS.md) · [Interpretation review](INTERPRETATION_REVIEW.md).

## Status rules

| Status         | Meaning                                                                                                                                         |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Complete**   | The stated, bounded capability is implemented, with evidence listed. This does not promise unlimited coverage or external expert certification. |
| **Partial**    | Useful functionality exists, but the specific remaining acceptance work is listed.                                                              |
| **Pending**    | Accepted work with no completed implementation or verification yet.                                                                             |
| **Optional**   | A future enhancement, not an MVP blocker or a commitment to build it next.                                                                      |
| **Superseded** | Replaced by a documented decision; do not implement the old requirement as written.                                                             |

Do not calculate progress by counting historical checkboxes: the old document duplicated core additions, phases, and the MVP checkpoint, and even gave non-goals checkboxes. The earlier 85/100 MVP estimate was a qualitative assessment, not a measured test or line-item completion rate. This roadmap uses acceptance evidence instead.

## Product contract

Birth date + local birth time + birthplace → calculate one chart → explore the wheel and its actual placements → practice six opposing house axes with a die.

Faces 1–6 always map to houses 1/7, 2/8, 3/9, 4/10, 5/11, and 6/12. A roll selects a learning topic; it does not change chart positions. Explore shows explanations immediately. Practice asks the user to recall them before revealing answers. Interpretation remains symbolic and separate from measured positions.

## Calculation and input

Evidence: [calculation code](../src/calculation/), [BirthInput](../src/components/BirthInput.tsx), [types](../src/types.ts), [birth tests](../tests/birth.test.ts), [reference tests](../tests/reference.test.ts).

| ID     | Status   | Requirement and precise limit / next acceptance criterion                                                                                                                                                |
| ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CAL-01 | Complete | Birth date/time/place form; ambiguous city choices; coordinates and IANA timezone; manual location fallback; birth-form draft preserved during navigation.                                               |
| CAL-02 | Complete | Historical local-time conversion, leap dates, UTC rollover, explicit DST ambiguity/nonexistent-time handling.                                                                                            |
| CAL-03 | Complete | Local tropical longitudes for ten planets, mean North/South Nodes, twelve cusps, and independent chart angles. Display engine/settings and unavailable bodies.                                           |
| CAL-04 | Complete | Placidus and Whole Sign calculation, approximate retrograde status, shared chart model, recalculation across all dependent views.                                                                        |
| CAL-05 | Complete | Supported range is 1900–2100 and latitude strictly between 66° S and 66° N. Reject unsupported input rather than silently switching systems.                                                             |
| CAL-06 | Complete | Seven independent reference cases and boundary/timezone tests; provenance and tolerances documented. This is bounded verification, not exhaustive validation.                                            |
| CAL-07 | Partial  | Chiron can be entered and interpreted manually. Remaining: choose a compatible ephemeris, calculate it, and compare independent reference results.                                                       |
| CAL-08 | Complete | Unknown-time option explains the limitation and prevents fabricating a personal chart with houses, angles, or a personal house-axis quiz.                                                                |
| CAL-09 | Pending  | Approximate-time mode: retain uncertainty, identify positions near changing cusps, and qualify readings rather than treating the time as exact.                                                          |
| CAL-10 | Optional | Date-only chart with explicit Moon/other time-sensitive uncertainty and sign-only readings. The current model requires twelve cusps; this route does not exist yet.                                      |
| CAL-11 | Pending  | Broaden reference cases and investigate edge cases before any date/latitude expansion. Extend support only after separate validation.                                                                    |
| CAL-12 | Partial  | Manual entry validates positions and cusp progression, supports optional bodies and editing. Remaining: explicit sample/reset controls and draft retention after leaving the manual editor.              |
| CAL-13 | Partial  | Resolved calculation metadata, editable chart, position lists, and angles are visible. A separate normalized manual-import confirmation step is not implemented; review its usefulness before adding it. |

## Geometry, chart views, and navigation

Evidence: [geometry](../src/geometry/chart.ts), [geometry tests](../tests/geometry.test.ts), [ChartWheel](../src/components/ChartWheel.tsx), [HouseSpan](../src/components/HouseSpan.tsx), [AxisCard](../src/components/AxisCard.tsx), [App](../src/App.tsx).

| ID       | Status     | Requirement and precise limit / next acceptance criterion                                                                                                                                     |
| -------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CHART-01 | Complete   | Normalized longitude, sign/degree/minute conversion, wraparound, proportional house/sign spans, and longitude-based planet assignment. Exact cusp belongs to the house beginning there.       |
| CHART-02 | Complete   | Intercepted-sign detection excludes cusp signs; repeated consecutive cusp signs include the 12/1 boundary; placements remain correct under fixture rotation.                                  |
| CHART-03 | Complete   | Full interactive wheel, signs/glyphs, cusps, planets/points, ASC/DSC/IC/MC, accessible placement lists, and displaced labels linked to exact position markers.                                |
| CHART-04 | Complete   | Six axes, expandable paired-house detail, proportional spans, luminary tags, sign roles, empty-house explanations, and architecture view.                                                     |
| CHART-05 | Complete   | Planet distribution, Sun/Moon axes, independent angle information, and conservative concentration labels. Nodes and Chiron are not counted among the ten planets.                             |
| CHART-06 | Partial    | Interceptions and repeated cusp signs are displayed. Remaining: click through to their houses/axes, pair opposite interceptions explicitly, and add repeated-cusp context within axis detail. |
| CHART-07 | Partial    | Span labels and expanded position details exist. Remaining: keyboard/touch-accessible segment-specific details and explicit segment emphasis for interceptions.                               |
| CHART-08 | Partial    | Whole-chart angles are shown. Remaining: angular flags/relationships in each relevant axis card, especially where Whole Sign angles are not cusps.                                            |
| CHART-09 | Partial    | Shared axis selection works across wheel, axes, and practice. Direct planet selection from the wheel/list works; planet names inside axis detail are not yet individual selection controls.   |
| CHART-10 | Optional   | Broader stress fixtures and label refinements for very crowded charts. Existing label displacement is not a guarantee against every collision.                                                |
| CHART-11 | Superseded | Automatic “stellium” labeling from concentration alone. Use the existing descriptive concentration label; any future stellium feature needs a separate definition and appropriate geometry.   |

## Interpretation quality

Evidence: [readings](../src/interpretation/readings.ts), [reading UI](../src/components/PlacementReading.tsx), [learning tests](../tests/learning.test.ts), [review record](INTERPRETATION_REVIEW.md).

| ID      | Status   | Requirement and precise limit / next acceptance criterion                                                                                                                                                                                   |
| ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| READ-01 | Complete | All twelve house themes and cusp/additional/intercepted sign roles; empty houses remain meaningful. House number never substitutes for zodiac sign.                                                                                         |
| READ-02 | Complete | Integrated explanations for thirteen manually supported bodies/points × twelve signs × twelve houses. Coverage is compositional, not 1,872 independently authored essays.                                                                   |
| READ-03 | Complete | First editorial pass: distinct planet/point synthesis, concrete practice examples, contextual questions, balancing prompts, and clearer terminology. Repeated boilerplate moved out of synthesis/example text.                              |
| READ-04 | Complete | Identify the modern Western interpretive approach; distinguish luminaries, planets, lunar points, and Chiron; qualify nodes and generational placements. No automatic aspects, dignities, rulership analysis, diagnoses, or destiny claims. |
| READ-05 | Partial  | Original educational copy and external-reference review recorded. Remaining: independent astrology educator review, terminology/style feedback, and user comprehension checks. Automated coverage is not editorial certification.           |
| READ-06 | Pending  | Review a representative matrix across every body, sign, and house with a human reviewer, including difficult or awkward combinations; address feedback before calling content fully reviewed.                                               |
| READ-07 | Optional | Planet/sign-only explanations depend on CAL-10. The previous checked requirement claiming they already existed was inaccurate.                                                                                                              |
| READ-08 | Complete | Sabian cards map unrounded positions to degrees 1–30 and load Lynda Hill’s official lookup, with an external-tab option. No copied interpretation database; availability and iframe styling depend on the source website.                   |
| READ-09 | Optional | Richer whole-chart synthesis, house-ruler relationships, or aspects. Each requires its own model and editorial rules; the current reading is a placement-level introduction.                                                                |
| READ-10 | Partial  | House-axis context and individual sign styles are explained. Remaining: a dedicated explanation of the actual opposing cusp-sign pair, distinguishing additional/intercepted spans.                                                         |

## Dice learning

Evidence: [mapping and randomness](../src/practice/dice.ts), [DicePractice](../src/components/DicePractice.tsx), [learning tests](../tests/learning.test.ts), [browser flows](../e2e/birth-dice.spec.ts).

| ID      | Status   | Requirement and precise limit / next acceptance criterion                                                                                                     |
| ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DICE-01 | Complete | Six permanent face/axis mappings, unbiased roll, direct physical-die selection, visible result and live announcement.                                         |
| DICE-02 | Complete | Recall prompts before reveal; actual paired-house facts and explanations; roll again and explore axis; answer state resets for new rolls/charts.              |
| DICE-03 | Complete | Roll lock, cleanup, keyboard controls, reduced-motion result, sample labeling, and tests of all six mappings without modifying chart positions.               |
| DICE-04 | Pending  | Observe learners using their own charts; check prompt clarity, discoverability, and whether the loop helps recall before adding scoring or progress tracking. |

## Delivery, visual design, and accessibility

Evidence: [theme guide](THEMING.md), [styles](../src/styles.css), [browser tests](../e2e/), [workflow](../.github/workflows/pages.yml), [package scripts](../package.json).

| ID     | Status   | Requirement and precise limit / next acceptance criterion                                                                                                                                                         |
| ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| APP-01 | Complete | React/TypeScript/Vite shell, responsive navigation, illustrative example, error boundary, light/dark controls, local development and production build.                                                            |
| APP-02 | Complete | One opt-in locally saved chart, validated restore, clear action, and compatible version-1 schema. Birth draft is memory-only; saving calculated data retains UTC/timezone/coordinates. No multiple-chart library. |
| APP-03 | Complete | GitHub Pages is deployed. A prior live browser check verified asset loading, birth calculation, city lookup, and dice flow; ongoing third-party availability is not guaranteed.                                   |
| APP-04 | Complete | Astro-Dice identity, dice assets, sign glyphs, six hero face controls, compact sticky header, and responsive Sabian cards.                                                                                        |
| APP-05 | Partial  | Light/dark palettes and theme documentation exist. Remaining: systematic contrast review and more consistent spacing/type/color tokens. Theme preference is not persisted or system-derived.                      |
| APP-06 | Partial  | Keyboard controls, labels, skip link, reduced motion, and mobile browser tests exist. Remaining: real screen-reader sessions, heading-order audit, contrast audit, and broader device testing.                    |
| APP-07 | Partial  | Unit tests, browser tests, and Prettier dependency are present. Remaining: a repeatable formatting-check script/config and lint setup if adopted. CI currently runs unit tests and build, not browser tests.      |
| APP-08 | Complete | Organized docs/source assets; README navigation; theme/calculation guides; deduplicated roadmap and historical archive.                                                                                           |
| APP-09 | Complete | Disclose city search, local calculations/saving, Google Fonts, and the opt-in external Sabian lookup; no private calculation/API key is shipped.                                                                  |
| APP-10 | Pending  | Keep future change verification reproducible and record failures in issues. Historical “None yet” bug placeholders are not evidence that no bugs exist.                                                           |

## Optional expansions — not MVP blockers

| ID     | Status   | Scope                                                                                                                                                              |
| ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| FUT-01 | Optional | Wheel-to-six-axes unfolding animation with identity preservation, performance checks, and reduced-motion fallback. Compact-header animation does not fulfill this. |
| FUT-02 | Optional | Image import/OCR, confidence flags, normalized confirmation, and manual corrections; never guess unreadable positions.                                             |
| FUT-03 | Optional | AI enrichment through a server-side endpoint, structured responses, validation, and graceful failure. Core readings remain available without it.                   |
| FUT-04 | Optional | Print layout, SVG/PNG export, copyable summaries, and privacy-aware sharing. None is currently implemented.                                                        |
| FUT-05 | Optional | Additional house systems and side-by-side Placidus/Whole Sign comparison. Both systems can already be calculated individually.                                     |
| FUT-06 | Optional | Multiple saved charts, anonymous share links, synastry, transits, and progressions; each needs a separate scope decision.                                          |

Explicit non-goals remain daily horoscopes, tarot, compatibility scores, predictive claims, social feeds, accounts, subscriptions, and a general astrology encyclopedia. They are not unchecked delivery requirements.

## Superseded requirements and decisions

| Earlier requirement / assumption                                              | Current decision                                                                                                                     |
| ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Natal Axis Reader branding and “Unfold your birth chart” as the sole identity | Astro-Dice; “Six faces. Six axes.”; current hero “Roll into your birth chart.” Historical names may remain in archives/storage keys. |
| Manual entry first; wheel later                                               | Birth details first; wheel, explanations, and dice are all MVP requirements.                                                         |
| AI needed before explanations                                                 | Original authored composition is implemented; AI is optional.                                                                        |
| Date and time alone are enough for house calculation                          | Birthplace or coordinates/timezone are required as well.                                                                             |
| Provider still to be selected                                                 | Astronomy Engine + local house solver + Temporal; Open-Meteo city lookup. See CALCULATIONS.md.                                       |
| Every old suggested function/type/component filename must exist               | Equivalent behavior in the current shared model satisfies the requirement; do not add redundant wrappers just to match an old tree.  |
| A separate forced confirmation page for every beginner                        | Show the calculated wheel with editable metadata/placement lists. Future imports still need explicit confirmation.                   |
| Everything stays local                                                        | Calculations are local; city search, fonts, and a user-opened Sabian reader use external services.                                   |
| Chiron calculated; sign-only unknown-time readings complete                   | Chiron is manual-only; unknown-time chart generation is withheld. CAL-07 and CAL-10/READ-07 describe the remaining work.             |
| Static scientific-instrument presentation only                                | Retain precise geometry while incorporating dice identity, sign symbols, gentle motion, and Sabian exploration.                      |

## Legacy phase crosswalk

This maps every earlier phase to the current work list. “Partial” means some phase requirements remain; “Complete” refers to equivalent product behavior, not identical legacy filenames or a claim that every suggested test was written individually.

| Earlier section                           | Audited outcome                                          | Current tracking                                                              |
| ----------------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Core A: birth details/calculation         | Partial                                                  | CAL-01–13; calculated Chiron and uncertain-time work separated                |
| Core B: explanations                      | Partial                                                  | READ-01–10; composition exists, independent review does not                   |
| Core C: dice                              | Complete functional loop                                 | DICE-01–03; learning validation in DICE-04                                    |
| Core D: alignment                         | Complete alignment work                                  | APP-08–09; superseded assumptions above                                       |
| Phase 0: setup                            | Partial                                                  | APP-01, 03, 07, 08; lint/format automation remains                            |
| Phase 1: model                            | Complete current supported model                         | CAL-03–05, CHART-01; optional angles, manual Chiron; no uncertain-time schema |
| Phase 2: longitude math                   | Complete behavior                                        | CHART-01; degree/opposition operations may be inline                          |
| Phase 3: house geometry                   | Complete behavior                                        | CHART-01; extra edge-case coverage in CAL-11/CHART-10                         |
| Phase 4: house assignment                 | Complete                                                 | CHART-01; exact-cusp convention tested                                        |
| Phase 5: interceptions                    | Partial                                                  | CHART-02 detection complete; paired navigation in CHART-06                    |
| Phase 6: repeated cusps                   | Partial                                                  | CHART-02 detection complete; relationships/UI in CHART-06                     |
| Phase 7: axis engine                      | Partial                                                  | CHART-04/09; angular per-axis enrichment in CHART-08                          |
| Phase 8: metrics                          | Partial / superseded stellium inference                  | CHART-05/08/11                                                                |
| Phase 9: seed chart                       | Complete                                                 | Synthetic SAMPLE plus independent calculation fixtures                        |
| Phase 10: shell                           | Complete / superseded old identity                       | APP-01/04                                                                     |
| Phase 11: axes overview                   | Partial                                                  | CHART-04/08; angular flags remain                                             |
| Phase 12: proportional spans              | Partial                                                  | CHART-01/07                                                                   |
| Phase 13: expanded detail                 | Partial                                                  | CHART-04/06/08/09                                                             |
| Phase 14: interception UI                 | Partial                                                  | CHART-06                                                                      |
| Phase 15: repeated-cusp UI                | Partial                                                  | CHART-06                                                                      |
| Phase 16: architecture view               | Partial                                                  | CHART-05/08; explicit angular emphasis remains                                |
| Phase 17: manual input                    | Partial                                                  | CAL-12                                                                        |
| Phase 18: confirmation                    | Partial / revised flow                                   | CAL-13; beginner confirmation replaced by editable results                    |
| Phase 19: persistence                     | Complete single-chart scope                              | APP-02; multiple charts in FUT-06                                             |
| Phase 20: visual design                   | Partial                                                  | APP-04/05; token/contrast refinements remain                                  |
| Phase 21: responsive layouts              | Partial verification                                     | APP-01/06; desktop/mobile covered, broader devices remain                     |
| Phase 22: accessibility                   | Partial                                                  | APP-06; automated checks do not replace assistive-tech audits                 |
| MVP checkpoint                            | Functional journey implemented; acceptance still partial | CAL-09, READ-05/06, APP-05/06, DICE-04                                        |
| Phase 23: full wheel                      | Complete within supported-input scope                    | CHART-03/09; sign-only unknown-time display in CAL-10                         |
| Phase 24: unfold animation                | Optional, not built                                      | FUT-01                                                                        |
| Phase 25: image input                     | Optional, not built                                      | FUT-02                                                                        |
| Phase 26: AI enrichment                   | Optional, not built                                      | FUT-03                                                                        |
| Phase 27: guardrails                      | Complete authored-reading rules; continued review        | READ-04/05; no claim that all possible wording has expert approval            |
| Phase 28: export                          | Optional, not built                                      | FUT-04                                                                        |
| Backlog                                   | Optional, with existing capabilities separated           | CAL-04, APP-02, FUT-05/06                                                     |
| Non-goals and “None yet” bug placeholders | Excluded from completion counts                          | Non-goals above; APP-10                                                       |

## Next accepted work, in order

1. Independent editorial review and learner feedback (READ-05/06, DICE-04).
2. Screen-reader, contrast, and heading hierarchy audits (APP-05/06).
3. Linked interception/repeated-cusp details, segment inspection, and axis angular context (CHART-06–09).
4. Define and implement approximate-time behavior (CAL-09); decide separately whether to offer a date-only chart (CAL-10).
5. Verified calculated Chiron and broader reference coverage (CAL-07/11).
6. Development checks and manual-editor improvements (APP-07, CAL-12/13).

Mark a row Complete only when its remaining acceptance work is finished. Record code/test or review evidence when changing a status. Revisit optional items through an explicit product decision rather than counting them as missing MVP work.
