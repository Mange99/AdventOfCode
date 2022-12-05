import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

let elvCals: number[] = [];

const part1 = (data: string): number => {
  return data
    .split("\n\n")
    .map((value) =>
      value
        .split("\n")
        .map(Number)
        .reduce((prev, curr) => prev + curr, 0)
    )
    .sort((a, b) => b - a)[0];
};

const part2 = (data: string): number => {
  return data
    .split("\n\n")
    .map((value) =>
      value
        .split("\n")
        .map(Number)
        .reduce((prev, curr) => prev + curr, 0)
    )
    .sort((a, b) => b - a)
    .reduce((prev, curr, i) => (i < 3 ? prev + curr : prev));
};

Timed(1, () => part1(data));
Timed(2, () => part2(data));
