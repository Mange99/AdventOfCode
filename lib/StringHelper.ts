export const regExMove = (operation: string): number[] => {
  var regex = /\d+/g;
  return operation.match(regex)?.map(Number) ?? [0];
};

export const alphabetNr = (x: string): number =>
  x.charCodeAt(0) - 96 + (x.match(/^[A-Z]/) ? 58 : 0);

export const printCrt = (crt: string[][]) => {
  crt.map((row, i) => {
    let formattedRow = row.map((item, j) => {
      if ((j + 1) % 5 === 0) {
        return `${item}\t`;
      }
      return item;
    });
    console.log(formattedRow.join(""));
  });
};

export const replaceLastOccurence = (
  haderang: string,
  value: string,
  replaceValue: string
) => {
  const index = haderang.lastIndexOf(value);
  return haderang.slice(0, index) + replaceValue + haderang.slice(index);
};
