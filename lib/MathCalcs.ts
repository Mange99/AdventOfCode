export const leastCommonMultiple = (a: number, b: number): number =>
  (a * b) / greatestCommonDivisor(a, b);

export const greatestCommonDivisor = (a: number, b: number): number => {
  const remainder = a % b;
  if (remainder === 0) return b;
  return greatestCommonDivisor(b, remainder);
};
