import { DataHandling } from "../DataHandling";

const data = DataHandling.readFile(__dirname, "input.txt");
let pos = [0, 0];
let aim = 0;

const problem1 = () => {
  data.map((row) => {
    const x = Number(row.split(" ")[1]);

    if (row.startsWith("f")) pos[0] += x;
    else if (row.startsWith("d")) pos[1] += x;
    else pos[1] -= x;
  });
  return pos[0] * pos[1];
};

const problem2 = () => {
  data.map((row) => {
    const x = Number(row.split(" ")[1]);

    if (row.startsWith("f")) {
      pos[0] += x;
      pos[1] += x * aim;
    } else if (row.startsWith("d")) {
      aim += x;
    } else {
      aim -= x;
    }
  });
  return pos[0] * pos[1];
};

console.log(problem2());
