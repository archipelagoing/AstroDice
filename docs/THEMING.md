# Astro-Dice — Theme & Brand Guide

This guide records the implemented visual identity as of October 2026 and the conventions to follow when extending it. The rendered design lives in [styles.css](../src/styles.css), with markup and interaction in [App.tsx](../src/App.tsx) and [components](../src/components/). Update this guide when those choices change. It describes current behavior; it does not imply that every value is already a reusable CSS token or that a full accessibility audit has been completed.

## Brand and purpose

**Product name:** Astro-Dice. The header and footer render the wordmark as `ASTRO–DICE`; page metadata uses `Astro-Dice`. “Natal Axis Reader” is the historical name and remains in some reference documents and the saved-chart storage key for compatibility.

**Brand subtitle:** “Six faces. Six axes.”

**Current hero:** “Roll into your birth chart.”

**Supporting copy:** “Your birth details. Your whole chart. Six sides of a die to help you learn it.”

**Learning sequence:** Roll → recall → reveal → understand → roll again.

The brand combines a birth-chart wheel, six opposing house axes, and a six-sided die. The die chooses a part of the user's existing chart to practice recalling. The face assignments are permanent:

| Die face | Houses | Theme                       |
| -------- | ------ | --------------------------- |
| 1        | 1 ↔ 7  | Self ↔ Other                |
| 2        | 2 ↔ 8  | Mine ↔ Ours                 |
| 3        | 3 ↔ 9  | Information ↔ Worldview     |
| 4        | 4 ↔ 10 | Roots ↔ Public life         |
| 5        | 5 ↔ 11 | Creation ↔ Community        |
| 6        | 6 ↔ 12 | Daily systems ↔ Inner world |

Use clear, welcoming, reflective language. Explain planet (what), sign (how), and house (where) together. Keep measured chart facts distinct from symbolic interpretations. Preserve the recall-before-reveal sequence in practice mode. Favor specific labels such as “Enter birth details” and “Explore houses 3 ↔ 9.”

## Visual direction

The implemented foundation is a celestial deck: warm cream and cloud gradients in light mode, navy and a constellation sky in dark mode. Shared reading cards use opaque surfaces, fine double borders, restrained corner stars, and symbol medallions. The atmospheric SVG and gradients stay behind the cards; settled reading text remains still.

The header uses four raised dice controls with distinct wheel, cube, planet, and node emblems. Actual numbered die faces remain the house-axis selectors. Desktop headers occupy an 80px reserved slot and compact to 64px; phones use a 156px slot with a two-by-two destination grid and hide the subtitle. The planet/sign picker retains adjacent columns.

### Reading hierarchy

Placement facts lead into the main synthesis, followed by What / How / Where, everyday examples, reflection, and further exploration. Blue example insets, warm gold reflection panels, and violet supporting sections guide attention. Body text is 17px by default; the saved Larger preference raises it to 20px, with corresponding key-meaning sizes. Full cards grow with content and nested readings avoid repeated outer ornament.

Selections and per-route reading positions remain in memory while moving between destinations. Hash links, refresh, browser history, and chart storage remain supported. The text-size preference uses `astro-dice.text-size` independently of chart storage. The theme currently starts in light mode.

## Marks and assets

| Asset                      | Source                                                          | Role                                                                                          |
| -------------------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Header brandmark           | `Brandmark` in [App.tsx](../src/App.tsx)                        | Rounded square with six pips and fine connecting axis lines; inline SVG inherits theme colors |
| Browser favicon            | [public/dice.svg](../public/dice.svg)                           | Six pale-cream pips on an amethyst rounded square; fixed colors                    |
| Dice component             | `Die` in [DicePractice.tsx](../src/components/DicePractice.tsx) | Reusable CSS die with a 3×3 pip grid and faces 1–6                                            |
| Wheel-to-axes illustration | `UnfoldIllustration` in [App.tsx](../src/App.tsx)               | Inline SVG with theme-aware lines and one gold emphasis point                                 |
| Original/reference artwork | [assets/branding/dice.png](../assets/branding/dice.png)         | Retained source image; currently not imported or displayed by the app                         |

