import { removeThreeInARow, transpose } from "../../lib/ArrayHelper";
import { FileReader } from "../../lib/FileReader";
import { regExMove } from "../../lib/StringHelper";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

const part1 = (data: string): string => {
  const [creates, instructions] = data.split("\n\n");

  const trimmedCreates = creates
    .split("\n")
    .map((row) => removeThreeInARow(row.split(" "), ""));

  const transponateCrates = transpose(trimmedCreates).map((value) =>
    value.reverse().filter((value) => value != "")
  );

  instructions.split("\n").forEach((value) => {
    const [many, from, to] = regExMove(value);

    for (let i = 0; i < many; i++) {
      transponateCrates[to - 1].push(transponateCrates[from - 1].pop() ?? "");
    }
  });
  return transponateCrates
    .map((x) => x[x.length - 1].replace(/[\[\]']|\,+/g, ""))
    .join("");
};

const part2 = (data: string): string => {
  const [creates, instructions] = data.split("\n\n");

  const trimmedCreates = creates
    .split("\n")
    .map((row) => removeThreeInARow(row.split(" "), ""));

  const transponateCrates = transpose(trimmedCreates).map((value) =>
    value.reverse().filter((value) => value != "")
  );

  instructions.split("\n").forEach((value) => {
    const [many, from, to] = regExMove(value);
    let temp: string[] = [];

    for (let i = 0; i < many; i++) {
      temp.push(transponateCrates[from - 1].pop() ?? "");
    }
    for (let i = 0; i < many; i++) {
      transponateCrates[to - 1].push(temp.pop() ?? "");
    }
  });
  return transponateCrates
    .map((x) => x[x.length - 1].replace(/[\[\]']|\,+/g, ""))
    .join("");
};

Timed(1, () => part1(data));
Timed(2, () => part2(data));
