import { AXES, glyph } from "../data/catalog";
import { formatPosition } from "../geometry/chart";
import { readHouse, readPlanet } from "../interpretation/readings";
import type { HouseGeometry, Planet } from "../types";
import { SabianCard } from "./SabianCard";

export function PlanetReading({
  planet,
  house,
  onAxis,
}: {
  planet: Planet;
  house: number;
  onAxis?: (axis: number) => void;
}) {
  const reading = readPlanet(planet, house);
  if (!reading)
    return (
      <p>No authored interpretation is available for {planet.name} yet.</p>
    );
  return (
    <article className="placement-reading">
      <span className="eyebrow">Planet · sign · house</span>
      <h3>
        <span aria-hidden="true">{glyph(planet.name)}</span> {reading.title}
      </h3>
      <p className="placement-fact">
        {formatPosition(planet.longitude)}
        {planet.retrograde ? " · Retrograde (apparent backward motion)" : ""}
      </p>
      <SabianCard longitude={planet.longitude} label={planet.name} />
      <dl className="reading-keys">
        <div>
          <dt>What · {planet.name}</dt>
          <dd>{reading.what}</dd>
        </div>
        <div>
          <dt>How · the sign</dt>
          <dd>{reading.how}</dd>
        </div>
        <div>
          <dt>Where · house {house}</dt>
          <dd>{reading.where}</dd>
        </div>
      </dl>
      <h4>Putting it together</h4>
      <p>{reading.synthesis}</p>
      <p>{reading.example}</p>
      {reading.generational && (
        <p className="reading-aside">{reading.generational}</p>
      )}
      <blockquote>{reading.question}</blockquote>
      <p className="reading-aside">
        Axis {reading.axis}: {AXES[reading.axis - 1].sides.join(" ↔ ")}.{" "}
        {AXES[reading.axis - 1].meaning}
      </p>
      {onAxis && (
        <button className="text-button" onClick={() => onAxis(reading.axis)}>
          Explore houses {reading.axis} ↔ {reading.axis + 6} →
        </button>
      )}
      <p className="symbolic-note">
        Authored symbolic interpretation, not a prediction or a fixed
        description of you.
      </p>
    </article>
  );
}

export function HouseReading({
  house,
  onPlanet,
}: {
  house: HouseGeometry;
  onPlanet?: (planet: Planet) => void;
}) {
  const reading = readHouse(house);
  return (
    <article className="house-reading">
      <span className="eyebrow">House {house.number}</span>
      <h3>{reading.title}</h3>
      <p>This house concerns {reading.area}.</p>
      <p className="placement-fact">
        {formatPosition(house.start)} → {formatPosition(house.end)}
      </p>
      <SabianCard
        longitude={house.start}
        label={`House ${house.number} cusp`}
      />
      {reading.signs.map((s, i) => (
        <section key={i}>
          <h4>
            {s.sign} <small>{s.role}</small>
          </h4>
          <p>{s.text}</p>
        </section>
      ))}
      <h4>Planets & points here</h4>
      {house.planets.length ? (
        <div className="reading-planets">
          {house.planets.map((planet) =>
            onPlanet ? (
              <button
                key={planet.name}
                className="button secondary"
                onClick={() => onPlanet(planet)}
              >
                {glyph(planet.name)} {planet.name} →
              </button>
            ) : (
              <PlanetReading
                key={planet.name}
                planet={planet}
                house={house.number}
              />
            ),
          )}
        </div>
      ) : (
        <p>
          No planets or points occupy this house in the supplied chart. Its
          themes still belong to the axis; an empty house does not mean this
          part of life is absent.
        </p>
      )}
      <p className="reading-aside">{reading.axis.meaning}</p>
      <p className="symbolic-note">
        House and sign meanings are symbolic lenses, not established scientific
        causes.
      </p>
    </article>
  );
}
