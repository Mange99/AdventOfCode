import { leastCommonMultiple } from "./../../lib/MathCalcs";
import { isReadable } from "stream";
import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";
import { info, log } from "console";

const data = FileReader.readFile();

const part1 = (data: string) => {
  const [instructions, destination] = data.split("\n\n");

  const infoArr = instructions.split("");
  const destArr = destination.split("\n");

  let start: string[] = [];
  let RL: string[] = [];

  for (let i = 0; i < destArr.length; i++) {
    start.push(destArr[i].split(" = ")[0]);
    RL.push(destArr[i].split(" = ")[1].replace("(", "").replace(")", ""));
  }

  let run = 0;
  let currIndex = start.findIndex((x) => x === "AAA");
  let target = "AAA";

  while (target != "ZZZ") {
    const [left, right] = RL[currIndex].split(", ");

    if (infoArr[run % infoArr.length] === "R") {
      target = right;
    } else {
      target = left;
    }
    currIndex = start.indexOf(target);

    run++;
  }

  return run;
};
const part2 = (data: string) => {
  const [instructions, destination] = data.split("\n\n");
  const infoArr = instructions.split("");
  const destArr = destination.split("\n");

  let start: string[] = [];
  let RL: string[] = [];

  for (let i = 0; i < destArr.length; i++) {
    start.push(destArr[i].split(" = ")[0]);
    RL.push(destArr[i].split(" = ")[1].replace("(", "").replace(")", ""));
  }

  let currIndexes: number[] = start.reduce((acc: number[], node, index) => {
    if (node.endsWith("A")) acc.push(index);
    return acc;
  }, []);

  let x = currIndexes.map((currIndex) => {
    let target = start[currIndex];
    let run = 0;

    while (!target.endsWith("Z")) {
      const [left, right] = RL[currIndex].split(", ");

      if (infoArr[run % infoArr.length] === "R") {
        target = right;
      } else {
        target = left;
      }

      currIndex = start.indexOf(target);
      run++;
    }

    return run;
  });

  return x.reduce((prev, curr) => leastCommonMultiple(prev, curr), 1);
};

console.log(part1(data));
console.log(part2(data));

// Timed(1, () => part1(data));
// Timed(2, () => part2(data));
