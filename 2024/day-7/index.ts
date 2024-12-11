import { FileReader } from "../../lib/FileReader";

const data = FileReader.readFile();

const part1 = (data: string) => {
  let sum = 0;

  data.split("\n").map((row) => {
    const totalValue = Number(row.substring(0, row.indexOf(":")));

    const numbersToUse = row
      .split(" ")
      .map(Number)
      .filter((x) => !isNaN(x));

    const operations = ["+", "*"];

    const getCombos = (length: number): string[][] => {
      if (length === 1) return operations.map((op) => [op]);
      const smallerCombos = getCombos(length - 1);
      const allCombos: string[][] = [];
      smallerCombos.map((combo) => {
        operations.map((op) => allCombos.push([...combo, op]));
      });
      return allCombos;
    };

    const operationCombos = getCombos(numbersToUse.length - 1);

    for (const combo of operationCombos) {
      let value = numbersToUse[0];
      for (let i = 0; i < combo.length; i++) {
        if (combo[i] === "+") {
          value += numbersToUse[i + 1];
        } else if (combo[i] === "*") {
          value *= numbersToUse[i + 1];
        }
      }

      if (value === totalValue) {
        sum += value;
        break;
      }
    }
  });

  return sum;
};

const part2 = (data: string) => {
  let sum = 0;
};

console.log(part2(data));

console.log(part1(data));
// console.log(part2(data));

// Timed(1, () => part1(data));
// Timed(2, () => part2(data));
