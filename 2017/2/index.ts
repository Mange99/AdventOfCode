import { FileReader } from "../../lib/FileReader";

const data = FileReader.readFile();

const part1 = (data: string): number => {
  return data
    .split("\n")
    .map((row) => {
      const nums = row.match(/\d+/g)?.toString().split(",").map(Number) ?? [];

      return Math.max(...nums) - Math.min(...nums);
    })
    .reduce((prev, curr) => prev + curr);
};

const evenlyDevide = (a: number, b: number) => {
  if (a % b == 0) return a / b;
  else if (b % a == 0) return b / a;
  return 0;
};

const part2 = (data: string): number => {
  return data
    .split("\n")
    .map((row) => row.split("\t").map(Number))
    .map((row) => {
      for (let i = 0; i < row.length - 1; i++) {
        for (let j = i + 1; j < row.length; j++) {
          const trell = evenlyDevide(row[i], row[j]);
          if (trell != 0) return trell;
        }
      }
      return 0;
    })
    .reduce((prev, curr) => prev + curr);
};

console.log(part1(data));
console.log(part2(data));
