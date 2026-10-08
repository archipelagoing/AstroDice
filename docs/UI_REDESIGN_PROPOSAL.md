# Astro-Dice: a celestial deck you can explore, unfold, and remember

**Design proposal · October 8, 2026 · Celestial foundations and reading flows implemented; advanced motion and final audit proposed**

Implementation progress is tracked in [redesigntodo.md](../redesigntodo.md). Sections 1–8 of that checklist are complete, including the welcome, focused chart reader, paired recall, sign comparison, and node flows. Sections 9–10 (advanced rolling motion and the final release audit) remain planned.

## The direction I recommend

Make Astro-Dice feel like a magical celestial deck laid out beneath an open sky. The wheel is the star map, the six house pairs are connected reading cards, and the die chooses what to practice. Every screen should make that relationship visible.

Use tarot-inspired frames, luminous astrological symbols, pearlescent dice, expressive serif headlines, and purposeful color. Light mode feels like celestial clouds; dark mode feels like a night sky. The reading surfaces remain calm, the text remains crisp, and the next action remains obvious.

The biggest improvement would be **one focal point per screen, with enough context to stay oriented**. More color should help the reader find the important words; it should also be possible to read a passage without several neighboring panels competing for attention.

This proposal builds on the current app and the requested dice-like navigation, adjacent planet/sign picker, node control, and colorful reading hierarchy. It is the overall redesign plan; consult the checklist and theme guide for implemented behavior.

## Visual reference and atmosphere

The user's reference is **Stardust**. Its [official site](https://www.stardust.app/) presents the product through a digital-galaxy concept. For Astro-Dice, interpret that reference as a request for a more celestial, intimate, luminous atmosphere. The cloud palette, tarot frames, and dice choreography below are our proposed direction, rather than claims about Stardust's exact interface.

The visual vocabulary is **clouds, stars, moonlight, constellations, ornamental cards, and tactile dice**. Give the page a sense of depth through a distant sky, quiet celestial ornament, and solid foreground reading cards. Use original artwork and geometry suited to Astro-Dice's own chart-learning content.

### Light mode: celestial clouds

A warm cream sky (`#F5EEDF`) with blush (`#EED8CE`) and lavender (`#E6DCEE`) clouds around the page edges. Cards resemble pale cream pearlescent stock (`#FFF7E8`), with amethyst or antique-gold linework. Dice look like creamy ivory (`#FFF7E8`) with violet pips (`#7050A5`) and a gentle shadow beneath them.

The center of each reading card stays solid pale cream, with deep-plum text (`#342D46`). Cloud gradients and tiny sparkles live outside the text column. The effect should be warm, airy, and magical without making words compete with a moving or textured background. Use cream throughout rather than mixing in white panels.

### Dark mode: the night sky

A celestial navy canvas (`#172B4D`), nebula-blue (`#355887`) and violet (`#494777`) accents near the edges, sparse stars, and small constellation details. Cards use opaque twilight-blue surfaces (`#223B60`) with warm moonlight text (`#F5EEDF`) and champagne-gold or lavender borders. Dice look like polished navy resin (`#223B60`) with cream pips (`#F5EEDF`).

Keep stars behind and between cards. Use a soft halo around a selected card or die, rather than glowing body text. The overall impression should be visibly navy and blue, with brighter blue raised surfaces; avoid black or near-black sections.

### Tarot-inspired cards

Make the main reading cards feel like members of one celestial deck:

- Rounded portrait frames with a fine double border and small celestial corner ornaments.
- A centered symbol medallion at the top: planet, sign, node, or house number.
- A prominent title, one concise key meaning, then clearly spaced reading sections.
- A small star, moon phase, or orbital divider between major sections.
- A reflection question near the foot of the card, framed like a small inscription.

Compact preview cards can use a roughly 2:3 portrait proportion. Full reading cards grow with their content; never force long prose into a fixed-height tarot frame. Supporting insets inherit the deck's border language without becoming another full ornamental card inside it. On phones, simplify the corner decoration and preserve generous text width.

These are astrological learning cards with tarot-inspired presentation. Their titles and contents continue to describe the actual chart, selected reference placement, and recall exercise.

## What currently breaks the flow

