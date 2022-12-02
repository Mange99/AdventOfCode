import { FileReader } from "../../lib/FileReader";

const data = FileReader.readFileSplit("\n");

const hands = [
  ["A", "B", "C"],
  ["X", "Y", "Z"],
];

const part1 = (): number =>
  data.reduce((prev, curr) => {
    const [x, y] = curr.split(" ");
    prev += hands[1].indexOf(y) + 1;
    if (hands[1].indexOf(y) == hands[0].indexOf(x)) return prev + 3;
    if (hands[1].indexOf(y) == (hands[0].indexOf(x) + 1) % 3) return prev + 6;
    else return prev;
  }, 0);

const part2 = (): number => {
  return data.reduce((prev, curr) => {
    let [x, y] = curr.split(" ");
    if (y == "X") {
      if (x == "A") {
        y = hands[1][2];
      } else {
        y = hands[1][hands[0].indexOf(x) - 1];
      }
      return prev + hands[1].indexOf(y) + 1;
    } else if (y == "Y") {
      y = hands[1][hands[0].indexOf(x)];
      return prev + 3 + hands[1].indexOf(y) + 1;
    } else {
      y = hands[1][(hands[0].indexOf(x) + 1) % 3];
      return prev + 6 + hands[1].indexOf(y) + 1;
    }
  }, 0);
};

console.log(part1());
console.log(part2());
