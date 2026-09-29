# Natal Axis Reader

> **Unfold your birth chart.**

Natal Axis Reader is a GitHub Pages-friendly web app for exploring a
natal chart as **six opposing house axes** rather than twelve isolated
houses.

The core idea is simple: a circular natal chart contains relationships
that are difficult to see at a glance. Every house has an opposite. This
project unfolds the wheel into six readable dimensions and shows how
signs, planets, angles, interceptions, and planetary concentrations
interact across them.

This is **not intended to be another generic horoscope generator**. The
distinctive feature is the visualization and analysis of natal-chart
architecture.

------------------------------------------------------------------------

# 1. Product Concept

Traditional chart:

``` text
             ◯
            ╱│╲
           ╱ │ ╲
```

Unfold it:

``` text
1st  ━━━━━━━━━━━━━━━━━━━  7th
2nd  ━━━━━━━━━━━━━━━━━━━  8th
3rd  ━━━━━━━━━━━━━━━━━━━  9th
4th  ━━━━━━━━━━━━━━━━━━━ 10th
5th  ━━━━━━━━━━━━━━━━━━━ 11th
6th  ━━━━━━━━━━━━━━━━━━━ 12th
```

The six axes are:

1.  **1st ↔ 7th --- Identity & Partnership** --- Self ↔ Other
2.  **2nd ↔ 8th --- Personal & Shared Value** --- Mine ↔ Ours
3.  **3rd ↔ 9th --- Knowledge & Meaning** --- Information ↔ Worldview
4.  **4th ↔ 10th --- Roots & Public Life** --- Private Foundation ↔
    Public Identity
5.  **5th ↔ 11th --- Creation & Community** --- Individual Expression ↔
    Collective Belonging
6.  **6th ↔ 12th --- Daily Systems & Inner World** --- Organization ↔
    Surrender

The goal is to help a user understand not only individual placements,
but **how the two halves of their chart answer one another across the
wheel**.

------------------------------------------------------------------------

# 2. Product Principles

## Geometry first, interpretation second

Never ask an AI model to infer chart structure if deterministic code can
calculate it.

``` text
                 BIRTH CHART
                      │
                      ▼
               Structured Data
                      │
             ┌────────┴────────┐
             ▼                 ▼
      Geometry Engine     Interpretation
       deterministic            AI
             │                 │
             └────────┬────────┘
                      ▼
                AXIS READER
```

### Code determines

-   exact house boundaries
-   signs contained in each house
-   planetary house placement
-   opposing houses
-   intercepted signs
-   duplicated cusp signs
-   planetary concentrations
-   luminary locations
-   angular houses
-   sign spans
-   axis population

### AI may interpret

-   symbolic meaning
-   house polarity
-   sign polarity
-   planetary story
-   recurring themes
-   possible integration of opposing themes
-   whole-chart synthesis

AI must never invent chart geometry.

------------------------------------------------------------------------

# 3. User Experience

## Landing Page

Keep the initial experience extremely simple.

``` text
                 NATAL AXIS READER

              Unfold your birth chart.

Astrology charts aren't twelve isolated houses.
Every house has an opposite.

              [ Upload Birth Chart ]

                       or

             [ Enter Chart Manually ]
```

Possible supporting copy:

> See the relationships hidden across your chart.

Avoid overwhelming the landing page with astrology terminology.

------------------------------------------------------------------------

# 4. Main Application Views

The application should provide three primary views of the same natal
data:

``` text
WHEEL
  ↓
AXES
  ↓
ARCHITECTURE
```

These are not separate readings. They are different visual
representations of the same chart.

------------------------------------------------------------------------

# 5. View One --- Wheel

Display a traditional circular natal chart for orientation.

Show, where data is available:

-   zodiac signs
-   houses
-   house cusps
-   planets
-   ASC / DSC
-   IC / MC
-   planetary degrees

The wheel is not the primary innovation. Its purpose is to let the user
compare the familiar chart with the unfolded axis representation.

Provide a transition such as:

``` text
[ Unfold Chart ]
```

Ideally the wheel visually transforms into the six axes.

------------------------------------------------------------------------

# 6. View Two --- Axes

This is the primary product experience.

