import { FileReader } from "../../lib/FileReader";
import {Timed} from "../../lib/Timed"

const data = FileReader.readFile();

const part1 = (data: string) => {
  const values = data.split("\n");
  let longestValue = 0;

  for(let i = 0; i < values.length; i++){
    if(values[i].length > longestValue)
      longestValue = values[i].length
  }

  const grid = values.map(x => x.padEnd(longestValue, " ").split(""));

  let col = 0;
  let total = 0;

  while (col < longestValue) {
    if (grid.every(row => row[col] == " ")) {
      col++;
      continue;
    }

    let startCol = col;
    
    while (col < longestValue && !grid.every(row => row[col] === " ")) {
      col++;
    }

    const op = values.length - 1;
    const operator = grid[op][startCol]; 
    const numbers: number[] = [];
   
    for (let i = 0; i < op; i++) {

      const num = grid[i]
        .slice(startCol, col)
        .join("")

      if (num.length > 0) numbers.push(Number(num));
    }

    
    const value = operator === "+"
      ? numbers.reduce((prev, curr) => {
        return prev + curr;
      }, 0)
      : numbers.reduce((prev,curr) => {
        return prev * curr;
        
      }, 1);

    total += value;
  }

  return total;
};


const part2 = (data: string) => {
  const values = data.split("\n");

  let longestValue = 0;

  for(let i = 0; i < values.length; i++){
    if(values[i].length > longestValue)
      longestValue = values[i].length
  }

  const grid = values.map(x => x.padEnd(longestValue, " ").split(""));

  let col = 0;
  let total = 0;

  while (col < longestValue) {
    if (grid.every(row => row[col] === " ")) {
      col++;
      continue;
    }

    const start = col;
    
    while (col < longestValue && !grid.every(row => row[col] === " ")) {
      col++;
    }

    let last = col - 1;

    const op = values.length - 1;
    const operator = grid[op][start]; 
    const numbers: number[] = [];
    
    for (let i = start; i <= last; i++) {
        let digits = "";
        for (let j = 0; j < op; j++) {
            const val = grid[j][i];
            if (val != "") {
                digits += val;
            }
        }
        
        if (digits.length > 0) {
            numbers.push(Number(digits));
        }
    }

    const value = operator === "+"
      ? numbers.reduce((prev, curr) => {
        return prev + curr;
      }, 0)
      : numbers.reduce((prev,curr) => {
        return prev * curr;
        
      }, 1);


    total += value;
  }

  return total;
};


console.log(part1(data))
console.log(part2(data))
// Timed(1, () => part1(data));
// Timed(2, () => part2(data));
