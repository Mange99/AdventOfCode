import { FileReader } from "../../lib/FileReader";

const data = FileReader.readFile();

const part1 = (data: string): number =>
  data.split("").reduce((prev, curr) => (curr == "(" ? prev + 1 : prev - 1), 0);

const part2 = (data: string): number => {
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    if (data[i] == "(") sum++;
    else sum--;

    if (sum < 0) return i + 1;
  }
  return -1;
};

console.log(part1(data));
console.log(part2(data));
