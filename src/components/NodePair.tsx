import { useState } from "react";
import { PLANET_MEANINGS, readPlanet } from "../interpretation/readings";
import { SIGNS } from "../data/catalog";
import { getSignAtLongitude, getPlanetHouse } from "../geometry/chart";
import { glyph } from "../data/catalog";
import type { NatalChart } from "../types";
import { PlanetReading } from "./PlacementReading";
import { CelestialMedallion } from "./CelestialOrnament";

export function NodePair({
  chart,
  example,
  onAxis,
}: {
  chart: NatalChart;
  example: boolean;
  onAxis: (axis: number) => void;
}) {
  const [focus, setFocus] = useState("Together");
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
            <section
              key={name}
              className="node-pair-card celestial-card"
              aria-label={name}
              data-node={name === "North Node" ? "north" : "south"}
            >
              <CelestialMedallion symbol={glyph(name)} />
              <span className="node-focus-label">
                {name === "North Node"
                  ? "Unfamiliar practice"
                  : "Familiar strengths"}
              </span>
              <h2>
                <span aria-hidden="true">{glyph(name)}</span> {name}
              </h2>
              <p>{PLANET_MEANINGS[name].role}.</p>
              {placement ? (
                <p className="node-position">
                  {SIGNS[getSignAtLongitude(placement.longitude)][1]}{" "}
                  {SIGNS[getSignAtLongitude(placement.longitude)][0]} · House{" "}
                  {getPlanetHouse(chart.cusps, placement.longitude)}
                </p>
              ) : (
                <p className="notice">
                  No {name} position was entered in this chart.
                </p>
              )}
            </section>
          );
        })}
      </div>
      <div className="orbital-node-divider" aria-hidden="true">
        ☊ ─── ✦ ─── ☋
      </div>
      <div
        className="view-switch pair-controls"
        role="group"
        aria-label="Node reading focus"
      >
        {["North", "Together", "South"].map((n) => (
          <button
            key={n}
            aria-pressed={focus === n}
            onClick={() => setFocus(n)}
          >
            {n}
          </button>
        ))}
      </div>
      {focus === "Together" ? (
        <article className="relationship-reading celestial-card">
          <span className="eyebrow">A symbolic relationship</span>
          <h2>Carry your strengths into new practice.</h2>
          <p className="sign-takeaway">
            The South Node describes familiar patterns you can draw on. The
            North Node invites an approach that may take conscious practice.
            Read them together as a conversation: familiarity can support
            exploration, while new experience can widen an established habit.
          </p>
          {["South Node", "North Node"].map((name) => {
            const p = chart.planets.find((p) => p.name === name);
            if (!p) return null;
            const reading = readPlanet(
              p,
              getPlanetHouse(chart.cusps, p.longitude),
            );
            return (
              <p key={name}>
                <strong>
                  {name === "South Node"
                    ? "A familiar starting point"
                    : "An invitation to practice"}{" "}
                  · {name}:
                </strong>{" "}
                {reading?.synthesis}
              </p>
            );
          })}
          <p>
            Start with the South Node’s sign as a familiar style and its house
            as a setting where that style may feel available. Then explore the
            North Node’s sign as a different approach, and its house as a place
            to try it. Neither side needs to be abandoned.
          </p>
          <blockquote className="reading-question">
            <span className="reading-label">Pause & reflect</span>Which familiar
            strength could support one small experiment with a less familiar
            approach?
          </blockquote>
          <p>
            {chart.planets.some((p) => p.name === "North Node") &&
            chart.planets.some((p) => p.name === "South Node")
              ? "Choose North or South above to read the supplied placements in detail."
              : "A node position is missing. This relationship is general; no missing sign or house has been inferred."}
          </p>
        </article>
      ) : (
        (() => {
          const name = `${focus} Node`;
          const p = chart.planets.find((p) => p.name === name);
          return p ? (
            <div
              className="node-focused-reader"
              data-node={focus.toLowerCase()}
            >
              <PlanetReading
                key={name}
                planet={p}
                house={getPlanetHouse(chart.cusps, p.longitude)}
                onAxis={onAxis}
              />
            </div>
          ) : (
            <p className="notice">
              No {name} position was entered in this chart.
            </p>
          );
        })()
      )}
      <p className="symbolic-note">
        {chart.calculation
          ? "These mean lunar node positions were calculated from the supplied birth details. "
          : example
            ? "These positions are illustrative example data. "
            : "These positions were supplied manually. "}
        This modern developmental reading treats the nodes as complementary,
        rather than good and bad. Other astrological traditions interpret them
        differently.
      </p>
    </>
  );
}
