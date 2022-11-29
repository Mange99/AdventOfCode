import { readFileSync } from "fs";

const readFile = (seperator: string): String[] => {
  return readFileSync("./input.txt", "utf-8").split(seperator);
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