| Current pattern | Effect on the experience | Proposed change |
| --- | --- | --- |
| The landing hero returns above the chart and practice workspace | Moving between tasks can feel like returning to the introduction | Separate the welcome screen from the learning workspace |
| Four header controls, a chart toolbar, six dice, and several detail panels | The user has to work out which control belongs to which task | Use the header for destinations and a local toolbar for actions within the current destination |
| Similar card treatments recur across many different kinds of content | Colorful sections can still appear equally important | Establish a clear order: placement, key meaning, example, reflection, further exploration |
| Both sides of an axis can expand into lengthy readings | The relationship gets lost in the volume of text | Start with a compact comparison, then let the user focus on either side |
| A planet reference shows twelve full readings at once | Finding one sign requires scanning a large amount of content | Open one selected sign in a main reader, with a compact way to browse the others |
| Decorative pip counts on header controls resemble real die faces | The same visual language represents navigation and the six house pairs | Keep the raised dice-shaped frames, but give navigation distinct destination symbols |

## 1. A compact header with a clear identity

Keep the four destinations:

- **Your chart** — the wheel and actual placements.
- **Axis-Dice** — the six house relationships and recall practice.
- **Planets through signs** — the planet/sign reference picker.
- **North / South Node** — the paired node reading.

Lean into rounded, raised dice controls: polished faces, inset symbols, beveled edges, and a short cast shadow. Keep the readable labels. Put a wheel on Your chart, a die on Axis-Dice, a planet symbol on the reference picker, and opposing node symbols on the node control. Retain small pip details as ornament, with numbered die results reserved for their fixed house-pair meanings.

The active destination has a stronger celestial border and a quiet halo. Other destinations retain softer colored surfaces. A press gives the control a small tilt and settles it back onto its shadow. The theme toggle uses a sun and crescent moon at the far right. The header should occupy a predictable amount of space rather than noticeably changing the position of the reader as it contracts.

On desktop, target a header around 80px tall. On phones, use a compact brand row followed by a two-by-two destination grid with at least 44px touch targets. A reasonable target is 140–160px total, with the subtitle omitted at narrow widths. Exact heights should be checked with wrapped labels and enlarged text.

## 2. A welcome screen that immediately demonstrates the product

Keep “Roll into your birth chart,” but reduce the oversized empty space around it. Beside the introduction, show a real interactive example of the wheel and a selected house pair. Label the example clearly.

Frame the wheel like a celestial instrument, with fine gold or lavender rings. Place one prominent die in a small cloud or moonlit tray. A deliberate **Try a roll** interaction tumbles the die and brings forward a preview of its house-pair cards. Keep the six direct face choices available. Surrounding stars and cloud edges provide atmosphere without filling the readable center of the page.

The primary action is **Enter birth details**. The secondary action is **Try the example**. Add one short explanation: “Explore your placements. Roll a die to practice remembering them.”

Once a chart is entered, the workspace becomes the starting view for that session. For a returning saved chart, show the chart immediately with an **Edit birth details** action. The brand link can still return to the welcome screen.

## 3. Your chart: a map beside a focused reader

On desktop, use two main columns: the wheel and a placement reader. The wheel is a persistent reference, not an oversized decoration. Selecting a planet or house updates the reader and highlights the same selection on the wheel.

Present the reader as a tall celestial card, with the selected planet or house symbol in its upper medallion. Use a short card-settling transition when the selection changes. The wheel's rings and selected markers may carry a subtle luminous accent, while their actual positions and proportions remain exact.

```text
┌─────────────────────────────────────────────────────────────────┐
│ Brand    Your chart    Axis-Dice    Planets    Nodes        Theme │
├─────────────────────────────────────────────────────────────────┤
│ Your birth chart                         Birth details · Edit    │
│                                                                 │
│             THE WHEEL              SELECTED PLACEMENT           │
│                                    ☉ Sun · ♌ Leo · House …      │
│          [interactive chart]       One key meaning              │
│                                    What / How / Where           │
│                                    Everyday example             │
│                                    Pause & reflect              │
│                                                                 │
│ [compact placement list]           Explore its house pair →      │
└─────────────────────────────────────────────────────────────────┘
```

The placement title should be understandable before the reader reaches the prose. Show **planet → sign → house** as three labeled pieces, linked visually. Put precise degrees and retrograde status in a smaller factual row directly below.

