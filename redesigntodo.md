# Astro-Dice celestial redesign TODO

**Created October 8, 2026 · Implementation checklist**

Converted from the supplied celestial redesign proposal. Design reference: [UI_REDESIGN_PROPOSAL.md](docs/UI_REDESIGN_PROPOSAL.md).

Unchecked items require implementation or verification against this redesign. Some underlying functionality already exists; reuse it and mark an item complete only when its redesign acceptance criteria are met. This checklist does not replace the [product roadmap](docs/TODO.md).

## Design objective

A magical celestial deck: the wheel is the star map, house pairs are connected reading cards, and dice choose what to practice. Light mode is warm cream with celestial clouds; dark mode is visibly navy and blue with a night sky. Use tarot-inspired cards, tactile dice, clear reading hierarchy, and one focal point per screen.

## 1. Shared themes and visual foundation

- [ ] Consolidate accumulated CSS overrides into shared theme tokens and reusable component styles.
- [ ] Implement the exact palette below consistently across the header, navigation, picker, cards, dice trays, chart, forms, and footer.
- [ ] Use amethyst primary buttons with pale-cream labels in light mode; luminous-lavender buttons with celestial-navy labels in dark mode.
- [ ] Keep zodiac accent families consistent: fire coral, earth green, air gold, and water blue. Adjust brightness for each theme and retain sign labels.
- [ ] Build a warm cream cloud canvas with blush and lavender gradients around page edges.
- [ ] Build a navy night-sky canvas with nebula-blue/violet edges, sparse stars, and small constellation details.
- [ ] Keep card reading surfaces opaque and visually calm; keep texture, stars, sparkles, and clouds outside text columns.
- [ ] Use original SVG ornament and CSS gradients for celestial decoration.
- [ ] Keep cream surfaces throughout light mode and navy/blue surfaces throughout dark mode, including overlays and elevated containers.
- [ ] Use restrained metallic borders and selection halos; keep body text crisp without glow.

### Required palette

| Role | Light: celestial clouds | Dark: night sky |
| --- | --- | --- |
| Page canvas | Warm cream `#F5EEDF` | Celestial navy `#172B4D` |
| Main reading card | Pale cream `#FFF7E8` | Twilight blue `#223B60` |
| Raised surfaces | Vanilla `#F0E3CD` | Soft navy `#2D4A73` |
| Body text | Deep plum `#342D46` | Warm moonlight `#F5EEDF` |
| Supporting text | Muted plum `#675D73` | Blue lavender `#BBCBE3` |
| Main interactive accent | Amethyst `#7050A5` | Luminous lavender `#C8B5F2` |
| Celestial linework | Antique gold `#947037` | Champagne gold `#E8CD98` |
| Atmospheric edges | Blush `#EED8CE`, lavender `#E6DCEE` | Nebula blue `#355887`, violet `#494777` |

## 2. Tarot-inspired cards and readable typography

- [ ] Create a shared celestial card frame with rounded corners, a fine double border, and small corner ornaments.
- [ ] Add a centered symbol medallion for the selected planet, sign, node, or house number.
- [ ] Use roughly 2:3 portrait proportions for compact preview cards; let full reading cards grow with content.
- [ ] Add restrained star, moon-phase, or orbital dividers between major sections.
- [ ] Frame the reflection question near the card foot as a readable inscription.
- [ ] Simplify ornaments on phones and preserve generous text width.
- [ ] Use one outer reader surface with a few meaningful insets rather than nested full ornamental cards.
- [ ] Establish the reading sequence: placement and facts → key meaning → What / How / Where → everyday example → reflection → further exploration.
- [ ] Keep Sabian symbols and longer context available after the core explanation.
- [ ] Highlight central concepts or actions without bolding entire paragraphs.
- [ ] Use blue example insets, warm yellow reflection panels, and quieter violet further-exploration accents.
- [ ] Use a 1.6–1.75 line height, approximately 55–65 characters per line, and meaningful paragraph breaks.
- [ ] Apply an 8px spacing scale with 24–32px between major sections and extra separation around reflection questions.
- [ ] Add a visible Text size control with comfortable and larger options; save the preference locally.
- [ ] Review one complete reading card in both themes before applying its frame across all views.

