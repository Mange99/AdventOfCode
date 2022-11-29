const file = "./input.txt";
import { DataHandling } from "../DataHandling";

let total = 0;

DataHandling.readFileAsInt(__dirname, file).reduce((prev, curr) => {
  if (prev < curr) {
    total += 1;
  }
  return curr;
});

console.log(total);