Use the existing SVG and CSS marks for interface work. Keep original/reference artwork in `assets/branding/`; put assets that must be served unchanged in `public/`. Do not assume a source image is part of the live UI merely because it is checked in.

## Color palette

The single source of theme tokens is [celestial.css](../src/celestial.css), loaded after the structural [styles.css](../src/styles.css). Use shared tokens instead of hardcoded surface colors.

| Token | Light | Dark | Role |
| --- | --- | --- | --- |
| `--paper` | `#F5EEDF` | `#172B4D` | Page canvas |
| `--card` | `#FFF7E8` | `#223B60` | Opaque cards, header, picker, forms |
| `--soft` | `#F0E3CD` | `#2D4A73` | Raised surfaces |
| `--ink` | `#342D46` | `#F5EEDF` | Main text |
| `--muted` | `#675D73` | `#BBCBE3` | Supporting text |
| `--accent` | `#7050A5` | `#C8B5F2` | Interaction |
| `--button-ink` | `#FFF7E8` | `#172B4D` | Primary button labels |
| `--gold` | `#947037` | `#E8CD98` | Celestial borders, stars, focus |
| `--cloud` | `#E6DCEE` | `#355887` | Atmospheric gradient |
| `--blush` | `#EED8CE` | `#494777` | Atmospheric gradient |

Theme-aware blue, coral, green, yellow, and violet background/ink/accent families support the reading insets and sign-element indicators. Element colors accompany names: fire coral, earth green, air gold, water blue. Node identity badges use blue and coral independently of sign-element colors. Decorative colors are not general body-text colors. Browser checks cover text contrast on key reading panels in both themes; this is not a full accessibility certification.

## Typography

Fonts are loaded through a Google Fonts CSS import, with local fallbacks.

| Role                                 | Family                                   | Current treatment                                    |
| ------------------------------------ | ---------------------------------------- | ---------------------------------------------------- |
| Body, controls, metadata             | `"DM Sans", sans-serif`                  | Imported weights 400, 450, 500, 550, 600, 650, 700   |
| Display and major reading headings   | `"Libre Caslon Display", Georgia, serif` | Weight 400; expressive scale and restrained tracking |
| Selected chart glyph/text treatments | `Georgia, serif`                         | Supplementary serif rendering                        |

The desktop hero title is 86px with 0.99 line-height and −2.5px tracking. Chart-section titles are 38px; the practice introduction is 49px. Eyebrows are typically 10px, uppercase, weight 600, with 1.7px letter spacing. Main hero copy is 15px with 1.8 line-height. Controls are commonly 11–12px; reading copy varies by component. Sabian cards use 21px titles, 13px body copy, and 11px notes.

These are current component values, not a universal type scale. Inspect the relevant responsive rules before changing a heading size. Keep explanatory prose comfortably spaced and retain visible text names alongside glyphs.

## Zodiac and planetary symbols

The canonical zodiac names, glyphs, and elements live in [catalog.ts](../src/data/catalog.ts). Reuse this data instead of maintaining another symbol map.

| Sign        | Glyph | Element |
| ----------- | ----- | ------- |
| Aries       | ♈︎    | Fire    |
| Taurus      | ♉︎    | Earth   |
| Gemini      | ♊︎    | Air     |
| Cancer      | ♋︎    | Water   |
| Leo         | ♌︎    | Fire    |
| Virgo       | ♍︎    | Earth   |
| Libra       | ♎︎    | Air     |
| Scorpio     | ♏︎    | Water   |
| Sagittarius | ♐︎    | Fire    |
| Capricorn   | ♑︎    | Earth   |
| Aquarius    | ♒︎    | Air     |
| Pisces      | ♓︎    | Water   |

Use `SignGlyph` and `ZodiacPosition` from [ZodiacLabel.tsx](../src/components/ZodiacLabel.tsx) for sign labels and positions. Their decorative glyphs are hidden from assistive technology while the sign name remains readable. The glyph strings request text presentation rather than colorful emoji; appearance can still vary by installed font. Planet and node symbols use the catalog's existing `glyph()` helper. Keep the North and South Nodes distinct from planets in explanatory copy.

## Layout and spacing

The app uses plain CSS with component classes, Grid, and Flexbox. There is no utility framework or tokenized spacing scale. Most content sits inside a centered 1224px maximum-width main area; the header has a 1320px maximum width. Desktop gutters are 48px, moving to 26px and then 20px on smaller screens.

