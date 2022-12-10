import { FileReader } from "../../lib/FileReader";
import { stringHelper } from "../../lib/StringHelper";

const data = FileReader.readFile();

const part1 = (data: string): number => {
  let cycle = 0;
  let registerX = 1;
  let total = 0;
  let cashed: number[] = [];
  let set = new Set<number>();
  let values = [20, 60, 100, 140, 180, 220];

  data.split("\n").map((value) => {
    cycle++;

    if (cashed.length > 0) registerX += cashed.pop() ?? 0;

    if (values.includes(cycle)) set.add(registerX * cycle);

    if (value.startsWith("addx")) {
      const add = Number(value.split(" ")[1]);

      cycle++;

      cashed.push(add);
    }

    if (values.includes(cycle)) set.add(registerX * cycle);
  });
  set.forEach((value) => (total += value));
  return total;
};

const part2 = (data: string) => {
  let registerX: number = 1;
  let crt: string[][] = [];
  let crtRow: string[] = Array(40).fill(".");
  let cycle = 0;
  let cashed: number[] = [];
  let added = false;

  data.split("\n").map((value) => {
    cycle++;
    if (cashed.length > 0) registerX += cashed.pop() ?? 0;

    if (cycle % 40 == 0) {
      crt.push(crtRow);
      crtRow = Array(40).fill(".");
      added = true;
    }

    let pixelIndex = (cycle - 1) % 40;

    if (
      pixelIndex == registerX - 1 ||
      pixelIndex == registerX ||
      pixelIndex == registerX + 1
    ) {
      crtRow[pixelIndex] = "#";
    }

    if (value.startsWith("addx")) {
      const add = Number(value.split(" ")[1]);

      cycle++;

      cashed.push(add);
    }
    pixelIndex = (cycle - 1) % 40;

    if (
      pixelIndex == registerX - 1 ||
      pixelIndex == registerX ||
      pixelIndex == registerX + 1
    ) {
      crtRow[pixelIndex] = "#";
    }
    if (!added && cycle % 40 == 0) {
      crt.push(crtRow);
      crtRow = Array(40).fill(".");
    }

    added = false;
  });

  return crt;
};

console.log(part1(data));
stringHelper.printCrt(part2(data));

// Timed(1, () => part1(data));
// Timed(2, () => part2(data));
