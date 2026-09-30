> Historical snapshot before the September 2026 roadmap audit. Its checkboxes are not current status. Use the [audited roadmap](../TODO.md), which consolidates duplicates and maps every legacy phase.

# Astro-Dice — Roadmap

> Calculate the chart accurately. Explain its placements. Learn its six
> opposing axes through a six-sided die. AI is optional.

Reference: [Project bible](../PROJECT_BIBLE.md) · [Theme guide](../THEMING.md)

------------------------------------------------------------------------

# Current Goal

Build a birth-chart learning app centered on a **six-sided die**. The user
enters **birth date, local birth time, and birthplace**, sees their entire
natal chart, and learns what their signs, houses, and planetary placements
mean. Each die face selects one of the six opposing house axes for an
active-recall exercise.

The primary journey is:

```text
Birth date + local birth time + birthplace
                  ↓
Calculate and display the full natal chart
                  ↓
Explore houses, signs, and combined planetary placements
                  ↓
Roll a six-sided die → select the corresponding house axis
                  ↓
Try to recall your placements → reveal facts and explanations
                  ↓
Return to the whole chart or roll again
```

**Scope correction:** Manual cusp entry is an advanced fallback, not the
main onboarding flow. The full wheel, educational explanations, and dice
interaction are MVP requirements. Optional AI generation, image upload,
and elaborate wheel animation can wait; explanations cannot.

Birthplace is needed to calculate houses and angles and resolve the local
birth time. Ask for a city/town, not a street address. If birth time is
unknown, do not invent a rising sign, house placements, or house-axis quiz.

These requirements reflect the latest product direction and supersede the
manual-entry-first / wheel-later scope in the other project documents.
Earlier product copy is retained in [the archived README draft](README_DRAFT.md).

## Theme and repository updates — September 2026

- [x] Astro-Dice identity, dice favicon, and six face-to-axis hero controls.
- [x] Compact sticky header with reduced-motion support.
- [x] Zodiac glyphs alongside sign labels and positions.
- [x] Sabian cards with Lynda Hill’s official embedded lookup.
- [x] GitHub Pages deployment verified.
- [x] Document current branding, palettes, typography, layout, and interaction rules in [THEMING.md](../THEMING.md).
- [x] Group project documents, historical drafts, and source artwork; maintain links in the root README.

## Implementation status — current change

Implemented: birth date/time/place entry, city lookup with coordinate fallback,
historical time resolution and DST clarification, browser-based tropical
calculation (Placidus/Whole Sign), full interactive wheel, integrated placement
readings, and the six-sided dice recall/reveal flow. Existing axes, architecture,
manual charts, and local storage remain usable. Seven independent reference
charts validate the new calculation layer; see `CALCULATIONS.md`.

Current limits: 1900–2100, latitudes below 66° N/S, no calculated Chiron,
no fabricated chart for unknown time. Calculation saving is opt-in. Editorial
review, approximate-time handling, broader coverage, screen-reader audit, and
broader hosted-provider coverage remain open. City-search browser tests use
controlled responses; hosted-provider availability is not guaranteed.

The legacy numbered phase checkboxes below still need a line-by-line audit.
Do not read every unchecked legacy item as missing or rebuild working code.
The checked Core Additions and current status above describe this change.

## Revised build order

1. Reconcile product docs and existing implementation status.
2. Select and validate birth-chart calculation, place lookup, and historical
   timezone handling; connect them to the existing geometry model.
3. Build birth-detail entry and the complete interactive wheel.
4. Add house/sign explanations and integrated planet–sign–house readings.
5. Build dice selection, recall prompts, and answer reveals using that same chart.
6. Connect Wheel, Axes, Architecture, and Practice; finish accessibility,
   persistence, and deployment verification.
7. Only then consider advanced animation, image parsing, or optional AI.

The legacy phase numbers are retained for reference; the order above takes
precedence. In particular, Phase 23 (Wheel) belongs inside the MVP.

------------------------------------------------------------------------

# Core Addition A — Birth Details → Calculated Natal Chart

## Birth-detail input

- [x] Make birth date, local birth time, and birthplace the primary input form
- [x] Validate calendar dates, leap days, and 12/24-hour time without ambiguity
- [x] Add birthplace search with city/region/country choices for ambiguous names
- [x] Resolve the selected place to coordinates and a timezone identifier
- [x] Convert the entered local time using timezone rules for the birth date,
      including historical daylight-saving changes, not today's UTC offset
- [x] Handle ambiguous/nonexistent local times explicitly; ask for clarification
      instead of silently selecting an offset
- [x] Show a concise birth-detail summary with an edit action
- [x] Preserve drafts when navigating away and back
- [x] Keep manual planetary/cusp entry available under an advanced option

## Calculation engine

