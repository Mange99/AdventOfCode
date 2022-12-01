import { FileReader } from "../../lib/FileReader";

const data = FileReader.readFileSplit("\n\r");

let elvCals: number[] = [];

const part1 = (): number => {
  elvCals = data
    .map((value) =>
      value
        .split("\n")
        .map(Number)
        .reduce((prev, curr) => prev + curr, 0)
    )
    .sort((a, b) => b - a);
  return elvCals[0];
};

const part2 = (): number => elvCals[0] + elvCals[1] + elvCals[2];

console.log(part1());
console.log(part2());
