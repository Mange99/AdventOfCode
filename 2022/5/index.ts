import { transpose } from "../../lib/ArrayHelper";
import { FileReader } from "../../lib/FileReader";
import { regExMove } from "../../lib/StringHelper";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

const part1 = (data: string): string => {
  const stack = data.split("\n\n");
  const arr: string[][] = stack[0].split("\n").map((value) => value.split(" "));

  const move = stack[1].split("move").filter((value) => value.length);
  const transposed = transpose(arr).map((value) =>
    value.reverse().filter((value) => value != "")
  );

  move.forEach((value) => {
    const [many, from, to] = regExMove(value);
    for (let i = 0; i < many; i++) {
      transposed[to - 1].push(transposed[from - 1].pop() ?? "");
    }
  });
  return transposed
    .flatMap((row) =>
      row.filter((value, i) => {
        if (i == row.length - 1) return value;
      })
    )
    .toString()
    .replace(/[\[\]']+/g, "")
    .replace(/\,+/g, "");
};
const part2 = (data: string): string => {
  const stack = data.split("\n\n");

  const arr: string[][] = stack[0].split("\n").map((value) => value.split(" "));

  const move = stack[1].split("move").filter((value) => value.length);

  const transposed = transpose(arr).map((value) =>
    value.reverse().filter((value) => value != "")
  );

  move.forEach((value) => {
    const [many, from, to] = regExMove(value);
    let temp: string[] = [];
    for (let i = 0; i < many; i++) {
      temp.push(transposed[from - 1].pop() ?? "");
    }
    for (let i = 0; i < many; i++) {
      transposed[to - 1].push(temp.pop() ?? "");
    }
  });
  return transposed
    .flatMap((row) =>
      row.filter((value, i) => {
        if (i == row.length - 1) return value;
      })
    )
    .toString()
    .replace(/[\[\]']+/g, "")
    .replace(/\,+/g, "");
};

Timed(1, () => part1(data));
Timed(2, () => part2(data));
