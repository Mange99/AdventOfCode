import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

const part1 = (data: string): number => {
  let count = 0;
  let matrix: number[][] = [];
  const data2 = data.split("\n");

  data2.map((value) => {
    let arr = value.split("").map(Number);
    matrix.push(arr);
  });
  count += 2 * (matrix.length - 2) + 2 * matrix[0].length;

  for (let i = 1; i < matrix.length - 1; i++) {
    for (let j = 1; j < matrix[0].length - 1; j++) {
      if (isVisible(matrix, i, j)) count++;
    }
  }

  return count;
};

const isVisible = (matrix: number[][], x: number, y: number) => {
  let visible = true;

  //Check NORTH
  for (let i = x; i > 0; i--) {
    const elem = matrix[i - 1][y];
    if (matrix[x][y] <= elem) {
      visible = false;
      break;
    } else if (i == 1) visible = true;
  }
  //CHECK SOUTH
  if (!visible)
    for (let i = x + 1; i < matrix.length; i++) {
      const elem = matrix[i][y];
      if (matrix[x][y] <= elem) {
        visible = false;
        break;
      } else if (i == matrix[0].length - 1) visible = true;
    }
  //CHECK WESTY
  if (!visible)
    for (let i = y; i > 0; i--) {
      const elem = matrix[x][i - 1];
      if (matrix[x][y] <= elem) {
        visible = false;
        break;
      } else if (i == 1) visible = true;
    }

  //CHECK EAST
  if (!visible)
    for (let i = y + 1; i < matrix[0].length; i++) {
      const elem = matrix[x][i];
      if (matrix[x][y] <= elem) {
        visible = false;
        break;
      } else if (i == matrix.length - 1) {
        visible = true;
      }
    }

  return visible;
};
const distance = (matrix: number[][], x: number, y: number) => {
  let north = 0;
  let south = 0;
  let east = 0;
  let west = 0;

  //CHECK NORTH
  for (let i = x; i > 0; i--) {
    const elem = matrix[i - 1][y];
    north += 1;
    if (matrix[x][y] <= elem) break;
  }
  //CHECK SOUTH
  for (let i = x + 1; i < matrix.length; i++) {
    const elem = matrix[i][y];
    south += 1;
    if (matrix[x][y] <= elem) break;
  }
  //CHECK WESTY
  for (let i = y; i > 0; i--) {
    const elem = matrix[x][i - 1];
    west += 1;
    if (matrix[x][y] <= elem) break;
  }
  //CHECK EAST
  for (let i = y + 1; i < matrix[0].length; i++) {
    const elem = matrix[x][i];
    east += 1;
    if (matrix[x][y] <= elem) break;
  }

  return north * east * west * south;
};

const part2 = (data: string): number => {
  let max = 0;
  let matrix: number[][] = [];
  const data2 = data.split("\n");

  data2.map((value) => {
    let arr = value.split("").map(Number);
    matrix.push(arr);
  });

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      max = Math.max(max, distance(matrix, i, j));
    }
  }
  return max;
};

Timed(1, () => part1(data));
Timed(2, () => part2(data));