### Typography targets

| Content | Desktop | Phone |
| --- | --- | --- |
| Page title | 40–52px serif | 30–36px serif |
| Placement/pair title | 28–34px serif | 26–30px serif |
| Section heading | 20–24px bold sans serif | 20–22px bold sans serif |
| Key meaning | 19–20px | 18–19px |
| Reading body | 17–18px | 16–18px |
| Labels and metadata | 13–14px | 13–14px |

## 3. Header, navigation, and workspace continuity

- [ ] Preserve all four destinations: Your chart, Axis-Dice, Planets through signs, and North / South Node.
- [ ] Style destination controls as polished dice with inset symbols, beveled edges, pip ornament, and short cast shadows.
- [ ] Give destinations distinct symbols: wheel, die, planet, and opposing nodes; keep readable labels.
- [ ] Reserve numbered die results for the fixed house-pair meanings.
- [ ] Give the active destination a stronger celestial border and quiet halo.
- [ ] Use sun/crescent symbols for the theme control at the far right.
- [ ] Target an approximately 80px desktop header without shifting the reading position as it contracts.
- [ ] Use a compact brand row and two-by-two destination grid on phones, targeting 140–160px total where labels fit comfortably.
- [ ] Omit the subtitle at narrow widths and verify wrapped labels and enlarged text.
- [ ] Keep the header for destinations and local toolbars for actions within each destination.
- [ ] Preserve selected chart, placement, pair, and sign when moving between related views.
- [ ] Restore the relevant selection and reading position on return actions.
- [ ] Preserve linkable hash routes, refresh, and browser Back/Forward behavior on GitHub Pages.
- [ ] Keep focused headings visible below the sticky header.

## 4. Welcome screen and entry flow

- [ ] Separate the welcome screen from chart and practice workspaces so the introductory hero does not return above every task.
- [ ] Retain “Roll into your birth chart” with less oversized empty space.
- [ ] Show an interactive example wheel and selected house pair beside the introduction, clearly labeled as an example.
- [ ] Frame the wheel as a celestial instrument with fine gold/lavender rings.
- [ ] Place one prominent die in a cloud or moonlit tray.
- [ ] Add Try a roll: animate the die, then bring forward the selected house-pair preview.
- [ ] Retain six direct face choices.
- [ ] Use Enter birth details as the primary action and Try the example as the secondary action.
- [ ] Include “Explore your placements. Roll a die to practice remembering them.”
- [ ] Enter the workspace after chart creation; show a returning saved chart immediately with Edit birth details available.
- [ ] Let the brand link return to the welcome screen.
- [ ] Preserve birth-form drafts, calculation behavior, saved-chart behavior, and advanced manual entry.

## 5. Your chart and the shared placement reader

- [ ] Build a desktop layout with the wheel beside one focused placement reader.
- [ ] Keep the wheel as a persistent reference and highlight the selection consistently on the wheel and in the reader.
- [ ] Present the reader as a tall celestial card with the selected symbol in its medallion.
- [ ] Show planet → sign → house as three clearly labeled pieces, followed by degrees and retrograde status in a smaller factual row.
- [ ] Use one prominent key-meaning paragraph and the shared reading sequence from section 2.
- [ ] Turn the placement list into a compact index with a clear selected state.
- [ ] Preserve the accessible placement-list alternative to the wheel.
- [ ] Offer Wheel / Read placement controls on phones while retaining the same selection and visible placement title.
- [ ] Give the mobile reader full available width.
- [ ] Add short selection/card-settling transitions and subtle selected-marker accents without changing chart positions or proportions.
- [ ] Reuse the reader hierarchy across planet, house, node, and practice explanations.

