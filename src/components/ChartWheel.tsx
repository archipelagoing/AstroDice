import { SIGNS, glyph } from "../data/catalog";
import {
  formatPosition,
  getHouseSpan,
  getPlanetHouse,
} from "../geometry/chart";
import type { NatalChart } from "../types";

export type ChartSelection =
  { kind: "house"; house: number } | { kind: "planet"; name: string };
const C = 300;
export function ChartWheel({
  chart,
  selected,
  axis,
  onSelect,
}: {
  chart: NatalChart;
  selected: ChartSelection;
  axis: number | null;
  onSelect: (s: ChartSelection) => void;
}) {
  const origin = chart.angles?.asc ?? chart.cusps[0];
  function point(longitude: number, radius: number) {
    const angle = ((180 - (longitude - origin)) * Math.PI) / 180;
    return { x: C + radius * Math.cos(angle), y: C + radius * Math.sin(angle) };
  }
  function line(start: number, end: number, radius: number, inner: number) {
    const a = point(start, radius),
      b = point(end, radius),
      c = point(end, inner),
      d = point(start, inner);
    const large = end - start > 180 ? 1 : 0;
    return `M ${a.x} ${a.y} A ${radius} ${radius} 0 ${large} 0 ${b.x} ${b.y} L ${c.x} ${c.y} A ${inner} ${inner} 0 ${large} 1 ${d.x} ${d.y} Z`;
  }
  const sorted = [...chart.planets].sort((a, b) => a.longitude - b.longitude);
  // Cut at the widest empty arc, then separate labels (not position markers).
  let cut = 0,
    largest = 0;
  sorted.forEach((p, i) => {
    const next = sorted[(i + 1) % sorted.length];
    const gap = (next.longitude - p.longitude + 360) % 360;
    if (gap > largest) {
      largest = gap;
      cut = (i + 1) % sorted.length;
    }
  });
  const ordered = [...sorted.slice(cut), ...sorted.slice(0, cut)];
  let last = -Infinity;
  const labels = ordered.map((p) => {
    const trueAngle =
      p.longitude < (ordered[0]?.longitude ?? 0)
        ? p.longitude + 360
        : p.longitude;
    const angle = Math.max(trueAngle, last + 11);
    last = angle;
    return { p, angle };
  });
  return (
    <div className="wheel-container">
      <svg
        className="natal-wheel"
        viewBox="0 0 600 600"
        role="group"
        aria-label="Interactive natal chart. Select a house or planet to read its placement. A text placement list follows."
      >
        <circle cx={C} cy={C} r="267" className="wheel-outline" />
        {SIGNS.map(([name, symbol, element], i) => {
          const label = point(i * 30 + 15, 245);
          return (
            <g key={name}>
              <path
                d={line(i * 30, (i + 1) * 30, 264, 225)}
                className={`wheel-sign ${element}`}
              />
              <text
                x={label.x}
                y={label.y}
                textAnchor="middle"
                dominantBaseline="central"
                className="wheel-zodiac"
                aria-label={name}
              >
                {symbol}
              </text>
            </g>
          );
        })}
        {chart.cusps.map((_, i) => {
          const house = i + 1;
          const { start, end } = getHouseSpan(chart.cusps, house);
          const label = point((start + end) / 2, 207);
          const active = selected.kind === "house" && selected.house === house;
          const highlighted =
            axis !== null && (house === axis || house === axis + 6);
          return (
            <g
              key={house}
              role="button"
              tabIndex={0}
              aria-label={`House ${house}, cusp ${formatPosition(start)}`}
              aria-pressed={active}
              onClick={() => onSelect({ kind: "house", house })}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect({ kind: "house", house });
                }
              }}
              className={`wheel-house ${highlighted ? "axis-highlight" : ""} ${active ? "selected" : ""}`}
            >
              <path d={line(start, end, 225, 85)} />
              <text
                x={label.x}
                y={label.y}
                textAnchor="middle"
                dominantBaseline="central"
              >
                {house}
              </text>
            </g>
          );
        })}
        {Array.from({ length: 72 }, (_, i) => {
          const a = point(i * 5, 264),
            b = point(i * 5, i % 6 === 0 ? 275 : 269);
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              className="wheel-tick"
            />
          );
        })}
        {labels.map(({ p, angle }) => {
          const mark = point(p.longitude, 185),
            label = point(angle, 151);
          const active = selected.kind === "planet" && selected.name === p.name;
          return (
            <g
              key={p.name}
              role="button"
              tabIndex={0}
              aria-label={`${p.name}, ${formatPosition(p.longitude)}, house ${getPlanetHouse(chart.cusps, p.longitude)}`}
              aria-pressed={active}
              className={`wheel-planet ${active ? "selected" : ""}`}
              onClick={() => onSelect({ kind: "planet", name: p.name })}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect({ kind: "planet", name: p.name });
                }
              }}
            >
              <line
                x1={mark.x}
                y1={mark.y}
                x2={label.x}
                y2={label.y}
                className="wheel-leader"
              />
              <circle
                cx={mark.x}
                cy={mark.y}
                r="3"
                className="wheel-true-position"
              />
              <circle
                cx={label.x}
                cy={label.y}
                r="14"
                className="wheel-planet-hit"
              />
              <text
                x={label.x}
                y={label.y + 1}
                textAnchor="middle"
                dominantBaseline="central"
              >
                {glyph(p.name)}
              </text>
            </g>
          );
        })}
        {chart.angles &&
          (
            [
              ["ASC", chart.angles.asc],
              [
                "DSC",
                chart.angles.asc === undefined
                  ? undefined
                  : chart.angles.asc + 180,
              ],
              ["MC", chart.angles.mc],
              [
                "IC",
                chart.angles.mc === undefined
                  ? undefined
                  : chart.angles.mc + 180,
              ],
            ] as const
          ).map(([label, value]) => {
            if (value === undefined) return null;
            const p = point(value, 285);
            return (
              <text
                key={label}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="central"
                className="wheel-angle"
              >
                {label}
              </text>
            );
          })}
        <text x={C} y={C - 7} textAnchor="middle" className="wheel-center">
          YOUR SKY
        </text>
        <text x={C} y={C + 14} textAnchor="middle" className="wheel-center-sub">
          Twelve houses · six axes
        </text>
      </svg>
      <p className="wheel-caption">
        Dots mark exact positions. Labels are spaced for readability.
        <br />
        Select a house or planet to explore its meaning.
      </p>
    </div>
  );
}
