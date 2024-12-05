import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

const violatesRule = (rules: string[], first: string, second: string) => {
  let comesBefore = true;

  const importantValues = rules.filter(
    (x) => x.includes(first) && x.includes(second)
  );

  if (importantValues.length < 1) return false;

  for (let i = 0; i < rules.length; i++) {
    if (rules[i] == `${first}|${second}`) {
      comesBefore = false;
      break;
    }
  }

  return comesBefore;
};

const part1 = (data: string) => {
  const [rules, instructions] = data.split("\n\n");
  const realRules = rules.split("\n");

  return instructions.split("\n").reduce((prev, curr) => {
    const values = curr.split(",");
    let correctInstruction = true;

    for (let i = 0; i < values.length - 1; i++) {
      for (let j = i + 1; j < values.length; j++) {
        if (violatesRule(realRules, values[i], values[j])) {
          correctInstruction = false;
          break;
        }
      }
    }
    if (correctInstruction) {
      return (prev += Number(values[Math.floor(values.length / 2)]));
    }
    return prev;
  }, 0);
};

const part2 = (data: string) => {
  const [rules, instructions] = data.split("\n\n");
  const realRules = rules.split("\n");

  return instructions.split("\n").reduce((prev, curr) => {
    const values = curr.split(",");

    let accept = false;
    let incorrect = true;

    while (incorrect) {
      for (let i = 0; i < values.length - 1; i++) {
        for (let j = i + 1; j < values.length; j++) {
          if (violatesRule(realRules, values[i], values[j])) {
            const temp = values[j];
            values[j] = values[i];
            values[i] = temp;
            i -= 1;
            j = i + 1;
            accept = true;
          }
        }
      }
      incorrect = false;
    }

    if (accept) {
      return (prev += Number(values[Math.floor(values.length / 2)]));
    }
    return prev;
  }, 0);
};

Timed(1, () => part1(data));
Timed(2, () => part2(data));
