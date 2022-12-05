import { FileReader } from "../../lib/FileReader";

const data = FileReader.readFile();

const problemUno = (data: number[]) => {
  data[1] = 12;
  data[2] = 2;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] == 1) {
      data[data[i + 3]] = data[data[i + 2]] + data[data[i + 1]];
    } else if (data[i] == 2) {
      data[data[i + 3]] = data[data[i + 2]] * data[data[i + 1]];
    } else if (data[i] == 99) {
      break;
    }
  }
};

problemUno(data.split(",").map(Number));

console.log(data[0]);
