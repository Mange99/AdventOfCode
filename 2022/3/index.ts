import { FileReader } from "../../lib/FileReader";
import { alphabetNr } from "../../lib/StringHelper";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

const part1 = (data: string): number =>
  data.split("\n").reduce((prev, curr) => {
    const rucksack1 = curr.substring(0, curr.length / 2).split("");
    const rucksack2 = curr.substring(curr.length / 2).split("");
    for (let i = 0; i < rucksack1.length; i++) {
      for (let j = 0; j < rucksack2.length; j++) {
        if (rucksack1[i] == rucksack2[j])
          return prev + alphabetNr(rucksack1[i]);
      }
    }
    return prev;
  }, 0);

const part2New = (data: string): number => {
  let count = 0;
  const data2 = data.split("\n");

  for (let x = 0; x < data2.length; x += 3) {
    const set1 = new Set<string>(data2[x].split(""));
    const set2 = new Set<string>(data2[x + 1].split(""));
    const set3 = new Set<string>(data2[x + 2].split(""));

    set1.forEach((value1) => {
      if (set2.has(value1)) {
        if (set3.has(value1)) {
          count += alphabetNr(value1);
        }
      }
    });
  }
  return count;
};

Timed(1, () => part1(data));
Timed(2, () => part2New(data));
