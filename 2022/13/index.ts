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

const compare = (left: any, right: any): boolean | undefined => {
  //LEFT O RIGHT
  if (typeof left === "number" && typeof right === "number") {
    if (left == right) return undefined;
    return left < right;
  }
  //ARRAY O ARRAY
  else if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < Math.min(left.length, right.length); i++) {
      if (compare(left[i], right[i]) != undefined) {
        return compare(left[i], right[i]);
      }
    }

    if (left.length > right.length) return false;
    if (left.length < right.length) return true;
    return undefined;
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
  data.split("\n").map((value) => {
    console.log(value);
  });
  return 2;
};

console.log(part1(data));
// console.log(part2(data));

// Timed(1, () => part1(data));
// Timed(2, () => part2(data));
