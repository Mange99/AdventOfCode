import { FileReader } from "../../lib/FileReader";

const data = FileReader.readFileAsInt("\n");

let total: number[] = [];

const part1 = (): number => {
  let tot = 0;

  data.map((value) => {
    if (value > 0) {
      tot += value;
    } else {
      total.push(tot);
      tot = 0;
    }
  });
  total = total.sort((a, b) => b - a);

  return total[0];
};

const part2 = (): number => total[0] + total[1] + total[2];

console.log(part1());
console.log(part2());
