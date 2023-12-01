export const transpose = (matrix: string[][]) => {
  return matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
};

export const removeThreeInARow = (arr: string[], element: string) => {
  let temp: string[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == element && arr[i] == arr[i + 1] && arr[i] == arr[i + 2]) {
      i += 3;
    }
    temp.push(arr[i]);
  }
  return temp;
};

export const containsDuplicates = (array: string[]): boolean => {
  if (array.length !== new Set(array).size) {
    return true;
  }
  return false;
};
