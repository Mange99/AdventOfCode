import { readFileSync } from "fs";
import { join } from "path";

const readFile = (path: string, file: string): String[] => {
  return readFileSync(join(path, file), "utf-8").split("\n");
};
const readFileAsInt = (path: string, file: string): number[] => {
  return readFileSync(join(path, file), "utf-8")
    .split("\n")
    .map((value) => Number(value));
};

export const DataHandling = {
  readFile,
  readFileAsInt,
};
