import { AXES, SIGNS } from '../data/catalog';
import { getSignAtLongitude } from '../geometry/chart';
import type { HouseGeometry, Planet } from '../types';

export const HOUSE_MEANINGS = [
  { title: 'Identity & approach', area: 'identity, first impressions, and the way you begin things', scene: 'introducing yourself or starting something new' },
  { title: 'Resources & values', area: 'personal resources, values, and your sense of enough', scene: 'deciding how to use your money, time, or skills' },
  { title: 'Learning & communication', area: 'everyday learning, conversations, and your local environment', scene: 'learning a skill or talking with a sibling or neighbor' },
  { title: 'Home & roots', area: 'home, family roots, and private belonging', scene: 'creating a home or discussing family traditions' },
  { title: 'Play & expression', area: 'creativity, enjoyment, romance, and personal expression', scene: 'making something simply for the pleasure of it' },
  { title: 'Routines & service', area: 'daily work, routines, and practical care', scene: 'organizing a routine or helping with an everyday task' },
  { title: 'Partnership & exchange', area: 'one-to-one partnerships, agreements, and reciprocity', scene: 'negotiating a shared decision with a partner' },
  { title: 'Trust & shared resources', area: 'shared resources, intimacy, and the experience of change', scene: 'discussing shared responsibilities or learning to trust' },
  { title: 'Meaning & exploration', area: 'beliefs, advanced learning, travel, and broader perspectives', scene: 'encountering a new worldview or pursuing a course of study' },
  { title: 'Public life & direction', area: 'public roles, vocation, reputation, and long-term direction', scene: 'presenting your work or choosing a public commitment' },
  { title: 'Friends & community', area: 'friendships, groups, and hopes for a shared future', scene: 'contributing to a group project or community' },
  { title: 'Retreat & inner life', area: 'solitude, less-visible patterns, and the inner life', scene: 'stepping away from activity to rest or reflect' },
];

export const SIGN_STYLES = [
  { style: 'direct, initiating, and willing to experiment', action: 'taking a clear first step', balance: 'making room for other people’s pace' },
  { style: 'steady, sensory, and concerned with continuity', action: 'building something dependable through small repeated efforts', balance: 'staying open when circumstances change' },
  { style: 'curious, conversational, and open to multiple possibilities', action: 'asking questions and exchanging ideas', balance: 'following through after the initial curiosity' },
  { style: 'protective, responsive, and attentive to belonging', action: 'noticing what helps people feel cared for', balance: 'expressing needs rather than expecting others to guess them' },
  { style: 'expressive, warm, and eager to contribute something personal', action: 'sharing a creative contribution with confidence', balance: 'leaving space for someone else to shine' },
  { style: 'observant, discerning, and interested in practical improvement', action: 'noticing details and making a useful adjustment', balance: 'allowing room for imperfection' },
  { style: 'relational, considerate, and responsive to different perspectives', action: 'listening to both sides and shaping a fair agreement', balance: 'naming your own preference clearly' },
  { style: 'searching, private, and willing to engage deeply', action: 'looking beneath the surface and building trust gradually', balance: 'allowing openness without needing complete control' },
  { style: 'exploratory, candid, and oriented toward a larger meaning', action: 'trying an unfamiliar perspective or possibility', balance: 'checking broad ideas against everyday details' },
  { style: 'deliberate, responsible, and attentive to long-term results', action: 'setting a realistic goal and building toward it', balance: 'valuing rest and connection alongside achievement' },
  { style: 'independent, inventive, and interested in collective possibilities', action: 'questioning an assumption and trying an alternative', balance: 'staying connected to individual feelings and needs' },
  { style: 'imaginative, receptive, and sensitive to atmosphere', action: 'making space for empathy, imagination, or quiet attention', balance: 'keeping boundaries that make that openness sustainable' },
];

