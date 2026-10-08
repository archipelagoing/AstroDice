import { useState } from "react";
import { glyph, SIGNS } from "../data/catalog";
import { getSignAtLongitude } from "../geometry/chart";
import { PLANET_MEANINGS, SIGN_STYLES } from "../interpretation/readings";
import type { Planet } from "../types";
import { SignGlyph } from "./ZodiacLabel";
import { CelestialMedallion } from "./CelestialOrnament";

export function PlanetSigns({
  name,
  sign: requestedSign,
  placement,
  example,
}: {
  name: string;
  sign?: string;
  placement?: Planet;
  example: boolean;
}) {
  const meaning = PLANET_MEANINGS[name];
  const currentSign = placement
    ? getSignAtLongitude(placement.longitude)
    : null;
  const [compare, setCompare] = useState(false);
  const selectedSign = requestedSign
    ? SIGNS.findIndex(([name]) => name === requestedSign)
    : (currentSign ?? 0);
  return (
    <>
      <div className="eyebrow">
        Planets through signs · A reference to explore
      </div>
      <h1 id="page-title" tabIndex={-1}>
        <span aria-hidden="true">{glyph(name)}</span> {name} through the signs
      </h1>
      <p className="page-intro">
        {name} represents {meaning.role}. Each sign offers a different way to
        express those themes.
      </p>
      <p className="notice">
        {placement
          ? `${example ? "The illustrative example has" : "Your chart has"} ${name} in ${SIGNS[currentSign!][0]}. Reference selections leave your chart unchanged.`
          : `${name} has no entered position in this chart. You can still explore all twelve signs.`}
      </p>
      <nav className="sign-links" aria-label="Jump to a sign">
        {SIGNS.map(([sign, , element]) => (
          <a
            key={sign}
            href={`#planet/${name}/${sign}`}
            data-element={element}
            aria-current={
              selectedSign === SIGNS.findIndex(([s]) => s === sign)
                ? "page"
                : undefined
            }
          >
            <SignGlyph name={sign} /> {sign}
          </a>
        ))}
      </nav>
      <div className="sign-reading-controls">
        <a
          className="button secondary"
          href={`#planet/${name}/${SIGNS[(selectedSign + 11) % 12][0]}`}
        >
          ← Previous sign
        </a>
        <button
          className="button secondary"
          aria-pressed={compare}
          onClick={() => setCompare(!compare)}
        >
          {compare ? "Return to focused reading" : "Compare all twelve signs"}
        </button>
        <a
          className="button secondary"
          href={`#planet/${name}/${SIGNS[(selectedSign + 1) % 12][0]}`}
        >
          Next sign →
        </a>
      </div>
      {compare ? (
        <div className="sign-comparison-grid">
          {SIGNS.map(([sign, symbol, element], i) => (
            <article
              key={sign}
              data-element={element}
              className="celestial-card sign-summary"
            >
              <h2>
                {symbol} {sign}
              </h2>
              {currentSign === i && (
                <span className="example-badge">
                  {example ? "Example placement" : "Your placement"}
                </span>
              )}
              <p>
                {name} expresses {meaning.focus} through an approach that is{" "}
                {SIGN_STYLES[i].style}.
              </p>
              <a href={`#planet/${name}/${sign}`}>
                Read {name} in {sign} →
              </a>
            </article>
          ))}
        </div>
      ) : (
        <div className="planet-sign-grid focused-sign">
          {SIGNS.map(([sign], index) => {
            if (index !== selectedSign) return null;
            const style = SIGN_STYLES[index];
            return (
              <article
                key={sign}
                id={`sign-${sign}`}
                data-element={SIGNS[index][2]}
                className={`planet-sign-card celestial-card${currentSign === index ? " current-sign" : ""}`}
              >
                <CelestialMedallion
                  symbol={`${glyph(name)} · ${SIGNS[index][1]}`}
                />
                <div className="eyebrow">
                  {currentSign === index
                    ? example
                      ? "Example placement"
                      : "Your placement"
                    : "Sign · " + String(index + 1).padStart(2, "0")}
                </div>
                <h2>
                  <SignGlyph name={sign} /> {name} in {sign}
                </h2>
                <p className="sign-takeaway">
                  <span className="reading-label">The key idea</span>
                  Questions of <strong>{meaning.focus}</strong> take an approach
                  that is <strong>{style.style}</strong>.
                </p>
                <p className="sign-practice">
                  <span className="reading-label">Try this</span>Try{" "}
                  {style.action} as a way to explore these themes.
                </p>
                <p className="reading-aside">
                  Keep {meaning.focus} in view while {style.balance}.
                </p>
                <blockquote className="reading-question">
                  <span className="reading-label">Pause & reflect</span>
                  {meaning.invitation} with this approach?
                </blockquote>
              </article>
            );
          })}
        </div>
      )}
      <p className="symbolic-note">
        These are general symbolic readings. A sign describes an approach;
        houses and the rest of a chart add context.
      </p>
    </>
  );
}
