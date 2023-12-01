import { Timed } from "../../lib/Timed";
import { FileReader } from "../../lib/FileReader";

const data = FileReader.readFile();

/*
  --------Integer-------

  data.split("\n").map(Number).map((value) => {
    console.log(value);
  });

  -------String---------
  data.split("\n").map((value) => {
    console.log(value);
  });

*/

const part1 = (data: string): number => {
  return 2;
};

const part2 = (data: string): number => {
  return 2;
};

console.log(part1(data));
// console.log(part2(data));

// Timed(1, () => part1(data));
// Timed(2, () => part2(data));
