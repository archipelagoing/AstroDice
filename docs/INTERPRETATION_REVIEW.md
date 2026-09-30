# Interpretation Review — September 2026

## Scope and status

**Complete:** an assistant-led editorial and implementation review of the original house, sign, planet/point, example, and reflection text. This pass checks internal consistency, clearer language, composition coverage, and the separation of chart facts from interpretations.

**Still pending:** independent review by an astrology educator, review across a representative placement matrix, and comprehension testing with learners. The text should not be described as independently approved or scientifically validated. See READ-05/06 in the [roadmap](TODO.md).

The app uses a **modern Western, reflective interpretation**. It offers selected themes and practice prompts, not an exhaustive account of traditional, Hellenistic, Vedic, evolutionary, or other systems. The existing tropical calculation convention is separate from these editorial choices.

## Changes in this pass

| Issue                                                                           | Revision                                                                                                                                                                                                  |
| ------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Every placement used the same long “one symbolic reading is that you…” sentence | Each of the thirteen supported bodies/points has its own synthesis, connecting its role to the actual sign and house.                                                                                     |
| Examples changed mainly with sign and house, making planets sound alike         | Body-specific exercises now distinguish, for example, Mercury's communication, Venus's appreciation, Mars's action, and Saturn's commitments. Sign strategies and house situations complete the example.  |
| Reflection questions appended a long list of house themes                       | Short house contexts make questions easier to read and answer.                                                                                                                                            |
| Interpretive disclaimers repeated in both synthesis and example                 | A concise scope note follows the reading; body-specific qualifications remain where they are relevant.                                                                                                    |
| Nodes shared the generic “Planet” label                                         | The UI identifies lunar nodes as points, Sun/Moon as luminaries, and Chiron as a body.                                                                                                                    |
| Node descriptions could sound like a mandatory growth path                      | Identify the developmental framing as one modern interpretation; treat familiar skills and unfamiliar practice as complementary. Do not frame the South Node as bad or claim destiny/past lives as facts. |
| Chiron could imply an injury or promised healing                                | Explicitly avoid inferring a painful history, diagnosis, or healing outcome from a placement. Chiron remains manual-only.                                                                                 |
| Additional signs sounded like competing house labels                            | Explain cusp sign, partial span, and interception separately, emphasizing planets actually in those spans.                                                                                                |
| Interception could be mistaken for a psychological diagnosis                    | Describe the geometric fact without inferring a blocked ability or life problem.                                                                                                                          |
| Eighth/twelfth-house summaries were especially narrow                           | Broaden eighth-house wording to include obligations and loss/change, and twelfth-house wording to include withdrawal and life outside public view. These remain selected modern themes.                   |
| A placement could be mistaken for a complete chart reading                      | State that aspects and house rulers are not included. Do not equate a house number with a sign.                                                                                                           |

## Representative reading

For **Venus in Gemini, house 10**, the synthesis links relationships and values with public roles through a curious, conversational approach. The example asks the reader to identify what they appreciate while presenting work or choosing a public commitment, invite another person's priorities, and compare possibilities through an open question.

For the same sign/house, **Mars** instead asks for an intended result and a concrete step; **Saturn** asks for a manageable responsibility and a definition of completion. These are exercises to try, not claims that the person already behaves that way or should pursue a particular career.

Composition still shares house scenes and sign strategies. It is not 1,872 bespoke essays. More phrase variation alone is not proof of greater depth; human review should prioritize meaning, fit, and usefulness.

## Sources and limits of this review

All in-app educational prose is original project copy. No commercial interpretation library or Sabian interpretation text was copied into the app.

These published references were located for orientation during the review:

- [Astrodienst, Introduction to Astrology: Houses](https://www.astro.com/astrology/in_house2_e.htm): indexed headings distinguish eighth-house shared property/loss and twelfth-house themes beyond a simplified “rest” label.
- [The Moon's Nodes in Action](https://www.astro.com/astrology/in_nodes_e.htm): the indexed discussion emphasizes considering the nodal axis together. This supports avoiding an isolated good-node/bad-node framing, not treating the article as validation of every generated node reading.
- [Liz Greene, Wounding and the Will to Live](https://www.astro.com/astrology/in_wounding_e.htm): a psychological interpretation of Chiron. Its existence illustrates the interpretive context; the app does not turn that symbolism into a diagnosis.

Direct retrieval of these pages encountered browser checks; this pass used available indexed excerpts rather than a complete source review. Their links are a starting bibliography for the independent reviewer, not a claim that the entire library has been verified against them. Check the full originals and add contrasting traditions during that review. No verbatim passages were incorporated.

Sabian cards continue to show [Lynda Hill's official lookup](https://sabiansymbols.com/list-of-symbols/) on request. This editorial pass does not rewrite, verify, or relicense the external site's interpretations. Its layout and availability remain source-controlled.

## Editorial rules for future changes

1. Keep supplied/calculated positions separate from symbolic meaning. Never invent a placement, aspect, ruler relationship, or missing birth time.
2. Use the actual sign and house; a numbered house does not automatically belong to the correspondingly numbered sign.
3. Keep each body's role distinct. Nodes are points; Chiron is not a lunar node. A generational sign placement alone does not describe an individual.
4. Frame examples as possible exercises or situations. Do not infer a person's biography, diagnosis, relationships, finances, or future from a placement.
5. Preserve both sides of the axis. An empty house is not an absent life area; an interception is not automatically a blocked trait.
6. Explain where tradition or method affects the reading. Do not present a modern teaching convention as universal agreement.
7. Prefer a concrete situation, action, and useful question to another adjective list. Avoid moralizing a sign as inherently good or bad.
8. Test that changes preserve coverage and correct context; read the resulting prose as well. A string assertion cannot certify interpretive quality.

## Remaining review acceptance criteria

- An identified independent reviewer examines every house theme, sign strategy, and body role, plus varied combined examples across all thirteen bodies, twelve signs, and twelve houses.
- Record specific comments, adopted changes, disagreements, and the tradition used. Include cases where sign style and planetary role create tension.
- Check node, Chiron, outer-planet, empty-house, intercepted-sign, and Whole Sign examples explicitly.
- Ask learners to explain what each example means and how it relates to their selected placement; revise confusing or repetitive text.
- Review source permissions if any future text is quoted or adapted. Public visibility is not permission to import a whole interpretation library.
- Only then update READ-05/06 from Partial/Pending to Complete, with the reviewer record linked.

## Verification in this change

The unit suite passes 42 tests, including coverage across all 1,872 supported body/sign/house combinations, body-specific exercises, point/body terminology, unknown-house rejection, and interception wording. Representative composed readings were inspected for grammar and relevance. The production build passes. All 11 browser regression tests also pass; these checks verify behavior and text coverage, not independent astrological approval.
