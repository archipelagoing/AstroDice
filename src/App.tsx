import { useEffect, useMemo, useState } from "react";
import { Temporal } from '@js-temporal/polyfill';
import { BirthInput, EMPTY_BIRTH } from './components/BirthInput';
import { ChartWheel } from './components/ChartWheel';
import type { ChartSelection } from './components/ChartWheel';
import { HouseReading, PlanetReading } from './components/PlacementReading';
import { DicePractice, Die } from './components/DicePractice';
import type { BirthDetails } from './types';
import { AxisCard } from "./components/AxisCard";
import { ChartInput } from "./components/ChartInput";
import { AXES, BODIES, PLANET_NAMES, SIGNS, glyph } from "./data/catalog";
import { SAMPLE } from "./data/sample";
import {
  buildHouses,
  findAxisPopulation,
  findDuplicatedCusps,
  findInterceptedSigns,
  findLuminaryAxes,
  findPlanetConcentrations,
  formatPosition,
  getPlanetHouse,
  normalizeLongitude,
  validateChart,
} from "./geometry/chart";
import type { NatalChart } from "./types";

const STORAGE_KEY = "natal-axis-reader.chart.v1";
function restore(): { chart: NatalChart | null; warning: string } {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return { chart: null, warning: "" };
    const chart: unknown = JSON.parse(saved);
    validateChart(chart);
    return { chart, warning: "" };
  } catch {
    return {
      chart: null,
      warning:
        "Your saved chart could not be loaded. You can enter it again; the example is shown below.",
    };
  }
}

function Brandmark() {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="17" />
      <ellipse cx="20" cy="20" rx="7" ry="17" />
      <path d="M3 20h34M7 9l26 22M7 31 33 9" />
      <circle cx="20" cy="20" r="3" className="brand-center" />
    </svg>
  );
}

function UnfoldIllustration() {
  return (
    <svg
      className="unfold-illustration"
      viewBox="0 0 470 220"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="fade">
          <stop stopColor="currentColor" stopOpacity=".35" />
          <stop offset="1" stopColor="currentColor" stopOpacity=".07" />
        </linearGradient>
      </defs>
      <circle cx="105" cy="110" r="82" className="illustration-ring" />
      <circle cx="105" cy="110" r="68" className="illustration-ring" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * Math.PI) / 6;
        return (
          <line
            key={i}
            x1={105 + Math.cos(a) * 22}
            y1={110 + Math.sin(a) * 22}
            x2={105 + Math.cos(a) * 82}
            y2={110 + Math.sin(a) * 82}
            className="illustration-ring"
          />
        );
      })}
      <circle cx="105" cy="110" r="22" className="illustration-ring" />
      <path d="M82 45 165 143 40 135 133 48" className="illustration-aspect" />
      {[44, 70, 96, 122, 148, 174].map((y, i) => (
        <g key={y}>
          <path
            d={`M${165 + i * 2} ${75 + i * 12} C235 ${75 + i * 12}, 230 ${y}, 284 ${y}`}
            stroke="url(#fade)"
          />
          <line x1="284" x2="444" y1={y} y2={y} className="illustration-axis" />
          <circle
            cx={305 + ((i * 37) % 125)}
            cy={y}
            r={i === 2 ? 5 : 3}
            className={i === 2 ? "illustration-sun" : "illustration-point"}
          />
          <text x="271" y={y + 3}>
            {i + 1}
          </text>
          <text x="453" y={y + 3}>
            {i + 7}
          </text>
        </g>
      ))}
      <text x="74" y="214" className="illustration-caption">
        THE WHEEL
      </text>
      <text x="324" y="214" className="illustration-caption">
        THE RELATIONSHIPS
      </text>
    </svg>
  );
}

