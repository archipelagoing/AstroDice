import type { NatalChart } from "../types";

/** Illustrative fixture, not a verified chart for a real birth. */
export const SAMPLE: NatalChart = {
  version: 1,
  name: "The example chart",
  houseSystem: "Placidus",
  cusps: [
    156.2,
    178,
    208 + 49 / 60,
    242 + 4 / 60,
    278,
    316,
    336.2,
    358,
    28 + 49 / 60,
    62 + 4 / 60,
    98,
    136,
  ],
  angles: { asc: 156.2, mc: 62 + 4 / 60 },
  planets: [
    { name: "Sun", longitude: 46 + 59 / 60 },
    { name: "Moon", longitude: 354 },
    { name: "Mercury", longitude: 68.5 },
    { name: "Venus", longitude: 81.25 },
    { name: "Mars", longitude: 93.8 },
    { name: "Jupiter", longitude: 118.5 },
    { name: "Saturn", longitude: 75.1 },
    { name: "Uranus", longitude: 320.4 },
    { name: "Neptune", longitude: 328.2 },
    { name: "Pluto", longitude: 255.6 },
    { name: "North Node", longitude: 96.1 },
    { name: "South Node", longitude: 276.1 },
    { name: "Chiron", longitude: 294.3 },
  ],
};
