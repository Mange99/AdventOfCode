import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

const part1 = (data: string) => {
  return data.split("\n").reduce((prev, curr) => {
    const numberArray = curr.split("");

    let largetsNumber = 0;

    for (let i = 0; i < numberArray.length; i++) {
      for (let j = i + 1; j < numberArray.length; j++) {
        const sum = numberArray[i] + numberArray[j];
        if (Number(sum) > largetsNumber) {
          largetsNumber = Number(sum);
        }
      }
    }
    return prev + largetsNumber;
  }, 0);
};

const findLargestStarts = (arr: number[], target: number) => {
  const positions = [];

  for (let i = 0; i < arr.length; i++) {
    const lengthLeft = arr.length - i;

    if (arr[i] == target && lengthLeft >= 12) {
      positions.push(i);
    }
  }
  return positions;
};

const part2 = (data: string) => {
  return data.split("\n").reduce((prev, curr) => {
    const numberArray = curr.split("");

    let startingPositions: number[] = [];
    let startFound = false;

    let i = 9;

    while (!startFound) {
      startingPositions = findLargestStarts(
        numberArray.map((x) => Number(x)),
        i
      );

      if (startingPositions.length > 0) {
        startFound = true;
      } else {
        i--;
      }
    }

    const newPotentialArrays = startingPositions
      .map((pos) => curr.substring(pos))
      .map((x) => x.split(""));

    let solutions: string[][] = [];

    solutions = newPotentialArrays.map((potential) => {
      while (potential.length > 12) {
        const prevLength = potential.length;

        for (let i = 0; i < potential.length; i++) {
          if (
            Number(potential[i]) < Number(potential[i + 1]) &&
            potential.length > 12
          ) {
            potential.splice(i, 1);
            i = -1;
            break;
          }
        }

        if (prevLength == potential.length) {
          potential.splice(potential.length - 1, 1);
        }
      }
      return potential;
    });

    return (
      prev +
      solutions.reduce((prev, curr) => {
        return Number(curr.join("")) > prev ? Number(curr.join("")) : prev;
      }, 0)
    );
  }, 0);
};

// console.log(part1(data));
// console.log(part2(data));

Timed(1, () => part1(data));
Timed(2, () => part2(data));
