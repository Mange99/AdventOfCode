import { copyFileSync, mkdirSync, writeFileSync } from "fs";
const file = process.argv[2];

const [year, day] = file.split("/");

console.log("LETS GET READY TO RUMBLE");

mkdirSync(`./${year}/${day}`);
writeFileSync(`./${year}/${day}/input.txt`, "");
copyFileSync(`./${year}/template/index.ts`, `./${year}/${day}/index.ts`);