``` text
                    YOUR CHART

SELF          ●━━━━━━━━━━━━━━━🌙      OTHER
1st House                            7th House
Virgo                                Pisces

MINE           ━━━━━━━━━━━━━━━━━      OURS
2nd House                            8th House
Virgo → Libra                        Pisces → Aries

KNOWLEDGE      ━━━━━☀━━━━━━━━━━━      MEANING
3rd House                            9th House
Libra → Scorpio → Sag        Aries → Taurus → Gemini

ROOTS        ♇━━━━━━━━━━━━●●●●●       PUBLIC LIFE
4th House                            10th House
Sag → Capricorn                     Gemini → Cancer

CREATION      ⚷━━━━━━━━━━━━━━♃       COMMUNITY
5th House                            11th House
Cap → Aquarius                      Cancer → Leo

SYSTEMS      ♆♅━━━━━━━━━━━━━━━━       INNER WORLD
6th House                            12th House
Aquarius → Pisces                   Leo → Virgo
```

The visualization should immediately communicate:

-   opposing houses
-   signs occurring inside each house
-   planetary locations
-   planetary weight on each side
-   empty houses
-   luminaries
-   angles

------------------------------------------------------------------------

# 7. Interactive Axis Cards

Each axis should be expandable.

``` text
╭──────────────────────────────────────────────╮
│  4 ↔ 10                                     │
│  ROOTS                         PUBLIC LIFE   │
│                                              │
│  ♐ ─── ♑             ♊ ───────────── ♋      │
│   ♇                    ☿ ♄ ♀ ♂ ☊            │
╰──────────────────────────────────────────────╯
```

Expanded content:

-   House A structure and meaning
-   House B structure and meaning
-   exact cusps
-   all contained signs
-   planets and degrees
-   the polarity
-   sign polarity
-   planetary story
-   core lesson
-   personalized axis question

Interpret the houses together, not as unrelated sections.

------------------------------------------------------------------------

# 8. House Geometry Visualization

A major feature is showing how much of each sign actually occupies a
house.

Do **not** reduce:

``` text
9th House = Aries
```

when it actually spans:

``` text
28°49′ Aries
→ all of Taurus
→ 2°04′ Gemini
```

Instead show proportional geometry:

``` text
9TH HOUSE

♈│██████████████████████████████│♊
           ♉ TAURUS
              ☀
```

Hover/click detail:

``` text
Aries
28°49′ → 30°
1°11′ of house

Taurus
0° → 30°
30° of house
INTERCEPTED

Gemini
0° → 2°04′
2°04′ of house
```

Sign segments should be proportional to their angular contribution.

------------------------------------------------------------------------

# 9. Interceptions

An intercepted sign is a full 30° sign contained inside a house without
appearing on a house cusp.

Provide a dedicated visualization:

``` text
             INTERCEPTED AXIS

               ♏ SCORPIO
                3rd House
                    ↕
               ♉ TAURUS
                9th House
                    ☀
```

Display:

-   intercepted sign
-   containing house
-   opposite intercepted sign
-   opposite house
-   planets inside either intercepted sign

Do not assume every chart has interceptions.

------------------------------------------------------------------------

# 10. Duplicated Cusp Signs

If one sign appears on two consecutive house cusps, display it
separately.

``` text
DUPLICATED CUSPS

♍ Virgo
1st + 2nd Houses

♓ Pisces
7th + 8th Houses
```

Explain the structural relationship to interceptions when relevant.

------------------------------------------------------------------------

# 11. View Three --- Architecture

Architecture mode strips away most interpretation and emphasizes
planetary distribution.

``` text
YOUR CHART ARCHITECTURE

1H  ○ ━━━━━━━━━━━━━━━━━ ●  7H
                         🌙

2H  ○ ━━━━━━━━━━━━━━━━━ ○  8H

3H  ○ ━━━━━━━━━━━━━━━━━ ●  9H
                         ☀

4H  ● ━━━━━━━━━━━━━ ●●●●● 10H
    ♇                ☿♄♀♂☊

5H  ● ━━━━━━━━━━━━━━━━━ ● 11H
    ⚷                   ♃

6H  ●●━━━━━━━━━━━━━━━━━ ○ 12H
    ♆♅
```

Include a legend. Clicking a house or axis should open detail.

------------------------------------------------------------------------

# 12. Architecture Analysis