## 6. Axis-Dice and recall practice

- [ ] Open Axis-Dice with six actual die-face choices, each labeled with its house pair.
- [ ] Preserve the mapping: 1 → 1/7, 2 → 2/8, 3 → 3/9, 4 → 4/10, 5 → 5/11, 6 → 6/12.
- [ ] Keep each house pair available on its dedicated page.
- [ ] Start each pair with two aligned, matching tarot-inspired summaries connected by an orbital bridge or star motif.
- [ ] Place the selected die above the pair and show one concise relationship statement.
- [ ] Distinguish cusp signs, additional sign spans, and planets in each summary.
- [ ] Preserve proportional house geometry, including unequal house spans.
- [ ] Offer House [left] / Both / House [right] reading controls with one relationship explanation and reflection question.
- [ ] Stack compact pair summaries above the selected reading on phones.
- [ ] Use the same pair layout in practice with answers concealed.
- [ ] Show Recall → Reveal → Explore stages and change the primary action from Roll to Reveal to Roll again.
- [ ] Reveal answers as an aligned comparison, with detailed readings available from it.
- [ ] Retain physical-die selection and prevent concealed headings, badges, or previews from exposing signs or planets.
- [ ] Turn concealed card faces over once on reveal, then leave settled reading content still.

## 7. Planets through signs

- [ ] Retain the adjacent picker: ten labeled planet symbols on the left, all twelve labeled sign symbols on the right.
- [ ] Highlight the active planet and selected sign separately.
- [ ] Selecting a planet updates the sign choices; selecting a sign opens its corresponding reading.
- [ ] Support click, touch, and keyboard interaction without relying on hover.
- [ ] Style the picker as an open celestial deck case.
- [ ] Keep both columns visible without list scrolling at standard tablet and phone sizes.
- [ ] At short viewports or enlarged text, use a full-page chooser with ordinary page scrolling instead of clipping or shrinking labels.
- [ ] Make one focused reading card the default, with a compact sign index, combined planet/sign medallion, and sign-element accent.
- [ ] Add previous/next sign controls.
- [ ] Add Compare all twelve signs as a secondary view of concise summaries, each opening its full reading.
- [ ] Keep all-sign content available and identify the supplied chart's placement with a badge.
- [ ] Distinguish personal placements, illustrative examples, and missing positions; reference selections must not modify the calculated chart.

## 8. North / South Node

- [ ] Start with a shared title and concise relationship statement.
- [ ] Show matching celestial cards with mirrored ornaments and a shared orbital divider.
- [ ] Label North as unfamiliar practice and South as familiar strengths; include actual signs and houses when known.
- [ ] Use moonlit blue for North and rose-coral for South, with names and symbols alongside color.
- [ ] Keep node identity accents independent of sign-element colors.
- [ ] Add North / Together / South controls.
- [ ] Write the Together view as an authored educational explanation connecting the existing readings.
- [ ] Use the shared placement reader for individual node views and avoid duplicated introductions.
- [ ] Explicitly label missing manual positions rather than inferring one node from the other.
- [ ] Preserve the distinction between calculated points, symbolic readings, and example-chart data.

## 9. Dice and card animations

- [ ] Build the main die as a six-faced cube using CSS 3D transforms.
- [ ] Use cream dice `#FFF7E8` with violet pips `#7050A5` in light mode.
- [ ] Use polished navy dice `#223B60` with cream pips `#F5EEDF` in dark mode.
- [ ] Animate changing faces, a readable tumble, one landing bounce, and a final settled face.
- [ ] Select the unbiased result independently of animation and match the final cube orientation to that result.
- [ ] Align result announcements and card updates with the landing.
- [ ] Prevent competing rolls or stale results during rapid repeated presses.
- [ ] Add a short tilt/settle for physical-face selection and a brief outline glow on its pair.
- [ ] Add short deck-to-position travel when opening a pair and a small press tilt/compressed shadow on header controls.
- [ ] Optionally add a one-shot stardust flourish beside the die's landing shadow, away from text.
- [ ] Keep clouds, stars, and settled reading surfaces static while reading.
- [ ] Respect `prefers-reduced-motion`, replacing tumbles, bounces, travel, and flips with settled results and immediate updates or brief fades.
- [ ] Add a visible Motion: Full / Reduced setting, save it locally, and preserve identical results and controls in both modes.

