import { useState } from "react";
import type { FormEvent } from "react";
import { BODIES, SIGNS } from "../data/catalog";
import { getAbsoluteLongitude, validateChart } from "../geometry/chart";
import type { NatalChart } from "../types";

interface Position {
  sign: string;
  degree: string;
  minute: string;
  original?: { longitude: number; signature: string };
}
function fromLongitude(longitude?: number): Position {
  if (longitude === undefined) return { sign: "0", degree: "", minute: "" };
  const sign = Math.floor(longitude / 30);
  const degree = Math.floor(longitude - sign * 30);
  const minute = Math.min(
    59.99999999,
    Number(((longitude - sign * 30 - degree) * 60).toFixed(8)),
  );
  const fields = {
    sign: String(sign),
    degree: String(degree),
    minute: String(minute),
  };
  return {
    ...fields,
    original: {
      longitude,
      signature: `${fields.sign}/${fields.degree}/${fields.minute}`,
    },
  };
}
function readPosition(p: Position, label: string): number {
  if (!p.degree.trim())
    throw new Error(`${label}: enter a degree, including 0 where appropriate.`);
  if (p.original?.signature === `${p.sign}/${p.degree}/${p.minute}`)
    return p.original.longitude;
  return getAbsoluteLongitude(
    Number(p.sign),
    Number(p.degree),
    p.minute.trim() ? Number(p.minute) : 0,
  );
}
function PositionFields({
  label,
  value,
  onChange,
  required = true,
}: {
  label: string;
  value: Position;
  onChange: (p: Position) => void;
  required?: boolean;
}) {
  return (
    <div className="position-fields">
      <select
        aria-label={`${label} sign`}
        value={value.sign}
        onChange={(e) => onChange({ ...value, sign: e.target.value })}
      >
        {SIGNS.map(([name, symbol], i) => (
          <option key={name} value={i}>
            {symbol} {name}
          </option>
        ))}
      </select>
      <label>
        <input
          aria-label={`${label} degrees`}
          type="number"
          min="0"
          max="29.99999999999999"
          step="any"
          required={required}
          value={value.degree}
          placeholder="0"
          onChange={(e) => onChange({ ...value, degree: e.target.value })}
        />
        <span>°</span>
      </label>
      <label>
        <input
          aria-label={`${label} minutes`}
          type="number"
          min="0"
          max="59.99999999999999"
          step="any"
          value={value.minute}
          placeholder="0"
          onChange={(e) => onChange({ ...value, minute: e.target.value })}
        />
        <span>′</span>
      </label>
    </div>
  );
}
export function ChartInput({
  initial,
  onSave,
  onCancel,
}: {
  initial: NatalChart | null;
  onSave: (chart: NatalChart) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name ?? "My chart");
  const [system, setSystem] = useState(initial?.houseSystem ?? "Placidus");
  const [cusps, setCusps] = useState<Position[]>(
    Array.from({ length: 12 }, (_, i) => fromLongitude(initial?.cusps[i])),
  );
  const [bodies, setBodies] = useState(
    BODIES.map(([name]) => ({
      name,
      included: initial ? initial.planets.some((p) => p.name === name) : true,
      position: fromLongitude(
        initial?.planets.find((p) => p.name === name)?.longitude,
      ),
    })),
  );
  const [asc, setAsc] = useState(fromLongitude(initial?.angles?.asc));
  const [mc, setMc] = useState(fromLongitude(initial?.angles?.mc));
  const [error, setError] = useState("");
  function submit(event: FormEvent) {
    event.preventDefault();
    try {
      const chart: NatalChart = {
        version: 1,
        name: name.trim() || "My chart",
        houseSystem: system,
        cusps: cusps.map((p, i) => readPosition(p, `House ${i + 1}`)),
        planets: bodies
          .filter((p) => p.included)
          .map((p) => ({
            name: p.name,
            longitude: readPosition(p.position, p.name),
          })),
        angles: {
          ...(asc.degree.trim() ? { asc: readPosition(asc, "ASC") } : {}),
          ...(mc.degree.trim() ? { mc: readPosition(mc, "MC") } : {}),
        },
      };
      validateChart(chart);
      onSave(chart);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Check your chart values.");
    }
  }
  return (
    <main id="main" className="input-page">
      <button className="text-button" onClick={onCancel}>
        ← Back to chart
      </button>
      <span className="eyebrow">Your chart, precisely</span>
      <h1>{initial ? "Edit your chart." : "Begin with the details."}</h1>
      <p className="intro-copy">
        Copy the house cusps and positions from your chart’s tables. No birth
        date, time, or location needed.
      </p>
      <form onSubmit={submit}>
        <div className="form-basics">
          <label>
            Chart name
            <input
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            House system
            <select value={system} onChange={(e) => setSystem(e.target.value)}>
              {[
                "Placidus",
                "Whole Sign",
                "Equal House",
                "Koch",
                "Porphyry",
                "Regiomontanus",
                "Campanus",
                "Other",
              ].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>
        <p className="form-note">
          Use cusps from the selected house system. Selecting a system labels
          your input; it does not recalculate it. Enter decimal degrees or whole
          degrees plus minutes.
        </p>
        <div className="input-columns">
          <fieldset>
            <legend>
              <span>01</span> House cusps
            </legend>
            <p>All twelve are required, in zodiac order.</p>
            {cusps.map((cusp, i) => (
              <div className="input-row" key={i}>
                <span>House {i + 1}</span>
                <PositionFields
                  label={`House ${i + 1}`}
                  value={cusp}
                  onChange={(p) =>
                    setCusps(cusps.map((c, index) => (index === i ? p : c)))
                  }
                />
              </div>
            ))}
          </fieldset>
          <fieldset>
            <legend>
              <span>02</span> Planets & points
            </legend>
            <p>Uncheck any position you do not know.</p>
            {bodies.map((body, i) => (
              <div className="input-row" key={body.name}>
                <label className="include-body">
                  <input
                    type="checkbox"
                    checked={body.included}
                    onChange={(e) =>
                      setBodies(
                        bodies.map((b, index) =>
                          index === i
                            ? { ...b, included: e.target.checked }
                            : b,
                        ),
                      )
                    }
                  />
                  {body.name}
                </label>
                {body.included ? (
                  <PositionFields
                    label={body.name}
                    value={body.position}
                    onChange={(p) =>
                      setBodies(
                        bodies.map((b, index) =>
                          index === i ? { ...b, position: p } : b,
                        ),
                      )
                    }
                  />
                ) : (
                  <span className="unknown-label">Unknown / omitted</span>
                )}
              </div>
            ))}
          </fieldset>
        </div>
        <fieldset className="angles-input">
          <legend>
            <span>03</span> Angles <small>optional</small>
          </legend>
          <p>
            Enter ASC and MC if known. They are kept separately from house cusps
            so non-quadrant systems work correctly.
          </p>
          <div className="input-columns">
            <div className="input-row">
              <span>ASC</span>
              <PositionFields
                label="ASC"
                value={asc}
                onChange={setAsc}
                required={false}
              />
            </div>
            <div className="input-row">
              <span>MC</span>
              <PositionFields
                label="MC"
                value={mc}
                onChange={setMc}
                required={false}
              />
            </div>
          </div>
        </fieldset>
        {error && (
          <p className="error-message" role="alert">
            {error}
          </p>
        )}
        <div className="form-actions">
          <p>Your chart stays in this browser. Nothing is uploaded.</p>
          <button type="button" className="button secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="button primary" type="submit">
            Unfold my chart <span>↗</span>
          </button>
        </div>
      </form>
    </main>
  );
}
