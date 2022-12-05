import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

const part1 = (data: string): number => {
  let count = 0;
  let count2 = 0;
  data.split("\n").map((row) => {
    const first = row.substring(row.indexOf(","));
    const second = row.substring(0, row.indexOf(","));

    const nrUno = Number(
      first.substring(0, first.indexOf("-")).replace(",", "")
    );
    const nrDos = Number(first.substring(first.indexOf("-")).replace("-", ""));

    const nrDosUno = Number(
      second.substring(0, second.indexOf("-")).replace("-", "")
    );
    const nrDosDos = Number(
      second.substring(second.indexOf("-")).replace("-", "")
    );

    //1 i 2
    if (
      (nrDosUno <= nrUno && nrDosDos >= nrDos) ||
      (nrUno <= nrDosUno && nrDos >= nrDosDos)
    ) {
      count++;
    }
    if (
      (nrUno <= nrDosUno && nrUno >= nrDosUno) ||
      (nrDosUno <= nrUno && nrDosUno >= nrUno) ||
      (nrDos <= nrDosDos && nrDos >= nrDosUno) ||
      (nrDosDos <= nrDos && nrDosDos >= nrUno)
    ) {
      count2++;
    }
  });

  return count;
};
const part2 = (data: string): number => {
  return 2;
};
console.log(part1(data));

// Timed(1, () => part1(data));
// Timed(2, () => part2(data));