- [x] Evaluate an ephemeris/calculation library or service for accuracy,
      licensing, supported dates, nodes/Chiron, house systems, and deployment fit
- [x] Choose and document the initial zodiac convention and house-system default;
      display them in chart settings rather than leaving assumptions implicit
- [x] Document coordinate/time conventions, node type, and supported date range
- [x] Calculate Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus,
      Neptune, Pluto, North/South Nodes, and Chiron; explicitly mark unavailable
      bodies rather than substituting guessed positions
- [x] Calculate all twelve house cusps and ASC/DSC/IC/MC
- [x] Include motion/retrograde status where supported and explain its notation
- [x] Normalize calculation output into the existing chart/geometry pipeline
- [x] Store calculation provenance (engine/version, settings, resolved time)
      so results can be reproduced
- [x] Handle unsupported dates, calculation failures, and high-latitude house
      system limitations; never silently switch systems
- [x] Ensure input edits recalculate the wheel, axes, explanations, and quiz data
      together; no stale readings after a birth-detail change
- [x] Keep private provider keys server-side if an external service is selected;
      document whether calculation can run entirely in the browser

## Unknown or uncertain birth time

- [x] Provide an explicit “I don't know my birth time” option
- [x] Explain which results require a reliable birth time
- [x] Withhold houses, angles, and dice house-axis practice when time is unknown
- [ ] If offering a limited date-only chart, expose uncertainty for time-sensitive
      positions (especially the Moon); do not present a noon chart as exact
- [ ] Label approximate-time results and avoid unqualified near-cusp readings

## Calculation verification

- [x] Add verified real-date fixtures separate from the illustrative seed chart
- [x] Compare planetary positions, cusps, and angles with independent trusted
      reference calculations using identical settings and documented tolerances
- [x] Test historical timezone offsets, DST transitions, and UTC date rollover
- [x] Test leap dates, east/west longitudes, and northern/southern latitudes
- [x] Test unavailable bodies and unsupported house calculations
- [x] Test that editing birth details updates every chart-dependent view

------------------------------------------------------------------------

# Core Addition B — Explain the User's Actual Placements

Educational interpretation is core functionality. It may use reviewed,
structured content and composition rules; it does not require AI.

## Houses and signs

- [x] Explain the life themes of all twelve houses in plain language
- [x] Explain what the actual cusp sign contributes to each house's themes
- [x] Explain additional signs contained in that house, distinguishing a cusp
      sign, a partial sign span, and an intercepted sign
- [x] Cover all sign–house combinations that calculation can produce, not only
      the sample chart's placements
- [x] Explain empty houses without implying an absent life area
- [x] Explain both sides of each axis and the sign polarities found there
- [x] Treat angular sign-span size as geometry, not a numerical personality score

## Planet + sign + house — the central reading

- [x] Let users select any planet from the wheel, a placement list, or an axis
- [x] Show its calculated name, sign, degree, house, and relevant motion status
- [x] Explain the planet's symbolic role (“what”), the sign's expression (“how”),
      and the house's life area (“where”)
- [x] Write a combined explanation connecting all three, not three unrelated
      dictionary entries or a generic sign horoscope
- [x] Include a concrete everyday example and a reflective question
- [x] Connect the placement back to its opposing house axis
- [x] Explain nodes and Chiron as distinct points/bodies rather than counting
      them indiscriminately with the ten planets
- [x] Cover every supported planet/point across signs and houses; use reviewed
      composition rules or content coverage checks, not fixture-only text
- [x] When house data is unavailable, provide only the supported planet/sign
      explanation and explicitly omit house-dependent claims

Acceptance example: selecting Venus in Gemini in house 10 should connect
Venus's relationships/values symbolism with Gemini's communicative style
and the tenth house's public-life themes. It must explain their combination,
not merely display separate definitions of Venus, Gemini, and house 10.

## Content quality

- [x] Keep calculated facts visibly distinct from symbolic interpretation
- [ ] Review content sources, permissions, terminology, and consistency
- [x] Avoid deterministic personality/future claims and unsupported aspects,
      dignities, stelliums, or intercepted placements
- [x] Test that different planet/sign/house inputs yield the corresponding
      explanation and that changing the chart invalidates old content
- [x] Keep core explanations available without a live AI service

------------------------------------------------------------------------

# Core Addition C — Six-Sided Dice and Active Recall

The die is a learning control, not decoration or a way to generate a random
chart or prediction. **One die, six faces, six fixed house-axis mappings.**

| Die face | Opposing houses | Recall theme |
|---|---|---|
| 1 | 1 ↔ 7 | Self ↔ Other |
| 2 | 2 ↔ 8 | Mine ↔ Ours |
| 3 | 3 ↔ 9 | Information ↔ Worldview |
| 4 | 4 ↔ 10 | Roots ↔ Public life |
| 5 | 5 ↔ 11 | Creation ↔ Community |
| 6 | 6 ↔ 12 | Daily systems ↔ Inner world |

