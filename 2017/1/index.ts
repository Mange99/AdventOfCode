import { FileReader } from "../../lib/FileReader";

const data = FileReader.readFile();

const part1 = (data: string): number => {
  let res = data
    .split("")
    .map(Number)
    .reduce((prev, curr) => {
      if (prev == curr) return prev + curr;
      return prev;
    }, 0);
  if (data[data.length - 1] == data[0]) res += Number(data[0]);

  return res;
};

const part2 = (data: number[]): number => {
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    let step = data.length / 2 + i;

    if (step > data.length - 1) step -= data.length;

    if (data[i] == data[step]) {
      sum += data[step];
    }
  }

  return sum;
};

console.log(part1(data));
console.log(part2(data.split("").map(Number)));
