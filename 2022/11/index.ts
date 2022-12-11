import { FileReader } from "../../lib/FileReader";

const data = FileReader.readFile();

interface Monkey {
  items: number[];
  operation: string[];
  multiplyOperation: boolean;
  devideNr: number;
  ifTrue: number;
  ifFalse: number;
  inspected: number;
}

const inspectedItems = (data: string, rounds: number, mod = false) => {
  const monkeys: Monkey[] = [];

  data.split("\n\n").map((monkey) => {
    const regEx = new RegExp(/[\d]+/g);
    const items = monkey.match(regEx) ?? [];

    items.splice(0, 1);
    const ifFalse = Number(items.splice(-1));
    const ifTrue = Number(items.splice(-1));
    const devide = Number(items.splice(-1));
    const operation = monkey.includes("new = old * old")
      ? ["old"]
      : items.splice(-1);

    monkeys.push({
      items: items.map(Number),
      operation: operation,
      multiplyOperation: monkey.split("").includes("*"),
      devideNr: devide,
      ifTrue: ifTrue,
      ifFalse: ifFalse,
      inspected: 0,
    });
  });

  let allMultipliers = monkeys.reduce(
    (prev, curr) => prev * Number(curr.devideNr),
    1
  );

  for (let i = 0; i < rounds; i++) {
    monkeys.map((monkey) => {
      monkey.items.map((item, i) => {
        monkey.inspected += 1;
        let worry = 0;
        if (monkey.operation[0] == "old") {
          worry = item * item;
        } else {
          worry = monkey.multiplyOperation
            ? item * Number(monkey.operation)
            : item + Number(monkey.operation);
        }

        worry = mod ? (worry %= allMultipliers) : Math.floor(worry / 3);

        if (worry % monkey.devideNr == 0) {
          monkeys[monkey.ifTrue].items.push(worry);
        } else {
          monkeys[monkey.ifFalse].items.push(worry);
        }
      });
      monkey.items = [];
    });
  }

  monkeys.sort((a, b) => {
    if (a.inspected < b.inspected) {
      return 1;
    }
    if (a.inspected > b.inspected) {
      return -1;
    }
    return 0;
  });

  return monkeys[0].inspected * monkeys[1].inspected;
};

console.log(inspectedItems(data, 20));
console.log(inspectedItems(data, 10000, true));

// Timed(1, () => inspectedItems(data, 20));
// Timed(2, () => inspectedItems(data, 10000, true));
