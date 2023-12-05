import { FileReader } from "../../lib/FileReader";

const data = FileReader.readFile();

const part1 = (data: string) => {
  const sections = data.split("\n\n");
  const seeds = sections[0].split(": ")[1].split(" ").map(Number);
  sections.splice(0, 1);

  const fromXtoY: { start: number; end: number; range: number }[][] = [];

  sections.map((range) => {
    const numbers = range
      .split(":")[1]
      .split("\n")
      .filter((x) => x !== "");

    const map: { start: number; end: number; range: number }[] = numbers.map(
      (numbers) => {
        const [start, source, range] = numbers
          .split(" ")
          .map((value) => Number(value));

        return { start: source, end: source + range, range: start - source };
      }
    );

    fromXtoY.push(map);
  });

  return Math.min(
    ...seeds.map((seed) => {
      return fromXtoY.reduce((prev, curr) => {
        for (let i = 0; i < curr.length; i++) {
          if (prev >= curr[i].start && prev < curr[i].end) {
            return prev + curr[i].range;
          }
        }
        return prev;
      }, seed);
    })
  );
};

const part2 = (data: string) => {
  const sections = data.split("\n\n");
  const seedRanges = sections[0].split(": ")[1].split(" ").map(Number);

  sections.splice(0, 1);
  const newSeeds: number[] = [];

  for (let i = 0; i < seedRanges.length; i += 2) {
    const start = seedRanges[i];
    const length = seedRanges[i + 1];

    for (let j = 0; j < length; j++) {
      newSeeds.push(start + j);
    }
  }

  const fromXtoY: { start: number; end: number; range: number }[][] = [];

  sections.map((range) => {
    const numbers = range
      .split(":")[1]
      .split("\n")
      .filter((x) => x !== "");

    const map: { start: number; end: number; range: number }[] = numbers.map(
      (numbers) => {
        const [start, source, range] = numbers
          .split(" ")
          .map((value) => Number(value));

        return { start: source, end: source + range, range: start - source };
      }
    );
    fromXtoY.push(map);
  });

  return Math.min(
    ...newSeeds.map((seed) => {
      return fromXtoY.reduce((prev, curr) => {
        for (let i = 0; i < curr.length; i++) {
          if (prev >= curr[i].start && prev < curr[i].end) {
            return prev + curr[i].range;
          }
        }
        return prev;
      }, seed);
    })
  );
};

console.log(part1(data));
console.log(part2(data));
