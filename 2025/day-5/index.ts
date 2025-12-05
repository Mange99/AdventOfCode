import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

const part1 = (data: string) => {
  const values = data.split("\n\n");
  const ranges = values[0].split("\n");
  const ids = values[1].split("\n");

  const validIds = new Set<number>();

  ids.map((value) => {
    ranges.map((range) => {
      const [firstId, lastId] = range.split("-");

      const firstNum = Number(firstId);
      const lastNum = Number(lastId);

      const targetValue = Number(value);
      if (firstNum <= targetValue && targetValue <= lastNum)
        validIds.add(targetValue);
    });
  });

  return validIds.size;
};

const rangeOverlaps = (range1: string, range2: string) => {
  const [firstId1, lastId1] = range1.split("-").map((v) => Number(v));
  const [firstId2, lastId2] = range2.split("-").map((v) => Number(v));

  if (firstId1 <= lastId2 && firstId2 <= lastId1) {
    return [
      firstId1 <= firstId2 ? firstId1 : firstId2,
      lastId1 >= lastId2 ? lastId1 : lastId2,
    ];
  }
  return false;
};

const part2 = (data: string) => {
  const values = data.split("\n\n");
  const ranges = values[0].split("\n");

  let tot = 0;

  for (let i = 0; i < ranges.length; i++) {
    for (let j = i + 1; j < ranges.length; j++) {
      const overlap = rangeOverlaps(ranges[i], ranges[j]);

      if (overlap) {
        ranges.splice(i, 1, `${overlap[0]}-${overlap[1]}`);
        ranges.splice(j, 1);
        i--;
      }
    }
  }

  ranges.map((range) => {
    const [firstId, lastId] = range.split("-");

    const firstNum = Number(firstId);
    const lastNum = Number(lastId);

    const validIds = lastNum - firstNum + 1;

    tot += validIds;
  });

  return tot;
};

Timed(1, () => part1(data));
Timed(2, () => part2(data));
