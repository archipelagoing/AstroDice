import { useEffect, useRef, useState } from "react";
import { SAMPLE } from "../data/sample";
import { AXES } from "../data/catalog";
import { buildHouses, getPlanetHouse } from "../geometry/chart";
import { rollDie } from "../practice/dice";
import { ChartWheel, type ChartSelection } from "./ChartWheel";
import { Die } from "./DicePractice";
import { HousePair } from "./HousePair";

const houses = buildHouses(SAMPLE);
export function WelcomeScreen({
  onBirth,
  onExample,
  onAxis,
}: {
  onBirth: () => void;
  onExample: () => void;
  onAxis: (n: number) => void;
}) {
  const [face, setFace] = useState(1);
  const [selected, setSelected] = useState<ChartSelection>({
    kind: "house",
    house: 1,
  });
  const [rolling, setRolling] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  function roll() {
    setRolling(true);
    const next = rollDie();
    timer.current = setTimeout(
      () => {
        setFace(next);
        setSelected({ kind: "house", house: next });
        setRolling(false);
        requestAnimationFrame(() =>
          document
            .querySelector(".welcome-preview")
            ?.scrollIntoView({
              block: "nearest",
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                .matches
                ? "instant"
                : "smooth",
            }),
        );
      },
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 700,
    );
  }
  function select(value: ChartSelection) {
    setSelected(value);
    const house =
      value.kind === "house"
        ? value.house
        : getPlanetHouse(
            SAMPLE.cusps,
            SAMPLE.planets.find((p) => p.name === value.name)!.longitude,
          );
    setFace(((house - 1) % 6) + 1);
  }
  return (
    <main id="main" className="welcome-page">
      <section className="welcome-intro">
        <div>
          <span className="eyebrow">Your chart. Six axes. One die.</span>
          <h1>
            Roll into your
            <br />
            <em>birth chart.</em>
          </h1>
          <p>
            Explore your placements. Roll a die to practice remembering them.
          </p>
          <div className="welcome-actions">
            <button className="button primary" onClick={onBirth}>
              Enter birth details ↗
            </button>
            <button className="button secondary" onClick={onExample}>
              Try the example →
            </button>
          </div>
          <div className="welcome-tray">
            <Die face={face} rolling={rolling} />
            <div>
              <span className="eyebrow">A little celestial discovery</span>
              <button
                className="button primary"
                onClick={roll}
                disabled={rolling}
              >
                {rolling ? "Rolling…" : "Try a roll"}
              </button>
            </div>
          </div>
          <nav
            className="hero-faces"
            aria-label="Six die faces and their house axes"
          >
            {AXES.map((a) => (
              <button
                key={a.number}
                className="hero-face"
                onClick={() => onAxis(a.number)}
                aria-label={`Die face ${a.number}: explore houses ${a.number} and ${a.number + 6}`}
              >
                <Die face={a.number} />
                <span>
                  {a.number} ↔ {a.number + 6}
                </span>
              </button>
            ))}
          </nav>
        </div>
        <div className="welcome-instrument">
          <span className="example-badge">
            Interactive illustrative example · not your chart
          </span>
          <ChartWheel
            chart={SAMPLE}
            selected={selected}
            axis={face}
            onSelect={select}
          />
        </div>
      </section>
      <section
        className="welcome-preview"
        aria-label="Selected example house pair"
        aria-live="polite"
      >
        <span className="eyebrow">
          Example · Face {face} · Houses {face} ↔ {face + 6}
        </span>
        <h2>{AXES[face - 1].title}</h2>
        <div key={face} className="settling-card">
          <HousePair houses={houses} face={face} compact />
        </div>
        <button className="text-button" onClick={() => onAxis(face)}>
          Explore this example axis →
        </button>
      </section>
    </main>
  );
}
