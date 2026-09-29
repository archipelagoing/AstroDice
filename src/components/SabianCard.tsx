import { SignGlyph } from "./ZodiacLabel";
import { useId, useState } from "react";
import { SABIAN_SOURCE, sabianPosition } from "../interpretation/sabian";

export function SabianCard({
  longitude,
  label,
}: {
  longitude: number;
  label: string;
}) {
  const position = sabianPosition(longitude);
  // Remount the reader when selection changes so an old symbol cannot linger.
  return (
    <SymbolReader
      key={`${position.sign}-${position.degree}`}
      position={position}
      label={label}
    />
  );
}

function SymbolReader({
  position,
  label,
}: {
  position: ReturnType<typeof sabianPosition>;
  label: string;
}) {
  const id = useId().replace(/:/g, "");
  const frame = `sabian-${id}`;
  const [opened, setOpened] = useState(false);
  return (
    <section className="sabian-card" aria-label={`Sabian symbol for ${label}`}>
      <div className="sabian-heading">
        <span className="sabian-star" aria-hidden="true">
          ✧
        </span>
        <div>
          <span className="eyebrow">Sabian symbol · {label}</span>
          <h4>
            <SignGlyph name={position.sign} /> {position.sign} {position.degree}
          </h4>
        </div>
      </div>
      <p>
        A symbolic image for this degree of the zodiac. Read Lynda Hill’s
        interpretation directly from Sabian Symbols.
      </p>
      <form
        action={`${SABIAN_SOURCE}#symbol`}
        method="post"
        target={frame}
        onSubmit={(event) => {
          const submitter = (event.nativeEvent as SubmitEvent)
            .submitter as HTMLButtonElement | null;
          if (submitter?.formTarget !== "_blank") setOpened(true);
        }}
      >
        <input
          type="hidden"
          name="selected_symbol"
          value={position.sign.toLowerCase()}
        />
        <input
          type="hidden"
          name="selected_degree"
          value={position.zodiacDegree}
        />
        <div className="sabian-actions">
          <button className="button secondary" type="submit">
            {opened ? "Reload symbol" : "Read symbol"} ↗
          </button>
          <button className="text-button" type="submit" formTarget="_blank">
            Open on Sabian Symbols ↗
          </button>
          {opened && (
            <button
              className="text-button"
              type="button"
              onClick={() => setOpened(false)}
            >
              Close reader
            </button>
          )}
        </div>
      </form>
      <p className="sabian-note">
        <SignGlyph name={position.sign} /> {position.sign}{" "}
        {position.zodiacDegree}°–{position.zodiacDegree}°59′ → Sabian degree{" "}
        {position.degree}. Only the sign and whole degree are sent when you open
        the reader.
      </p>
      <iframe
        name={frame}
        title={`Lynda Hill’s Sabian symbol: ${position.sign} ${position.degree}`}
        hidden={!opened}
        className="sabian-frame"
        src="about:blank"
        referrerPolicy="no-referrer"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
      />
      {opened && (
        <p className="sabian-note">
          Live page from{" "}
          <a href={SABIAN_SOURCE} target="_blank" rel="noreferrer">
            sabiansymbols.com
          </a>
          . If it does not load, use “Open on Sabian Symbols” above.
        </p>
      )}
    </section>
  );
}
