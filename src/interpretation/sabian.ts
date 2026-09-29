import { SIGNS } from "../data/catalog";
import { normalizeLongitude } from "../geometry/chart";

export const SABIAN_SOURCE = "https://sabiansymbols.com/list-of-symbols/";

export function sabianPosition(longitude: number) {
  if (!Number.isFinite(longitude)) throw new Error("Invalid Sabian longitude");
  const position = normalizeLongitude(longitude);
  const sign = SIGNS[Math.floor(position / 30)][0];
  // The source form expects zodiac degrees 0–29, not Sabian degrees 1–30.
  const zodiacDegree = Math.floor(position % 30);
  return { sign, zodiacDegree, degree: zodiacDegree + 1 };
}