## Dice interaction

- [x] Make “Roll to practice” prominent once the user's chart is available
- [x] Render a recognizable six-sided die with an accessible numeric result
- [x] Use one canonical face-to-axis mapping shared by the die and chart views
- [x] Choose a uniformly random integer from 1 through 6 for an ordinary roll
- [x] Show both the rolled number and its houses (e.g. “4 · Houses 4 ↔ 10”)
- [x] Allow direct face selection, including entering a physical die's result
- [x] Highlight the selected houses in the wheel and corresponding axis view
- [x] Support keyboard activation and announce the result to screen readers
- [x] Provide an instant reduced-motion result; animation is not required for play
- [x] Prevent repeated clicks during a roll from leaving multiple active results

## Recall → reveal → understand

- [x] Keep Explore and Practice distinct: exploration shows readings immediately;
      practice initially hides the selected axis's placement answers
- [x] Ask which signs begin the two houses, which planets/points occupy them,
      and what those combined placements might mean
- [x] Provide a “Reveal placements” action showing actual cusps, contained signs,
      planets/points, and empty houses from the user's chart
- [x] Provide the associated house/sign and planet–sign–house explanations
- [x] Let the user compare their recall with the answer without presenting
      symbolic interpretation as a single objectively graded answer
- [x] Offer “Explore this axis” and “Roll again” actions
- [x] Reset hidden/revealed state for each new roll or changed chart
- [x] Make sample-chart practice explicit; never pass sample placements off as
      the user's calculated chart

## Dice acceptance tests

- [x] Inject each result 1–6 in tests and verify its exact house pair
- [x] Verify a roll only selects an axis and never changes chart positions
- [x] Verify the answer is concealed before reveal, including accessible text
- [x] Verify revealed facts and readings match both houses of the active chart
- [x] Verify empty houses, intercepted signs, and multiple planets are handled
- [x] Verify roll-again, physical-die selection, keyboard use, and reduced motion
- [x] Verify no house-axis quiz is offered for unknown-time charts

------------------------------------------------------------------------

# Core Addition D — Product and Documentation Alignment

- [x] Reconcile `PROJECT_BIBLE.md`, `../README.md`, and `archive/README_DRAFT.md` with the
      birth-details → whole chart → dice recall journey; restore the original
      AstroDice active-recall rationale without losing development instructions
- [ ] Audit legacy checkboxes against the current code and tests; preserve working
      geometry, fixtures, axis views, and manual input as reusable foundations
- [x] Update landing-page copy and primary actions to explain both chart learning
      and the die's six-face mapping
- [x] Connect Wheel, Axes, Architecture, and Practice to one active chart and
      shared selection state
- [x] Explain place-lookup/calculation data flows and any external providers;
      do not keep claiming everything stays local if the new flow sends data out
- [x] Choose an explicit save policy for birth details versus derived chart data,
      minimize collection, and make “Forget this chart” clear both if saved
- [x] Migrate/version persisted data without breaking existing manual charts

------------------------------------------------------------------------


# Phase 0 --- Repository Setup

-   [ ] Initialize Vite + React + TypeScript project
-   [ ] Configure GitHub Pages deployment
-   [ ] Add `PROJECT_BIBLE.md`
-   [ ] Add this `TODO.md`
-   [ ] Add `../README.md`
-   [ ] Choose and add an open-source license
-   [ ] Create base folder structure
-   [ ] Add test framework
-   [ ] Add linting / formatting
-   [ ] Confirm local dev server runs
-   [ ] Confirm production build succeeds
-   [ ] Confirm blank app deploys successfully to GitHub Pages

## Suggested structure

``` text
src/
├── components/
├── geometry/
├── data/
├── types/
├── interpretation/
└── styles/

tests/
public/
```

------------------------------------------------------------------------

# Phase 1 --- Chart Data Model

## Zodiac

-   [ ] Define `ZodiacSign` type
-   [ ] Define canonical zodiac order
-   [ ] Define sign → starting longitude mapping
-   [ ] Add zodiac glyph metadata
-   [ ] Add readable sign names
-   [ ] Add opposite-sign mapping

## Positions

-   [ ] Define `ZodiacPosition`
-   [ ] Support degrees
-   [ ] Support minutes
-   [ ] Normalize every position to absolute longitude
-   [ ] Preserve original degree/minute values for display

## Houses

-   [ ] Define `House`
-   [ ] Store house number
-   [ ] Store exact cusp position
-   [ ] Define opposite-house mapping

## Planets / Points