Use one prominent “The key meaning” paragraph, followed by the three What / How / Where explanations. Examples and reflection questions have distinct treatments. Sabian symbols and longer context follow as optional exploration.

The placement list becomes a compact index with clear selected state, rather than a second competing workspace. Preserve an accessible list alternative to the wheel.

On phones, offer **Wheel / Read placement** controls that retain the same selection. Keep the placement title visible in the reading view. The reader should occupy the full width rather than feeling squeezed inside multiple nested cards.

## 4. Axis-Dice: show the relationship before the details

The destination opens with six real die-face choices, each labeled with its house pair. Selecting a face opens that pair's dedicated page. The fixed mapping remains 1/7, 2/8, 3/9, 4/10, 5/11, and 6/12.

A pair page starts with a visual bridge:

```text
         HOUSE 1                ↔                HOUSE 7
           Self                                  Other
     Cusp sign + placements                Cusp sign + placements

               One sentence about their relationship

       [Explore the pair]              [Practice this pair]
```

Use two aligned sides with an obvious connection between them. Keep cusp sign, additional sign spans, and planets visually distinct. Preserve proportional house geometry; decorative symmetry should not imply that unequal house spans are equal.

Render the sides as two matching tarot-inspired cards, connected by a small orbital bridge or star motif. The selected die sits above them as the source of the pair choice. Revealing an answer turns over the concealed card faces once; the settled cards then become ordinary, readable content.

Below the overview, show one relationship explanation and one reflection question. Offer **House 1 / Both / House 7** reading controls so a user can focus without losing the pair context. On phones, stack the two compact summaries before the selected reading.

Practice uses the same pair layout but conceals the answers. Make the stages visible: **Recall → Reveal → Explore**. A revealed answer compares the two houses in aligned rows instead of immediately presenting two long articles. The detailed reading remains available from that comparison.

The primary action changes with the stage: **Roll**, **Reveal**, then **Roll again**. Physical-die selection stays available. Never reveal a sign or planet in a concealed practice heading or badge.

## 5. Planets through signs: choose nearby, read in one place

Keep the compact adjacent picker requested in the markup:

| Planet column | Sign column |
| --- | --- |
| Ten planets, each with its symbol and name | All twelve signs, each with its symbol and name |
| Selecting a planet changes the active choice | Selecting a sign opens that planet/sign reading |
| The active planet is highlighted | The selected sign is highlighted separately |

Do not require hover. Click, touch, and keyboard interaction should all work. Keep the two columns visible without list scrolling at standard tablet and phone sizes. At very short viewports or enlarged text, let the picker become a full-page chooser with ordinary page scrolling rather than shrinking the type or clipping options.

The reference page has a compact sign index followed by **one focused reading card**. Its heading combines the planet and sign symbols in a celestial medallion. The selected sign supplies the accent color. Previous/next sign controls make comparison easy. Render the picker itself as an open deck case, with the two columns staying adjacent and all labels visible.

Keep **Compare all twelve signs** as a secondary view. That view initially presents twelve concise summaries; selecting one opens the full reader. The existing all-sign content remains available, with less competing text on the default screen.

A badge can identify the supplied chart's placement, explicitly distinguishing a personal placement from the illustrative example. Reference selections must never change the calculated chart. Show “No position entered” when appropriate.

## 6. North / South Node: a connected pair

Start with a shared title and a concise relationship statement. Place the two nodes in a connected summary: **North — unfamiliar practice** and **South — familiar strengths**, each with its actual sign and house when known.

Moonlit blue and rose-coral distinguish the two sides, accompanied by the node names and symbols. Present them as matching celestial cards with mirrored border ornaments and a shared orbital divider. The colors are navigational cues; they should not imply that the North Node is always a water placement or that the South Node is always a fire placement.

Below the summary, offer **North / Together / South**. The Together view explains how the two existing readings can be considered alongside one another using authored educational text. Individual views use the shared placement reader. Neither node needs a second copy of the same introductory explanation.

Do not infer a missing manual placement from the other node. Keep the missing state explicit. Retain the distinction between calculated points, symbolic readings, and the sample chart.

## 7. Color that organizes attention

