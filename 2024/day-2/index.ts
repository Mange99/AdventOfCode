import { Timed } from "../../lib/Timed";
import { FileReader } from "../../lib/FileReader";

const data = FileReader.readFile();

const part1 = (data: string) => {
  let safe = 0;

  data.split("\n").map((row) => {
    const numberRow = row.split(" ").map(Number);

    let isIncreasing = numberRow[1] > numberRow[0];

    for (let i = 1; i < numberRow.length; i++) {
      if (
        (numberRow[i] > numberRow[i - 1] && isIncreasing) ||
        (numberRow[i] < numberRow[i - 1] && !isIncreasing)
      ) {
        const diff = Math.abs(numberRow[i] - numberRow[i - 1]);

        if (diff <= 0 || diff > 3) {
          break;
        }

        if (i == row.split(" ").length - 1) {
          safe++;
        }
      } else {
        break;
      }
    }
  });
  return safe;
};

const part2 = (data: string) => {
  let safe = 0;

  data.split("\n").forEach((row) => {
    const numberRow = row.split(" ").map(Number);
    let isIncreasing = numberRow[1] > numberRow[0];
    let unsafe = 0;
    let originalRow = [...numberRow];

    for (let i = 1; i < numberRow.length; i++) {
      const diff = Math.abs(numberRow[i] - numberRow[i - 1]);

      if (
        (numberRow[i] > numberRow[i - 1] && isIncreasing) ||
        (numberRow[i] < numberRow[i - 1] && !isIncreasing)
      ) {
        if (diff <= 0 || diff > 3) {
          unsafe++;
          break;
        }
      } else {
        unsafe++;
        break;
      }

      if (i === numberRow.length - 1 && unsafe < 2) {
        safe++;
      }
    }

    if (unsafe >= 1) {
      for (let i = 0; i < originalRow.length; i++) {
        const newRow = [
          ...originalRow.slice(0, i),
          ...originalRow.slice(i + 1),
        ];

        let isIncreasing = newRow[1] > newRow[0];
        let isSafe = true;

        for (let j = 1; j < newRow.length; j++) {
          const diff = Math.abs(newRow[j] - newRow[j - 1]);

          if (
            diff < 1 ||
            diff > 3 ||
            (newRow[j] > newRow[j - 1] && !isIncreasing) ||
            (newRow[j] < newRow[j - 1] && isIncreasing)
          ) {
            isSafe = false;
            break;
          }
        }

        if (isSafe) {
          safe++;
          break;
        }
      }
    }
  });

  return safe;
};

// console.log(part1(data));
// console.log(part2(data));

Timed(1, () => part1(data));
Timed(2, () => part2(data));
