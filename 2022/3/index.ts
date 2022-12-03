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

const overlap = (arr1: string[], arr2: string[]) =>
  arr1.filter((value) => arr2.indexOf(value) !== -1);

const part2 = (data: string): number => {
  let count = 0;
  const data2 = data.split("\n");
  for (let x = 0; x < data2.length; x += 3) {
    let inBoth = "";
    const temp = overlap(data2[x].split(""), data2[x + 1].split(""));
    const s3 = data2[x + 2].split("");

    for (let i = 0; i < temp.length; i++) {
      for (let j = 0; j < s3.length; j++) {
        if (temp[i] == s3[j]) {
          inBoth = temp[i];
          count += alp.indexOf(inBoth) + 1;
          break;
        }
      }
      if (inBoth) break;
    }
  }
  return count;
};
Timed(1, () => part1(data));
Timed(2, () => part2(data));
