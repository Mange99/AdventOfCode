import { Timed } from "../../lib/Timed";
import { FileReader } from "../../lib/FileReader";
import { alphabetNr } from "../../lib/StringHelper";
import { posix } from "path";
import { validateHeaderValue } from "http";

const data = FileReader.readFile();

type Pos = {
  x: number;
  y: number;
  height: number;
  distance: number;
};

const pos: Pos = {
  x: 0,
  y: 0,
  height: alphabetNr("a"),
  distance: 1337,
};

const goal: Pos = {
  x: 0,
  y: 0,
  height: alphabetNr("z"),
  distance: 0,
};

const set = new Set<Pos>();

const part1 = (data: string): number => {
  data.split("\n").map((row, ri) => {
    row.split("").map((col, ci) => {
      if (col == "S") {
        pos.x = ri;
        pos.y = ci;
      }
      if (col == "E") {
        goal.x = ri;
        goal.y = ci;
        pos.distance = Math.sqrt(
          Math.pow(goal.x - pos.x, 2) +
            Math.pow(goal.y - pos.y, 2) +
            Math.pow(goal.height - pos.height, 2)
        );
      }
    });
  });

  set.add(pos);

  const data3: string[][] = data.split("\n").map((value) => value.split(""));

  for (let i = 0; i < 10; i++) {
    const up = checkDir(pos.x - 1, pos.y, data3);
    const down = checkDir(pos.x + 1, pos.y, data3);
    const east = checkDir(pos.x, pos.y + 1, data3);
    const west = checkDir(pos.x, pos.y - 1, data3);

    const arr = [up, down, east, west].sort((b, a) => b.distance - a.distance);

    let shortest: Pos = {
      x: 1337,
      y: 1337,
      height: 1337,
      distance: 1337,
    };

    for (let i = 0; i < arr.length; i++) {
      if (!set.has(arr[i])) {
        shortest = arr[i];
        break;
      }
    }

    pos.x = shortest.x;
    pos.y = shortest.y;
    pos.height = alphabetNr(data3[pos.y][pos.x]);
    pos.distance = shortest.distance;

    set.add(shortest);
    console.log(set);
  }

  return 2;
};

const checkDir = (x: number, y: number, data: string[][]): Pos => {
  if (x >= 0 && y >= 0 && x < data[0].length && y < data.length) {
    const height = alphabetNr(data[y][x]);

    if (height - pos.height < 2) {
      return {
        x: x,
        y: y,
        height: height,
        distance: Math.sqrt(
          Math.pow(goal.x - x, 2) +
            Math.pow(goal.y - y, 2) +
            Math.pow(goal.height - height, 2)
        ),
      };
    }
  }
  return pos;
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
