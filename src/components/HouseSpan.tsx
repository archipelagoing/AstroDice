import { SignGlyph } from "./ZodiacLabel";
import { SIGNS, glyph } from "../data/catalog";
import { formatPosition, formatSpan } from "../geometry/chart";
import type { HouseGeometry } from "../types";

export function HouseSpan({ house }: { house: HouseGeometry }) {
  const sorted = [...house.planets].sort(
    (a, b) => offset(a.longitude) - offset(b.longitude),
  );
  function offset(longitude: number) {
    return longitude < house.start
      ? longitude + 360 - house.start
      : longitude - house.start;
  }
  const lanes: number[] = [];
  const markers = sorted.map((planet) => {
    const x = (offset(planet.longitude) / house.span) * 100;
    let lane = lanes.findIndex((last) => x - last > 13);
    if (lane === -1) lane = lanes.length;
    lanes[lane] = x;
    return { planet, x, lane };
  });
  const height = 68 + Math.max(0, lanes.length - 1) * 26;
  return (
    <div className="house-span">
      <svg
        viewBox={`0 0 420 ${height}`}
        role="img"
        aria-label={`House ${house.number}: ${house.segments.map((s) => `${SIGNS[s.sign][0]}, ${formatSpan(s.degrees)}${s.intercepted ? ", intercepted" : ""}`).join("; ")}. ${house.planets.length ? house.planets.map((p) => `${p.name}, ${formatPosition(p.longitude)}`).join("; ") : "No planets or points."}`}
      >
        {house.segments.map((segment) => {
          const x = 12 + ((segment.start - house.start) / house.span) * 396;
          const width = (segment.degrees / house.span) * 396;
          return (
            <g key={segment.start}>
              <rect
                x={x}
                y="12"
                width={width}
                height="10"
                className={`segment ${SIGNS[segment.sign][2]}`}
              />
              <line x1={x} x2={x} y1="8" y2="27" className="tick" />
              {width > 37 && (
                <text
                  x={x + width / 2}
                  y="3"
                  className="segment-label"
                  textAnchor="middle"
                >
                  {SIGNS[segment.sign][1]}
                </text>
              )}
            </g>
          );
        })}
        <line x1="408" x2="408" y1="8" y2="27" className="tick" />
        {markers.map(({ planet, x, lane }) => (
          <g key={planet.name}>
            <line
              x1={12 + x * 3.96}
              x2={12 + x * 3.96}
              y1="23"
              y2={34 + lane * 26}
              className="marker-line"
            />
            <circle
              cx={12 + x * 3.96}
              cy="17"
              r="3.3"
              className={`planet-dot ${["Sun", "Moon"].includes(planet.name) ? "luminary" : ""}`}
            />
            <text
              x={12 + x * 3.96}
              y={52 + lane * 26}
              textAnchor="middle"
              className={`planet-glyph ${["Sun", "Moon"].includes(planet.name) ? "luminary" : ""}`}
            >
              {glyph(planet.name)}
            </text>
          </g>
        ))}
      </svg>
      <div className="sign-names">
        {house.segments.map((s, i) => (
          <span key={s.start}>
            {i > 0 && <span className="sign-arrow"> → </span>}
            <SignGlyph name={SIGNS[s.sign][0]} /> {SIGNS[s.sign][0]}
            {s.intercepted && (
              <span className="interception-star" aria-label=" intercepted">
                *
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
