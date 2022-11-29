import { FileReader } from "../../lib/FileReader";

const data = FileReader.readFile(", ");
let pos = [0, 0];
let i = 0;
const facing = ["N", "E", "S", "W"];

const go = (steps: number) => {
  switch (facing[i]) {
    case "N":
      pos[0] += steps;
      break;
    case "S":
      pos[0] -= steps;
      break;
    case "E":
      pos[1] += steps;
      break;
    case "W":
      pos[1] -= steps;
      break;
    default:
      break;
  }
};

const part1 = (): number => {
  data.forEach((value) => {
    const dir = value.substring(0, 1);
    const steps = Number(value.substring(1));

    if (dir == "R") i < 3 ? i++ : (i = 0);
    if (dir == "L") i > 0 ? i-- : (i = 3);

    go(steps);
  });

  return Math.abs(pos[0]) + Math.abs(pos[1]);
};
const cashed: number[] = [];

//mlg
const part2 = () => console.log(data.length);

part2();
