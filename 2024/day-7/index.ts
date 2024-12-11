import { FileReader } from "../../lib/FileReader";

const getCombos = (length: number, operations: string[]): string[][] => {
  if (length === 1) return operations.map((op) => [op]);
  const smallerCombos = getCombos(length - 1, operations);
  const allCombos: string[][] = [];
  smallerCombos.map((combo) => {
    operations.map((op) => allCombos.push([...combo, op]));
  });
  return allCombos;
};

const data = FileReader.readFile();

const handleOperation = (
  startValue: number,
  combo: string[],
  numbersToUse: number[]
) => {
  for (let i = 0; i < combo.length; i++) {
    if (combo[i] === "+") {
      startValue += numbersToUse[i + 1];
    } else if (combo[i] === "*") {
      startValue *= numbersToUse[i + 1];
    } else if (combo[i] === "||") {
      const concatenated = Number(`${startValue}${numbersToUse[i + 1]}`);

      startValue = concatenated;
    }
  }
  return startValue;
};

const part1 = (data: string) => {
  let sum = 0;

  data.split("\n").map((row) => {
    const totalValue = Number(row.substring(0, row.indexOf(":")));

    const numbersToUse = row
      .split(" ")
      .map(Number)
      .filter((x) => !isNaN(x));

    const operations = ["+", "*"];

    const operationCombos = getCombos(numbersToUse.length - 1, operations);

    for (const combo of operationCombos) {
      let value = numbersToUse[0];

      value = handleOperation(value, combo, numbersToUse);

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

  data.split("\n").map((row) => {
    const totalValue = Number(row.substring(0, row.indexOf(":")));

    const numbersToUse = row
      .split(" ")
      .map(Number)
      .filter((x) => !isNaN(x));

    const operations = ["+", "*", "||"];

    const operationCombos = getCombos(numbersToUse.length - 1, operations);

    for (const combo of operationCombos) {
      let value = numbersToUse[0];
      let valid = true;

      value = handleOperation(value, combo, numbersToUse);

      if (valid && value === totalValue) {
        sum += value;
        break;
      }
    }
  });

  return sum;
};

console.log(part1(data));
console.log(part2(data));
