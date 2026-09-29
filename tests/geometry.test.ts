import { describe, expect, it } from "vitest";
import { SAMPLE } from "../src/data/sample";
import {
  buildHouses,
  countPlanets,
  findAxisPopulation,
  findDuplicatedCusps,
  findInterceptedSigns,
  findLuminaryAxes,
  findPlanetConcentrations,
  getAbsoluteLongitude,
  getOppositeHouse,
  getOppositeSign,
  getPlanetHouse,
  getSignsInsideHouse,
  normalizeLongitude,
  validateChart,
} from "../src/geometry/chart";

const equalCusps = Array.from({ length: 12 }, (_, i) => i * 30);
describe("longitude normalization", () => {
  it("handles positive and negative revolutions", () => {
    expect([0, 360, 720, -360, -1, 361].map(normalizeLongitude)).toEqual([
      0, 0, 0, 0, 359, 1,
    ]);
    expect(() => normalizeLongitude(NaN)).toThrow();
    expect(() => normalizeLongitude(Infinity)).toThrow();
  });
  it("keeps exact input precision and converts signs and minutes", () => {
    expect(normalizeLongitude(28.816666666666666)).toBe(28.816666666666666);
    expect(getAbsoluteLongitude(5, 6, 12)).toBe(156.2);
    expect(() => getAbsoluteLongitude(12, 0)).toThrow();
    expect(() => getAbsoluteLongitude(0, 30)).toThrow();
    expect(() => getAbsoluteLongitude(0, 29.9, 30)).toThrow();
  });
});
describe("house geometry", () => {
  it("covers 360 degrees exactly once and preserves proportional segments", () => {
    const houses = buildHouses(SAMPLE);
    expect(houses.reduce((sum, h) => sum + h.span, 0)).toBeCloseTo(360, 10);
    for (const house of houses)
      expect(house.segments.reduce((sum, s) => sum + s.degrees, 0)).toBeCloseTo(
        house.span,
        10,
      );
    expect(houses[8].segments.map((s) => s.sign)).toEqual([0, 1, 2]);
    expect(houses[8].segments[1].degrees).toBe(30);
    expect(houses[7].segments.map((s) => s.sign)).toEqual([11, 0]);
  });
  it("assigns every exact cusp to the beginning house, including wraparound", () => {
    for (const cusps of [SAMPLE.cusps, equalCusps])
      for (let i = 0; i < 12; i++) {
        expect(getPlanetHouse(cusps, cusps[i])).toBe(i + 1);
        expect(getPlanetHouse(cusps, cusps[i] + 1e-9)).toBe(i + 1);
        expect(getPlanetHouse(cusps, cusps[i] - 1e-9)).toBe(
          ((i + 11) % 12) + 1,
        );
      }
  });
  it("does not infer a planet house from its sign", () => {
    expect(getPlanetHouse(SAMPLE.cusps, 1)).toBe(8);
    expect(getPlanetHouse(SAMPLE.cusps, 29)).toBe(9);
    expect(getPlanetHouse(SAMPLE.cusps, 0)).toBe(8);
  });
  it("detects interceptions, excludes cusp-aligned signs, and finds duplicates", () => {
    expect(
      findInterceptedSigns(buildHouses(SAMPLE)).map((s) => [s.sign, s.house]),
    ).toEqual([
      [7, 3],
      [1, 9],
    ]);
    expect(findDuplicatedCusps(SAMPLE.cusps)).toEqual([
      { sign: 5, houses: [1, 2] },
      { sign: 11, houses: [7, 8] },
    ]);
    expect(
      findInterceptedSigns(buildHouses({ ...SAMPLE, cusps: equalCusps })),
    ).toEqual([]);
    expect(findDuplicatedCusps(equalCusps)).toEqual([]);
    expect(getSignsInsideHouse(equalCusps, 12)).toHaveLength(1);
  });
  it("detects duplicated cusps across houses 12 and 1", () => {
    const cusps = [10, 40, 70, 100, 130, 160, 190, 220, 250, 280, 310, 5];
    expect(findDuplicatedCusps(cusps)).toEqual([{ sign: 0, houses: [1, 12] }]);
  });
  it("counts planets separately from nodes and Chiron", () => {
    const houses = buildHouses(SAMPLE);
    expect(houses[9].planets).toHaveLength(5);
    expect(countPlanets(houses[9])).toBe(4);
    expect(findAxisPopulation(houses)[3]).toEqual({
      axis: 4,
      left: 1,
      right: 4,
    });
    expect(findPlanetConcentrations(houses).map((h) => h.number)).toEqual([10]);
    expect(findLuminaryAxes(SAMPLE)).toEqual([
      { name: "Sun", house: 9, axis: 3 },
      { name: "Moon", house: 7, axis: 1 },
    ]);
    expect(getOppositeHouse(12)).toBe(6);
    expect(getOppositeSign(7)).toBe(1);
  });
  it("preserves coverage under rotations of the fixture", () => {
    for (let rotation = 0; rotation < 360; rotation += 7) {
      const chart = {
        ...SAMPLE,
        cusps: SAMPLE.cusps.map((c) => normalizeLongitude(c + rotation)),
        planets: SAMPLE.planets.map((p) => ({
          ...p,
          longitude: normalizeLongitude(p.longitude + rotation),
        })),
      };
      const houses = buildHouses(chart);
      expect(houses.map((h) => h.planets.map((p) => p.name))).toEqual(
        buildHouses(SAMPLE).map((h) => h.planets.map((p) => p.name)),
      );
      expect(houses.reduce((sum, h) => sum + h.span, 0)).toBeCloseTo(360, 9);
    }
  });
});
describe("input validation", () => {
  it("rejects missing, repeated, out-of-order, and nonfinite cusps", () => {
    for (const cusps of [
      [],
      equalCusps.slice(1),
      equalCusps.map(() => 0),
      [30, 0, ...equalCusps.slice(2)],
      [NaN, ...equalCusps.slice(1)],
      [360, ...equalCusps.slice(1)],
    ])
      expect(() => validateChart({ ...SAMPLE, cusps })).toThrow();
  });
  it("rejects malformed persistence data and repeated planets", () => {
    for (const value of [
      null,
      {},
      { ...SAMPLE, planets: null },
      { ...SAMPLE, planets: [SAMPLE.planets[0], SAMPLE.planets[0]] },
      { ...SAMPLE, angles: { asc: Infinity } },
    ])
      expect(() => validateChart(value)).toThrow();
    expect(() => validateChart({ ...SAMPLE, planets: [] })).not.toThrow();
  });
});
