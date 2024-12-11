import { FileReader } from "../../lib/FileReader";

const data = FileReader.readFileAsInt(" ");

const blink = (stones: number[]): number[] => {
  const newStones: number[] = [];

  stones.map((stone) => {
    const stringStone = stone.toString();

    if (stone == 0) {
      newStones.push(1);
    } else if (stringStone.length % 2 == 0) {
      const half = stringStone.length / 2;
      const left = parseInt(stringStone.substring(0, half), 10);
      const right = parseInt(stringStone.substring(half), 10);

      newStones.push(left, right);
    } else {
      newStones.push(stone * 2024);
    }
  });

  return newStones;
};

const part1 = (stoneNumbers: number[]) => {
  const blinkTimes = 25;
  let newStones = [...stoneNumbers];

  for (let i = 0; i < blinkTimes; i++) {
    newStones = blink(newStones);
  }
  return newStones.length;
};

console.log(part1(data));
// console.log(part2(data));

// Timed(1, () => part1(data));
// Timed(2, () => part2(data));
