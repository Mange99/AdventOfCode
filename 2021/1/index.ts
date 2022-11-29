const file = "./input.txt";
import { FileReader } from "../../lib/FileReader";

let total = 0;

FileReader.readFileAsInt("\n").reduce((prev, curr) => {
  if (prev < curr) {
    total += 1;
  }
  return curr;
});

console.log(total);