export const PLANET_MEANINGS: Record<string, { role: string; verb: string; invitation: string }> = {
  Sun: { role: 'identity, vitality, and conscious direction', verb: 'express a sense of purpose', invitation: 'What feels worth showing up for' },
  Moon: { role: 'emotional needs, habits, and belonging', verb: 'seek comfort and respond emotionally', invitation: 'What helps you feel secure' },
  Mercury: { role: 'thinking, learning, and communication', verb: 'learn, make connections, and communicate', invitation: 'What helps you understand and be understood' },
  Venus: { role: 'affection, attraction, enjoyment, and values', verb: 'build relationships and express what you value', invitation: 'What kind of connection feels worthwhile' },
  Mars: { role: 'initiative, assertion, and the use of energy', verb: 'take action and stand up for what matters', invitation: 'Where could you act with intention' },
  Jupiter: { role: 'growth, confidence, and the search for meaning', verb: 'seek growth and a wider perspective', invitation: 'What could you learn by widening your perspective' },
  Saturn: { role: 'limits, responsibility, and gradual development', verb: 'build competence through commitment and limits', invitation: 'What responsibility is worth taking on' },
  Uranus: { role: 'independence, disruption, and experimentation', verb: 'question established patterns and try alternatives', invitation: 'Which assumption could you experiment with' },
  Neptune: { role: 'imagination, ideals, and blurred boundaries', verb: 'imagine possibilities and respond to subtle impressions', invitation: 'How can you connect imagination with clear boundaries' },
  Pluto: { role: 'power, depth, and significant transformation', verb: 'examine power and work with deep change', invitation: 'What pattern deserves a more honest examination' },
  'North Node': { role: 'a symbolic direction for unfamiliar learning', verb: 'practice a less-familiar way of participating', invitation: 'What new response could you practice' },
  'South Node': { role: 'familiar patterns and readily available habits', verb: 'recognize familiar strengths without relying on them automatically', invitation: 'Which familiar response helps, and which could you loosen' },
  Chiron: { role: 'sensitivity, learning through difficulty, and care', verb: 'meet a sensitive area with curiosity and compassion', invitation: 'What kind of care could make learning possible' },
};

/** Authored educational composition, not an AI reading or a factual personality claim. */
export function readPlanet(planet: Planet, house: number) {
  const sign = getSignAtLongitude(planet.longitude);
  const symbol = PLANET_MEANINGS[planet.name];
  if (!symbol) return null;
  const style = SIGN_STYLES[sign];
  const domain = HOUSE_MEANINGS[house - 1];
  return {
    title: `${planet.name} in ${SIGNS[sign][0]} · House ${house}`,
    what: symbol.role, how: style.style, where: domain.area,
    synthesis: `With ${planet.name} in ${SIGNS[sign][0]} in house ${house}, one symbolic reading is that you ${symbol.verb} through a ${style.style} approach to ${domain.area}. The sign describes the manner of expression; the house locates the life setting where you might notice or explore it.`,
    example: `For example, when ${domain.scene}, ${style.action} could be a way to ${symbol.verb}. A useful counterbalance is ${style.balance}. This is a possibility to reflect on, not a prediction about your life.`,
    question: `${symbol.invitation} in ${domain.area}?`,
    axis: (house - 1) % 6 + 1,
    generational: ['Uranus', 'Neptune', 'Pluto'].includes(planet.name) ? 'This slow-moving planet’s sign is shared by many people in the same generation. Its house gives the reading a more specific life context.' : undefined,
  };
}

export function readHouse(house: HouseGeometry) {
  const domain = HOUSE_MEANINGS[house.number - 1];
  return {
    ...domain,
    signs: house.segments.map((segment, index) => ({
      sign: SIGNS[segment.sign][0],
      role: index === 0 ? 'Cusp sign' : segment.intercepted ? 'Intercepted sign' : 'Additional sign span',
      text: index === 0
        ? `${SIGNS[segment.sign][0]} on this cusp suggests a ${SIGN_STYLES[segment.sign].style} approach to ${domain.area}. You might explore this by ${SIGN_STYLES[segment.sign].action}.`
        : `${SIGNS[segment.sign][0]} also occupies part of this house${segment.intercepted ? '—the entire sign is enclosed between its cusps' : ''}. Its ${SIGN_STYLES[segment.sign].style} symbolism offers an additional lens on ${domain.area}, especially for any planets placed in this sign. It does not replace the cusp sign.`,
    })),
    axis: AXES[(house.number - 1) % 6],
  };
}
