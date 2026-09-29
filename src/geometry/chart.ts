import { PLANET_NAMES, SIGNS } from "../data/catalog";
import type { HouseGeometry, NatalChart, SignSegment } from "../types";

export function normalizeLongitude(value: number): number {
  if (!Number.isFinite(value))
    throw new Error("Longitude must be a finite number.");
  // Preserve already-normalized values without introducing modulo rounding.
  if (value >= 0 && value < 360) return value === 0 ? 0 : value;
  return ((value % 360) + 360) % 360;
}
export function getAbsoluteLongitude(
  sign: number,
  degree: number,
  minute = 0,
): number {
  if (
    !Number.isInteger(sign) ||
    sign < 0 ||
    sign > 11 ||
    !Number.isFinite(degree) ||
    degree < 0 ||
    degree >= 30 ||
    !Number.isFinite(minute) ||
    minute < 0 ||
    minute >= 60 ||
    degree + minute / 60 >= 30
  ) {
    throw new Error(
      "Use a valid sign, degrees from 0 to less than 30, and minutes from 0 to less than 60.",
    );
  }
  return sign * 30 + degree + minute / 60;
}
export const getSignAtLongitude = (value: number) =>
  Math.floor(normalizeLongitude(value) / 30);
export const getOppositeHouse = (house: number) => ((house + 5) % 12) + 1;
export const getOppositeSign = (sign: number) => (sign + 6) % 12;

export function validateChart(value: unknown): asserts value is NatalChart {
  if (!value || typeof value !== "object")
    throw new Error("Chart data must be an object.");
  const chart = value as NatalChart;
  const position = (n: unknown): n is number =>
    typeof n === "number" && Number.isFinite(n) && n >= 0 && n < 360;
  if (
    chart.version !== 1 ||
    typeof chart.name !== "string" ||
    chart.name.length > 100 ||
    typeof chart.houseSystem !== "string" ||
    !chart.houseSystem.trim() ||
    chart.houseSystem.length > 80
  )
    throw new Error(
      "Enter a chart name (up to 100 characters) and a house system.",
    );
  if (
    !Array.isArray(chart.cusps) ||
    chart.cusps.length !== 12 ||
    !chart.cusps.every(position)
  )
    throw new Error(
      "Enter all twelve house cusps, with longitudes from 0 to less than 360°.",
    );
  const spans = chart.cusps.map((start, i) =>
    normalizeLongitude(chart.cusps[(i + 1) % 12] - start),
  );
  if (
    spans.some((span) => span === 0) ||
    Math.abs(spans.reduce((a, b) => a + b, 0) - 360) > 1e-7
  )
    throw new Error(
      "House cusps must be distinct and follow zodiac order exactly once around the chart.",
    );
  if (
    !Array.isArray(chart.planets) ||
    chart.planets.length > 50 ||
    chart.planets.some(
      (p) =>
        !p ||
        typeof p.name !== "string" ||
        !p.name.trim() ||
        p.name.length > 60 ||
        !position(p.longitude),
    )
  )
    throw new Error(
      "Every included planet or point needs a name and a valid position.",
    );
  if (new Set(chart.planets.map((p) => p.name)).size !== chart.planets.length)
    throw new Error("Each planet or point can appear only once.");
  if (
    chart.angles !== undefined &&
    (!chart.angles ||
      typeof chart.angles !== "object" ||
      Object.values(chart.angles).some((n) => !position(n)))
  )
    throw new Error("Angles must be valid longitudes or left blank.");
  if (
    chart.planets.some(
      (p) => p.retrograde !== undefined && typeof p.retrograde !== "boolean",
    )
  )
    throw new Error("Invalid planetary motion flag.");
  if (chart.calculation !== undefined) {
    const c = chart.calculation;
    if (
      !c ||
      typeof c !== "object" ||
      typeof c.engine !== "string" ||
      c.zodiac !== "Tropical" ||
      typeof c.utc !== "string" ||
      !Number.isFinite(Date.parse(c.utc)) ||
      typeof c.timezone !== "string" ||
      typeof c.offset !== "string" ||
      !Number.isFinite(c.latitude) ||
      Math.abs(c.latitude) >= 66 ||
      !Number.isFinite(c.longitude) ||
      Math.abs(c.longitude) > 180 ||
      !Array.isArray(c.unavailable) ||
      c.unavailable.some((n) => typeof n !== "string")
    )
      throw new Error("Invalid calculation metadata in saved chart.");
  }
}

