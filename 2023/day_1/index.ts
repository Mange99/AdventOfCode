import { FileReader } from "../../lib/FileReader";
import { replaceLastOccurence } from "../../lib/StringHelper";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

let lettersToNumber = new Map<string, string>([
  ["1", "1"],
  ["2", "2"],
  ["3", "3"],
  ["4", "4"],
  ["5", "5"],
  ["6", "6"],
  ["7", "7"],
  ["8", "8"],
  ["9", "9"],
  ["one", "1"],
  ["two", "2"],
  ["three", "3"],
  ["four", "4"],
  ["five", "5"],
  ["six", "6"],
  ["seven", "7"],
  ["eight", "8"],
  ["nine", "9"],
]);

const part1 = (data: string) => {
  return data
    .split("\n")
    .map((value) => value.match(/\d/g) ?? [""])
    .reduce((prev, curr) => Number(curr[0] + curr.splice(-1)) + prev, 0);
};

const part2 = (data: string) => {
  return data.split("\n").reduce((prev, curr) => {
    let firstNumber = { key: "", value: "", index: Infinity };
    let lastNumber = { key: "", value: "", index: -1 };

    lettersToNumber.forEach((value, key) => {
      if (curr.indexOf(key) < firstNumber.index && curr.indexOf(key) >= 0) {
        const index = curr.indexOf(key);
        firstNumber = { key, value, index };
      }
      if (
        curr.lastIndexOf(key) > lastNumber.index &&
        curr.lastIndexOf(key) >= 0
      ) {
        const index = curr.lastIndexOf(key);
        lastNumber = { key, value, index };
      }
    });

    const replaceFirstValue = curr.replace(firstNumber.key, firstNumber.value);

    const reworked = replaceLastOccurence(
      replaceFirstValue,
      lastNumber.key,
      lastNumber.value
    ).match(/\d/g) ?? [""];

    return Number(reworked[0] + reworked.splice(-1)) + prev;
  }, 0);
};

Timed(1, () => part1(data));
Timed(2, () => part2(data));
