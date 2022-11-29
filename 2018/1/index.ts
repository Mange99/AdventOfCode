import { FileReader } from "../../lib/FileReader";

const data = FileReader.readFile("\n");

const part1 = (): number =>
  data.reduce((prev, curr) => {
    const sign = curr.toString().substring(0, 1);
    const number = Number(curr.toString().substring(1));

    if (sign == "+") return prev + number;
    else return prev - number;
  }, 0);

const part2 = (): number => {
  const cashed: number[] = [0];
  let isRunnin = true;
  let frequency = 0;

  while (isRunnin) {
    for (let i = 0; i < data.length; i++) {
      const sign = data[i].toString().substring(0, 1);
      const number = Number(data[i].toString().substring(1));

      if (sign == "+") frequency += number;
      else frequency -= number;

      if (cashed.includes(frequency)) {
        return frequency;
      } else {
        cashed.push(frequency);
      }
    }
  }
  return -1;
};

console.log(part1());
console.log(part2());