Use an atmospheric sky canvas, opaque reading surfaces, jewel-colored accents, and restrained metallic linework. Keep long paragraphs on calm backgrounds. Color should appear in the selection, the important phrase or panel, and the next action; every surrounding container does not need its own strong fill.

Selected palette: warm cream by day, deep celestial blue by night. Use these exact values as the shared theme tokens; verify rendered contrast when implementing text, borders, and interaction states.

| Role | Celestial clouds | Night sky |
| --- | --- | --- |
| Page canvas | Warm cream `#F5EEDF` | Celestial navy `#172B4D` |
| Main reading card | Pale cream `#FFF7E8` | Twilight blue `#223B60` |
| Raised surfaces | Vanilla `#F0E3CD` | Soft navy `#2D4A73` |
| Body text | Deep plum `#342D46` | Warm moonlight `#F5EEDF` |
| Supporting text | Muted plum `#675D73` | Blue lavender `#BBCBE3` |
| Main interactive accent | Amethyst `#7050A5` | Luminous lavender `#C8B5F2` |
| Celestial linework | Antique gold `#947037` | Champagne gold `#E8CD98` |
| Atmospheric edges | Blush `#EED8CE`, lavender `#E6DCEE` | Nebula blue `#355887`, violet `#494777` |

Apply the same canvas, card, and raised-surface tokens to navigation, dropdowns, reading cards, dice trays, forms, and the footer. Use raised surfaces for selected or elevated containers, rather than introducing unrelated white or black backgrounds. Light-mode primary buttons use amethyst with pale-cream labels; dark-mode primary buttons use luminous lavender with celestial-navy labels. Preserve the same zodiac accent families in both themes, adjusting their brightness for readability.

Use CSS gradients and original SVG ornament for the sky and card frames. Reading surfaces must stay opaque enough to have a predictable foreground/background contrast. Decorative linework and cloud colors are not body-text colors.

| Visual role | Treatment |
| --- | --- |
| Zodiac element | Fire coral, earth green, air gold, water blue; always accompanied by sign names |
| Selected placement | Element accent on the title, fact row, and selection indicator |
| Key meaning | Largest body text; one accented border or short highlight |
| Everyday example | Pale blue inset with a clear “In everyday life” label |
| Reflection | Warm yellow panel with a larger question and extra breathing room |
| Further exploration | Violet label or outline; quieter than the key meaning |
| Node pair | Blue and coral identity badges, independent of sign-element colors |

Evolve the existing theme-aware tokens to support these two sky treatments. Retain the element names and readable accents, and avoid varying chart geometry to create visual emphasis. Keep each theme consistent across the header, cards, dice, picker, chart, forms, and footer.

## 8. Type and spacing that support sustained reading

| Content | Desktop target | Phone target |
| --- | --- | --- |
| Page title | 40–52px serif | 30–36px serif |
| Placement or pair title | 28–34px serif | 26–30px serif |
| Main section heading | 20–24px bold sans serif | 20–22px bold sans serif |
| Key meaning | 19–20px | 18–19px |
| Reading body | 17–18px | 16–18px |
| Labels and factual metadata | 13–14px | 13–14px |

Use a 1.6–1.75 line height and a reading measure around 55–65 characters. Break long explanations at meaningful changes of topic. Bold the central concept or action rather than entire paragraphs. Avoid small uppercase labels above every sentence.

Use a consistent 8px spacing scale, with 24–32px between major reading sections. Give reflection questions more separation. Prefer one outer reader surface with a few meaningful insets; nesting a colored card inside another colored card quickly consumes phone width.

Add a visible **Text size** control to the reader with a comfortable default and a larger option. If implemented, remember the preference locally. Page layout must also support browser zoom and text enlargement.

## 9. Interaction and continuity

Keep the selected chart, placement, pair, and sign when switching between related views. Return actions should restore the relevant selection and reading position. Retain linkable hash routes and browser Back/Forward behavior on GitHub Pages.

Use a short selection transition to connect the wheel and reader. Keep focused headings below the sticky header. Concentrate expressive motion in dice interactions and card reveals; the settled reading surface remains still.

### Dice and card motion

More dice motion should be part of the experience, with a clear start, landing, and result:

