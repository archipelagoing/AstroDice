import { PLANET_MEANINGS } from "../interpretation/readings";
import { getPlanetHouse } from "../geometry/chart";
import { glyph } from "../data/catalog";
import type { NatalChart } from "../types";
import { PlanetReading } from "./PlacementReading";

export function NodePair({
  chart,
  example,
  onAxis,
}: {
  chart: NatalChart;
  example: boolean;
  onAxis: (axis: number) => void;
}) {
  return (
    <>
      <div className="eyebrow">The lunar nodes · A complementary pair</div>
      <h1 id="page-title" tabIndex={-1}>
        North Node ↔ South Node
      </h1>
      <p className="page-intro">
        Explore familiar strengths alongside unfamiliar practice. The lunar
        nodes are points where the Moon’s orbital plane meets the ecliptic,
        rather than planets.
      </p>
      <p className="notice">
        {example
          ? "These placements belong to the illustrative example. Enter your birth details to explore your own nodes."
          : `Node placements from ${chart.name}.`}
      </p>
      <div className="node-pair-grid">
        {["North Node", "South Node"].map((name) => {
          const placement = chart.planets.find((p) => p.name === name);
          return (
            <section key={name} className="node-pair-card" aria-label={name}>
              <h2>
                <span aria-hidden="true">{glyph(name)}</span> {name}
              </h2>
              <p>{PLANET_MEANINGS[name].role}.</p>
              {placement ? (
                <PlanetReading
                  planet={placement}
                  house={getPlanetHouse(chart.cusps, placement.longitude)}
                  onAxis={onAxis}
                />
              ) : (
                <p className="notice">
                  No {name} position was entered in this chart.
                </p>
              )}
            </section>
          );
        })}
      </div>
      <p className="symbolic-note">
        This modern developmental reading treats the nodes as complementary,
        rather than good and bad. Other astrological traditions interpret them
        differently.
      </p>
    </>
  );
}
