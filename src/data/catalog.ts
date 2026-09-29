export const SIGNS = [
  ["Aries", "♈︎", "fire"],
  ["Taurus", "♉︎", "earth"],
  ["Gemini", "♊︎", "air"],
  ["Cancer", "♋︎", "water"],
  ["Leo", "♌︎", "fire"],
  ["Virgo", "♍︎", "earth"],
  ["Libra", "♎︎", "air"],
  ["Scorpio", "♏︎", "water"],
  ["Sagittarius", "♐︎", "fire"],
  ["Capricorn", "♑︎", "earth"],
  ["Aquarius", "♒︎", "air"],
  ["Pisces", "♓︎", "water"],
] as const;

export const BODIES = [
  ["Sun", "☉"],
  ["Moon", "☽"],
  ["Mercury", "☿"],
  ["Venus", "♀"],
  ["Mars", "♂"],
  ["Jupiter", "♃"],
  ["Saturn", "♄"],
  ["Uranus", "♅"],
  ["Neptune", "♆"],
  ["Pluto", "♇"],
  ["North Node", "☊"],
  ["South Node", "☋"],
  ["Chiron", "⚷"],
] as const;
export const PLANET_NAMES: readonly string[] = BODIES.slice(0, 10).map(
  ([name]) => name,
);
export const glyph = (name: string) =>
  BODIES.find(([n]) => n === name)?.[1] ?? "•";

export const AXES = [
  {
    number: 1,
    title: "Identity & partnership",
    sides: ["Self", "Other"],
    question: "How can I be myself while making room for someone else?",
    meaning:
      "The first house concerns identity and how you meet the world. The seventh concerns one-to-one relationships. Together, they invite reflection on individuality and reciprocity.",
  },
  {
    number: 2,
    title: "Personal & shared value",
    sides: ["Mine", "Ours"],
    question: "What do I sustain myself, and what can I share?",
    meaning:
      "The second house concerns personal resources and what you value. The eighth concerns shared resources and interdependence. This axis explores ownership, trust, and exchange.",
  },
  {
    number: 3,
    title: "Knowledge & meaning",
    sides: ["Information", "Worldview"],
    question: "How do everyday observations shape my larger understanding?",
    meaning:
      "The third house concerns learning, communication, and your immediate surroundings. The ninth concerns broader meaning and exploration. Together, they connect the details with the bigger picture.",
  },
  {
    number: 4,
    title: "Roots & public life",
    sides: ["Roots", "Public life"],
    question: "How does my private foundation support my public contribution?",
    meaning:
      "The fourth house concerns home, roots, and private life. The tenth concerns public roles and direction. This axis explores the relationship between belonging and becoming visible.",
  },
  {
    number: 5,
    title: "Creation & community",
    sides: ["Creation", "Community"],
    question: "How can my individual expression contribute to a shared world?",
    meaning:
      "The fifth house concerns play and personal expression. The eleventh concerns friendships, communities, and shared hopes. Together, they connect individual creativity with collective participation.",
  },
  {
    number: 6,
    title: "Daily systems & inner world",
    sides: ["Daily systems", "Inner world"],
    question:
      "How can I balance useful routines with space to rest and reflect?",
    meaning:
      "The sixth house concerns routines and daily service. The twelfth concerns retreat and the inner life. This axis explores the balance between practical effort and letting go.",
  },
] as const;
