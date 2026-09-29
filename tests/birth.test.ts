import { describe, expect, it } from "vitest";
import { calculateChart } from "../src/calculation/calculate";
import { resolveBirthTime } from "../src/calculation/time";
import { calculateHouses } from "../src/calculation/houses";
import { validateChart } from "../src/geometry/chart";
import type { BirthDetails } from "../src/types";

const birth: BirthDetails = {
  date: "2000-01-01",
  time: "07:00",
  place: {
    name: "New York",
    latitude: 40.7128,
    longitude: -74.006,
    timezone: "America/New_York",
  },
  houseSystem: "Placidus",
  disambiguation: "reject",
  unknownTime: false,
};
describe("birth time resolution", () => {
  it("converts local time using the birth date and handles UTC date rollover", () => {
    expect(resolveBirthTime(birth).utc).toBe("2000-01-01T12:00:00Z");
    expect(
      resolveBirthTime({ ...birth, date: "2000-07-01", time: "23:30" }).utc,
    ).toBe("2000-07-02T03:30:00Z");
    expect(
      resolveBirthTime({
        ...birth,
        date: "2000-01-01",
        time: "01:00",
        place: {
          name: "Tokyo",
          latitude: 35.68,
          longitude: 139.69,
          timezone: "Asia/Tokyo",
        },
      }).utc,
    ).toBe("1999-12-31T16:00:00Z");
  });
  it("rejects spring gaps and requires explicit choice for autumn overlaps", () => {
    expect(() =>
      resolveBirthTime({ ...birth, date: "2024-03-10", time: "02:30" }),
    ).toThrow("did not exist");
    expect(() =>
      resolveBirthTime({
        ...birth,
        date: "2024-03-10",
        time: "02:30",
        disambiguation: "later",
      }),
    ).toThrow("did not exist");
    const repeated = { ...birth, date: "2024-11-03", time: "01:30" };
    expect(() => resolveBirthTime(repeated)).toThrow("occurred twice");
    expect(
      resolveBirthTime({ ...repeated, disambiguation: "earlier" }).utc,
    ).toBe("2024-11-03T05:30:00Z");
    expect(resolveBirthTime({ ...repeated, disambiguation: "later" }).utc).toBe(
      "2024-11-03T06:30:00Z",
    );
  });
  it("validates dates, unsupported years and unknown times", () => {
    expect(() => resolveBirthTime({ ...birth, date: "2001-02-29" })).toThrow();
    expect(resolveBirthTime({ ...birth, date: "2000-02-29" }).utc).toContain(
      "2000-02-29",
    );
    expect(() => calculateChart({ ...birth, unknownTime: true })).toThrow(
      "known birth time",
    );
    expect(() => calculateChart({ ...birth, date: "1800-01-01" })).toThrow(
      "1900",
    );
  });
});
describe("calculation integration", () => {
  it("calculates ten planets and mean nodes, validates all cusps, and marks Chiron unavailable", () => {
    const chart = calculateChart(birth);
    expect(() => validateChart(chart)).not.toThrow();
    expect(chart.planets).toHaveLength(12);
    expect(chart.calculation?.unavailable).toEqual(["Chiron"]);
    expect(chart.cusps).toHaveLength(12);
    expect(chart.cusps[0]).toBe(chart.angles?.asc);
    expect(chart.cusps[9]).toBe(chart.angles?.mc);
    // Independent published J2000 Sun position: ~280.37°; broad sanity check.
    expect(chart.planets[0].longitude).toBeGreaterThan(280.3);
    expect(chart.planets[0].longitude).toBeLessThan(280.5);
  });
  it("updates calculated positions and supports Whole Sign without equating MC to house 10", () => {
    const first = calculateChart(birth),
      second = calculateChart({ ...birth, time: "15:00" });
    expect(first.cusps).not.toEqual(second.cusps);
    expect(first.planets[1].longitude).not.toEqual(second.planets[1].longitude);
    const whole = calculateChart({ ...birth, houseSystem: "Whole Sign" });
    expect(whole.cusps.every((c) => c % 30 === 0)).toBe(true);
    expect(whole.cusps[9]).not.toBe(whole.angles?.mc);
  });
  it("rejects polar inputs and malformed restored metadata", () => {
    expect(() => calculateHouses(new Date(), 70, 0, "Placidus")).toThrow("66");
    expect(() =>
      validateChart({
        ...calculateChart(birth),
        calculation: { latitude: "oops" },
      }),
    ).toThrow("metadata");
  });
});
