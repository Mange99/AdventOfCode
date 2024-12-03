import { Timed } from "./../../lib/Timed";
import { FileReader } from "../../lib/FileReader";

const data = FileReader.readFile();

const getValue = (value: string) => {
  const num1 = Number(value.substring(1, value.indexOf(",")));
  const num2 = Number(
    value.substring(value.indexOf(",") + 1, value.indexOf(")"))
  );
  return isNaN(num1 + num2) ? 0 : num1 * num2;
};

const part1 = (data: string) => {
  return data.split("mul").reduce((prev, curr) => {
    return prev + getValue(curr);
  }, 0);
};

const part2 = (data: string) => {
  let disabled = false;
  return data.split("mul").reduce((prev, curr) => {
    if (!disabled) {
      prev += getValue(curr);
    }

    if (curr.includes("do()")) {
      disabled = false;
    }

    if (curr.includes("don't()")) {
      disabled = true;
    }
    return prev;
  }, 0);
};

Timed(1, () => part1(data));
Timed(2, () => part2(data));
