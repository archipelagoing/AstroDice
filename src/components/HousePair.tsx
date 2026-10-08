import { useState } from "react";
import { AXES, SIGNS, glyph } from "../data/catalog";
import type { HouseGeometry } from "../types";
import { HouseSpan } from "./HouseSpan";
import { HouseReading } from "./PlacementReading";
import { ZodiacPosition } from "./ZodiacLabel";
import { CelestialMedallion } from "./CelestialOrnament";

export function HousePair({
  houses,
  face,
  concealed = false,
  compact = false,
}: {
  houses: HouseGeometry[];
  face: number;
  concealed?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`house-pair${concealed ? " is-concealed" : ""}${compact ? " is-preview" : ""}`}
    >
      {[face, face + 6].map((number, i) => {
        const h = houses[number - 1];
        return (
          <article
            key={number}
            className="house-summary celestial-card"
            aria-label={`House ${number} summary`}
          >
            <CelestialMedallion symbol={concealed ? "✧" : String(number)} />
            <span className="eyebrow">{AXES[face - 1].sides[i]}</span>
            <h3>House {number}</h3>
            {concealed ? (
              <p className="concealed-answer">
                Recall its cusp sign and placements.
                <br />
                Reveal when you’re ready.
              </p>
            ) : (
              <>
                <p>
                  <span className="reading-label">Cusp sign</span>
                  <ZodiacPosition longitude={h.start} />
                </p>
                <p>
                  <span className="reading-label">Additional sign spans</span>
                  {h.segments
                    .slice(1)
                    .map(
                      (s) =>
                        `${SIGNS[s.sign][1]} ${SIGNS[s.sign][0]}${s.intercepted ? " (intercepted)" : ""}`,
                    )
                    .join(" · ") || "None"}
                </p>
                <p>
                  <span className="reading-label">Planets & points</span>
                  {h.planets
                    .map((p) => `${glyph(p.name)} ${p.name}`)
                    .join(" · ") ||
                    "Empty house · no entered planets or points"}
                </p>
                {!compact && <HouseSpan house={h} />}
              </>
            )}
          </article>
        );
      })}
      <span className="orbital-bridge" aria-hidden="true">
        ✦
      </span>
    </div>
  );
}

export function PairReading({
  houses,
  face,
}: {
  houses: HouseGeometry[];
  face: number;
}) {
  const [focus, setFocus] = useState<number | null>(null);
  return (
    <section className="axis-page-readings" aria-label="House pair readings">
      <div
        className="view-switch pair-controls"
        role="group"
        aria-label="House reading focus"
      >
        {[face, null, face + 6].map((n) => (
          <button
            key={n ?? "both"}
            aria-pressed={focus === n}
            onClick={() => setFocus(n)}
          >
            {n === null ? "Both" : `House ${n}`}
          </button>
        ))}
      </div>
      {focus === null ? (
        <article className="relationship-reading celestial-card">
          <span className="eyebrow">Read the relationship</span>
          <h2>{AXES[face - 1].title}</h2>
          <p className="sign-takeaway">{AXES[face - 1].meaning}</p>
          <blockquote className="reading-question">
            <span className="reading-label">Pause & reflect</span>
            {AXES[face - 1].question}
          </blockquote>
          <p>
            Choose either house above to explore its signs, placements, and
            everyday meanings.
          </p>
        </article>
      ) : (
        <HouseReading key={focus} house={houses[focus - 1]} />
      )}
    </section>
  );
}
