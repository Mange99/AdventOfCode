import { log } from "console";
import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

const part1 = (data: string) => {
  return data
    .split("\n")
    .map((value) => {
      const [winners, your] = value.split("|").map((part) =>
        part
          .split(" ")
          .filter((x) => x !== "")
          .map(Number)
      );

      winners.splice(0, 2);

      const wins = your.reduce((prev, curr) => {
        if (winners.includes(curr)) {
          prev += 1;
        }
        return prev;
      }, 0);

      return wins > 0 ? Math.pow(2, wins - 1) : 0;
    })
    .reduce((prev, curr) => prev + curr, 0);
};

const cardCopies = new Map<number, number>([]);

const addScratchToIndex = (index: number) => {
  cardCopies.set(index, cardCopies.get(index)! + 1);
};

const part2 = (data: string) => {
  const lines = data.split("\n");
  lines.forEach((_, index) => cardCopies.set(index + 1, 1));

  lines.map((value, p) => {
    const [winners, your] = value.split("|").map((part) =>
      part
        .split(" ")
        .filter((x) => x !== "")
        .map(Number)
    );
    winners.splice(0, 2);

    let currentCopies = cardCopies.get(p + 1) ?? 1;

    for (let i = 0; i < currentCopies; i++) {
      let currentIndex = p + 1;
      your.map((value) => {
        if (winners.includes(value)) {
          currentIndex++;
          addScratchToIndex(currentIndex);
        }
      });
    }
  });

  let tot = 0;
  cardCopies.forEach((value, key) => {
    tot += value;
  });
  return tot;
};

log(part1(data));
log(part2(data));

//Tooo slow
// Timed(1, () => part1(data));
// Timed(2, () => part2(data));
