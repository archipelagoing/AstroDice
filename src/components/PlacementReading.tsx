import { ZodiacPosition, SignGlyph } from "./ZodiacLabel";
import { AXES, SIGNS, glyph } from "../data/catalog";
import { getSignAtLongitude } from "../geometry/chart";
import { readHouse, readPlanet } from "../interpretation/readings";
import type { HouseGeometry, Planet } from "../types";
import { SabianCard } from "./SabianCard";
import { CelestialMedallion } from "./CelestialOrnament";

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
    <article
      className="placement-reading celestial-card"
      data-element={SIGNS[getSignAtLongitude(planet.longitude)][2]}
    >
      <CelestialMedallion symbol={glyph(planet.name)} />
      <span className="eyebrow">{reading.kind} · sign · house</span>
      <h3>
        <span aria-hidden="true">{glyph(planet.name)}</span> {planet.name} in{" "}
        <SignGlyph name={SIGNS[getSignAtLongitude(planet.longitude)][0]} />{" "}
        {SIGNS[getSignAtLongitude(planet.longitude)][0]} · House {house}
      </h3>
      <p className="placement-fact">
        <ZodiacPosition longitude={planet.longitude} />
        {planet.retrograde ? " · Retrograde (apparent backward motion)" : ""}
      </p>
      <section className="reading-synthesis">
        <h4>Putting it together</h4>
        <p>{reading.synthesis}</p>
      </section>
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
      <section className="reading-example">
        <h4>In everyday life</h4>
        <p>{reading.example}</p>
      </section>
      <blockquote className="reading-question">
        <span className="reading-label">Pause & reflect</span>
        {reading.question}
      </blockquote>
      <section className="reading-axis">
        <h4>
          Axis {reading.axis} · {AXES[reading.axis - 1].sides.join(" ↔ ")}
        </h4>
        <p>{AXES[reading.axis - 1].meaning}</p>
        {onAxis && (
          <button className="text-button" onClick={() => onAxis(reading.axis)}>
            Explore houses {reading.axis} ↔ {reading.axis + 6} →
          </button>
        )}
      </section>
      <section className="reading-balance">
        <h4>Keep in balance</h4>
        <p>{reading.balance}</p>
      </section>
      {(reading.context || reading.generational) && (
        <details className="reading-context">
          <summary>More context for this placement</summary>
          {reading.context && <p>{reading.context}</p>}
          {reading.generational && <p>{reading.generational}</p>}
        </details>
      )}
      <SabianCard longitude={planet.longitude} label={planet.name} />
      <p className="symbolic-note">
        A modern Western symbolic reading of this placement, not a full-chart
        assessment or a prediction. Aspects and house rulers are not included.
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
    <article
      className="house-reading celestial-card"
      data-element={SIGNS[getSignAtLongitude(house.start)][2]}
    >
      <CelestialMedallion symbol={String(house.number)} />
      <span className="eyebrow">House {house.number}</span>
      <h3>{reading.title}</h3>
      <p className="house-focus">
        This house concerns <strong>{reading.area}</strong>.
      </p>
      <p className="placement-fact">
        <ZodiacPosition longitude={house.start} /> →{" "}
        <ZodiacPosition longitude={house.end} />
      </p>
      {reading.signs.map((s, i) => (
        <section
          key={i}
          className="house-sign-reading"
          data-element={SIGNS.find(([name]) => name === s.sign)?.[2]}
        >
          <h4>
            <SignGlyph name={s.sign} /> {s.sign} <small>{s.role}</small>
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
      <blockquote className="reading-question"><span className="reading-label">Pause & reflect</span>{reading.axis.question}</blockquote>
      <p className="reading-aside">{reading.axis.meaning}</p>
      <SabianCard
        longitude={house.start}
        label={`House ${house.number} cusp`}
      />
      <p className="symbolic-note">
        These are selected modern Western house themes, not a complete account
        of every tradition. Signs and houses are distinct; no sign automatically
        belongs to a numbered house.
      </p>
    </article>
  );
}
