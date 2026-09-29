import { Body, Ecliptic, GeoVector, MakeTime, e_tilt } from "astronomy-engine";
import { normalizeLongitude as norm, validateChart } from "../geometry/chart";
import type { BirthDetails, NatalChart } from "../types";
import { calculateHouses } from "./houses";
import { resolveBirthTime } from "./time";

const BODIES = [
  Body.Sun,
  Body.Moon,
  Body.Mercury,
  Body.Venus,
  Body.Mars,
  Body.Jupiter,
  Body.Saturn,
  Body.Uranus,
  Body.Neptune,
  Body.Pluto,
];
const position = (body: Body, date: Date) =>
  Ecliptic(GeoVector(body, date, true)).elon;

export function calculateChart(birth: BirthDetails): NatalChart {
  const { date, utc, offset } = resolveBirthTime(birth);
  const place = birth.place!;
  if (!["Placidus", "Whole Sign"].includes(birth.houseSystem))
    throw new Error("Choose Placidus or Whole Sign houses.");
  const { cusps, asc, mc } = calculateHouses(
    date,
    place.latitude,
    place.longitude,
    birth.houseSystem,
  );
  const planets = BODIES.map((body) => {
    const before = position(body, new Date(date.getTime() - 3600000));
    const after = position(body, new Date(date.getTime() + 3600000));
    return {
      name: body as string,
      longitude: position(body, date),
      retrograde: norm(after - before + 180) - 180 < 0,
    };
  });
  // Meeus, Astronomical Algorithms, lunar mean ascending node, equinox of date.
  const t = MakeTime(date).tt / 36525;
  const northNode = norm(
    125.0445479 -
      1934.1362891 * t +
      0.0020754 * t ** 2 +
      t ** 3 / 467441 -
      t ** 4 / 60616000 +
      e_tilt(MakeTime(date)).dpsi / 3600,
  );
  planets.push(
    { name: "North Node", longitude: northNode, retrograde: true },
    { name: "South Node", longitude: norm(northNode + 180), retrograde: true },
  );
  const chart: NatalChart = {
    version: 1,
    name: "Your birth chart",
    houseSystem: birth.houseSystem,
    cusps,
    planets,
    angles: { asc, mc },
    calculation: {
      engine: "Astronomy Engine 2.1.19 · house solver 1",
      zodiac: "Tropical",
      utc,
      offset,
      timezone: place.timezone,
      latitude: place.latitude,
      longitude: place.longitude,
      unavailable: ["Chiron"],
    },
  };
  validateChart(chart);
  return chart;
}
