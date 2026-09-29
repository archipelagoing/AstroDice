import { SIGNS } from "../data/catalog";
import { formatPosition, getSignAtLongitude } from "../geometry/chart";

export function SignGlyph({ name }: { name: string }) {
  const sign = SIGNS.find(([signName]) => signName === name);
  return sign ? (
    <span className="sign-glyph" aria-hidden="true">
      {sign[1]}
    </span>
  ) : null;
}

export function ZodiacPosition({ longitude }: { longitude: number }) {
  return (
    <>
      <SignGlyph name={SIGNS[getSignAtLongitude(longitude)][0]} />{" "}
      {formatPosition(longitude)}
    </>
  );
}
