import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

const getXMas = (arr: string[][], startX: number, startY: number) => {
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [-1, -1],
    [1, -1],
    [-1, 1],
  ];

  return directions.reduce((prev, curr) => {
    let word = "";

    for (let i = 0; i < 4; i++) {
      const xPos = startX + i * curr[0];
      const yPos = startY + i * curr[1];

      if (xPos >= 0 && yPos >= 0 && xPos < arr.length && yPos < arr[0].length) {
        word += arr[xPos][yPos];
      } else {
        break;
      }

      if (word == "XMAS") {
        return prev + 1;
      }
    }
    return prev;
  }, 0);
};

const part1 = (data: string) => {
  const arr = data.split("\n").map((value) => value.split(""));
  let sum = 0;

  for (let row = 0; row <= arr.length; row++) {
    for (let col = 0; col <= arr[0].length; col++) {
      sum += getXMas(arr, row, col);
    }
  }
  return sum;
};

const xMas = (arr: string[][], dir: string): boolean => {
  if (dir === "left") {
    return (
      (arr[0][0] === "M" && arr[1][1] === "A" && arr[2][2] === "S") ||
      (arr[0][0] === "S" && arr[1][1] === "A" && arr[2][2] === "M")
    );
  } else if (dir === "right") {
    return (
      (arr[0][2] === "M" && arr[1][1] === "A" && arr[2][0] === "S") ||
      (arr[0][2] === "S" && arr[1][1] === "A" && arr[2][0] === "M")
    );
  }
  return false;
};

const part2 = (data: string) => {
  const arr = data.split("\n").map((value) => value.split(""));
  let sum = 0;

  for (let row = 0; row <= arr.length - 3; row++) {
    for (let col = 0; col <= arr[0].length - 3; col++) {
      const subArr = arr.slice(row, row + 3).map((r) => r.slice(col, col + 3));
      if (xMas(subArr, "left") && xMas(subArr, "right")) {
        sum += 1;
      }
    }
  }
  return sum;
};

Timed(1, () => part1(data));
Timed(2, () => part2(data));
