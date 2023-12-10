import { readFileSync } from "fs";
import { FileReader } from "../../lib/FileReader";
import { log } from "console";

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

// const part2 = (data: string) => {
//   const sections = data.split("\n\n");
//   const seedRanges = sections[0].split(": ")[1].split(" ").map(Number);

//   sections.splice(0, 1);
//   const newSeeds: number[] = [];

//   for (let i = 0; i < seedRanges.length; i += 2) {
//     const start = seedRanges[i];
//     const length = seedRanges[i + 1];

//     for (let j = 0; j < length; j++) {
//       newSeeds.push(start + j);
//     }
//   }

//   const fromXtoY: { start: number; end: number; range: number }[][] = [];

//   sections.map((range) => {
//     const numbers = range
//       .split(":")[1]
//       .split("\n")
//       .filter((x) => x !== "");

//     const map: { start: number; end: number; range: number }[] = numbers.map(
//       (numbers) => {
//         const [start, source, range] = numbers
//           .split(" ")
//           .map((value) => Number(value));

//         return { start: source, end: source + range, range: start - source };
//       }
//     );
//     fromXtoY.push(map);
//   });

//   return Math.min(
//     ...newSeeds.map((seed) => {
//       return fromXtoY.reduce((prev, curr) => {
//         for (let i = 0; i < curr.length; i++) {
//           if (prev >= curr[i].start && prev < curr[i].end) {
//             return prev + curr[i].range;
//           }
//         }
//         return prev;
//       }, seed);
//     })
//   );
// };

type MappingTable = Array<[number, number, number]>;
type Almanac = { [key: string]: (n: number) => number | null };

function createMappingFunction(
  table: MappingTable
): (n: number) => number | null {
  return (n: number) => {
    for (const [destStart, srcStart, rangeLength] of table) {
      if (n >= srcStart && n < srcStart + rangeLength) {
        return n - srcStart + destStart;
      }
    }
    return null;
  };
}

function parseInput(input: string[][]): Almanac {
  const almanac: Almanac = {};
  for (const group of input) {
    const title = group[0].slice(0, -5);
    const table = group.slice(1).map(
      (line) => line.split(" ").map(Number) as [number, number, number] // Type assertion
    );
    almanac[title] = createMappingFunction(table);
  }
  return almanac;
}

function mapSeed(seed: number, almanac: Almanac): number {
  let current = seed;
  for (const key of Object.keys(almanac)) {
    const result = almanac[key](current);
    if (result !== null) {
      current = result;
    }
  }
  return current;
}

function part2(seeds: number[], almanac: Almanac): number {
  let minLocation = Infinity;
  for (let i = 0; i < seeds.length; i += 2) {
    const start = seeds[i];
    const rangeLength = seeds[i + 1];
    for (let j = start; j < start + rangeLength; j++) {
      const location = mapSeed(j, almanac);
      minLocation = Math.min(minLocation, location);
    }
  }
  return minLocation;
}

const input2 = data.split("\n\n").map((value) => value.split("\n"));

const seeds_2 = input2.splice(0, 1)[0];
const seedRanges = seeds_2[0].split(": ")[1].split(" ").map(Number);

const seeds = seedRanges; // Seed ranges
const almanac = parseInput(input2);
console.log(`The lowest location number is ${part2(seeds, almanac)}`);

// console.log(part1(data));
// console.log(part2(data));
