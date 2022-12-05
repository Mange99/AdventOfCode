import { FileReader } from "../../lib/FileReader";

const data = FileReader.readFile();

const part1 = (data: string) =>
  data.split("\n").reduce((prev, curr) => prev + calcBox1(curr.toString()), 0);

const part2 = (data: string) =>
  data.split("\n").reduce((prev, curr) => prev + calcBox2(curr.toString()), 0);

const calcBox1 = (value: string) => {
  const x = value.split("x").sort((a, b) => Number(a) - Number(b));
  const [l, w, h] = [Number(x[0]), Number(x[1]), Number(x[2])];

  return 2 * l * w + 2 * w * h + 2 * l * h + w * l;
};
const calcBox2 = (value: string) => {
  const x = value.split("x").sort((a, b) => Number(a) - Number(b));
  const [l, w, h] = [Number(x[0]), Number(x[1]), Number(x[2])];

  return l + l + w + w + l * w * h;
};
console.log(part1(data));
console.log(part2(data));