### Motion targets

| Trigger | Motion | Duration |
| --- | --- | --- |
| Welcome Try a roll | Lift, tumble, land, then show pair preview | 900–1,200ms |
| Practice Roll | 3D tumble, changing faces, small bounce, settled result | 900–1,200ms |
| Physical-die selection | Matching face tilts into place; pair outline glows | 200–300ms |
| Reveal placements | Concealed cards turn face-up once | 350–450ms |
| Open another pair | Cards travel a short distance into place | 200–300ms |
| Press a header control | Small tilt, compressed shadow, spring back | 120–180ms |

## 10. Verification and completion criteria

- [ ] Check normal text contrast at ≥4.5:1 and essential control boundaries at ≥3:1 in both themes; aim for 7:1 for long-form text where practical.
- [ ] Verify palette consistency across every destination, form, overlay, and footer.
- [ ] Verify visible keyboard focus, symbol/color labels, and at least 44px touch targets.
- [ ] Check 200% zoom, enlarged reader text, wrapped labels, narrow widths, and short viewports without clipping or horizontal page overflow.
- [ ] Verify picker keyboard behavior, responsive fallback, and direct planet/sign links.
- [ ] Verify chart selection, proportional geometry, birth-form recovery, saved-chart continuity, and example/missing-data labels.
- [ ] Verify recall-before-reveal behavior and fixed die-to-house mappings.
- [ ] Verify final die/result alignment, repeated presses, result announcements, and focus during card reveals.
- [ ] Check system reduced motion and the explicit motion setting.
- [ ] Verify hash routes, refresh, Back/Forward, and restoration of selection/reading position.
- [ ] Capture and review both-theme screenshots of welcome, selected placement, axis pair, concealed/revealed practice, planet reference, and nodes at desktop and phone widths.
- [ ] Run the relevant unit/browser checks and production build after implementation.
- [ ] Conduct a short usability review: find a planet's sign, explain a house pair, and reveal a practice answer; address hesitation, lost selection, and skipped key meanings.
- [ ] Update the implemented theme guide and repository documentation to match the final redesign.

## Recommended delivery order

1. Shared palette, sky backgrounds, card frame, typography, and navigation.
2. Complete welcome → birth details → chart → focused reading flow.
3. Complete axis → roll → recall → reveal → explore flow, including reduced motion.
4. Focused planet reference and connected node views.
5. Responsive, accessibility, continuity, and usability verification.

### Main implementation files

| Area | Files |
| --- | --- |
| Routes, welcome, workspace | [src/App.tsx](src/App.tsx) |
| Header and picker | [src/components/HeaderNavigation.tsx](src/components/HeaderNavigation.tsx) |
| Shared reading hierarchy | [src/components/PlacementReading.tsx](src/components/PlacementReading.tsx) |
| Pair summaries | [src/components/AxisCard.tsx](src/components/AxisCard.tsx) |
| Dice and practice | [src/components/DicePractice.tsx](src/components/DicePractice.tsx) |
| Planet reference | [src/components/PlanetSigns.tsx](src/components/PlanetSigns.tsx) |
| Node pair | [src/components/NodePair.tsx](src/components/NodePair.tsx) |
| Tokens, themes, frames, motion | [src/styles.css](src/styles.css) |

**Done means:** the two celestial themes feel like the same deck; the die is satisfying to roll; the selected placement and key meaning are immediately recognizable; and decoration never makes reading or chart exploration harder.
