import { isReadable } from "stream";
import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

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

      currIndex = start.indexOf(right);
    } else {
      target = left;

      currIndex = start.indexOf(left);
    }

    run++;
  }

  return run;
};

const part2 = (data: string) => {
  data.split("\n\n").map((value) => {
    console.log(value);
  });
};

console.log(part1(data));

// Timed(1, () => part1(data));
// Timed(2, () => part2(data));