Summarize:

-   planetary weight by axis
-   which side of each axis is emphasized
-   Sun and Moon axes
-   ASC ↔ DSC
-   IC ↔ MC
-   stelliums or major concentrations
-   interceptions
-   neighboring-axis patterns

Do not use arbitrary numerical personality scores.

------------------------------------------------------------------------

# 13. Final Synthesis

Generate **The Six Questions of This Chart**, one personalized question
per axis.

Example structure:

``` text
1. Self ↔ Other
   How do I ______ without ______?

2. Mine ↔ Ours
   How do I ______ while ______?

3. Information ↔ Meaning
   How do I ______?

4. Roots ↔ Public Life
   How does ______ become ______?

5. Creation ↔ Community
   How can ______?

6. Systems ↔ Inner World
   How do I ______?
```

Also identify a **Central Axis** using observable structural evidence
such as planetary count, luminaries, angularity, nodes, concentrations,
and interceptions.

Finish with an **Overall Architecture** synthesis.

------------------------------------------------------------------------

# 14. Data Model

Normalize chart information into JSON before rendering.

``` json
{
  "houseSystem": "Placidus",
  "angles": {
    "asc": {"sign": "Virgo", "degree": 6.2},
    "mc": {"sign": "Gemini", "degree": 2.07}
  },
  "houses": [
    {
      "house": 1,
      "cusp": {"sign": "Virgo", "degree": 6.2}
    }
  ],
  "planets": [
    {
      "name": "Moon",
      "sign": "Pisces",
      "degree": 24
    }
  ]
}
```

Internally normalize zodiac positions to `0 <= longitude < 360`.

``` text
Aries         0°
Taurus       30°
Gemini       60°
Cancer       90°
Leo         120°
Virgo       150°
Libra       180°
Scorpio     210°
Sagittarius 240°
Capricorn   270°
Aquarius    300°
Pisces      330°
```

Then:

``` text
absoluteLongitude = signStartLongitude + degreeWithinSign
```

------------------------------------------------------------------------

# 15. Geometry Engine

Create deterministic utilities:

``` text
normalizeLongitude()
getAbsoluteLongitude()
getSignAtLongitude()
getHouseSpan()
getSignsInsideHouse()
getPlanetHouse()
getOppositeHouse()
getOppositeSign()
findInterceptedSigns()
findDuplicatedCusps()
findAxisPopulation()
findLuminaryAxes()
findAngularAxes()
findPlanetConcentrations()
```

Keep these pure where possible and unit-test them.

------------------------------------------------------------------------

# 16. House Span Algorithm

For house `N`:

``` text
start = cusp[N]
end = cusp[N + 1]
```

For house 12:

``` text
end = cusp[1] + 360°
```

If `end <= start`, add 360° to `end`.

Determine every zodiac boundary crossed between `start` and `end`.

Example output:

``` json
{
  "house": 9,
  "start": 28.816,
  "end": 62.066,
  "signSegments": [
    {"sign": "Aries", "degreesInsideHouse": 1.184},
    {"sign": "Taurus", "degreesInsideHouse": 30},
    {"sign": "Gemini", "degreesInsideHouse": 2.066}
  ]
}
```

This structure should directly drive the proportional UI.

------------------------------------------------------------------------

# 17. Interception Detection

A sign is intercepted when:

1.  its entire 30° range falls inside one house
2.  no house cusp occurs inside that sign

Do not hardcode intercepted pairs.

Example:

``` json
{
  "sign": "Taurus",
  "house": 9,
  "oppositeSign": "Scorpio",
  "oppositeHouse": 3
}
```

------------------------------------------------------------------------

# 18. Duplicated Cusp Detection

Compare the zodiac sign containing each house cusp.

If consecutive cusps fall within the same sign, flag it.

``` json
{
  "sign": "Virgo",
  "houses": [1, 2]
}
```

------------------------------------------------------------------------

# 19. Planetary House Assignment

Never assign a planet to a house based on sign.

A planet belongs to a house when its absolute longitude lies between
that house cusp and the next cusp, accounting for the 360° wrap.

------------------------------------------------------------------------

# 20. Input Methods

## MVP

Start with **manual structured entry**:

-   house system
-   twelve house cusps
-   planetary sign + degree
-   nodes
-   Chiron