export default function App() {
  const [initial] = useState(restore);
  const [savedChart, setSavedChart] = useState<NatalChart | null>(
    initial.chart,
  );
  const [warning, setWarning] = useState(initial.warning);
  const [editor, setEditor] = useState<"birth" | "new" | "edit" | null>(null);
  const [remembered, setRemembered] = useState(Boolean(initial.chart));
  const [birthDraft, setBirthDraft] = useState<BirthDetails>(() => {
    const c = initial.chart?.calculation;
    if (!c) return EMPTY_BIRTH;
    try {
      const local = Temporal.Instant.from(c.utc).toZonedDateTimeISO(c.timezone);
      return { ...EMPTY_BIRTH, date: local.toPlainDate().toString(), time: local.toPlainTime().toString().slice(0,5), place: { name: 'Saved birth location', latitude: c.latitude, longitude: c.longitude, timezone: c.timezone }, houseSystem: initial.chart?.houseSystem === 'Whole Sign' ? 'Whole Sign' : 'Placidus' };
    } catch { return EMPTY_BIRTH; }
  });
  const [selected, setSelected] = useState<ChartSelection>({kind: 'house', house: 1});
  const [activeAxis, setActiveAxis] = useState<number | null>(null);
  const [view, setView] = useState<"wheel" | "axes" | "architecture" | "practice">("wheel");
  const [dark, setDark] = useState(false);
  const chart = savedChart ?? SAMPLE;
  const houses = useMemo(() => buildHouses(chart), [chart]);
  const interceptions = findInterceptedSigns(houses);
  const duplicates = findDuplicatedCusps(chart.cusps);
  const populations = findAxisPopulation(houses);
  const maxPopulation = Math.max(...populations.map((p) => p.left + p.right));
  const strongest = populations.filter(
    (p) => p.left + p.right === maxPopulation && maxPopulation > 0,
  );
  const concentrations = findPlanetConcentrations(houses);
  const luminaries = findLuminaryAxes(chart);
  const omitted = BODIES.filter(
    ([name]) => !chart.planets.some((p) => p.name === name),
  );
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);
  useEffect(() => {
    if (editor) {
      window.scrollTo(0, 0);
      document.querySelector<HTMLInputElement>(".form-basics input")?.focus();
    }
  }, [editor]);
  function save(next: NatalChart, remember = true) {
    setSavedChart(next);
    setEditor(null);
    setSelected({ kind: 'house', house: 1 }); setActiveAxis(null); setView('wheel'); setRemembered(remember);
    try {
      if (remember) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      else localStorage.removeItem(STORAGE_KEY);
      setWarning("");
    } catch {
      setWarning(
        "Your chart is available for this session, but this browser could not save it for a refresh.",
      );
    }
    window.scrollTo(0, 0);
  }
  function forget() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setWarning("");
    } catch {
      setWarning(
        "Browser storage is unavailable. The chart was cleared from this session only.",
      );
    }
    setSavedChart(null); setBirthDraft(EMPTY_BIRTH); setRemembered(false);
    setSelected({kind:'house', house:1}); setActiveAxis(null); setView('wheel');
  }
  function exploreAxis(axis: number) {
    setActiveAxis(axis); setSelected({kind:'house', house:axis}); setView('axes');
    setTimeout(() => { const card = document.getElementById(`axis-${axis}`) as HTMLDetailsElement | null; if (card) { card.open = true; card.scrollIntoView({block:'start', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'}); card.querySelector('summary')?.focus(); } }, 0);
  }
  function selectPlacement(selection: ChartSelection) {
    setSelected(selection);
    const house = selection.kind === 'house' ? selection.house : getPlanetHouse(chart.cusps, chart.planets.find(p => p.name === selection.name)!.longitude);
    setActiveAxis((house - 1) % 6 + 1);
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a href="#" className="brand" onClick={() => setEditor(null)}>
          <Brandmark />
          <span>
            NATAL <b>AXIS</b> READER
            <span className="brand-subtitle">Six faces. Six axes.</span>
          </span>
        </a>
        <div className="header-actions">
          <span className="header-caption">
            Learn your chart with a roll
          </span>
          <button
            className="theme-toggle"
            aria-label={`Switch to ${dark ? "light" : "dark"} mode`}
            onClick={() => setDark(!dark)}
          >
            {dark ? "☀" : "◐"}
          </button>
        </div>
      </header>
      {editor === 'birth' ? <BirthInput draft={birthDraft} onChange={setBirthDraft} onSave={save} onCancel={() => setEditor(null)} onManual={() => setEditor('new')} /> : editor ? (
        <ChartInput
          initial={editor === "edit" ? chart : null}
          onSave={save}
          onCancel={() => setEditor(null)}
        />
      ) : (
        <main id="main">
          <section className="hero">
            <div>
              <div className="eyebrow">
                <span className="tiny-line" /> The shape of your chart
              </div>
              <h1>
                Unfold your
                <br />
                <em>birth chart.</em>
              </h1>
              <p>
                Your birth details. Your whole chart.
                <br />Six sides of a die to help you learn it.
              </p>
              <button
                className="button primary"
                onClick={() => setEditor("birth")}
              >
                Enter birth details <span>↗</span>
              </button>
              <a className="explore-link" href="#chart">
                {savedChart ? "Explore your chart" : "Explore the example"}{" "}
                <span>↓</span>
              </a>
            </div>
            <div className="hero-art">
              <UnfoldIllustration /><div className="hero-dice"><Die face={6} /><span>ROLL → RECALL → REVEAL</span></div>
              <p>
                Every roll opens a relationship.
                <br />
                <span>One die face for each pair of opposing houses.</span>
              </p>
            </div>
          </section>
          {warning && (
            <p className="notice" role="status">
              {warning}
            </p>
          )}
          <section
            id="chart"
            className="chart-section"
            aria-labelledby="chart-title"
          >
            <div className="chart-heading">
              <div>
                <div className="eyebrow">
                  {savedChart ? "Your workspace" : "Start exploring"}{" "}
                  <span className="example-badge">
                    {savedChart
                      ? remembered ? "Saved in this browser" : "This session only"
                      : "Illustrative example"}
                  </span>
                </div>
                <h2 id="chart-title">{chart.name}</h2>
                <p>
                  {chart.houseSystem} houses <span>·</span>{" "}
                  {
                    chart.planets.filter((p) => PLANET_NAMES.includes(p.name))
                      .length
                  }{" "}
                  planets <span>·</span>{" "}
                  {
                    chart.planets.filter((p) => !PLANET_NAMES.includes(p.name))
                      .length
                  }{" "}
                  points
                </p>
              </div>
              <div className="chart-actions">
                <button
                  className="button secondary"
                  onClick={() => setEditor(chart.calculation ? "birth" : "edit")}
                >
                  Edit chart <span>↗</span>
                </button>
                {savedChart && (
                  <button
                    className="text-button forget-button"
                    onClick={forget}
                  >
                    Clear saved chart
                  </button>
                )}
              </div>
            </div>
            {chart.calculation && <details className="calculation-details"><summary>Birth details & calculation settings</summary><p>{chart.calculation.utc} UTC · {chart.calculation.timezone} (UTC{chart.calculation.offset})<br />{chart.calculation.latitude.toFixed(4)}°, {chart.calculation.longitude.toFixed(4)}° · Tropical zodiac · {chart.houseSystem} houses · Mean lunar nodes</p><p>Chiron is unavailable in this calculation. Positions use {chart.calculation.engine}. Birth date, time, and coordinates are processed locally.</p></details>}
            <div className="view-toolbar">
              <div className="view-switch" role="group" aria-label="Chart view">
                <button aria-pressed={view === 'wheel'} onClick={() => setView('wheel')}>◯ Full chart</button>
                <button
                  aria-pressed={view === "axes"}
                  onClick={() => setView("axes")}
                >
                  <span aria-hidden="true">☷</span> Six axes
                </button>
                <button
                  aria-pressed={view === "architecture"}
                  onClick={() => setView("architecture")}
                >
                  <span aria-hidden="true">⠿</span> Architecture
                </button>
                <button aria-pressed={view === 'practice'} onClick={() => setView('practice')}>⚄ Dice practice</button>
              </div>
              <span className="toolbar-note">
                {view === 'practice' ? 'Recall first. Reveal when ready.' : 'One chart. Six relationships.'}
              </span>
            </div>
            {view === 'practice' ? <DicePractice key={JSON.stringify(chart)} houses={houses} axis={activeAxis} onAxis={setActiveAxis} onExplore={exploreAxis} example={!savedChart} /> : view === 'wheel' ? <>
              <div className="wheel-workspace"><div><ChartWheel chart={chart} selected={selected} axis={activeAxis} onSelect={selectPlacement} /><button className="button primary wheel-practice" onClick={() => setView('practice')}>Roll to practice these placements ⚄</button></div>
              <aside className="wheel-reading" aria-label="Selected placement explanation">{selected.kind === 'house' ? <HouseReading house={houses[selected.house - 1]} onPlanet={p => selectPlacement({kind:'planet',name:p.name})} /> : (() => { const p = chart.planets.find(p => p.name === selected.name); return p ? <PlanetReading planet={p} house={getPlanetHouse(chart.cusps, p.longitude)} onAxis={exploreAxis} /> : <p>Select a planet from the chart.</p>; })()}</aside></div>
              <section className="placement-table" aria-label="Chart placements"><h3>Every placement, at a glance.</h3><p>Select a row to read its planet, sign, and house together.</p><div className="placement-grid">{chart.planets.map(p => <button key={p.name} onClick={() => { selectPlacement({kind:'planet',name:p.name}); document.querySelector('.wheel-reading')?.scrollIntoView({block:'nearest'}); }}><span><b>{glyph(p.name)} {p.name}</b>{p.retrograde && <small>Retrograde</small>}</span><span>{formatPosition(p.longitude)}</span><span>House {getPlanetHouse(chart.cusps,p.longitude)} ↗</span></button>)}</div><details><summary>All twelve house cusps</summary><div className="cusp-table">{houses.map(h => <button key={h.number} onClick={() => { selectPlacement({kind:'house',house:h.number}); document.querySelector('.wheel-reading')?.scrollIntoView({block:'nearest'}); }}>House {h.number} · {formatPosition(h.start)} ↗</button>)}</div></details></section>
              </> : <div className="workspace-grid">
              <div className="axis-column">
                <div className="section-caption">
                  <span>
                    {view === "axes"
                      ? "THE SIX OPPOSITIONS"
                      : "PLANETARY DISTRIBUTION"}
                  </span>
                  <span>
                    SELECT AN AXIS TO EXPLORE <span aria-hidden="true">↙</span>
                  </span>
                </div>
                {AXES.map((_, i) => (
                  <AxisCard
                    key={`${view}-${i}`}
                    index={i}
                    houses={houses}
                    architecture={view === "architecture"}
                    active={activeAxis === i + 1}
                  />
                ))}
                <div className="chart-legend">
                  <span>
                    <i className="legend-dot" /> Planet / point
                  </span>
                  <span>
                    <i className="legend-dot sun" /> Sun & Moon
                  </span>
                  <span>
                    <b>*</b> Intercepted sign
                  </span>
                  {view === "architecture" && <span>○ Empty house</span>}
                  <p>
                    {view === "axes"
                      ? "Each house has its own scale. Sign segments and planet positions are proportional within it."
                      : "Counts include the ten planets, with Sun and Moon. Nodes and Chiron are listed separately as points."}
                  </p>
                </div>
              </div>
              <aside className="insights" aria-label="Chart observations">
                <div className="insights-heading">
                  <span className="eyebrow">At a glance</span>
                  <h3>A little perspective.</h3>
                  <p>Structure first. Meaning follows.</p>
                </div>
                <section className="insight-block">
                  <span className="insight-label">01 / Planetary emphasis</span>
                  <h4>
                    {strongest.length
                      ? strongest
                          .map((p) => `${p.axis} ↔ ${p.axis + 6}`)
                          .join(" · ")
                      : "No planets entered"}
                  </h4>
                  <p>
                    {strongest.length
                      ? `${strongest.length > 1 ? "These axes tie for the most planets" : "The most populated axis"}: ${maxPopulation} of the ${chart.planets.filter((p) => PLANET_NAMES.includes(p.name)).length} entered planets.`
                      : "Add planetary positions to see their distribution."}
                  </p>
                  {concentrations.map((h) => (
                    <div className="insight-footnote" key={h.number}>
                      House {h.number} holds{" "}
                      {
                        h.planets.filter((p) => PLANET_NAMES.includes(p.name))
                          .length
                      }{" "}
                      planets. A concentration, without assuming an aspect or
                      stellium.
                    </div>
                  ))}
                </section>
                <section className="insight-block">
                  <span className="insight-label">02 / The luminaries</span>
                  {["Sun", "Moon"].map((name) => {
                    const entry = luminaries.find((p) => p.name === name);
                    return (
                      <div className="luminary-row" key={name}>
                        <span className="luminary-symbol" aria-hidden="true">
                          {glyph(name)}
                        </span>
                        <div>
                          <strong>{name}</strong>
                          <p>
                            {entry
                              ? `House ${entry.house} · Axis ${entry.axis}`
                              : "Unknown / not entered"}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </section>
                <section className="insight-block">
                  <span className="insight-label">03 / Intercepted signs</span>
                  {interceptions.length ? (
                    interceptions.map((s) => (
                      <div key={s.sign} className="interception-row">
                        <span className="sign-symbol" aria-hidden="true">
                          {SIGNS[s.sign][1]}
                        </span>
                        <div>
                          <strong>{SIGNS[s.sign][0]}</strong>
                          <p>
                            Inside house {s.house}
                            {s.planets.length
                              ? ` · ${s.planets.map((p) => p.name).join(", ")}`
                              : ""}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No intercepted signs in this chart.</p>
                  )}
                  <p className="insight-footnote">
                    A whole sign contained in a house, with no cusp in that
                    sign.
                  </p>
                </section>
                <section className="insight-block">
                  <span className="insight-label">
                    04 / Repeated cusp signs
                  </span>
                  {duplicates.length ? (
                    duplicates.map((d) => (
                      <div className="duplicate-row" key={d.sign}>
                        <strong>{SIGNS[d.sign][0]}</strong>
                        <span>Houses {d.houses.join(" + ")}</span>
                      </div>
                    ))
                  ) : (
                    <p>No duplicated cusp signs.</p>
                  )}
                </section>
                <section className="insight-block">
                  <span className="insight-label">05 / Chart angles</span>
                  {(["asc", "mc"] as const).map((key) => {
                    const value = chart.angles?.[key];
                    return (
                      <div className="angle-pair" key={key}>
                        <strong>
                          {key === "asc" ? "ASC ↔ DSC" : "MC ↔ IC"}
                        </strong>
                        {value === undefined ? (
                          <p>Unknown / not entered</p>
                        ) : (
                          <p>
                            {formatPosition(value)} · H
                            {getPlanetHouse(chart.cusps, value)}
                            <br />
                            {formatPosition(normalizeLongitude(value + 180))} ·
                            H
                            {getPlanetHouse(
                              chart.cusps,
                              normalizeLongitude(value + 180),
                            )}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </section>
                <div className="reading-note">
                  <span aria-hidden="true">↔</span>
                  <p>
                    An empty house isn’t a missing piece. Both sides belong to
                    the story.
                  </p>
                </div>
              </aside>
            </div>}
            {view !== 'practice' && omitted.length > 0 && (
              <p className="notice">
                Not entered: {omitted.map(([name]) => name).join(", ")}. These
                positions are unknown; observations reflect only the data
                provided.
              </p>
            )}
          </section>
          <section className="closing-note">
            <span className="eyebrow">A different way of looking</span>
            <h2>
              Less isolated pieces.
              <br />
              <em>More connections.</em>
            </h2>
            <p>
              Read across an axis, not just down a list.
              <br />
              Each side brings the other into perspective.
            </p>
          </section>
        </main>
      )}
      <footer>
        <span>
          NATAL AXIS READER <span className="footer-divider">/</span> Unfold
          your birth chart.
        </span>
        <p>
          Astrology is a symbolic framework, not established scientific
          causation.
          <br />
          Chart calculations run locally. City search uses Open-Meteo; birth date and time are not sent.
        </p>
      </footer>
    </>
  );
}
