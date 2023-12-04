import { log } from "console";
import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

const part1 = (data: string) => {
  return data
    .split("\n")
    .map((value) => {
      let added = false;

      const winners = value.split("|")[0].split(" ").filter((x) => x != "").map(Number)
      winners.splice(0,2)

      const your = value.split("|")[1].split(" ").filter((value) => value != "").map(Number)

      
      // Count how many numbers from 'yourNumbers' are in 'winnersNumbers'
      let matches = 0;

      const count = your.map((number) => {
        
        if(winners.includes(number) && !added){
          added = true;
          matches = 1;
          return matches;
        }  else if(winners.includes(number)) {
          matches *= 2;
          return matches
        }
        return 0; 
      })
      return matches;
    }
    ).reduce((prev, curr) => prev + curr, 0)
  };

  const map = new Map<number, number>([
    [1, 0],
]);
let index = 1;

const part2 = (data: string) => {
  return data
    .split("\n")
    .map((value) => {
      let added = false;

      const winners = value.split("|")[0].split(" ").filter((x) => x != "").map(Number)
      winners.splice(0,2)

      const your = value.split("|")[1].split(" ").filter((value) => value != "").map(Number)

      
      // Count how many numbers from 'yourNumbers' are in 'winnersNumbers'
      let match = index;
      const count = your.forEach((number, i) => {
        if(winners.includes(number)){
          //add set [matches] ++;
          const current = map.get(match) ?? 0;
          map.set(match, current + 1);
          match++;

        } 
      })
      log(map)
      index += 1;
    });
};

//console.log(part1(data));
console.log(part2(data));

// Timed(1, () => part1(data));
// Timed(2, () => part2(data));
