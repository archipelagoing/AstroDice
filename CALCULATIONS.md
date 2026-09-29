# Calculation and verification notes

## Runtime engine

Planetary positions use [Astronomy Engine 2.1.19](https://github.com/cosinekitty/astronomy), MIT licensed. `GeoVector(body, time, true)` includes light travel time and aberration; `Ecliptic` converts its J2000 equatorial vector to the true ecliptic/equinox of date. These are geocentric tropical longitudes, not heliocentric positions. The engine supplies the Sun, Moon, and eight other planets. Motion is estimated from the signed longitude difference one hour before and after the birth instant.

Mean lunar nodes use the Meeus mean ascending-node polynomial (centuries of Terrestrial Time from J2000); nutation in longitude is added to refer it to the true equinox of date. The descending node is opposite. These are mean, not true/osculating nodes. Chiron is not supported by this engine and is explicitly unavailable on calculated charts. The advanced manual editor still supports it.

## Houses

`src/calculation/houses.ts` is an independent numerical implementation of Placidus temporal divisions, not copied Swiss Ephemeris code. It uses Astronomy Engine's true obliquity of date and apparent sidereal time. Longitude is positive east; latitude is positive north. MC is the meridian/ecliptic intersection; ASC is the eastern horizon/ecliptic intersection.

For ecliptic longitude λ, obliquity ε, and latitude φ:

- Right ascension is atan2(sin λ cos ε, cos λ).
- Declination is asin(sin ε sin λ).
- The diurnal semi-arc S is acos(−tan φ tan declination).
- Eastern upper-house cusps divide the point's semi-arc at S/3 and 2S/3 from the meridian.
- Eastern lower-house cusps divide the nocturnal semi-arc at S + (180−S)/3 and S + 2(180−S)/3.
- Bisection solves these equations on the eastern half of the ecliptic. Opposite cusps are 180° apart.

Whole Sign starts house 1 at the beginning of the rising sign. It preserves ASC and MC independently of cusps. Existing half-open house intervals `[cusp, next cusp)` assign exact-cusp planets to the house beginning there.

This release deliberately accepts only dates 1900–2100 and latitudes strictly between −66° and +66°. It rejects unsupported inputs instead of silently substituting a different house system. The support interval is a tested application boundary, not a claim that all astronomical phenomena have equal precision throughout it.

## Historical time

`@js-temporal/polyfill` resolves a local date and time in the selected IANA zone using the browser/runtime's timezone data. No current UTC-offset shortcuts or inferred user-device timezone are used. Nonexistent spring-forward times are rejected. Repeated fall-back times require the user to choose an occurrence. Historical results depend on the runtime's timezone database; older civil-time records can need independent confirmation.

Unknown time does not produce fabricated noon-based houses. The user can explore the clearly labeled example; a date-only uncertain-position chart is not implemented.

## Independent numerical fixtures

`tests/fixtures/reference-charts.json` contains values produced by the standalone **Swiss Ephemeris 2.10.03** C `swetest` program, with its Moshier ephemeris. The reference tool was built in a temporary directory and is not an application dependency or a distributed binary. Reference API documentation: [Swiss Ephemeris programming interface](https://www.astro.com/swisseph/swephprg.htm).

The recorded command in the fixture uses UTC, tropical geocentric apparent longitudes, and Placidus houses. Seven cases span 1900–2100, north/south/equatorial latitudes, eastern/western longitudes, and a 65.5° latitude case. Automated comparisons use angular distance with tolerances of 0.03° for planets, 0.005° for cusps/angles, and 0.01° for the mean node. These are test acceptance tolerances, not a guarantee of precision for every date. Very near-boundary placements warrant independent confirmation.

Separate tests cover DST gaps/overlaps, leap dates, UTC rollover, changes to inputs, unsupported inputs, house segmentation, interception detection, and exact-cusp assignment. Runtime production uses only Astronomy Engine and our own geometry; no Swiss Ephemeris/GPL implementation is bundled.

## Place lookup and privacy

[Open-Meteo geocoding](https://open-meteo.com/en/docs/geocoding-api) returns place candidates, coordinates, and timezone identifiers using GeoNames data. Only the user's city search term goes to that endpoint; date and time are not sent. Search has timeout/error handling, choice among ambiguous places, stale-request protection, and a manual coordinates/IANA-zone fallback. Its hosted free endpoint's usage terms apply; review service terms before commercial deployment.

The date and time are resolved and the chart is calculated locally. Saving a calculated chart is opt-in and includes derived positions, UTC birth time, timezone, and coordinates. Raw city search queries and unfinished drafts are not persisted. The existing version-1 chart schema remains compatible: optional calculation metadata is validated when present. Clearing a chart clears stored data and the in-memory birth draft. Fonts are requested from Google Fonts with local fallbacks.

## Educational readings

Readings are original authored text composed from planet, sign, and house metadata. They are symbolic educational prompts, not model-generated analysis, diagnoses, forecasts, or factual personality descriptions. All thirteen manually supported bodies/points have composition coverage across twelve signs and twelve houses. Content tests verify coverage and context; they do not substitute for an editorial review by an astrology educator. No aspects, dignities, or stelliums are inferred in these readings.
