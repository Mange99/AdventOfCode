import { FileReader } from "../../lib/FileReader";

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
  const rows = matrix.length;
  const cols = matrix[0].length;

  if (
    guardPosition.row - 1 >= 0 &&
    matrix[guardPosition.row - 1][guardPosition.col] === "#" &&
    currentDirection.row === -1
  ) {
    return { row: 0, col: 1 };
  } else if (
    guardPosition.col + 1 < cols &&
    matrix[guardPosition.row][guardPosition.col + 1] === "#" &&
    currentDirection.col === 1
  ) {
    return { row: 1, col: 0 };
  } else if (
    guardPosition.col - 1 >= 0 &&
    matrix[guardPosition.row][guardPosition.col - 1] === "#" &&
    currentDirection.col === -1
  ) {
    return { row: -1, col: 0 };
  } else if (
    guardPosition.row + 1 < rows &&
    matrix[guardPosition.row + 1][guardPosition.col] === "#" &&
    currentDirection.row === 1
  ) {
    return { row: 0, col: -1 };
  } else {
    return currentDirection;
  }
};

const invalidStep = (
  matrix: string[][],
  position: Direction,
  direction: Direction
) => {
  const rows = matrix.length;
  const cols = matrix[0].length;

  const nextRow = position.row + direction.row;
  const nextCol = position.col + direction.col;

  return nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols;
};

const getStartPosAndMap = (data: string) => {
  const position: Direction = { row: 0, col: 0 };

  const matrix = data.split("\n").map((row, i) => {
    const values = row.split("");

    const bandit = values.indexOf("^");

    if (bandit != -1) {
      position.row = i;
      position.col = bandit;
    }
    return values;
  });
  return { matrix, position };
};

const part1 = (data: string) => {
  const visited = new Set<string>();
  let { matrix, position } = getStartPosAndMap(data);

  let isRunning = true;

  let dir: Direction = { row: -1, col: 0 };

  while (isRunning) {
    visited.add(`${position.row},${position.col}`);

    dir = getNewDirection(matrix, position, dir);

    if (invalidStep(matrix, position, dir)) {
      isRunning = false;
      break;
    }

    position = {
      row: position.row + dir.row,
      col: position.col + dir.col,
    };
  }

  return visited;
};

const createsLoop = (
  matrix: string[][],
  startPos: Direction,
  startDir: Direction
) => {
  const visitedStates = new Set<string>();

  for (let i = 0; i < 10000; i++) {
    if (invalidStep(matrix, startPos, startDir)) {
      return false;
    }

    const state = `${startPos.row},${startPos.col},${startDir.row},${startDir.col}`;
    visitedStates.add(state);

    if (visitedStates.has(state)) {
      return true;
    }

    startDir = getNewDirection(matrix, startPos, startDir);

    startPos = {
      row: startPos.row + startDir.row,
      col: startPos.col + startDir.col,
    };
  }

  return false;
};

const part2 = (data: string, visited: Set<string>) => {
  const { matrix, position: startPos } = getStartPosAndMap(data);
  let steps = 0;
  const initialDir = { row: -1, col: 0 };

  visited.forEach((pos) => {
    const [row, col] = pos.split(",").map(Number);
    if (
      matrix[row][col] === "#" ||
      (row === startPos.row && col === startPos.col)
    ) {
      return;
    }

    const testMatrix = matrix.map((line) => [...line]);
    testMatrix[row][col] = "#";

    if (createsLoop(testMatrix, startPos, initialDir)) {
      steps++;
    }
  });

  return steps;
};

const visited = part1(data);
console.log(visited.size);

console.log(part2(data, visited));
//console.log(part1(data));

// Timed(1, () => part1(data));
// Timed(2, () => part2(data));
