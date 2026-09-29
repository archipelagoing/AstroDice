import { AXES, SIGNS, glyph } from "../data/catalog";
import { countPlanets, formatPosition, formatSpan } from "../geometry/chart";
import type { HouseGeometry } from "../types";
import { HouseReading } from "./PlacementReading";
import { HouseSpan } from "./HouseSpan";

function HouseDetail({ house }: { house: HouseGeometry }) {
  return (
    <section className="house-detail">
      <h4>
        House {house.number} <span>{formatSpan(house.span)} span</span>
      </h4>
      <p className="cusp-line">
        {formatPosition(house.start)} <span>→</span> {formatPosition(house.end)}
      </p>
      <ul className="segment-details">
        {house.segments.map((s) => (
          <li key={s.start}>
            <span>
              {SIGNS[s.sign][1]} {SIGNS[s.sign][0]}{" "}
              {s.intercepted && <small>Intercepted</small>}
            </span>
            <span>{formatSpan(s.degrees)}</span>
          </li>
        ))}
      </ul>
      <div className="placement-list">
        {house.planets.length ? (
          house.planets.map((p) => (
            <div key={p.name}>
              <span>
                <span aria-hidden="true">{glyph(p.name)}</span> {p.name}
              </span>
              <span>{formatPosition(p.longitude)}</span>
            </div>
          ))
        ) : (
          <p className="muted">
            No planets or points here. An empty house still describes a part of
            the axis.
          </p>
        )}
      </div>
    </section>
  );
}

export function AxisCard({
  index,
  houses,
  architecture,
  active = false,
  onSelect,
}: {
  index: number;
  houses: HouseGeometry[];
  architecture: boolean;
  active?: boolean;
  onSelect?: (axis: number) => void;
}) {
  const axis = AXES[index];
  const left = houses[index];
  const right = houses[index + 6];
  const luminaries = [...left.planets, ...right.planets].filter((p) =>
    ["Sun", "Moon"].includes(p.name),
  );
  const intercepted = [...left.segments, ...right.segments].some(
    (s) => s.intercepted,
  );
  return (
    <details
      id={`axis-${index + 1}`}
      onToggle={(event) => {
        if (event.currentTarget.open) onSelect?.(index + 1);
      }}
      className={`axis-card ${architecture ? "architecture-card" : ""} ${active ? "active-axis" : ""}`}
    >
      <summary>
        <div className="axis-topline">
          <span className="axis-index">0{axis.number}</span>
          <span className="axis-title">{axis.title}</span>
          <span className="axis-tags">
            {luminaries.map((p) => (
              <span key={p.name}>
                {glyph(p.name)} {p.name}
              </span>
            ))}
            {intercepted && (
              <span className="interception-tag">Interception</span>
            )}
          </span>
          <span className="expand-icon" aria-hidden="true">
            +
          </span>
        </div>
        <div className="axis-pair">
          {[left, right].map((house, side) => (
            <div className="axis-house" key={house.number}>
              <div className="house-heading">
                <h3>{axis.sides[side]}</h3>
                <span>House {String(house.number).padStart(2, "0")}</span>
              </div>
              {architecture ? (
                <div className="population">
                  <div className="population-dots" aria-hidden="true">
                    {house.planets.length ? (
                      house.planets.map((p) => (
                        <span
                          key={p.name}
                          className={
                            ["Sun", "Moon"].includes(p.name) ? "luminary" : ""
                          }
                        >
                          {glyph(p.name)}
                        </span>
                      ))
                    ) : (
                      <span className="empty-dot">○</span>
                    )}
                  </div>
                  <p>
                    {countPlanets(house)}{" "}
                    {countPlanets(house) === 1 ? "planet" : "planets"}
                    {house.planets.length - countPlanets(house) > 0
                      ? ` · ${house.planets.length - countPlanets(house)} ${house.planets.length - countPlanets(house) === 1 ? "point" : "points"}`
                      : ""}
                  </p>
                  <span className="sr-only">
                    {house.planets.map((p) => p.name).join(", ") ||
                      "Empty house"}
                  </span>
                </div>
              ) : (
                <HouseSpan house={house} />
              )}
            </div>
          ))}
          <span className="axis-connector" aria-hidden="true">
            ↔
          </span>
        </div>
      </summary>
      <div className="axis-expanded">
        <div className="detail-pair">
          <HouseDetail house={left} />
          <HouseDetail house={right} />
        </div>
        <details className="axis-readings">
          <summary>Understand these signs, houses & planets</summary>
          <div className="detail-pair">
            <HouseReading house={left} />
            <HouseReading house={right} />
          </div>
        </details>
        <div className="axis-lesson">
          <span className="eyebrow">Reading the relationship</span>
          <p>{axis.meaning}</p>
          <blockquote>{axis.question}</blockquote>
          <small>
            General symbolic context · not a personalized prediction
          </small>
        </div>
      </div>
    </details>
  );
}
