import { describe, expect, it } from "vitest";
import { sabianPosition } from "../src/interpretation/sabian";

describe("Sabian degrees and official lookup input", () => {
  it.each([
    [0, "Aries", 1, 0],
    [0.999999, "Aries", 1, 0],
    [1, "Aries", 2, 1],
    [29.999999, "Aries", 30, 29],
    [30, "Taurus", 1, 0],
    [359.999999, "Pisces", 30, 29],
    [360, "Aries", 1, 0],
    [-0.5, "Pisces", 30, 29],
  ])(
    "maps %s without rounding across a boundary",
    (longitude, sign, degree, zodiacDegree) => {
      expect(sabianPosition(longitude)).toEqual({ sign, degree, zodiacDegree });
    },
  );
  it("rejects non-finite positions", () => {
    expect(() => sabianPosition(NaN)).toThrow();
  });
});
