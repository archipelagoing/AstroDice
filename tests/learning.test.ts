import { describe, expect, it } from "vitest";
import { housesForFace, rollDie } from "../src/practice/dice";
import { BODIES } from "../src/data/catalog";
import { readPlanet, readHouse } from "../src/interpretation/readings";
import { buildHouses } from "../src/geometry/chart";
import { SAMPLE } from "../src/data/sample";

describe("dice mapping", () => {
  it("maps all six faces permanently to opposing houses", () => {
    for (let i = 1; i <= 6; i++) {
      expect(housesForFace(i)).toEqual([i, i + 6]);
      expect(rollDie(() => i - 1)).toBe(i);
    }
    for (const face of [0, 7, 1.5, NaN])
      expect(() => housesForFace(face)).toThrow();
  });
  it("rejects the biased tail of the random range", () => {
    const values = [4294967295, 4294967292, 8];
    expect(rollDie(() => values.shift()!)).toBe(3);
  });
});
describe("placement education coverage", () => {
  it("has coherent content for every supported planet/sign/house combination", () => {
    for (const [name] of BODIES)
      for (let sign = 0; sign < 12; sign++)
        for (let house = 1; house <= 12; house++) {
          const reading = readPlanet(
            { name, longitude: sign * 30 + 15 },
            house,
          )!;
          expect(reading.synthesis).toContain(`house ${house}`);
          expect(reading.synthesis).toContain(name);
          expect(reading.example).not.toContain("undefined");
          expect(reading.axis).toBe(((house - 1) % 6) + 1);
        }
  });
  it("distinguishes cusp, interception, and partial spans", () => {
    const reading = readHouse(buildHouses(SAMPLE)[8]);
    expect(reading.signs.map((s) => [s.sign, s.role])).toEqual([
      ["Aries", "Cusp sign"],
      ["Taurus", "Intercepted sign"],
      ["Gemini", "Additional sign span"],
    ]);
  });
  it("connects Venus, Gemini, and public life rather than returning isolated definitions", () => {
    const reading = readPlanet({ name: "Venus", longitude: 75 }, 10)!;
    expect(reading.synthesis).toContain("relationships");
    expect(reading.synthesis).toContain("conversational");
    expect(reading.synthesis).toContain("public roles");
    expect(reading.example).toContain("presenting your work");
  });
});
