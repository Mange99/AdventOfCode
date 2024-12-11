import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

interface Direction {
  row: number;
  col: number;
}

const getNewDirection = (
  matrix: string[][],
  guardPosition: Direction,
  currentDirection: Direction
) => {
  if (
    matrix[guardPosition.row - 1][guardPosition.col] == "#" &&
    currentDirection.row == -1
  ) {
    return { row: 0, col: 1 };
  } else if (
    matrix[guardPosition.row][guardPosition.col + 1] == "#" &&
    currentDirection.col == 1
  ) {
    return { row: 1, col: 0 };
  } else if (
    matrix[guardPosition.row][guardPosition.col - 1] == "#" &&
    currentDirection.col == -1
  ) {
    return { row: -1, col: 0 };
  } else if (
    matrix[guardPosition.row + 1][guardPosition.col] == "#" &&
    currentDirection.row == 1
  ) {
    return { row: 0, col: -1 };
  } else {
    return currentDirection;
  }
};

const validStep = (
  matrix: string[][],
  guardPosition: Direction,
  dir: Direction
) => {
  if (
    (guardPosition.row == matrix.length - 1 && dir.row == 1) ||
    (guardPosition.row == 0 && dir.row == -1) ||
    (guardPosition.col == matrix[0].length - 1 && dir.col == 1) ||
    (guardPosition.col == 0 && dir.col == -1)
  )
    return false;
  return true;
};

const part1 = (data: string) => {
  let guardPosition: Direction = { row: 0, col: 0 };

  const matrix = data.split("\n").map((row, i) => {
    const test = row.split("");
    const pos = test.indexOf("^");

    if (pos != -1) guardPosition = { row: i, col: pos };
    return test;
  });

  let guardOnMap = true;

  let dir: Direction = { row: -1, col: 0 };
  const visited = new Set<string>();

  while (guardOnMap) {
    visited.add(`${guardPosition.row},${guardPosition.col}`);

    if (!validStep(matrix, guardPosition, dir)) {
      guardOnMap = false;
      break;
    }
    dir = getNewDirection(matrix, guardPosition, dir);

    guardPosition = {
      row: (guardPosition.row += 1 * dir.row),
      col: (guardPosition.col += 1 * dir.col),
    };
  }
  return visited.size;
};

const part2 = (data: string) => {
  data.split("\n\n").map((value) => {
    console.log(value);
  });
};

console.log(part1(data));
// console.log(part2(data));

// Timed(1, () => part1(data));
// Timed(2, () => part2(data));
