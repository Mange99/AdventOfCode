import { log } from "console";
import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();
let currentId = 0;

const part1 = (data: string) => {
  return data
    .split("\n")
    .map((input, i) => {
      input.replace(",", "");
      input.replace(":", "");

      const rounds = input.split(";");

      let maxValues = { id: 0, maxRed: 0, maxGreen: 0, maxBlue: 0 };

      rounds.forEach((round) => {
        let newMax = { id: 0, maxRed: 0, maxGreen: 0, maxBlue: 0 };

        const arr = round.split(" ").filter((value) => value !== "");

        if (arr[0] == "Game") {
          maxValues.id = Number(arr[1].replace(":", ""));
        }
        for (let i = 0; i < arr.length; i += 2) {
          const num = Number(arr[i]);
          const color = arr[i + 1];
          if (color.includes("blue")) newMax.maxRed += num;
          else if (color.includes("red")) newMax.maxGreen += num;
          else if (color.includes("green")) newMax.maxBlue += num;
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
    .reduce((prev, curr) => {
      if (curr.maxBlue > 12 || curr.maxGreen > 13 || curr.maxRed > 14) {
        return 0;
      }
      return prev + curr.id;
    }, 0);

  //   const x = round.map((value, r) => {
  //     const arr = value.split(" ").filter((value) => value !== "");
  //     let redCount = 0;
  //     let greenCount = 0;
  //     let blueCount = 0;

  //     if (r == 0) {
  //       const game = arr.slice(1, 2);
  //       if (r == 0) currentId = Number(game[0].replace(":", ""));
  //       arr.splice(0, 2);
  //     }

  //     for (let i = 0; i < arr.length - 1; i += 2) {
  //       const num = Number(arr[i]);
  //       const color = arr[i + 1];
  //       if (color.includes("blue")) {
  //         blueCount += num;
  //       } else if (color.includes("red")) {
  //         redCount += num;
  //       } else if (color.includes("green")) {
  //         greenCount += num;
  //       }
  //     }

  //     if (redCount > 12 || greenCount > 13 || blueCount > 14) {
  //       return 0;
  //     }
  //     return currentId;
  //   });
  //   return x;
  // });
  // const filteredArray = y.filter((arr) => !arr.includes(0));

  // return filteredArray.reduce((prev, curr) => prev + Number(curr[0]), 0);
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

log(part1(data));
//2810
// Timed(1, () => part1(data));
//69110
// Timed(2, () => part2(data));
