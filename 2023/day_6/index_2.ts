import { log } from "console";
import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const distances = (time: number, record: number) => {
  const root = Math.sqrt(Math.pow(time / 2, 2) - (record + 1));
  const x1 = Math.ceil(time / 2 - root);
  const x2 = Math.floor(time / 2 + root);

  return x2 - x1 + 1;
};

export const part1 = (data: string) => {
  const [times, records] = data
    .split("\n")
    .map((x) => x.split(":")[1])
    .map((x) =>
      x
        .split(" ")
        .map((x) => x.trim())
        .filter((x) => x.length)
        .map(Number)
    );

  return times.reduce((acc, time, i) => {
    return acc * distances(time, records[i]);
  }, 1);
};

export const part2 = (data: string) => {
  const lines = data
    .split("\n")
    .map((input, i) => input.match(/\d+/g) ?? [""]) ?? [""];

  const time = Number(lines[0].join(""));
  const distance = Number(lines[1].join(""));

  return distances(time, distance);
};
const data = FileReader.readFile();

Timed(1, () => part1(data));
Timed(2, () => part2(data));
