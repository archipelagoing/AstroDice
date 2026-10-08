import { glyph, SIGNS } from "../data/catalog";
import { getSignAtLongitude } from "../geometry/chart";
import { PLANET_MEANINGS, SIGN_STYLES } from "../interpretation/readings";
import type { Planet } from "../types";
import { SignGlyph } from "./ZodiacLabel";

export function PlanetSigns({
  name,
  placement,
  example,
}: {
  name: string;
  placement?: Planet;
  example: boolean;
}) {
  const meaning = PLANET_MEANINGS[name];
  const currentSign = placement
    ? getSignAtLongitude(placement.longitude)
    : null;
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
          ? `${example ? "The illustrative example has" : "Your chart has"} ${name} in ${SIGNS[currentSign!][0]}. All twelve possibilities are shown below.`
          : `${name} has no entered position in this chart. You can still explore all twelve signs.`}
      </p>
      <nav className="sign-links" aria-label="Jump to a sign">
        {SIGNS.map(([sign]) => (
          <a key={sign} href={`#planet/${name}/${sign}`}>
            <SignGlyph name={sign} /> {sign}
          </a>
        ))}
      </nav>
      <div className="planet-sign-grid">
        {SIGNS.map(([sign], index) => {
          const style = SIGN_STYLES[index];
          return (
            <article
              key={sign}
              id={`sign-${sign}`}
              className={`planet-sign-card${currentSign === index ? " current-sign" : ""}`}
            >
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
              <p>
                Questions of {meaning.focus} take an approach that is{" "}
                {style.style}.
              </p>
              <p>Try {style.action} as a way to explore these themes.</p>
              <p className="reading-aside">
                Keep {meaning.focus} in view while {style.balance}.
              </p>
              <blockquote>{meaning.invitation} with this approach?</blockquote>
            </article>
          );
        })}
      </div>
      <p className="symbolic-note">
        These are general symbolic readings. A sign describes an approach;
        houses and the rest of a chart add context.
      </p>
    </>
  );
}
