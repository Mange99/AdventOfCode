import { log } from "console";
import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

const part1 = (data: string) => {
  const lines = data.split("\n").map((input) =>
    input
      .split(" ")
      .filter((x) => x != "" && !x.includes(":"))
      .map(Number)
  );

  const [times, distances] = lines;

  const numberOfFasterTimes = times.map((time, i) => {
    let count = 0;
    for (let j = 0; j <= time; j++) {
      if (j * (time - j) > distances[i]) count++;
    }
    return count;
  });

  return numberOfFasterTimes.reduce((prev, curr) => prev * curr, 1);
};

const part2 = (data: string) => {
  const lines = data
    .split("\n")
    .map((input, i) => input.match(/\d+/g) ?? [""]) ?? [""];

  const time = Number(lines[0].join(""));
  const distance = Number(lines[1].join(""));

  let count = 0;
  for (let j = 0; j <= time; j++) {
    if (j * (time - j) > distance) count++;
  }

  return count;
};

Timed(1, () => part1(data));
Timed(2, () => part2(data));
