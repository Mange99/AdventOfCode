import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();
const alp = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const part1 = (data: string): number =>
  data.split("\n").reduce((prev, curr) => {
    const rucksack1 = curr.substring(0, curr.length / 2).split("");
    const rucksack2 = curr.substring(curr.length / 2).split("");
    for (let i = 0; i < rucksack1.length; i++) {
      for (let j = 0; j < rucksack2.length; j++) {
        if (rucksack1[i] == rucksack2[j])
          return prev + alp.indexOf(rucksack1[i]) + 1;
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
          count += alp.indexOf(value1) + 1;
        }
      }
    });
  }
  return count;
};

/*

Worst time


const overlap = (arr1: string[], arr2: string[]) =>
  arr1.filter((value) => arr2.indexOf(value) !== -1);

const part2 = (data: string): number => {
  let count = 0;
  const data2 = data.split("\n");

  for (let x = 0; x < data2.length; x += 3) {
    let inBoth = "";
    const s1s2 = overlap(data2[x].split(""), data2[x + 1].split(""));
    const s3 = data2[x + 2].split("");

    for (let i = 0; i < s1s2.length; i++) {
      for (let j = 0; j < s3.length; j++) {
        if (s1s2[i] == s3[j]) {
          inBoth = s1s2[i];
          count += alp.indexOf(inBoth) + 1;
          break;
        }
      }
      if (inBoth) break;
    }
  }
  return count;
};
*/
Timed(1, () => part1(data));
Timed(2, () => part2New(data));