-   [ ] Define `Planet`
-   [ ] Add Sun
-   [ ] Add Moon
-   [ ] Add Mercury
-   [ ] Add Venus
-   [ ] Add Mars
-   [ ] Add Jupiter
-   [ ] Add Saturn
-   [ ] Add Uranus
-   [ ] Add Neptune
-   [ ] Add Pluto
-   [ ] Add North Node
-   [ ] Add South Node
-   [ ] Add Chiron
-   [ ] Add planet glyph metadata

## Chart

-   [ ] Define `NatalChart`
-   [ ] Store house system
-   [ ] Store 12 cusps
-   [ ] Store planets / points
-   [ ] Store ASC / DSC
-   [ ] Store IC / MC
-   [ ] Add runtime validation for malformed chart data

------------------------------------------------------------------------

# Phase 2 --- Longitude Math

This is foundational. Do not build interpretation logic before these
functions are tested.

-   [ ] Implement `normalizeLongitude()`
-   [ ] Implement `getAbsoluteLongitude()`
-   [ ] Implement `getSignAtLongitude()`
-   [ ] Implement `getDegreeWithinSign()`
-   [ ] Implement `getOppositeLongitude()`
-   [ ] Implement `getOppositeSign()`

## Tests

-   [ ] Aries 0° → 0°
-   [ ] Taurus 0° → 30°
-   [ ] Gemini 0° → 60°
-   [ ] Pisces 29°59′ → just under 360°
-   [ ] 360° normalizes to 0°
-   [ ] values above 360° wrap correctly
-   [ ] negative values normalize correctly
-   [ ] opposite longitude is exactly 180° away
-   [ ] opposite signs resolve correctly

------------------------------------------------------------------------

# Phase 3 --- House Geometry Engine

## House spans

-   [ ] Implement `getHouseSpan()`
-   [ ] Calculate start from current cusp
-   [ ] Calculate end from next cusp
-   [ ] Handle House 12 → House 1 wraparound
-   [ ] Normalize spans crossing 360°

## Sign segments

-   [ ] Implement `getSignsInsideHouse()`
-   [ ] Find every zodiac boundary crossed by a house
-   [ ] Calculate degrees of each sign contained in the house
-   [ ] Preserve first partial sign
-   [ ] Preserve full internal signs
-   [ ] Preserve final partial sign

Example target:

``` text
9H
28°49′ Aries
→ 30° Taurus
→ 2°04′ Gemini
```

should become approximately:

``` json
[
  {
    "sign": "Aries",
    "degreesInsideHouse": 1.18
  },
  {
    "sign": "Taurus",
    "degreesInsideHouse": 30
  },
  {
    "sign": "Gemini",
    "degreesInsideHouse": 2.07
  }
]
```

## Tests

-   [ ] house entirely inside one sign
-   [ ] house crossing one sign boundary
-   [ ] house containing one full sign
-   [ ] house containing multiple sign boundaries
-   [ ] house crossing Pisces → Aries
-   [ ] 12th house wrapping past 360°
-   [ ] sign-segment degrees sum to total house span
-   [ ] no negative segment widths
-   [ ] no duplicated segments

------------------------------------------------------------------------

# Phase 4 --- Planet → House Assignment

-   [ ] Implement `getPlanetHouse()`
-   [ ] Assign by longitude, never by zodiac sign
-   [ ] Handle 360° wraparound
-   [ ] Define cusp-boundary convention
-   [ ] Document cusp-boundary convention in code

Recommended convention:

> A planet exactly on a house cusp belongs to the house beginning at
> that cusp.

## Tests

-   [ ] planet in middle of house
-   [ ] planet immediately before cusp
-   [ ] planet exactly on cusp
-   [ ] planet immediately after cusp
-   [ ] planet in 12H across wraparound
-   [ ] planet and cusp in different zodiac signs but same house
-   [ ] intercepted-sign planet assigned correctly

------------------------------------------------------------------------

# Phase 5 --- Interceptions

-   [ ] Implement `findInterceptedSigns()`
-   [ ] Detect a full 30° sign contained within one house
-   [ ] Verify no cusp occurs inside intercepted sign
-   [ ] Determine containing house
-   [ ] Determine opposite intercepted sign
-   [ ] Determine opposite house
-   [ ] Find planets inside intercepted signs

## Tests

-   [ ] chart with no interceptions
-   [ ] one intercepted pair
-   [ ] multiple full sign segments are handled correctly
-   [ ] intercepted planet is detected
-   [ ] partial sign is NOT called intercepted
-   [ ] sign appearing on a cusp is NOT called intercepted

------------------------------------------------------------------------

# Phase 6 --- Duplicated Cusp Signs

-   [ ] Implement `findDuplicatedCusps()`
-   [ ] Compare consecutive cusp signs
-   [ ] Handle House 12 → House 1
-   [ ] Return duplicated sign + house numbers
-   [ ] Connect duplicated cusp information to interception results

## Tests

-   [ ] no duplicated cusp signs
-   [ ] duplicated sign across two houses
-   [ ] duplicated opposite signs
-   [ ] House 12 / House 1 boundary