This is more reliable than image extraction.

## Later

Add chart-image upload.

When a chart includes printed planetary/cusp tables, prefer those exact
values over visually estimating positions from the wheel.

Image parsing must output the same normalized JSON used by manual entry.

If a value cannot be read confidently, ask the user to correct it
instead of guessing.

------------------------------------------------------------------------

# 21. Validation Screen

Before interpretation, show the parsed chart back to the user.

``` text
WE READ YOUR CHART AS:

ASC     Virgo 6°12′
MC      Gemini 2°04′

Sun     Taurus 16°59′
Moon    Pisces 24°...
Mercury Gemini ...
...

[ Looks Right ]
[ Edit Chart ]
```

Especially important for image upload.

------------------------------------------------------------------------

# 22. AI Interpretation Contract

AI receives **structured chart data**, not merely an image.

Example axis payload:

``` json
{
  "axis": 4,
  "houses": [4, 10],
  "theme": "Roots ↔ Public Life",
  "houseA": {},
  "houseB": {},
  "signPolarities": [],
  "planets": [],
  "interceptions": [],
  "angles": [],
  "structuralNotes": []
}
```

AI may return:

-   house interpretation
-   polarity interpretation
-   sign polarity
-   planetary story
-   core lesson
-   personalized axis question

It should not recalculate factual chart structure.

------------------------------------------------------------------------

# 23. Interpretation Rules

1.  Chart data is the source of truth.
2.  Never invent degrees, houses, cusps, or aspects.
3.  Distinguish cusp signs from all signs contained within houses.
4.  Do not assume interceptions or stelliums.
5.  Empty houses still matter structurally.
6.  Interpret opposing houses together.
7.  Distinguish structural facts from symbolic interpretation.
8.  Use traditional dignity only when correctly supported.
9.  Mark missing data as unknown.
10. Avoid deterministic claims about personality or future events.
11. Treat astrology as a symbolic/interpretive framework rather than
    scientifically established causation.
12. Prefer patterns supported by multiple placements over generic sign
    descriptions.

------------------------------------------------------------------------

# 24. Visual Direction

Avoid the stereotypical astrology aesthetic:

-   purple galaxy backgrounds
-   excessive gold
-   glowing stars everywhere
-   mystical stock imagery
-   ornate occult decoration

Instead, make it resemble an **information visualization / scientific
instrument**.

Use:

-   generous whitespace
-   thin geometric lines
-   restrained typography
-   subtle zodiac glyphs
-   precise degree labels
-   measurable intervals
-   planets as data points
-   smooth geometric animation
-   strong light/dark modes

The chart provides the complexity. The interface stays quiet.

------------------------------------------------------------------------

# 25. Signature Animation

``` text
           CIRCULAR CHART

                ◯
               ╱│╲
              ╱ │ ╲

                 ↓

       OPPOSING HOUSES SEPARATE

                 ↓

1 ━━━━━━━━━━━━━━━━━━━━━ 7
2 ━━━━━━━━━━━━━━━━━━━━━ 8
3 ━━━━━━━━━━━━━━━━━━━━━ 9
4 ━━━━━━━━━━━━━━━━━━━━ 10
5 ━━━━━━━━━━━━━━━━━━━━ 11
6 ━━━━━━━━━━━━━━━━━━━━ 12
```

Conceptually:

> The chart is not being replaced. It is being unfolded.

------------------------------------------------------------------------

# 26. Responsive Design

Desktop axes can remain horizontal.

On narrow screens, either use a readable vertical axis representation or
carefully designed horizontal scrolling. Never shrink labels until they
become unreadable.

------------------------------------------------------------------------

# 27. Accessibility

-   do not communicate meaning through color alone
-   text-label zodiac and planet glyphs
-   keyboard-accessible axis cards
-   semantic buttons
-   visible focus states
-   sufficient contrast
-   support `prefers-reduced-motion`
-   accessible descriptions for chart visualizations

------------------------------------------------------------------------

# 28. GitHub Pages Architecture

Recommended implementation:

``` text
Vite
React
TypeScript
SVG
CSS
```

A simpler HTML/CSS/vanilla-JS implementation is acceptable if it can
support the interaction cleanly.

Avoid unnecessary infrastructure.

------------------------------------------------------------------------

