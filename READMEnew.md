# Natal Axis Reader

> **Unfold your birth chart.**

Natal Axis Reader is an interactive way to explore a natal chart through its **six opposing house axes**.

Instead of treating the twelve houses as isolated sections, it unfolds the circular chart into six relationships:

```text
1st  ━━━━━━━━━━━━━━━━━━━  7th    Self ↔ Other
2nd  ━━━━━━━━━━━━━━━━━━━  8th    Mine ↔ Ours
3rd  ━━━━━━━━━━━━━━━━━━━  9th    Information ↔ Worldview
4th  ━━━━━━━━━━━━━━━━━━━ 10th    Roots ↔ Public Life
5th  ━━━━━━━━━━━━━━━━━━━ 11th    Creation ↔ Community
6th  ━━━━━━━━━━━━━━━━━━━ 12th    Systems ↔ Inner World
```

The goal is to make the **architecture of a birth chart visible**.

---

## Why?

Most natal chart tools are built around the wheel.

That's useful, but it can make something important surprisingly difficult to see:

**every house exists in relationship with the house opposite it.**

Natal Axis Reader takes the same chart and reorganizes it around those relationships.

Instead of:

```text
12 separate houses
```

you get:

```text
6 opposing systems
```

This makes it easier to see where planets accumulate, which side of an axis is emphasized, where signs are intercepted, and how much of each sign actually occupies a house.

---

## The Three Views

### Wheel

The familiar circular natal chart.

```text
        ╭───────╮
      ╱           ╲
     │      ◯      │
      ╲           ╱
        ╰───────╯
```

### Axes

The wheel unfolds into six oppositions.

```text
SELF          ●━━━━━━━━━━━━━━━🌙      OTHER
1st House                            7th House

MINE           ━━━━━━━━━━━━━━━━━      OURS
2nd House                            8th House

KNOWLEDGE      ━━━━━☀━━━━━━━━━━━      MEANING
3rd House                            9th House

ROOTS        ♇━━━━━━━━━━━━●●●●●       PUBLIC LIFE
4th House                            10th House

CREATION      ⚷━━━━━━━━━━━━━━♃       COMMUNITY
5th House                            11th House

SYSTEMS      ♆♅━━━━━━━━━━━━━━━━       INNER WORLD
6th House                            12th House
```

### Architecture

Strip away most of the interpretation and look at the distribution of the chart itself.

```text
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

---

## Houses Are Regions, Not Labels

A major goal of the project is to represent house geometry accurately.

A house with an Aries cusp is **not necessarily an "Aries house."**

For example, a house might span:

```text
28°49′ Aries
      ↓
all 30° Taurus
      ↓
2°04′ Gemini
```

Natal Axis Reader represents the actual span:

```text
9TH HOUSE

♈│██████████████████████████████│♊
           ♉ TAURUS
              ☀
```

That allows the interface to expose things that are easy to miss in a traditional chart, including:

- intercepted signs
- duplicated cusp signs
- uneven house sizes
- planets inside intercepted signs
- planetary concentrations
- empty houses
- axis imbalance

---

## Geometry First

Chart structure is calculated deterministically.

```text
                  CHART DATA
                      │
                      ▼
               Geometry Engine
                      │
             ┌────────┴────────┐
             ▼                 ▼
        Visualization      Interpretation
```

Code determines:

- house boundaries
- sign spans
- planetary houses
- opposing houses
- interceptions
- duplicated cusps
- planetary distribution
- angular structure

Interpretation sits **on top of** that geometry.

An AI model should never be responsible for deciding where a planet actually is.

---

## The Six Axes

| Axis | Houses | Polarity |
|---|---|---|
| I | 1 ↔ 7 | Self ↔ Other |
| II | 2 ↔ 8 | Mine ↔ Ours |
| III | 3 ↔ 9 | Information ↔ Worldview |
| IV | 4 ↔ 10 | Roots ↔ Public Life |
| V | 5 ↔ 11 | Creation ↔ Community |
| VI | 6 ↔ 12 | Systems ↔ Inner World |

Each axis can be expanded to explore its houses, signs, planets, geometry, and symbolic polarity.

---

## Interceptions

When an entire zodiac sign falls inside a house without appearing on either cusp, the app identifies it as intercepted.

```text
       ♏ SCORPIO
        3rd House
            ↕
       ♉ TAURUS
        9th House
            ☀
```

Duplicated cusp signs are detected as well.

These are calculated from house geometry rather than inferred from sign labels.

---

## How It Works

All zodiac positions are converted to absolute longitude:

```text
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

From there, the geometry engine can calculate:

```text
house cusp
    ↓
house span
    ↓
sign segments
    ↓
planetary positions
    ↓
interceptions
    ↓
opposing axes
    ↓
visualization
```

This keeps chart mathematics separate from interpretation and UI code.

---

## MVP

The first version focuses on getting the underlying system right.

- [ ] Manual natal-chart entry
- [ ] Twelve house cusps
- [ ] Planetary positions
- [ ] House geometry
- [ ] Planet → house assignment
- [ ] Six-axis visualization
- [ ] Proportional sign spans
- [ ] Interception detection
- [ ] Duplicated cusp detection
- [ ] Architecture view
- [ ] Responsive interface
- [ ] GitHub Pages deployment

Chart-image parsing and AI interpretation come **after** the deterministic geometry is stable.

---

## Tech

Planned stack:

```text
Vite
React
TypeScript
SVG
CSS
```

The frontend is designed to deploy through GitHub Pages.

AI interpretation, if enabled later, will use a separate backend/serverless endpoint so private API credentials are never exposed in the client.

---

## Project Structure

```text
src/
├── components/       UI + visualizations
├── geometry/         chart mathematics
├── data/             zodiac / planet / axis metadata
├── types/            chart data models
├── interpretation/   interpretation interface
└── styles/

tests/                 geometry tests
```

The geometry layer should remain independent of React wherever possible.

---

## Development

```bash
git clone <repository-url>
cd natal-axis-reader

npm install
npm run dev
```

Run tests:

```bash
npm test
```

Build:

```bash
npm run build
```

---

## Project Docs

For the full product and engineering specification:

**[`PROJECT_BIBLE.md`](./PROJECT_BIBLE.md)**

For current implementation status and build order:

**[`todo.md`](./todo.md)**

The project bible defines **what the system should become**.

The todo defines **what should be built next**.

---

## Roadmap

Once the core axis system is stable:

- circular wheel visualization
- animated **Wheel → Axes** transformation
- natal-chart image upload
- chart extraction + validation
- AI-assisted symbolic interpretation
- chart exports
- shareable visualizations
- multiple house systems
- synastry axis comparison
- transit overlays

The core visualization comes first.

---

## Design Philosophy

Natal Axis Reader should feel more like an **information visualization tool** than a stereotypical astrology website.

Think:

**geometry · typography · intervals · relationships · structure**

rather than:

**galaxies · glitter · purple gradients · generic horoscope cards**

The complexity should come from the chart itself.

---

## Status

🚧 **Early development**

The current priority is the deterministic chart geometry engine and the first six-axis visualization.

See [`todo.md`](./todo.md) for current progress.

---

## About

Astrology is treated here as a **symbolic and interpretive framework**, not scientifically established causation.

The mathematical representation of zodiac positions, house boundaries, and angular relationships is kept separate from their astrological interpretation.

---

## The Idea in One Sentence

> **Take a chart that's difficult to read as a circle, unfold it across its six oppositions, and make its structure visible.**