------------------------------------------------------------------------

# Phase 7 --- Six-Axis Engine

Create canonical axis metadata.

``` text
1 ↔ 7   Self ↔ Other
2 ↔ 8   Mine ↔ Ours
3 ↔ 9   Information ↔ Worldview
4 ↔ 10  Private Foundation ↔ Public Identity
5 ↔ 11  Individual Expression ↔ Collective Belonging
6 ↔ 12  Organization ↔ Surrender
```

-   [ ] Create `AXES` configuration
-   [ ] Implement `getAxisForHouse()`
-   [ ] Implement `getAxisData()`
-   [ ] Attach both house geometries
-   [ ] Attach planets
-   [ ] Attach sign segments
-   [ ] Attach interceptions
-   [ ] Attach angular information
-   [ ] Attach luminary information

------------------------------------------------------------------------

# Phase 8 --- Architecture Metrics

These are descriptive structural metrics, not personality scores.

-   [ ] Implement `findAxisPopulation()`
-   [ ] Count planets per side
-   [ ] Identify empty houses
-   [ ] Identify one-sided axes
-   [ ] Identify Sun axis
-   [ ] Identify Moon axis
-   [ ] Identify ASC ↔ DSC axis
-   [ ] Identify IC ↔ MC axis
-   [ ] Detect major planetary concentrations
-   [ ] Add conservative stellium detection
-   [ ] Keep stellium definition configurable/documented

Return labels such as:

``` text
heavily populated
moderately populated
one-sided
angular
contains Sun
contains Moon
contains interception
mostly empty
```

Do not generate arbitrary numerical personality scores.

------------------------------------------------------------------------

# Phase 9 --- Seed Chart Fixture

Create at least one development fixture complicated enough to expose
geometry bugs.

It should include:

-   [ ] intercepted signs
-   [ ] duplicated cusp signs
-   [ ] empty houses
-   [ ] populated houses
-   [ ] one heavily populated house
-   [ ] Sun
-   [ ] Moon
-   [ ] nodes
-   [ ] Chiron
-   [ ] outer planets
-   [ ] a house crossing Pisces → Aries
-   [ ] 360° wraparound

Use the fixture in tests and Storybook/demo-style views if useful.

**Do not hardcode fixture values into production algorithms.**

------------------------------------------------------------------------

# Phase 10 --- App Shell

-   [ ] Build top-level app layout
-   [ ] Add site title
-   [ ] Add tagline: `Unfold your birth chart.`
-   [ ] Add navigation between views
-   [ ] Add responsive container
-   [ ] Add light mode
-   [ ] Add dark mode
-   [ ] Add basic error boundary
-   [ ] Add empty state

Primary views:

``` text
Wheel | Axes | Architecture
```

Wheel is required for MVP. Add a prominent Practice entry point for dice-based
recall alongside Wheel, Axes, and Architecture.

------------------------------------------------------------------------

# Phase 11 --- Axes Overview

This is the first major visual milestone.

-   [ ] Create `AxisView`
-   [ ] Render all six axes
-   [ ] Show left house
-   [ ] Show right house
-   [ ] Show axis title
-   [ ] Show polarity labels
-   [ ] Show contained signs
-   [ ] Show planets
-   [ ] Show empty-house state
-   [ ] Show Sun clearly
-   [ ] Show Moon clearly
-   [ ] Show angles where relevant

Target conceptual layout:

``` text
SELF          ●━━━━━━━━━━━━━━━🌙      OTHER
1st House                            7th House
Virgo                                Pisces
```

-   [ ] Make each axis clickable
-   [ ] Make each axis keyboard accessible
-   [ ] Add hover/focus state
-   [ ] Test on narrow screens

------------------------------------------------------------------------

# Phase 12 --- Proportional House Span Component

Create `HouseSpan`.

-   [ ] Render sign segments proportional to degrees inside house
-   [ ] Label each sign
-   [ ] Show zodiac glyph
-   [ ] Show planet markers at proportional positions
-   [ ] Show cusp degree
-   [ ] Show end degree
-   [ ] Highlight intercepted full-sign segments
-   [ ] Add hover/tap details

Example:

``` text
♈│██████████████████████████████│♊
           ♉ TAURUS
              ☀
```

Detail should show:

``` text
Taurus
0° → 30°
30° inside this house
Intercepted
```

------------------------------------------------------------------------

# Phase 13 --- Expandable Axis Detail

Create `AxisCard`.

For each axis show:

-   [ ] axis number
-   [ ] axis title
-   [ ] polarity
-   [ ] House A
-   [ ] House B
-   [ ] exact cusps
-   [ ] contained signs
-   [ ] planets
-   [ ] proportional spans
-   [ ] interceptions
-   [ ] duplicated cusp notes
-   [ ] luminary flags
-   [ ] angular flags

