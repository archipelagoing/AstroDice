import { useEffect, useRef, useState } from "react";
import { BODIES, SIGNS } from "../data/catalog";
import { Die } from "./DicePractice";

export function HeaderNavigation({
  route,
  onNavigate,
}: {
  route: string;
  onNavigate: (route: string) => void;
}) {
  const dropdown = useRef<HTMLDetailsElement>(null);
  const [selectedPlanet, setSelectedPlanet] = useState("Sun");
  useEffect(() => {
    if (route.startsWith("planet/")) setSelectedPlanet(route.split("/")[1]);
  }, [route]);
  function openReading(next: string) {
    if (dropdown.current) dropdown.current.open = false;
    onNavigate(next);
  }
  useEffect(() => {
    function dismiss(event: PointerEvent) {
      if (dropdown.current && !dropdown.current.contains(event.target as Node))
        dropdown.current.open = false;
    }
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, []);
  return (
    <nav className="header-nav" aria-label="Main navigation">
      <a
        href="#chart"
        aria-current={route === "chart" ? "page" : undefined}
        onClick={() => onNavigate("chart")}
      >
        <Die face={1} />
        <span>Your chart</span>
      </a>
      <a
        href="#dice"
        aria-current={
          route === "dice" || route.startsWith("axis/") ? "page" : undefined
        }
        onClick={() => onNavigate("dice")}
      >
        <Die face={2} />
        <span>Axis-Dice</span>
      </a>
      <details
        ref={dropdown}
        className="planet-dropdown"
        onKeyDown={(event) => {
          if (event.key === "Escape" && dropdown.current) {
            dropdown.current.open = false;
            dropdown.current.querySelector("summary")?.focus();
          }
        }}
      >
        <summary className={route.startsWith("planet/") ? "is-current" : ""}>
          <Die face={3} />
          <span>Planets through signs</span>
          <span className="menu-chevron" aria-hidden="true">
            ⌄
          </span>
        </summary>
        <div className="planet-menu">
          <div className="planet-picker">
            <h2>Choose a planet</h2>
            <div
              className="planet-options"
              role="group"
              aria-label="Choose a planet"
            >
              {BODIES.slice(0, 10).map(([name, symbol]) => (
                <button
                  key={name}
                  type="button"
                  aria-pressed={selectedPlanet === name}
                  onClick={() => setSelectedPlanet(name)}
                  aria-controls="header-sign-options"
                >
                  <span className="planet-menu-symbol" aria-hidden="true">
                    {symbol}
                  </span>
                  <span>{name}</span>
                  <span className="planet-choice-arrow" aria-hidden="true">
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className="sign-picker" id="header-sign-options">
            <h2>{selectedPlanet} through signs</h2>
            <nav
              className="header-sign-options"
              aria-label={`${selectedPlanet} sign readings`}
            >
              {SIGNS.map(([name, symbol, element]) => (
                <a
                  key={name}
                  href={`#planet/${selectedPlanet}/${name}`}
                  data-element={element}
                  onClick={() =>
                    openReading(`planet/${selectedPlanet}/${name}`)
                  }
                >
                  <span className="menu-sign-symbol" aria-hidden="true">
                    {symbol}
                  </span>
                  <span>{name}</span>
                </a>
              ))}
            </nav>
            <a
              className="all-signs-link"
              href={`#planet/${selectedPlanet}`}
              onClick={() => openReading(`planet/${selectedPlanet}`)}
            >
              Explore all 12 signs →
            </a>
          </div>
        </div>
      </details>
      <a
        href="#nodes"
        aria-current={route === "nodes" ? "page" : undefined}
        onClick={() => onNavigate("nodes")}
      >
        <Die face={4} />
        <span>North / South Node</span>
      </a>
    </nav>
  );
}
