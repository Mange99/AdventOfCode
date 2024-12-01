import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

const part1 = (data: string) => {
  const [firstSet, secondSet] = getSortedLists(data);

  return firstSet.reduce((prev, curr, i) => {
    return prev + Math.abs(curr - secondSet[i]);
  }, 0);
};

const part2 = (data: string) => {
  const [firstSet, secondSet] = getSortedLists(data);

  let sum = 0;

  for (let i = 0; i < firstSet.length; i++) {
    let appears = 0;

    for (let j = 0; j < secondSet.length; j++) {
      if (secondSet[j] == firstSet[i]) {
        appears++;
      }
    }

    sum += firstSet[i] * appears;
  }

  return sum;
};

const getSortedLists = (data: string) => {
  const firstSet: number[] = [];
  const secondSet: number[] = [];

  data.split("\n").map((row) => {
    const [left, right] = row.split("  ").map(Number);
    firstSet.push(left);
    secondSet.push(right);
  });

  firstSet.sort();
  secondSet.sort();

  return [firstSet, secondSet];
};

Timed(1, () => part1(data));
Timed(2, () => part2(data));
