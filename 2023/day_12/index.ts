import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

const part1 = (data: string) => {
  const rows = data.split("n");

  rows.map((row) => {
    row == "#" ? true : false; //# . ?
  });
};

const part2 = (data: string) => {
  data.split("\n\n").map((value) => {
    console.log(value);
  });
};

console.log(part1(data));
console.log(part2(data));

// Timed(1, () => part1(data));
// Timed(2, () => part2(data));
