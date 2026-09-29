import { expect, it } from "vitest";
import reference from "./fixtures/reference-charts.json";
import { calculateChart } from "../src/calculation/calculate";
const distance = (a: number, b: number) =>
  Math.abs(((a - b + 540) % 360) - 180);
for (const fixture of reference.fixtures) {
  it(`matches independent Swiss reference: ${fixture.date} ${fixture.latitude}, ${fixture.longitude}`, () => {
    const chart = calculateChart({
      date: fixture.date,
      time: fixture.time,
      place: {
        name: "Reference coordinates",
        latitude: fixture.latitude,
        longitude: fixture.longitude,
        timezone: "Etc/UTC",
      },
      houseSystem: "Placidus",
      disambiguation: "reject",
      unknownTime: false,
    });
    for (const [name, longitude] of Object.entries(fixture.planets))
      expect(
        distance(
          chart.planets.find((p) => p.name === name)!.longitude,
          longitude,
        ),
        name,
      ).toBeLessThan(0.03);
    chart.cusps.forEach((c, i) =>
      expect(distance(c, fixture.cusps[i]), `house ${i + 1}`).toBeLessThan(
        0.005,
      ),
    );
    expect(distance(chart.angles!.asc!, fixture.asc), "ASC").toBeLessThan(
      0.005,
    );
    expect(distance(chart.angles!.mc!, fixture.mc), "MC").toBeLessThan(0.005);
    expect(
      distance(
        chart.planets.find((p) => p.name === "North Node")!.longitude,
        fixture.northNode,
      ),
      "mean node",
    ).toBeLessThan(0.01);
  });
}
