import { FileReader } from "../../lib/FileReader";

const pad = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const pad2 = [[1], [2, 3, 4], [5, 6, 7, 8, 9], ["A", "B", "C"], ["D"]];

const data = FileReader.readFile();

//up - right
const pos = [1, 1];
const pos2 = [0, 2];

let final = "";
const part1 = (data: string) => {
  data.split("\n").forEach((value) => {
    value.split("").forEach((value) => {
      if (value == "U" && pos[0] > 0) pos[0]--;
      if (value == "D" && pos[0] < 2) pos[0]++;
      if (value == "R" && pos[1] < 2) pos[1]++;
      if (value == "L" && pos[1] > 0) pos[1]--;
    });

    final += pad[pos[0]][pos[1]];
  });
  return final;
};

const part2 = (data: string) => {
  data.split("\n").forEach((x) => {
    x.split("").forEach((value, i) => {
      if (
        value == "U" &&
        pos2[1] > 0 &&
        !(
          pad2[pos2[1] - 1].length < pad2[pos2[1]].length &&
          (pos2[0] == 0 || pos2[0] >= pad2[pos2[1]].length - 1)
        )
      ) {
        pos2[1]--;
      }
      if (
        value == "D" &&
        pos2[1] < pad2.length - 1 &&
        !(
          (
            pad2[pos2[1] + 1].length < pad2[pos2[1]].length &&
            (pos2[0] == 0 || pos2[0] >= pad2[pos2[0]].length - 1)
          ) //-1
        )
      ) {
        if (pad2[pos2[1]].length < pad2[pos2[1] + 1].length) {
          pos2[0]++;
        } else if (pad2[pos2[1]].length > pad2[pos2[1] - 1].length) {
          pos2[0]--;
        }
        pos2[1]++;
      }

      if (value == "R" && pos2[0] < pad2[pos2[0]].length - 1) pos2[0]++;
      if (value == "L" && pos2[0] > 0) pos2[0]--;
    });

    console.log(pos2);

    final += pad2[pos2[1]][pos2[0]];
  });
  return final;
};
//5DB3
// console.log(part1(data));
console.log(part2(data));
