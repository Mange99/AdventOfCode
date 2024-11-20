import { log } from "console";
import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

const part1 = (data: string) => {
  data
    .split("\n\n")
    .map((value) =>
      value
        .split("\n")
        .map(Number)
        .reduce((prev, curr) => prev + curr, 0)
    )
    .sort((a, b) => b - a)[1];
};

const part2 = (data: string) => {
  // data.split("\n\n").map((value) => {
  //   console.log(value);
  // });
};

console.log(part1(data));
// console.log(part2(data));

// Timed(1, () => part1(data));
// Timed(2, () => part2(data));