| Trigger | Proposed animation | Duration target |
| --- | --- | --- |
| Try a roll on the welcome screen | Die lifts, tumbles in its tray, lands, then brings forward the selected pair preview | 900–1,200ms |
| Roll in practice | A readable 3D tumble with several changing faces, one small bounce, and a final settled face | 900–1,200ms |
| Choose a physical-die result | The matching face tilts into place and its pair receives a brief outline glow | 200–300ms |
| Reveal placements | Concealed pair cards turn face-up once, then show their reading hierarchy | 350–450ms |
| Open another pair | Matching cards slide a short distance from the deck into place | 200–300ms |
| Press a header dice control | A small tilt, compressed shadow, and spring back | 120–180ms |

Model the main die as a six-faced cube using CSS 3D transforms. Its final orientation must match the already selected unbiased result. Animation is presentation: it never determines or changes chart placements. Align the result announcement and card reveal with the landing. Rapid repeated presses must not create competing rolls or stale results.

Use an optional small, one-shot stardust flourish near the landing shadow. Keep it away from the reading text. Cloud layers and stars remain static during reading; avoid perpetual dice tumbling, parallax, or blinking behind words. The die can be expressive without making the rest of the page restless.

Respect `prefers-reduced-motion`: replace tumbling, bouncing, travel, and card flips with a settled face and immediate content update or a brief fade. Offer a visible **Motion: Full / Reduced** setting that can also be saved locally. Both modes retain the same results, controls, focus behavior, and announcements.

Show keyboard focus clearly. Use names and labels alongside every color and symbol. Target at least 4.5:1 normal text contrast and 3:1 essential control-boundary contrast; aim for 7:1 for long-form reading text where practical. Verify the rendered combinations in both themes. Test at 200% zoom and narrow widths, with no clipped text or horizontal page overflow.

## 10. How I would implement it

1. **Create the celestial foundation.** Consolidate accumulated CSS overrides into shared tokens. Build the cloud and night-sky canvases, opaque tarot-inspired reader frames, destination dice, and readable text treatments. Review one complete card in both themes before applying the ornament everywhere.
2. **Separate welcome and workspace.** Keep the four destinations, but remove the introductory hero from normal chart/practice navigation. Preserve the current birth-form and saved-chart behavior.
3. **Build one reusable placement reader.** Apply the same hierarchy to planet, house, node, and practice explanations, adapting the content instead of duplicating layouts.
4. **Make pair pages relational and animate the dice.** Introduce compact paired cards and shared focus controls. Implement the six-faced rolling die, landing sequence, and card reveal with reduced-motion equivalents. Preserve house geometry and recall/reveal separation.
5. **Focus the planet reference.** Retain the adjacent picker and add a single-reading default with an optional all-sign comparison.
6. **Validate the experience.** Check contrast, zoom, touch targets, keyboard navigation, reader position, route history, and saved-chart continuity. Test die/result alignment, repeat presses, focus during card reveals, and reduced motion. Review screenshots of the welcome screen, a selected placement, an axis pair, a concealed/revealed quiz, and the nodes in both celestial themes.

Likely implementation areas are [App.tsx](../src/App.tsx), [HeaderNavigation.tsx](../src/components/HeaderNavigation.tsx), [PlacementReading.tsx](../src/components/PlacementReading.tsx), [AxisCard.tsx](../src/components/AxisCard.tsx), [DicePractice.tsx](../src/components/DicePractice.tsx), [PlanetSigns.tsx](../src/components/PlanetSigns.tsx), [NodePair.tsx](../src/components/NodePair.tsx), and [styles.css](../src/styles.css).

The first deliverable should be a complete chart-to-reading flow, followed by an axis-to-practice flow. Those two paths will establish the visual language for the reference and node pages.

## What would make this redesign successful

A reader should feel the cloud or night-sky atmosphere immediately, recognize the selected placement, find its key meaning before the supporting material, and understand how to explore or practice its house pair. The cards should feel like a coherent celestial deck, and rolling should feel tactile and satisfying. Switching destinations should feel like moving around the same chart. The colors, symbols, geometry, and die should all reinforce that continuity without making reading harder.

In a short usability review, ask someone to find a planet's sign, explain a house pair in their own words, and reveal a practice answer. Watch where they hesitate, lose the selection, or skip the key explanation. Use those observations to refine the hierarchy before adding more decoration.
