import { Temporal } from "@js-temporal/polyfill";
import type { BirthDetails } from "../types";

export function resolveBirthTime(birth: BirthDetails) {
  if (birth.unknownTime)
    throw new Error(
      "A known birth time is required to calculate houses and practice their axes. You can explore the example while you look for your birth time.",
    );
  if (!birth.place)
    throw new Error(
      "Select your birthplace from the search results, or enter coordinates and a timezone.",
    );
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(birth.date) ||
    !/^\d{2}:\d{2}$/.test(birth.time)
  )
    throw new Error("Enter a complete date and local birth time.");
  const plain = Temporal.PlainDateTime.from(`${birth.date}T${birth.time}`, {
    overflow: "reject",
  });
  if (plain.year < 1900 || plain.year > 2100)
    throw new Error("This version supports dates from 1900 through 2100.");
  const earlier = plain.toZonedDateTime(birth.place.timezone, {
    disambiguation: "earlier",
  });
  const later = plain.toZonedDateTime(birth.place.timezone, {
    disambiguation: "later",
  });
  if (
    !earlier.toPlainDateTime().equals(plain) ||
    !later.toPlainDateTime().equals(plain)
  )
    throw new Error(
      "This local time did not exist because the clocks moved forward. Check the recorded birth time.",
    );
  if (
    earlier.epochMilliseconds !== later.epochMilliseconds &&
    birth.disambiguation === "reject"
  )
    throw new Error(
      "This local time occurred twice when the clocks moved back. Choose the first or second occurrence under Time clarification.",
    );
  const resolved = birth.disambiguation === "later" ? later : earlier;
  return {
    date: new Date(resolved.epochMilliseconds),
    utc: resolved.toInstant().toString(),
    offset: resolved.offset,
  };
}
