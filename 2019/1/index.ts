import { FileReader } from "../../lib/FileReader";

const data = FileReader.readFileAsInt("\n");

const clacFuel = (): number => {
  return data.reduce((prev, curr, i) => {
    return prev + Math.floor(curr / 3) - 2;
  }, 0);
};

const clacFuel2 = (): number => {
  return data.reduce((prev, curr, i) => {
    return prev + calcHelper(curr, 0);
  }, 0);
};

const calcHelper = (value: number, current: number): number => {
  value = Math.floor(value / 3) - 2;
  if (value <= 0) return current;

  current += value;
  return calcHelper(value, current);
};

console.log(clacFuel());
console.log(clacFuel2());