Add educational sections:

-   [ ] What House A represents
-   [ ] What House B represents
-   [ ] What this axis represents
-   [ ] Sign polarity explanation

For MVP, these can use static educational copy rather than AI.

------------------------------------------------------------------------

# Phase 14 --- Interception UI

Create `InterceptionCard`.

-   [ ] Show intercepted pair
-   [ ] Show houses
-   [ ] Show planets inside each intercepted sign
-   [ ] Explain interception simply
-   [ ] Link/click back to corresponding axis

Example:

``` text
INTERCEPTED AXIS

♏ Scorpio
3rd House
    ↕
♉ Taurus
9th House
```

------------------------------------------------------------------------

# Phase 15 --- Duplicated Cusp UI

-   [ ] Display duplicated signs
-   [ ] Display affected houses
-   [ ] Explain what "duplicated cusp sign" means
-   [ ] Link to corresponding houses/axes

------------------------------------------------------------------------

# Phase 16 --- Architecture View

Create `ArchitectureView`.

-   [ ] Render six axes
-   [ ] Minimize sign interpretation
-   [ ] Emphasize planet distribution
-   [ ] Show empty houses
-   [ ] Show occupied houses
-   [ ] Show individual planet glyphs
-   [ ] Highlight Sun
-   [ ] Highlight Moon
-   [ ] Highlight angles
-   [ ] Add accessible text equivalent

Concept:

``` text
1H  ○ ━━━━━━━━━━━━━━━━━ ●  7H
                         🌙

2H  ○ ━━━━━━━━━━━━━━━━━ ○  8H

3H  ○ ━━━━━━━━━━━━━━━━━ ●  9H
                         ☀

4H  ● ━━━━━━━━━━━━━ ●●●●● 10H
    ♇                ☿♄♀♂☊
```

------------------------------------------------------------------------

# Phase 17 --- Advanced Manual Chart Input

Retain `ChartInput` as a secondary route for existing chart data, debugging,
and correction. Core Addition A supplies the primary birth-detail form.
Users should not need to know their cusps or planetary degrees to start.

## House data

-   [ ] house system selector/text field
-   [ ] twelve cusp sign selectors
-   [ ] twelve cusp degree fields
-   [ ] optional minute fields

## Planet data

For each supported planet/point:

-   [ ] sign selector
-   [ ] degree
-   [ ] minute
-   [ ] optional enable/disable for points such as Chiron/Nodes

## Validation

-   [ ] degrees must be 0--29
-   [ ] minutes must be 0--59
-   [ ] exactly 12 house cusps
-   [ ] cusp order must produce valid house progression
-   [ ] show useful validation errors
-   [ ] never silently repair ambiguous chart data

## UX

-   [ ] provide sample chart button
-   [ ] provide clear/reset button
-   [ ] preserve current form during view changes

------------------------------------------------------------------------

# Phase 18 --- Chart Confirmation

For the primary birth-detail flow, show the resolved date, local time,
birthplace, timezone, and calculation settings with an edit action. Then open
the full wheel. Detailed planetary/cusp tables are available for inspection;
do not force beginners to verify twelve cusps before seeing their chart.

For advanced manual entry or future image imports, show normalized chart data
for confirmation before visualization.

``` text
WE READ YOUR CHART AS:

ASC     Virgo 6°12′
MC      Gemini 2°04′

Sun     Taurus 16°59′
Moon    Pisces 24°...
...

[ Looks Right ]
[ Edit Chart ]
```

-   [ ] Show angles
-   [ ] Show house cusps
-   [ ] Show planets
-   [ ] Allow editing
-   [ ] Continue to the full wheel with access to axes and dice practice

------------------------------------------------------------------------

# Phase 19 --- Local Persistence

-   [ ] Save current chart to `localStorage`
-   [ ] Restore on reload
-   [ ] Add "Forget this chart" action
-   [ ] Minimize saved birth metadata; disclose and control what is retained
-   [ ] Clear saved birth details, derived positions, and practice state together
-   [ ] Version persisted schema so future changes do not crash old data

------------------------------------------------------------------------

# Phase 20 --- Visual Design Pass

Direction: **information visualization / scientific instrument**, not
generic mystical astrology.

-   [ ] generous whitespace
-   [ ] thin geometric lines
-   [ ] restrained typography
-   [ ] precise degree labels
-   [ ] subtle zodiac glyphs
-   [ ] planets as data points
-   [ ] consistent spacing scale
-   [ ] polished light mode
-   [ ] polished dark mode
-   [ ] no galaxy wallpaper
-   [ ] no excessive gold/purple aesthetic
-   [ ] no unnecessary occult ornament

The chart should provide the visual complexity.

------------------------------------------------------------------------

# Phase 21 --- Responsive Design

