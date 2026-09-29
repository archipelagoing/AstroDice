import { useEffect, useRef, useState } from "react";
import { calculateChart } from "../calculation/calculate";
import { searchPlaces } from "../calculation/places";
import type { BirthDetails, BirthPlace, NatalChart } from "../types";

export const EMPTY_BIRTH: BirthDetails = {
  date: "",
  time: "",
  place: null,
  houseSystem: "Placidus",
  disambiguation: "reject",
  unknownTime: false,
};

export function BirthInput({
  draft,
  onChange,
  onSave,
  onCancel,
  onManual,
}: {
  draft: BirthDetails;
  onChange: (b: BirthDetails) => void;
  onSave: (c: NatalChart, remember: boolean) => void;
  onCancel: () => void;
  onManual: () => void;
}) {
  const [query, setQuery] = useState(draft.place?.name ?? "");
  const [results, setResults] = useState<BirthPlace[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [searched, setSearched] = useState(false);
  const [remember, setRemember] = useState(false);
  const [coords, setCoords] = useState({
    latitude: "",
    longitude: "",
    timezone: "",
  });
  const controller = useRef<AbortController | null>(null);
  useEffect(() => () => controller.current?.abort(), []);
  function update(patch: Partial<BirthDetails>) {
    onChange({ ...draft, disambiguation: "reject", ...patch });
    setError("");
  }
  async function search() {
    controller.current?.abort();
    const request = new AbortController();
    controller.current = request;
    setBusy(true);
    setError("");
    setResults([]);
    setSearched(false);
    const timeout = setTimeout(() => request.abort(), 12000);
    try {
      const places = await searchPlaces(query, request.signal);
      if (controller.current === request) {
        setResults(places);
        setSearched(true);
      }
    } catch {
      if (controller.current === request)
        setError(
          "City search could not finish. Check your connection, try again, or enter coordinates and timezone below.",
        );
    } finally {
      clearTimeout(timeout);
      if (controller.current === request) setBusy(false);
    }
  }
  return (
    <main id="main" className="input-page birth-page">
      <button className="text-button" onClick={onCancel}>
        ← Back to chart
      </button>
      <span className="eyebrow">Start with your sky</span>
      <h1>Your birth details.</h1>
      <p className="intro-copy">
        We’ll calculate the chart. You’ll explore its placements, then learn its
        six axes with a roll of the die.
      </p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setError("");
          try {
            onSave(calculateChart(draft), remember);
          } catch (e) {
            setError(
              e instanceof Error
                ? e.message
                : "The chart could not be calculated. Check your inputs.",
            );
          }
        }}
      >
        <div className="form-basics">
          <label>
            Birth date
            <input
              type="date"
              min="1900-01-01"
              max="2100-12-31"
              value={draft.date}
              required
              onChange={(e) => update({ date: e.target.value })}
            />
          </label>
          <label>
            Local birth time
            <input
              type="time"
              value={draft.time}
              required={!draft.unknownTime}
              disabled={draft.unknownTime}
              onChange={(e) => update({ time: e.target.value })}
            />
          </label>
        </div>
        <label className="check-label">
          <input
            type="checkbox"
            checked={draft.unknownTime}
            onChange={(e) => update({ unknownTime: e.target.checked })}
          />
          I don’t know my birth time
        </label>
        {draft.unknownTime && (
          <p className="notice" role="status">
            Houses and the rising sign depend on birth time. This version won’t
            invent them or offer a house-axis quiz without it. You can explore
            the example chart while looking for a reliable recorded time.
          </p>
        )}
        <label className="birthplace-label">
          Birth city or town
          <div className="place-search">
            <input
              value={query}
              placeholder="e.g. New York"
              onChange={(e) => {
                controller.current?.abort();
                controller.current = null;
                setBusy(false);
                setResults([]);
                setSearched(false);
                setQuery(e.target.value);
                update({ place: null });
              }}
            />
            <button
              className="button secondary"
              type="button"
              disabled={busy || query.trim().length < 2}
              onClick={search}
            >
              {busy ? "Searching…" : "Find city"}
            </button>
          </div>
        </label>
        <p className="form-note">
          City search sends only the place name to Open-Meteo. Your birth date
          and time stay in this browser. Place data:{" "}
          <a
            href="https://open-meteo.com/en/docs/geocoding-api"
            target="_blank"
            rel="noreferrer"
          >
            Open-Meteo / GeoNames
          </a>
          .
        </p>
        {results.length > 0 && (
          <div className="place-results" aria-label="Birthplace search results">
            {results.map((place, i) => (
              <button
                type="button"
                key={i}
                onClick={() => {
                  update({ place });
                  setQuery(place.name);
                  setResults([]);
                  setSearched(false);
                }}
              >
                <strong>{place.name}</strong>
                <span>
                  {place.timezone} · {place.latitude.toFixed(3)},{" "}
                  {place.longitude.toFixed(3)}
                </span>
              </button>
            ))}
          </div>
        )}
        {searched && !results.length && !draft.place && (
          <p role="status">
            No matching places. Try a nearby town or enter coordinates below.
          </p>
        )}
        {draft.place && (
          <div className="selected-place">
            <span>✓ Selected birthplace</span>
            <strong>{draft.place.name}</strong>
            <p>
              {draft.place.timezone} · {draft.place.latitude.toFixed(4)},{" "}
              {draft.place.longitude.toFixed(4)}
            </p>
          </div>
        )}
        <details className="advanced-location">
          <summary>Enter coordinates and timezone instead</summary>
          <p>
            Use this if city search is unavailable. Longitude is negative west
            of Greenwich.
          </p>
          <div className="form-basics">
            <label>
              Latitude
              <input
                type="number"
                step="any"
                min="-65.9999"
                max="65.9999"
                value={coords.latitude}
                onChange={(e) =>
                  setCoords({ ...coords, latitude: e.target.value })
                }
              />
            </label>
            <label>
              Longitude
              <input
                type="number"
                step="any"
                min="-180"
                max="180"
                value={coords.longitude}
                onChange={(e) =>
                  setCoords({ ...coords, longitude: e.target.value })
                }
              />
            </label>
            <label>
              IANA timezone
              <input
                placeholder="America/New_York"
                value={coords.timezone}
                onChange={(e) =>
                  setCoords({ ...coords, timezone: e.target.value })
                }
              />
            </label>
          </div>
          <button
            type="button"
            className="button secondary"
            onClick={() => {
              try {
                if (
                  !coords.latitude.trim() ||
                  !coords.longitude.trim() ||
                  !coords.timezone.trim()
                )
                  throw Error(
                    "Enter latitude, longitude, and an IANA timezone.",
                  );
                new Intl.DateTimeFormat("en", {
                  timeZone: coords.timezone,
                }).format();
                const latitude = Number(coords.latitude),
                  longitude = Number(coords.longitude);
                if (
                  !Number.isFinite(latitude) ||
                  Math.abs(latitude) >= 66 ||
                  !Number.isFinite(longitude) ||
                  Math.abs(longitude) > 180
                )
                  throw Error(
                    "Use latitude below 66° north/south and longitude from −180° to 180°.",
                  );
                update({
                  place: {
                    name: "Entered coordinates",
                    latitude,
                    longitude,
                    timezone: coords.timezone,
                  },
                });
                setQuery("Entered coordinates");
              } catch (e) {
                setError(
                  e instanceof Error
                    ? e.message
                    : "Check the coordinates and timezone.",
                );
              }
            }}
          >
            Use this location
          </button>
        </details>
        <div className="form-basics birth-settings">
          <label>
            House system
            <select
              value={draft.houseSystem}
              onChange={(e) =>
                update({
                  houseSystem: e.target.value as BirthDetails["houseSystem"],
                })
              }
            >
              <option>Placidus</option>
              <option>Whole Sign</option>
            </select>
          </label>
          <label>
            Time clarification
            <select
              value={draft.disambiguation}
              onChange={(e) =>
                update({
                  disambiguation: e.target
                    .value as BirthDetails["disambiguation"],
                })
              }
            >
              <option value="reject">Ask if time occurred twice</option>
              <option value="earlier">
                First occurrence (before clocks moved back)
              </option>
              <option value="later">
                Second occurrence (after clocks moved back)
              </option>
            </select>
          </label>
        </div>
        <p className="form-note">
          Tropical zodiac · mean lunar nodes · dates 1900–2100 · latitudes below
          66° N/S. Chiron is not calculated by this engine; it remains available
          through advanced manual entry.
        </p>
        <label className="check-label">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
          />
          Remember this chart on this device
        </label>
        <p className="form-note">
          Saving includes calculated positions, UTC birth time, timezone, and
          coordinates. Otherwise this chart lasts only for this session. You can
          clear a saved chart at any time.
        </p>
        {error && (
          <p role="alert" className="error-message">
            {error}
          </p>
        )}
        <div className="form-actions">
          <button className="text-button" type="button" onClick={onManual}>
            Advanced: enter chart positions
          </button>
          <button className="button secondary" type="button" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="button primary"
            disabled={draft.unknownTime}
            type="submit"
          >
            Calculate my chart ↗
          </button>
        </div>
      </form>
    </main>
  );
}
