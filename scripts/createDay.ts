import { copyFileSync, mkdirSync, writeFileSync, existsSync } from "fs";

// Get file argument or default to current date
const file =
  process.argv[2] || `${new Date().getFullYear()}/day-${new Date().getDate()}`;
const [year, day] = file.split("/");

console.log("LETS GET READY TO RUMBLE");

const targetDir = `./${year}/${day}`;

// Ensure directory exists, create if not
if (!existsSync(targetDir)) {
  mkdirSync(targetDir, { recursive: true });
  writeFileSync(`${targetDir}/input.txt`, "");
  copyFileSync(`./template/index.ts`, `${targetDir}/index.ts`);
  console.log(`Created ${targetDir} with template files.`);
} else {
  console.log(`${targetDir} already exists. No action taken.`);
}