-   [ ] desktop axis layout
-   [ ] tablet layout
-   [ ] mobile layout
-   [ ] decide vertical vs horizontal-scroll behavior on mobile
-   [ ] keep labels readable
-   [ ] test expanded cards on small screens
-   [ ] test manual entry on small screens

------------------------------------------------------------------------

# Phase 22 --- Accessibility

-   [ ] keyboard navigation
-   [ ] semantic buttons
-   [ ] visible focus states
-   [ ] sufficient contrast
-   [ ] text alternatives for glyphs
-   [ ] no color-only meaning
-   [ ] `prefers-reduced-motion`
-   [ ] accessible descriptions for visualizations
-   [ ] correct heading hierarchy
-   [ ] screen-reader test of manual input

------------------------------------------------------------------------

# MVP CHECKPOINT

A geometry-only manual-entry prototype is a foundation, not the completed
product. Stop here before image parsing or optional AI enhancements.

- [ ] A beginner can enter birth date, local birth time, and birthplace without
      manually entering cusps or planetary positions
- [ ] Calculations match verified fixtures and handle timezone/date boundaries
- [ ] Unknown or uncertain birth time is handled without invented houses/angles
- [ ] The full interactive wheel shows all supported planets/points, twelve
      houses, signs, cusps, and angles when the input supports them
- [ ] Selecting a house explains its actual cusp sign and additional sign spans
- [ ] Selecting a planet explains its combined planet–sign–house placement
- [ ] Rolling/selecting each of the six die faces opens the correct opposing axis
- [ ] Practice supports recall before reveal, clear explanations, and rolling again
- [ ] Wheel, axes, architecture, and dice practice use the same calculated chart
- [ ] Geometry tests pass; proportional spans, planetary houses, interceptions,
      and duplicated cusp signs remain correct
- [ ] Changing birth details updates all views, readings, and practice answers
- [ ] Save/restore/forget and old-chart migration work as documented
- [ ] Desktop/mobile layouts, keyboard use, and screen-reader flows are verified
- [ ] Calculation dependencies and the frontend work in the chosen deployed
      architecture, including GitHub Pages; external failures have useful states

------------------------------------------------------------------------

# Phase 23 --- Full Interactive Natal Wheel (Required for MVP)

Build after birth-chart calculation, before dice practice. The existing hero
illustration is decorative and does not satisfy this requirement.

-   [ ] Build circular natal wheel
-   [ ] Render signs
-   [ ] Render houses
-   [ ] Render cusps
-   [ ] Render planets
-   [ ] Render ASC / DSC
-   [ ] Render IC / MC
-   [ ] Ensure wheel uses same geometry engine as axes
-   [ ] Do not create a second independent chart-calculation system
-   [ ] Resolve crowded labels/planet clusters without moving their true positions
-   [ ] Add a readable placement table as a text alternative to the wheel
-   [ ] Select a house to open its sign/house explanation
-   [ ] Select a planet to open its combined planet–sign–house explanation
-   [ ] Highlight the active dice-selected axis on the wheel
-   [ ] Keep selection synchronized when switching between wheel and axes
-   [ ] Support touch, keyboard access, and readable narrow-screen detail
-   [ ] Show only supported information for unknown-time charts; do not draw
      fabricated houses or angles

------------------------------------------------------------------------

# Phase 24 --- Unfold Animation (Post-MVP Polish)

The functional wheel, axes, and dice learning loop come first.

Signature interaction:

``` text
Circular Wheel
      ↓
Opposing houses separate
      ↓
Six horizontal axes
```

-   [ ] prototype geometry transition
-   [ ] preserve planet identity during animation
-   [ ] preserve sign identity during animation
-   [ ] keep animation understandable rather than decorative
-   [ ] support reduced-motion fallback
-   [ ] optimize performance on mobile

------------------------------------------------------------------------

# Phase 25 --- Chart Image Upload

Only after birth-detail calculation, the full chart, and dice learning work.
Image upload is an optional alternate input, not the main onboarding route.

-   [ ] image upload UI
-   [ ] image preview
-   [ ] parse printed planetary table when available
-   [ ] parse printed house cusp table when available
-   [ ] prefer printed values over wheel estimation
-   [ ] normalize extracted data
-   [ ] flag uncertain values
-   [ ] never guess unreadable values
-   [ ] send parsed chart to confirmation screen
-   [ ] allow manual corrections

------------------------------------------------------------------------

# Phase 26 --- Optional AI Interpretation Enhancements

Core house/sign and planet–sign–house explanations ship in Core Addition B.
This phase may enrich them; it must not be a prerequisite for learning or
dice answer reveals.

Do not expose private API keys in GitHub Pages.

-   [ ] create interpretation schema
-   [ ] create serverless/backend endpoint
-   [ ] send structured chart JSON
-   [ ] never rely on AI for geometry
-   [ ] validate AI response
-   [ ] gracefully handle unavailable AI service

