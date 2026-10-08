import { useEffect, useRef } from "react";
import { BODIES } from "../data/catalog";

export function HeaderNavigation({
  route,
  onNavigate,
}: {
  route: string;
  onNavigate: (route: string) => void;
}) {
  const dropdown = useRef<HTMLDetailsElement>(null);
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
        Your chart
      </a>
      <a
        href="#dice"
        aria-current={
          route === "dice" || route.startsWith("axis/") ? "page" : undefined
        }
        onClick={() => onNavigate("dice")}
      >
        Axis-Dice
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
          Planets through signs <span aria-hidden="true">⌄</span>
        </summary>
        <div className="planet-menu">
          {BODIES.slice(0, 10).map(([name, symbol]) => (
            <a
              key={name}
              href={`#planet/${name}`}
              aria-current={route.split("/")[1] === name ? "page" : undefined}
              onClick={() => {
                if (dropdown.current) dropdown.current.open = false;
                onNavigate(`planet/${name}`);
              }}
            >
              <span className="planet-menu-symbol" aria-hidden="true">
                {symbol}
              </span>{" "}
              {name} <span className="planet-menu-hint">12 signs →</span>
            </a>
          ))}
        </div>
      </details>
      <a
        href="#nodes"
        aria-current={route === "nodes" ? "page" : undefined}
        onClick={() => onNavigate("nodes")}
      >
        North / South Node
      </a>
    </nav>
  );
}
