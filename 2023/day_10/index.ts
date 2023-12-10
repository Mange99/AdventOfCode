import { log } from "console";
import { FileReader } from "../../lib/FileReader";

const data = FileReader.readFile();

type PipeCharacter = "|" | "-" | "L" | "J" | "7" | "F" | "S";
type Direction = "N" | "E" | "S" | "W";

type ValidChars = {
  [key in Direction]: { [key in PipeCharacter]?: boolean };
};

type ValidDir = {
  [key in PipeCharacter]: { [key in Direction]?: boolean };
};

const part1 = (data: string) => {
  const grid = data.split("\n").map((line) => line.split(""));

  let startRow = 0;
  let startCol = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === "S") {
        startRow = row;
        startCol = col;
        break;
      }
    }
  }

  const directions: Direction[] = ["N", "E", "S", "W"];

  const validCharacters: ValidChars = {
    N: { "|": true, L: true, J: true, S: true },
    E: { "-": true, L: true, F: true, S: true },
    S: { "|": true, "7": true, F: true, S: true },
    W: { "-": true, J: true, "7": true, S: true },
  };

  const validDirections: ValidDir = {
    "|": { N: true, S: true },
    "-": { E: true, W: true },
    L: { S: true, W: true },
    J: { E: true, S: true },
    "7": { N: true, E: true },
    F: { N: true, W: true },
    S: { N: true, E: true, S: true, W: true },
  };

  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];

  const pipChar = (char: string): char is PipeCharacter => {
    return ["|", "-", "L", "J", "7", "F", "S"].includes(char);
  };

  let maxDistance = 0;
  const visited = new Set();

  const queue = [{ row: startRow, col: startCol, distance: 0 }];

  while (queue.length > 0) {
    const { row, col, distance } = queue.shift() ?? {
      row: 0,
      col: 0,
      distance: 0,
    };

    if (visited.has(`${row}-${col}`)) continue;
    visited.add(`${row}-${col}`);

    maxDistance = Math.max(maxDistance, distance);

    for (let i = 0; i < dx.length; i++) {
      const newRow = row + dx[i];
      const newCol = col + dy[i];
      const direction = directions[i];

      if (
        newRow >= 0 &&
        newRow < grid.length &&
        newCol >= 0 &&
        newCol < grid[newRow].length &&
        !visited.has(`${newRow}-${newCol}`)
      ) {
        const fromCell = grid[row][col];
        const toCell = grid[newRow][newCol];

        if (
          pipChar(fromCell) &&
          pipChar(toCell) &&
          validCharacters[direction][fromCell] &&
          validDirections[toCell][direction]
        ) {
          queue.push({ row: newRow, col: newCol, distance: distance + 1 });
        }
      }
    }
  }

  return maxDistance;
};

const part2 = (data: string) => {
  const lines = data.split("\n");
  const grid = lines.map((line) => line.split(""));

  const visited = new Set<number[]>();

  const replaceDot = (dot: number[]) => {
    let stack = [dot];

    while (stack.length > 0) {
      const [currentRow, currentCol] = stack.pop() ?? [-1, -1];

      if (currentRow == -1 || visited.has([currentRow, currentCol])) {
        continue;
      }

      if (grid[currentRow][currentCol] !== ".") continue;

      visited.add([currentRow, currentCol]);
      grid[currentRow][currentCol] = "O";

      if (currentRow + 1 < grid.length)
        stack.push([currentRow + 1, currentCol]);
      if (currentRow - 1 >= 0) stack.push([currentRow - 1, currentCol]);
      if (currentCol + 1 < grid[0].length)
        stack.push([currentRow, currentCol + 1]);
      if (currentCol - 1 >= 0) stack.push([currentRow, currentCol - 1]);
    }
  };

  let fill: number[][] = [];

  for (let row = 0; row < grid.length; row++) {
    fill.push([row, 0], [row, grid[0].length - 1]);
  }
  for (let col = 0; col < grid[0].length; col++) {
    fill.push([0, col], [grid.length - 1, col]);
  }

  fill.forEach(replaceDot);

  let tiles = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === ".") {
        tiles++;
      }
    }
  }

  return tiles;
};

log(part1(data));
console.log(part2(data));

// Timed(1, () => part1(data));
// Timed(2, () => part2(data));