Major breakpoints are 1320px, 1050px, 800px, and 520px, with a wide-screen hero adjustment from 1500px. Layout rules are distributed across the stylesheet, so later rules can override earlier ones. The hero stacks on narrow screens; chart/readings and supporting panels also adapt to available width. Preserve the six hero face mappings even when their spacing tightens.

Common surface treatments are 1px borders, modest control rounding (typically 3–5px), and 12px rounding on hero face tiles and Sabian cards. Sabian cards have 18px padding. Use shadows sparingly: the die's offset edge is the main tactile effect.

## Components and states

- **Primary actions:** `--ink` background and `--paper` text. Secondary actions use transparent backgrounds and `--line` borders, becoming `--soft` on hover. Preserve visible keyboard focus.
- **View switch:** a muted track containing individually selectable buttons; the selected view has a `--card` surface and main ink. Selection is exposed with `aria-pressed`.
- **Dice:** the main die is 110×110px, with a 3×3 grid, 21px padding, 10px gaps, and 20% rounding. Hero face tiles use 34×34px dice with smaller padding and an offset edge shadow. A die face is always accompanied by its house-pair label.
- **Chart wheel and axis spans:** use the element palette, thin geometry, labels, and selected states. Keep exact position indicators separate from labels that are displaced to avoid collisions. Use the accessible placement list as an alternative to the SVG interaction.
- **Placement readings:** retain the name/glyph, sign and degree, Sabian card, and the what/how/where explanation hierarchy. House readings distinguish cusp signs, additional sign spans, and interceptions.
- **Sabian cards:** `--soft` background, fine border, 12px corners, gold decorative star, and the selected sign's glyph. “Read symbol” expands a 540px-tall iframe showing Lynda Hill's live page. Only the surrounding card is themed by Astro-Dice; the external page's content, typography, navigation, and colors remain source-controlled. The new-tab lookup remains available if embedding fails.
- **Forms and errors:** maintain explicit labels, helper text, error explanations, and visible focus. Color supplements the message rather than carrying it alone.

## Motion and scrolling

The header compacts when scroll position exceeds 120px and expands again at 48px or less. The different thresholds avoid flicker. Its reserved layout slot stays in place so resizing does not shift the chart. Expanded header heights are 112px desktop, 90px at the 800px breakpoint, and 83px at 520px; compact height is 64px.

The height, shadow, brandmark, and subtitle transitions take 280ms. The compact brandmark rotates −8° and scales to 85%; the subtitle fades and collapses. Hero dice rotate −8° on hover. The practice roll animation lasts 500ms. Ordinary button/link color and background transitions last 180ms.

The final scroll-padding-top is 88px to leave space for the sticky bar. Global scrolling is `auto`; selected navigation actions may request smooth scrolling when reduced motion is not enabled. All CSS transitions and animations are disabled under `prefers-reduced-motion: reduce`; chart actions also respect that preference. Keep new motion brief and functional.

## Accessibility and maintenance

Maintain the skip link, keyboard activation, explicit names, and focus-visible outlines (2px gold with a 5px offset). Never rely solely on an element color, glyph, animation, or hover to communicate a placement or control state. Test long readings and narrow screens as well as the spacious hero. A full screen-reader and contrast audit remains roadmap work; the existing automated checks are not proof of complete compliance.

When changing the theme:

1. Update semantic colors in both light and dark declarations, and inspect any local color overrides affected by the change.
2. Reuse the catalog, dice, and zodiac-label components so mappings and symbols stay consistent.
3. Check the hero, full chart, reading cards, axes, birth form, dice practice, and Sabian reader at desktop and mobile widths.
4. Check keyboard focus, reduced motion, long text, and both themes. The external reader should remain usable even though it has its own theme.
5. Run the relevant existing browser checks and `npm run build` for UI changes. Update this document and the [README](../README.md) when the brand, assets, or behavior change.

Existing browser coverage lives in [e2e/](../e2e/), including compact-header, mobile, reduced-motion, and chart-learning flows. For product direction see the [project bible](PROJECT_BIBLE.md); for outstanding work see the [roadmap](TODO.md).
