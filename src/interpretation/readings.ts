import { AXES, SIGNS } from "../data/catalog";
import { getSignAtLongitude } from "../geometry/chart";
import type { HouseGeometry, Planet } from "../types";

export const HOUSE_MEANINGS = [
  {
    title: "Identity & approach",
    area: "identity, first impressions, and the way you begin things",
    scene: "introducing yourself to a new group",
    context: "when starting something new",
  },
  {
    title: "Resources & values",
    area: "personal resources, values, and your sense of enough",
    scene: "deciding how to use your money, time, or skills",
    context: "when using your own resources",
  },
  {
    title: "Learning & communication",
    area: "everyday learning, conversations, and your local environment",
    scene: "learning a skill or talking with a sibling or neighbor",
    context: "in everyday conversations",
  },
  {
    title: "Home & roots",
    area: "home, family roots, and private belonging",
    scene: "creating a home or discussing family traditions",
    context: "in your home life",
  },
  {
    title: "Play & expression",
    area: "creativity, enjoyment, romance, and personal expression",
    scene: "making something simply for the pleasure of it",
    context: "in your creative life",
  },
  {
    title: "Routines & service",
    area: "daily work, routines, and practical care",
    scene: "organizing a routine or helping with an everyday task",
    context: "in your daily routines",
  },
  {
    title: "Partnership & exchange",
    area: "one-to-one partnerships, agreements, and reciprocity",
    scene: "negotiating a shared decision with a partner",
    context: "in a one-to-one partnership",
  },
  {
    title: "Trust & shared resources",
    area: "shared resources, obligations, trust, and experiences of loss or change",
    scene: "agreeing who contributes what to a shared expense",
    context: "when sharing resources or responsibility",
  },
  {
    title: "Meaning & exploration",
    area: "beliefs, advanced learning, travel, and broader perspectives",
    scene: "encountering a new worldview or pursuing a course of study",
    context: "when exploring a larger question",
  },
  {
    title: "Public life & direction",
    area: "public roles, vocation, reputation, and long-term direction",
    scene: "presenting your work or choosing a public commitment",
    context: "in your public commitments",
  },
  {
    title: "Friends & community",
    area: "friendships, groups, and hopes for a shared future",
    scene: "contributing to a group project or community",
    context: "when participating in a group",
  },
  {
    title: "Retreat & inner life",
    area: "solitude, withdrawal, less-visible patterns, and life outside public view",
    scene: "stepping away from activity to rest or reflect",
    context: "during time away from public demands",
  },
];

export const SIGN_STYLES = [
  {
    style: "direct, initiating, and willing to experiment",
    action: "proposing a first step and checking who is ready to join",
    balance: "making room for other people’s pace",
  },
  {
    style: "steady, sensory, and concerned with continuity",
    action: "building something dependable through small repeated efforts",
    balance: "staying open when circumstances change",
  },
  {
    style: "curious, conversational, and open to multiple possibilities",
    action: "asking an open question and comparing two possible answers",
    balance: "following through after the initial curiosity",
  },
  {
    style: "protective, responsive, and attentive to belonging",
    action: "noticing what helps people feel cared for",
    balance: "expressing needs rather than expecting others to guess them",
  },
  {
    style: "expressive, warm, and eager to contribute something personal",
    action: "sharing a creative contribution with confidence",
    balance: "leaving space for someone else to shine",
  },
  {
    style: "observant, discerning, and interested in practical improvement",
    action: "choosing one detail to improve and checking whether it helps",
    balance: "allowing room for imperfection",
  },
  {
    style: "relational, considerate, and responsive to different perspectives",
    action: "listening to both sides and shaping a fair agreement",
    balance: "naming your own preference clearly",
  },
  {
    style: "searching, private, and willing to engage deeply",
    action: "looking beneath the surface and building trust gradually",
    balance: "allowing openness without needing complete control",
  },
  {
    style: "exploratory, candid, and oriented toward a larger meaning",
    action: "trying an unfamiliar perspective or possibility",
    balance: "checking broad ideas against everyday details",
  },
  {
    style: "deliberate, responsible, and attentive to long-term results",
    action: "setting a realistic goal and building toward it",
    balance: "valuing rest and connection alongside achievement",
  },
  {
    style: "independent, inventive, and interested in collective possibilities",
    action: "testing an alternative to a rule everyone takes for granted",
    balance: "staying connected to individual feelings and needs",
  },
  {
    style: "imaginative, receptive, and sensitive to atmosphere",
    action: "making space for empathy, imagination, or quiet attention",
    balance: "keeping boundaries that make that openness sustainable",
  },
];

