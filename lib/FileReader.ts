import { readFileSync } from "fs";

const readFile = (): string => {
  return readFileSync("./input.txt", "utf-8");
};
const readFileAsInt = (seperator: string): number[] => {
  return readFileSync("./input.txt", "utf-8")
    .split(seperator)
    .map((value) => Number(value));
};

export const FileReader = {
  readFile,
  readFileAsInt,
};