# 29. Security

Never place a private AI API key in client-side JavaScript.

If AI interpretation is added:

``` text
GitHub Pages
     │
     │ structured chart JSON
     ▼
Serverless API
     │
     ▼
AI Provider
     │
     ▼
Interpretation JSON
     │
     ▼
GitHub Pages UI
```

The deterministic chart visualization should remain usable when AI is
unavailable.

------------------------------------------------------------------------

# 30. Privacy

Natal charts may expose birth date, birth time, and birthplace.

Minimize collection.

Manual mode only needs derived chart data:

-   house cusps
-   planetary positions
-   house system

If images are uploaded, clearly explain whether they leave the browser.

------------------------------------------------------------------------

# 31. Suggested Repository Structure

``` text
natal-axis-reader/
│
├── README.md
├── PROJECT_BIBLE.md
├── LICENSE
├── package.json
├── vite.config.ts
│
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/
│   │   ├── ChartWheel.tsx
│   │   ├── AxisView.tsx
│   │   ├── AxisCard.tsx
│   │   ├── ArchitectureView.tsx
│   │   ├── HouseSpan.tsx
│   │   ├── InterceptionCard.tsx
│   │   ├── PlanetGlyph.tsx
│   │   ├── ZodiacGlyph.tsx
│   │   └── ChartInput.tsx
│   ├── geometry/
│   │   ├── longitude.ts
│   │   ├── houses.ts
│   │   ├── axes.ts
│   │   ├── interceptions.ts
│   │   └── concentrations.ts
│   ├── data/
│   │   ├── signs.ts
│   │   ├── planets.ts
│   │   └── axisThemes.ts
│   ├── types/
│   │   └── chart.ts
│   ├── interpretation/
│   │   ├── buildPrompt.ts
│   │   └── schema.ts
│   └── styles/
│       └── global.css
│
├── tests/
│   ├── houses.test.ts
│   ├── axes.test.ts
│   └── interceptions.test.ts
│
└── public/
```

------------------------------------------------------------------------

# 32. Suggested TypeScript Types

``` ts
export type ZodiacSign =
  | "Aries" | "Taurus" | "Gemini" | "Cancer"
  | "Leo" | "Virgo" | "Libra" | "Scorpio"
  | "Sagittarius" | "Capricorn" | "Aquarius" | "Pisces";

export interface ZodiacPosition {
  sign: ZodiacSign;
  degree: number;
  minute?: number;
  longitude: number;
}

export interface Planet {
  name: string;
  position: ZodiacPosition;
}

export interface House {
  number: number;
  cusp: ZodiacPosition;
}

export interface NatalChart {
  houseSystem: string;
  houses: House[];
  planets: Planet[];
}

export interface SignSegment {
  sign: ZodiacSign;
  startLongitude: number;
  endLongitude: number;
  degreesInsideHouse: number;
  intercepted: boolean;
}

export interface HouseGeometry {
  house: number;
  startLongitude: number;
  endLongitude: number;
  signSegments: SignSegment[];
  planets: Planet[];
}

export interface Axis {
  number: number;
  houses: [number, number];
  title: string;
  polarity: [string, string];
}
```

------------------------------------------------------------------------

# 33. Axis Metadata

Keep thematic labels separate from geometry:

``` ts
export const AXES = [
  { number: 1, houses: [1, 7], title: "Identity & Partnership", polarity: ["Self", "Other"] },
  { number: 2, houses: [2, 8], title: "Personal & Shared Value", polarity: ["Mine", "Ours"] },
  { number: 3, houses: [3, 9], title: "Knowledge & Meaning", polarity: ["Information", "Worldview"] },
  { number: 4, houses: [4, 10], title: "Roots & Public Life", polarity: ["Private Foundation", "Public Identity"] },
  { number: 5, houses: [5, 11], title: "Creation & Community", polarity: ["Individual Expression", "Collective Belonging"] },
  { number: 6, houses: [6, 12], title: "Daily Systems & Inner World", polarity: ["Organization", "Surrender"] }
];
```

------------------------------------------------------------------------

# 34. MVP

Do not start by building every feature.

## MVP Requirements

### Input

Manual chart entry.

### Calculation

-   normalize zodiac positions
-   calculate house spans
-   determine signs inside each house
-   assign planets to houses
-   create six axes
-   detect interceptions
-   detect duplicated cusp signs