export const PLANET_MEANINGS: Record<
  string,
  { role: string; invitation: string; focus: string; practice: string }
> = {
  Sun: {
    focus: "purpose and self-expression",
    practice:
      "choose a contribution that feels like your own rather than performing a role just for approval",
    role: "identity, vitality, and conscious direction",
    invitation: "What feels worth showing up for",
  },
  Moon: {
    focus: "emotional security and habitual responses",
    practice:
      "notice your first reaction and name one condition that would help you feel settled",
    role: "emotional needs, habits, and belonging",
    invitation: "What helps you feel secure",
  },
  Mercury: {
    focus: "understanding and exchanging information",
    practice:
      "explain an idea in your own words and ask what the other person understood",
    role: "thinking, learning, and communication",
    invitation: "What helps you understand and be understood",
  },
  Venus: {
    focus: "relationships, enjoyment, and what feels worthwhile",
    practice:
      "identify what you appreciate and invite someone else to say what matters to them",
    role: "affection, attraction, enjoyment, and values",
    invitation: "What kind of connection feels worthwhile",
  },
  Mars: {
    focus: "initiative, assertion, and effort",
    practice:
      "name the result you want and take one step that respects everyone involved",
    role: "initiative, assertion, and the use of energy",
    invitation: "Where could you act with intention",
  },
  Jupiter: {
    focus: "exploration and confidence",
    practice:
      "try a learning opportunity while checking what time and resources it actually needs",
    role: "growth, confidence, and the search for meaning",
    invitation: "What could you learn by widening your perspective",
  },
  Saturn: {
    focus: "commitment, limits, and lasting competence",
    practice:
      "choose a manageable responsibility and define what completing it would look like",
    role: "limits, responsibility, and gradual development",
    invitation: "What responsibility is worth taking on",
  },
  Uranus: {
    focus: "independence and experimentation",
    practice:
      "question one established habit and try a small, reversible alternative",
    role: "independence, disruption, and experimentation",
    invitation: "Which assumption could you experiment with",
  },
  Neptune: {
    focus: "imagination, ideals, and discernment",
    practice:
      "describe what you hope for, then distinguish that hope from what you know",
    role: "imagination, ideals, and blurred boundaries",
    invitation: "How can you connect imagination with clear boundaries",
  },
  Pluto: {
    focus: "power, trust, and deep change",
    practice:
      "notice who has a say in the decision and identify what is within your control",
    role: "power, depth, and significant transformation",
    invitation: "What pattern deserves a more honest examination",
  },
  "North Node": {
    focus: "curiosity about unfamiliar responses",
    practice:
      "try one unfamiliar response without demanding that you master it immediately",
    role: "unfamiliar learning in a modern developmental reading",
    invitation: "What new response could you practice",
  },
  "South Node": {
    focus: "familiar strengths and habitual responses",
    practice:
      "use a skill you already trust, then notice whether the usual response still fits",
    role: "familiar strengths and habits in a modern developmental reading",
    invitation: "Which familiar response still helps",
  },
  Chiron: {
    focus: "sensitivity, limits, and compassionate learning",
    practice:
      "allow yourself to be a learner and ask for the kind of support you would offer someone else",
    role: "sensitivity, learning through difficulty, and care",
    invitation: "What kind of care could make learning possible",
  },
};

