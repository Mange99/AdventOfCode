import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

const part1 = (data: string) => {
  let initialValue = 50;
  let zero = 0;

  data.split("\n").forEach((row) => {
    const dir = row.substring(0, 1);
    const value = Number(row.substring(1));

    if (dir == "R") {
      initialValue += value;

      while (initialValue > 99) {
        initialValue -= 100;
      }
    } else if (dir == "L") {
      initialValue -= value;

      while (initialValue < 0) {
        initialValue += 100;
      }
    }

    if (initialValue == 0) {
      zero++;
    }
  });
  return zero;
};

const part2 = (data: string) => {
  let initialValue = 50;
  let zero = 0;

  data.split("\n").forEach((row) => {
    const dir = row.substring(0, 1);
    const value = Number(row.substring(1));

    if (dir == "R") {
      for (let i = 0; i < value; i++) {
        initialValue++;

        if (initialValue > 99) {
          initialValue = 0;
        }
        if (initialValue == 0) {
          zero++;
        }
      }
    } else if (dir == "L") {
      for (let i = 0; i < value; i++) {
        initialValue--;

        if (initialValue < 0) {
          initialValue = 99;
        }

        if (initialValue == 0) {
          zero++;
        }
      }
    }
  });
  return zero;
};

Timed(1, () => part1(data));
Timed(2, () => part2(data));