### Visualization

-   six-axis overview
-   expandable axis cards
-   proportional sign spans
-   planet markers
-   architecture view

### Explanation

Static educational text is enough initially.

AI interpretation comes later.

### Persistence

Optional `localStorage`.

No accounts.

------------------------------------------------------------------------

# 35. Phase Two

After geometry and UI are stable:

-   traditional wheel visualization
-   wheel → axes animation
-   chart-image upload
-   chart parsing
-   validation screen
-   AI interpretation
-   shareable chart links
-   export reading
-   print-friendly mode
-   dark-mode refinements

------------------------------------------------------------------------

# 36. Phase Three

Possible future features:

-   synastry axis comparison
-   transit overlays
-   progression overlays
-   multiple house systems
-   Placidus vs Whole Sign comparison
-   aspect visualization
-   saved charts
-   anonymous share links
-   SVG/PNG architecture export
-   educational mode

Do not implement these before the core axis experience works.

------------------------------------------------------------------------

# 37. Non-Goals for MVP

Do not prioritize:

-   daily horoscopes
-   tarot
-   compatibility scoring
-   predictive astrology
-   social feed
-   accounts
-   subscriptions
-   giant astrology encyclopedia
-   elaborate backend infrastructure

Keep the product focused on:

> **Understanding natal-chart structure through opposing houses.**

------------------------------------------------------------------------

# 38. Definition of Done --- First Prototype

A user can:

1.  open the site
2.  enter twelve house cusps
3.  enter planetary positions
4.  submit the chart
5.  see all six axes
6.  see every sign actually contained in each house
7.  see planets assigned to the correct houses
8.  identify intercepted signs
9.  identify duplicated cusp signs
10. expand an axis and understand its structure
11. switch to architecture view
12. refresh without the interface breaking
13. comfortably use the site on desktop and mobile

Geometry calculations must have tests.

------------------------------------------------------------------------

# 39. Codex Build Priorities

Implement in this order:

1.  **Data model**
2.  **Zodiac/house geometry**
3.  **Automated tests**
4.  **Sample chart fixtures**
5.  **Six-axis overview**
6.  **Proportional house-span visualization**
7.  **Expandable axis detail**
8.  **Architecture view**
9.  **Manual chart input**
10. **Responsive styling + accessibility**
11. **Only then wheel animation / image parsing / AI**

Do not begin with AI or image extraction.

The geometry engine is the foundation.

------------------------------------------------------------------------

# 40. Development Rules

-   Keep chart mathematics separate from UI code.
-   Prefer pure functions.
-   Test 0°/360° wraparound.
-   Test houses crossing Pisces → Aries.
-   Test intercepted signs.
-   Test duplicated cusps.
-   Test planets exactly on or extremely near house cusps.
-   Define and document the cusp-boundary convention.
-   Never infer a planet's house from its sign.
-   Do not hardcode the seed chart into production logic.
-   Keep axis labels in configuration.
-   Keep the app useful without AI.
-   Avoid premature backend complexity.
-   Prefer SVG/CSS for geometry where practical.
-   Preserve exact values internally even if the UI rounds them.
-   Make uncertain parsed data editable before interpretation.

------------------------------------------------------------------------

# 41. Seed Fixture

Include at least one fixture containing:

-   intercepted signs
-   duplicated cusp signs
-   empty houses
-   a heavily populated house
-   planets in different parts of houses
-   360° wraparound

The fixture should expose bugs, not determine the algorithm.

------------------------------------------------------------------------

# 42. README Pitch

Short description:

> **Natal Axis Reader unfolds a circular birth chart into its six
> opposing house axes, making planetary weight, sign spans,
> interceptions, and the relationships between opposite houses easier to
> see.**

Tagline:

> **Unfold your birth chart.**

Alternative:

> **See the relationships hidden across your birth chart.**

------------------------------------------------------------------------

# 43. Core Product Test

At every design or engineering decision, ask:

> Does this make the relationship between opposite houses easier to
> understand?

If not, it is secondary.

The strongest version of this project is not the one with the most
astrology features.

It is the one where someone looks at a complicated circular natal chart,
presses **Unfold**, and immediately sees a structure they could not see
before.
