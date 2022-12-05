export const regExMove = (operation: string): number[] => {
  var regex = /\d+/g;
  return operation.match(regex)?.map(Number) ?? [0];
};