For each axis request:

-   [ ] House A interpretation
-   [ ] House B interpretation
-   [ ] polarity
-   [ ] sign polarity
-   [ ] planetary story
-   [ ] core lesson
-   [ ] personalized question

Whole chart:

-   [ ] planetary-weight synthesis
-   [ ] luminary synthesis
-   [ ] angular synthesis
-   [ ] interceptions
-   [ ] central axis
-   [ ] six questions
-   [ ] overall architecture

------------------------------------------------------------------------

# Phase 27 --- Interpretation Guardrails (Apply from MVP)

These rules apply to authored explanations and dice reveals as well as any
future AI-generated content.

-   [ ] chart JSON is source of truth
-   [ ] no invented degrees
-   [ ] no invented houses
-   [ ] no invented aspects
-   [ ] cusp sign ≠ entire house
-   [ ] no assumed interceptions
-   [ ] no assumed stelliums
-   [ ] empty houses remain meaningful
-   [ ] structural facts separated from interpretation
-   [ ] missing data marked unknown
-   [ ] avoid deterministic future claims
-   [ ] describe astrology as symbolic/interpretive

------------------------------------------------------------------------

# Phase 28 --- Sharing / Export

Future enhancement.

-   [ ] print-friendly reading
-   [ ] export architecture view
-   [ ] SVG export
-   [ ] PNG export
-   [ ] shareable chart state without exposing unnecessary personal data
-   [ ] copy axis summary

------------------------------------------------------------------------

# Backlog

Do not start these until the core product is excellent.

-   [ ] synastry axes
-   [ ] transits
-   [ ] progressions
-   [ ] Additional calculated house systems beyond the chosen MVP default
-   [ ] Placidus vs Whole Sign comparison
-   [ ] aspects across axes
-   [ ] anonymous share links
-   [ ] saved charts

------------------------------------------------------------------------

# Explicit Non-Goals

Do not add during MVP:

-   [ ] daily horoscopes
-   [ ] tarot
-   [ ] compatibility scoring
-   [ ] predictive astrology
-   [ ] social feed
-   [ ] accounts
-   [ ] subscriptions
-   [ ] giant astrology encyclopedia

------------------------------------------------------------------------

# Bugs / Issues

Use this section while building.

## Critical

-   [ ] None yet

## Geometry

-   [ ] None yet

## UI

-   [ ] None yet

## Accessibility

-   [ ] None yet

## Deployment

-   [ ] None yet

------------------------------------------------------------------------

# Decisions

Record implementation decisions here so future coding sessions do not
repeatedly revisit them.

-   **Primary product:** learn a calculated natal chart through six opposing
    house axes mapped to the six faces of a die
-   **Core learning loop:** roll → recall → reveal → understand → roll again
-   **Tagline:** "Unfold your birth chart."
-   **MVP input:** birth date + local birth time + birthplace
-   **Advanced input:** manual structured chart entry
-   **MVP chart:** full interactive wheel plus axes and architecture views
-   **MVP explanations:** house/sign context and integrated planet–sign–house readings
-   **Unknown birth time:** no invented houses, angles, or house-axis quiz
-   **Calculation:** verified ephemeris and historical timezone handling; provider
    and deployment approach still to be selected
-   **Geometry:** existing deterministic TypeScript engine
-   **UI:** React + TypeScript + SVG/CSS
-   **Hosting:** GitHub Pages
-   **AI:** optional post-MVP enhancement; never the source of chart geometry
    or a requirement for basic explanations; private keys remain server-side
-   **API secrets:** never client-side
-   **Planet house assignment:** longitude-based, never sign-based
-   **Cusp convention:** a planet exactly on a cusp belongs to the house
    beginning at that cusp
-   **Visual direction:** information visualization / scientific
    instrument
-   **MVP accounts:** none
-   **Persistence:** local by default; birth-detail retention must be explicit
-   **External data flows:** disclose place lookup/calculation requests if used

------------------------------------------------------------------------

# Next Actions

- [ ] Review and refine the authored placement explanations with an astrology
      educator; automated content coverage is not editorial validation
- [ ] Add calculated Chiron through a compatible, verified ephemeris source
- [ ] Improve approximate/unknown-time handling without inventing precise houses
- [ ] Broaden calculation reference fixtures before extending date/latitude limits
- [ ] Finish screen-reader and contrast audits for the wheel, form, and dice reveals
- [ ] Verify the actual GitHub Pages deployment and hosted city lookup there
- [ ] Audit legacy numbered-phase checkboxes against the current implementation
- [ ] Refine segment hover/tap details, linked interceptions, and duplicated-cusp notes

**The die, full chart, and placement explanations are implemented as the core
flow. Keep them central as this grows; image parsing and AI remain optional.**
