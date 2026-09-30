import { describe, expect, it } from "vitest";
import { housesForFace, rollDie } from "../src/practice/dice";
import { BODIES, SIGNS } from "../src/data/catalog";
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
          expect(reading.synthesis).toContain(SIGNS[sign][0]);
          for (const text of [
            reading.synthesis,
            reading.example,
            reading.balance,
            reading.question,
          ]) {
            expect(text.length).toBeGreaterThan(20);
            expect(text).not.toMatch(/undefined|NaN|\[object Object\]/);
            expect(text).not.toMatch(
              /\b[Aa] (independent|observant|imaginative|expressive|exploratory)\b/,
            );
          }
          expect(reading.question).toMatch(/\?$/);
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
  it("keeps different bodies' exercises distinct in the same sign and house", () => {
    const readings = BODIES.map(([name]) =>
      readPlanet({ name, longitude: 75 }, 10)!,
    );
    expect(new Set(readings.map((r) => r.example)).size).toBe(BODIES.length);
    expect(
      readPlanet({ name: "Mercury", longitude: 75 }, 10)!.example,
    ).toContain("explain an idea");
    expect(readPlanet({ name: "Mars", longitude: 75 }, 10)!.example).toContain(
      "result you want",
    );
    expect(
      readPlanet({ name: "Saturn", longitude: 75 }, 10)!.example,
    ).toContain("manageable responsibility");
  });
  it("distinguishes nodes, luminaries, Chiron, and generational context", () => {
    for (const name of ["North Node", "South Node"]) {
      const reading = readPlanet({ name, longitude: 15 }, 1)!;
      expect(reading.kind).toBe("Point");
      expect(reading.context).toContain("complementary");
      expect(reading.context).toContain("Other astrological traditions");
      expect(reading.generational).toBeUndefined();
    }
    const chiron = readPlanet({ name: "Chiron", longitude: 15 }, 1)!;
    expect(chiron.kind).toBe("Body");
    expect(chiron.context).toContain("does not identify an injury");
    for (const name of ["Sun", "Moon"])
      expect(readPlanet({ name, longitude: 15 }, 1)!.kind).toBe("Luminary");
    for (const name of ["Uranus", "Neptune", "Pluto"])
      expect(readPlanet({ name, longitude: 15 }, 1)!.generational).toContain(
        "share this sign placement",
      );
  });
  it("does not produce a house reading for missing or invalid house data", () => {
    for (const house of [0, 13, 1.5, NaN])
      expect(() => readPlanet({ name: "Moon", longitude: 15 }, house)).toThrow(
        /known house/,
      );
    expect(readPlanet({ name: "Unknown point", longitude: 15 }, 1)).toBeNull();
    expect(readPlanet({ name: "toString", longitude: 15 }, 1)).toBeNull();
  });
  it("does not equate an interception with a blocked trait or replace the cusp sign", () => {
    const signs = readHouse(buildHouses(SAMPLE)[8]).signs;
    expect(signs[1].text).toContain("appears on no house cusp");
    expect(signs[1].text).toContain(
      "does not by itself establish a blocked ability",
    );
    expect(signs[2].text).toContain("does not replace the cusp sign");
  });
});
