import { stringify } from "querystring";
import { FileReader } from "../../lib/FileReader";

const data = FileReader.readFile();

let [two, three] = [0, 0];

const part1 = (data: string): number => {
  data.split("\n").forEach((value) => searchXd(value.toString()));

  return two * three;
};

const searchXd = (value: string) => {
  let myMap = new Map<string, number>();
  let [nrTwo, nrThree] = [false, false];

  value.split("").map((value) => {
    if (myMap.has(value)) myMap.set(value, Number(myMap.get(value)) + 1);
    else myMap.set(value, 1);
  });

  myMap.forEach((value) => {
    if (value == 2) nrTwo = true;
    if (value == 3) nrThree = true;
  });

  if (nrTwo) two++;
  if (nrThree) three++;
};

console.log(part1(data));
