import { Timed } from "../../lib/Timed";
import { FileReader } from "../../lib/FileReader";

const data = FileReader.readFile();

let sum = 0;

const part1 = (data: string): number => {
  data.split("\n\n").map((row, i) => {
    let left = JSON.parse(row.split("\n")[0]);
    let right = JSON.parse(row.split("\n")[1]);

    if (compare(left, right)) {
      sum += i + 1;
    }
  });

  return sum;
};

const compare = (left: any, right: any): number => {
  //LEFT O RIGHT
  if (typeof left === "number" && typeof right === "number") {
    if (left < right) {
      return -1;
    } else if (left > right) {
      return 1;
    }
    return 0;
  }
  //ARRAY O ARRAY
  else if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < Math.min(left.length, right.length); i++) {
      if (compare(left[i], right[i]) != 0) {
        return compare(left[i], right[i]);
      }
    }
    if (left.length > right.length) return 1;
    if (left.length < right.length) return -1;
    return 0;
  }
  //NUMMER O ARRAY
  else {
    if (typeof left === "number") {
      left = [left];
    } else if (typeof right === "number") {
      right = [right];
    }
    return compare(left, right);
  }
};

const part2 = (data: string): number => {
  const div = ["[[2]]", "[[6]]"];

  return data
    .split("\n")
    .concat(div)
    .filter((x) => x != "")
    .map((x) => JSON.parse(x))
    .sort(compare)
    .reduce((prev, curr, i) => {
      if (div.includes(JSON.stringify(curr))) prev *= i + 1;
      return prev;
    }, 1);
};

// console.log(part1(data));
console.log(part2(data));

// Timed(1, () => part1(data));
// Timed(2, () => part2(data));
