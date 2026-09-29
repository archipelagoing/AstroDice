export function housesForFace(face: number): [number, number] {
  if (!Number.isInteger(face) || face < 1 || face > 6)
    throw new Error("Choose a die face from 1 through 6.");
  return [face, face + 6];
}
/** Rejection sampling avoids modulo bias; repeated faces are valid rolls. */
export function rollDie(
  randomUint32 = () => crypto.getRandomValues(new Uint32Array(1))[0],
): number {
  let value: number;
  do {
    value = randomUint32();
  } while (value >= 4294967292);
  return (value % 6) + 1;
}