/** Modern Western educational composition; never a full-chart judgment. */
export function readPlanet(planet: Planet, house: number) {
  if (!Number.isInteger(house) || house < 1 || house > 12) {
    throw new Error("A placement reading requires a known house from 1 to 12.");
  }
  const sign = getSignAtLongitude(planet.longitude);
  if (!Object.hasOwn(PLANET_MEANINGS, planet.name)) return null;
  const symbol = PLANET_MEANINGS[planet.name];
  const style = SIGN_STYLES[sign];
  const domain = HOUSE_MEANINGS[house - 1];
  const placement = `${planet.name} in ${SIGNS[sign][0]} in house ${house}`;
  const syntheses: Record<string, string> = {
    Sun: `${placement} brings questions of purpose into ${domain.area}. The ${SIGNS[sign][0]} approach is ${style.style}: a way to explore what you want to contribute here.`,
    Moon: `${placement} places emotional needs in the setting of ${domain.area}. A response that is ${style.style} may feel settling here; notice whether it meets your present needs or repeats a familiar habit.`,
    Mercury: `${placement} connects thinking and communication with ${domain.area}. An approach that is ${style.style} offers one way to gather information, explain an idea, and revise your understanding.`,
    Venus: `${placement} links relationships, enjoyment, and values with ${domain.area}. An approach that is ${style.style} can shape what you appreciate here and how you invite connection.`,
    Mars: `${placement} brings initiative and assertion into ${domain.area}. The ${SIGNS[sign][0]} style is ${style.style}; consider how that affects the way you direct effort and choose when to pause.`,
    Jupiter: `${placement} explores growth and meaning through ${domain.area}. An approach that is ${style.style} can open possibilities; it also invites a check on whether enthusiasm fits the resources available.`,
    Saturn: `${placement} asks how commitment and limits operate in ${domain.area}. An approach that is ${style.style} can support patient skill-building, without making every difficulty a personal failure.`,
    Uranus: `${placement} connects experimentation with ${domain.area}. An approach that is ${style.style} can question an established pattern and explore an alternative without requiring change for its own sake.`,
    Neptune: `${placement} brings imagination and ideals into ${domain.area}. An approach that is ${style.style} can invite empathy or creativity; clear agreements help distinguish a hope from an assumption.`,
    Pluto: `${placement} frames questions of power and change through ${domain.area}. An approach that is ${style.style} offers a way to examine participation, trust, and what can be changed without controlling another person.`,
    "North Node": `${placement} can be read as an invitation to explore ${domain.area} with an approach that is ${style.style}. In this modern developmental interpretation, unfamiliarity is a practice opportunity, not a prescribed destiny.`,
    "South Node": `${placement} can be read as a familiar way of engaging with ${domain.area}: ${style.style}. The invitation is to use those strengths deliberately and make room for other responses, rather than reject this side of the chart.`,
    Chiron: `${placement} offers a symbolic lens on sensitivity and learning in ${domain.area}. An approach that is ${style.style} may help you reflect on care and limits without assuming that a painful experience must have occurred.`,
  };
  const isNode = planet.name === "North Node" || planet.name === "South Node";
  return {
    title: `${planet.name} in ${SIGNS[sign][0]} · House ${house}`,
    kind: isNode
      ? "Point"
      : planet.name === "Chiron"
        ? "Body"
        : ["Sun", "Moon"].includes(planet.name)
          ? "Luminary"
          : "Planet",
    what: symbol.role,
    how: style.style,
    where: domain.area,
    synthesis: syntheses[planet.name],
    example: `For example, when ${domain.scene}, you could ${symbol.practice}. Try ${style.action} as one way to put that into practice.`,
    balance: `Keep ${symbol.focus} in view while ${style.balance}.`,
    question: `${symbol.invitation} ${domain.context}?`,
    context: isNode
      ? "The lunar nodes are calculated points, not planets. This reading treats the pair as complementary: familiar strengths and unfamiliar practice, rather than a good node and a bad node. Other astrological traditions interpret them differently."
      : planet.name === "Chiron"
        ? "Chiron is a minor body, not a lunar node. Its symbolism is used differently by different astrologers; this reading does not identify an injury, diagnose a condition, or promise healing."
        : undefined,
    axis: ((house - 1) % 6) + 1,
    generational: ["Uranus", "Neptune", "Pluto"].includes(planet.name)
      ? "Many people born over several years share this sign placement. Its house adds a birth-time-dependent setting; neither placement alone describes an individual."
      : undefined,
  };
}

export function readHouse(house: HouseGeometry) {
  const domain = HOUSE_MEANINGS[house.number - 1];
  return {
    ...domain,
    signs: house.segments.map((segment, index) => {
      const sign = SIGNS[segment.sign][0];
      const style = SIGN_STYLES[segment.sign];
      return {
        sign,
        role:
          index === 0
            ? "Cusp sign"
            : segment.intercepted
              ? "Intercepted sign"
              : "Additional sign span",
        text:
          index === 0
            ? `${sign} begins this house. Its approach is ${style.style}. Consider those qualities in the setting of ${domain.area}. For example, when ${domain.scene}, try ${style.action}. The cusp sign is a starting point, not a substitute for the planets and other signs in the house.`
            : segment.intercepted
              ? `${sign} is fully contained within this house and appears on no house cusp in this chart. The sign’s approach is ${style.style}; consider those qualities when reading planets placed here. An interception is a geometric feature; it does not by itself establish a blocked ability or a life problem.`
              : `Part of ${sign} also falls in this house. The sign’s approach is ${style.style}; it is especially relevant when reading a planet in this part of the house. This span does not replace the cusp sign or make the entire house a ${sign} house.`,
      };
    }),
    axis: AXES[(house.number - 1) % 6],
  };
}
