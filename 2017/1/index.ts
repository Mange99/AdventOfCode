import { FileReader } from "../../lib/FileReader";

const data = FileReader.readFileAsInt("");

const part1 = (): number => {
  let sum = 0;

  for (let i = 0; i < data.length - 1; i++) {
    if (data[i] == data[i + 1]) {
      sum += data[i];
    }
  }
  if (data[data.length - 1] == data[0]) sum += data[0];

  return sum;
};

const part2 = (): number => {
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    let step = data.length / 2 + i;

    if (step > data.length - 1) step -= data.length;

    if (data[i] == data[step]) {
      sum += data[step];
    }
  }

  return sum;
};

console.log(part1());
console.log(part2());
