import { transpose } from "./../../lib/ArrayHelper";
import { log } from "console";
import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

const part1 = (data: string) => {
  const grid = data.split("\n").map((line) => line.split(""));

  const empty_rows = getEmptyRows(grid);

  const empty_col = getEmptyRows(transpose(grid));

  let alreadyAdded = 0;
  empty_rows.forEach((rowIndex) => {
    const newRow = new Array(grid[0].length).fill(".");
    grid.splice(rowIndex + 1 + alreadyAdded, 0, newRow);
    alreadyAdded++;
  });

  alreadyAdded = 0;
  empty_col.forEach((colIndex) => {
    grid.forEach((row) => {
      row.splice(colIndex + 1 + alreadyAdded, 0, ".");
    });
    alreadyAdded++;
  });

  const galaxies = getPairs(grid);

  let totalDistance = 0;

  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      totalDistance += manhattanDistance(
        galaxies[i][0],
        galaxies[j][0],
        galaxies[i][1],
        galaxies[j][1]
      );
    }
  }

  return totalDistance;
};

const getPairs = (grid: string[][]) => {
  const galaxies: number[][] = [];

  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === "#") {
        galaxies.push([x, y]);
      }
    });
  });

  return galaxies;
};

const manhattanDistance = (x1: number, x2: number, y1: number, y2: number) => {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
};
const manhattanDistanceV2 = (
  pos_1: number,
  pos_2: number,
  empty_positions: number[]
) => {
  let length = Math.abs(pos_1 - pos_2);

  if (empty_positions)
    empty_positions.forEach((value) => {
      if (
        (value < pos_1 && value >= pos_2) ||
        (value < pos_2 && value >= pos_1)
      )
        length += 999999;
    });
  return length;
};

const getEmptyRows = (grid: string[][]) => {
  return grid
    .map((value, i) => (value.every((value) => value == ".") ? i : -1))
    .filter((value) => value != -1);
};

const part2 = (data: string) => {
  const grid = data.split("\n").map((line) => line.split(""));

  const empty_rows = getEmptyRows(grid);

  const empty_col = getEmptyRows(transpose(grid));

  const galaxies = getPairs(grid);

  let totalDistance = 0;
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      const x = manhattanDistanceV2(galaxies[i][0], galaxies[j][0], empty_col);
      const y = manhattanDistanceV2(galaxies[i][1], galaxies[j][1], empty_rows);
      totalDistance += x + y;
    }
  }
  return totalDistance;
};
console.log(part1(data));
console.log(part2(data));

// Timed(1, () => part1(data));
// Timed(2, () => part2(data));