/** Half-open intervals [cusp, next cusp): an exact cusp belongs to its new house. */
export function getHouseSpan(cusps: number[], house: number) {
  const start = cusps[house - 1];
  let end = cusps[house % 12];
  if (end <= start) end += 360;
  return { start, end, span: end - start };
}
export function getSignsInsideHouse(
  cusps: number[],
  house: number,
): SignSegment[] {
  const { start, end } = getHouseSpan(cusps, house);
  const cuspSigns = new Set(cusps.map(getSignAtLongitude));
  const segments: SignSegment[] = [];
  let cursor = start;
  while (cursor < end) {
    const boundary = (Math.floor(cursor / 30) + 1) * 30;
    const stop = Math.min(boundary, end);
    const sign = getSignAtLongitude(cursor);
    segments.push({
      sign,
      start: cursor,
      end: stop,
      degrees: stop - cursor,
      intercepted: !cuspSigns.has(sign) && stop - cursor === 30,
    });
    cursor = stop;
  }
  return segments;
}
export function getPlanetHouse(cusps: number[], longitude: number): number {
  const position = normalizeLongitude(longitude);
  for (let house = 1; house <= 12; house++) {
    const { start, end } = getHouseSpan(cusps, house);
    const unwrapped = position < start ? position + 360 : position;
    if (unwrapped >= start && unwrapped < end) return house;
  }
  throw new Error(
    "Position could not be assigned to a house. Check the cusps.",
  );
}
export function buildHouses(chart: NatalChart): HouseGeometry[] {
  validateChart(chart);
  return chart.cusps.map((_, i) => ({
    number: i + 1,
    ...getHouseSpan(chart.cusps, i + 1),
    segments: getSignsInsideHouse(chart.cusps, i + 1),
    planets: chart.planets.filter(
      (p) => getPlanetHouse(chart.cusps, p.longitude) === i + 1,
    ),
  }));
}
export function findInterceptedSigns(houses: HouseGeometry[]) {
  return houses.flatMap((h) =>
    h.segments
      .filter((s) => s.intercepted)
      .map((s) => ({
        sign: s.sign,
        house: h.number,
        planets: h.planets.filter(
          (p) => getSignAtLongitude(p.longitude) === s.sign,
        ),
      })),
  );
}
export function findDuplicatedCusps(cusps: number[]) {
  return SIGNS.flatMap((_, sign) => {
    const houses = cusps.flatMap((cusp, i) =>
      getSignAtLongitude(cusp) === sign ? [i + 1] : [],
    );
    return houses.some((h) => houses.includes((h % 12) + 1))
      ? [{ sign, houses }]
      : [];
  });
}
export const countPlanets = (house: HouseGeometry) =>
  house.planets.filter((p) => PLANET_NAMES.includes(p.name)).length;
export const findAxisPopulation = (houses: HouseGeometry[]) =>
  houses.slice(0, 6).map((h, i) => ({
    axis: i + 1,
    left: countPlanets(h),
    right: countPlanets(houses[i + 6]),
  }));
export const findLuminaryAxes = (chart: NatalChart) =>
  chart.planets
    .filter((p) => ["Sun", "Moon"].includes(p.name))
    .map((p) => ({
      name: p.name,
      house: getPlanetHouse(chart.cusps, p.longitude),
      axis: ((getPlanetHouse(chart.cusps, p.longitude) - 1) % 6) + 1,
    }));
/** A concentration is at least three of the ten planets in a house, not an aspect claim. */
export const findPlanetConcentrations = (houses: HouseGeometry[]) =>
  houses.filter((h) => countPlanets(h) >= 3);
export function formatPosition(longitude: number) {
  const sign = getSignAtLongitude(longitude);
  const within = normalizeLongitude(longitude) - sign * 30;
  const degree = Math.floor(within);
  const minutes = Math.min(
    59.99,
    Math.round((within - degree) * 60 * 100) / 100,
  );
  return `${SIGNS[sign][0]} ${degree}°${minutes.toLocaleString("en-US", { minimumIntegerDigits: 2, maximumFractionDigits: 2 })}′`;
}
export function formatSpan(degrees: number) {
  return `${Number(degrees.toFixed(2))}°`;
}
