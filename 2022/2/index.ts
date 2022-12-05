import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

const hands = [
  ["A", "B", "C"],
  ["X", "Y", "Z"],
];

const part1 = (data: string): number =>
  data.split("\n").reduce((prev, curr: string) => {
    const [x, y] = curr.split(" ");
    prev += hands[1].indexOf(y) + 1;
    if (hands[1].indexOf(y) == hands[0].indexOf(x)) return prev + 3;
    if (hands[1].indexOf(y) == (hands[0].indexOf(x) + 1) % 3) return prev + 6;
    else return prev;
  }, 0);

const part2 = (data: string): number => {
  return data.split("\n").reduce((prev, curr: string) => {
    let [x, y] = curr.split(" ");
    if (y == "X") {
      y = hands[1][(hands[0].indexOf(x) + 2) % 3];
    } else if (y == "Y") {
      y = hands[1][hands[0].indexOf(x)];
      prev += 3;
    } else {
      y = hands[1][(hands[0].indexOf(x) + 1) % 3];
      prev += 6;
    }
    return prev + hands[1].indexOf(y) + 1;
  }, 0);
};
Timed(1, () => part1(data));
Timed(2, () => part2(data));
