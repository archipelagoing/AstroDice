export function CelestialMedallion({ symbol }: { symbol: string }) {
  return (
    <div className="celestial-medallion" aria-hidden="true">
      <span>{symbol}</span>
    </div>
  );
}

export function CelestialSky() {
  return (
    <div className="celestial-sky" aria-hidden="true">
      <svg viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice">
        <g className="sky-constellations" fill="none">
          <path d="M52 174 94 116 170 142 202 75M1230 78 1280 145 1365 123 1405 212M25 810 94 850 170 790M1248 786 1314 864 1400 812" />
        </g>
        <g className="sky-stars">
          {[
            [52, 174],
            [94, 116],
            [170, 142],
            [202, 75],
            [1230, 78],
            [1280, 145],
            [1365, 123],
            [1405, 212],
            [25, 810],
            [94, 850],
            [170, 790],
            [1248, 786],
            [1314, 864],
            [1400, 812],
            [48, 430],
            [1380, 480],
            [113, 630],
            [1322, 620],
            [340, 32],
            [720, 46],
            [1040, 28],
          ].map(([x, y], index) => (
            <circle key={index} cx={x} cy={y} r={index % 3 === 0 ? 2.5 : 1.5} />
          ))}
          <path
            d="M75 285v16m-8-8h16M1345 350v20m-10-10h20M215 935v14m-7-7h14"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
}

export function NavigationEmblem({
  kind,
}: {
  kind: "chart" | "dice" | "planet" | "nodes";
}) {
  return (
    <span className="nav-die-emblem" aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none">
        {kind === "chart" ? (
          <>
            <circle cx="16" cy="16" r="11" />
            <circle cx="16" cy="16" r="5" />
            <path d="M16 5v6m0 10v6M5 16h6m10 0h6M8 8l5 5m6 6 5 5M8 24l5-5m6-6 5-5" />
          </>
        ) : kind === "dice" ? (
          <>
            <path d="m16 3 12 7v13l-12 7L4 23V10Z" />
            <path d="m4 10 12 7 12-7M16 17v13" />
            <circle cx="16" cy="10" r="1.5" />
            <circle cx="9" cy="19" r="1.5" />
            <circle cx="23" cy="19" r="1.5" />
          </>
        ) : kind === "planet" ? (
          <>
            <circle cx="16" cy="16" r="8" />
            <ellipse
              cx="16"
              cy="16"
              rx="15"
              ry="5"
              transform="rotate(-30 16 16)"
            />
            <path d="M25 3v5m-2.5-2.5h5" />
          </>
        ) : (
          <>
            <path d="M6 15a10 10 0 0 1 20 0M10 22a6 6 0 0 1 12 0" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="26" cy="18" r="3" />
            <circle cx="10" cy="25" r="2" />
            <circle cx="22" cy="25" r="2" />
          </>
        )}
      </svg>
    </span>
  );
}
