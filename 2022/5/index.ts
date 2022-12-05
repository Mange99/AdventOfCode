import { readFileSync } from "fs";
import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

// const data = FileReader.readFile();
const data2 = readFileSync("./input.txt", "utf-8");

const part1 = (data: string): number => {
  let stack = data.split("\n\n");

  const arr: string[][] = stack[0].split("\n").map((value) => value.split(" "));

  const move = stack[1].split("move").filter((value) => value.length);

  let transposed = transpose(arr).map((value) => value.reverse());

  transposed = transposed.map((row) => row.filter((value) => value != ""));

  move.map((value) => {
    const many = Number(value.substring(1, value.indexOf("from")));
    const from = Number(
      value.substring(value.indexOf("from") + 4, value.indexOf("to"))
    );

    for (let i = 0; i < many; i++) {
      const to = Number(value.substring(value.indexOf("to") + 2));

      const x = transposed[from - 1].pop();

      if (x) transposed[to - 1].push(x);
    }
  });
  transposed.map((value) => {
    console.log(value[value.length - 1]);
  });

  return 0;
};
const part2 = (data: string): number => {
  let stack = data.split("\n\n");

  const arr: string[][] = stack[0].split("\n").map((value) => value.split(" "));

  const move = stack[1].split("move").filter((value) => value.length);

  let transposed = transpose(arr).map((value) => value.reverse());

  transposed = transposed.map((row) => row.filter((value) => value != ""));

  move.map((value) => {
    const many = Number(value.substring(1, value.indexOf("from")));
    const from = Number(
      value.substring(value.indexOf("from") + 4, value.indexOf("to"))
    );
    const to = Number(value.substring(value.indexOf("to") + 2));

    let temp: string[] = [];

    for (let i = 0; i < many; i++) {
      const x = transposed[from - 1].pop();
      if (x) temp.push(x);
    }
    for (let i = 0; i < many; i++) {
      const x = temp.pop();
      if (x) transposed[to - 1].push(x);
    }
  });
  transposed.map((value) => {
    console.log(value[value.length - 1]);
  });

  return 0;
};

function transpose(matrix: string[][]) {
  return matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
}

// console.log(part1(data2));
console.log(part2(data2));

// Timed(1, () => part1(data));
// Timed(2, () => part2(data));
