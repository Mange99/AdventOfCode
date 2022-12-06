import { containsDuplicates } from "../../lib/ArrayHelper";
import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

const part1 = (data: string): number => {
  const signals = data.split("");

  for (let i = 0; i < signals.length; i++) {
    if (!containsDuplicates(signals.slice(i, i + 4))) return i + 4;
  }
  return -1;
};

const part2 = (data: string): number => {
  const signals = data.split("");

  for (let j = 0; j < signals.length; j++) {
    if (!containsDuplicates(signals.slice(j, j + 14))) return j + 14;
  }
  return -1;
};

Timed(1, () => part1(data));
Timed(2, () => part2(data));
