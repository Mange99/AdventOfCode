import { log } from "console";
import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

const part1 = (data: string) => {
  return data
    .split("\n")
    .map((input, i) => {
      input.replace(",", "").replace(":", "");
      const rounds = input.split(";");

      let maxValues = { id: 0, maxRed: 0, maxGreen: 0, maxBlue: 0 };

      maxValues.id = Number(rounds[0].split(":")[0].split(" ")[1]);
      rounds[0].slice(0, 1);

      rounds.forEach((round) => {
        let newMax = { id: 0, maxRed: 0, maxGreen: 0, maxBlue: 0 };
        const arr = round.split(" ").filter((value) => value !== "");

        for (let i = 0; i < arr.length; i += 2) {
          const num = Number(arr[i]);
          const color = arr[i + 1];
          if (color.includes("blue")) newMax.maxBlue += num;
          else if (color.includes("red")) newMax.maxRed += num;
          else if (color.includes("green")) newMax.maxGreen += num;
        }

        maxValues = {
          id: maxValues.id,
          maxRed: Math.max(maxValues.maxRed, newMax.maxRed),
          maxGreen: Math.max(maxValues.maxGreen, newMax.maxGreen),
          maxBlue: Math.max(maxValues.maxBlue, newMax.maxBlue),
        };
      });

      return maxValues;
    })
    .reduce(
      (prev, curr) =>
        curr.maxRed > 12 || curr.maxGreen > 13 || curr.maxBlue > 14
          ? prev
          : prev + curr.id,
      0
    );
};

const part2 = (data: string) => {
  return data
    .split("\n")
    .map((input) => {
      input.replace(",", "");
      input.replace(":", "");

      const rounds = input.split(";");
      let minValues = { minRed: 0, minGreen: 0, minBlue: 0 };

      rounds.forEach((round) => {
        let newMin = { minRed: 0, minGreen: 0, minBlue: 0 };

        const arr = round.split(" ").filter((value) => value !== "");

        for (let i = 0; i < arr.length; i += 2) {
          const num = Number(arr[i]);
          const color = arr[i + 1];
          if (color.includes("blue")) newMin.minBlue += num;
          else if (color.includes("red")) newMin.minRed += num;
          else if (color.includes("green")) newMin.minGreen += num;
        }
        minValues = {
          minRed: Math.max(minValues.minRed, newMin.minRed),
          minGreen: Math.max(minValues.minGreen, newMin.minGreen),
          minBlue: Math.max(minValues.minBlue, newMin.minBlue),
        };
      });
      return minValues;
    })
    .reduce(
      (prev, curr) => prev + curr.minBlue * curr.minGreen * curr.minRed,
      0
    );
};

//2810
Timed(1, () => part1(data));
//69110
Timed(2, () => part2(data));
