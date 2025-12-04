import { log } from "console";
import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();


const getValidPosition = (x: number, y: number, arr: string[][]) => {
  return x >= 0 && y >= 0 && y < arr.length && x < arr[0].length 
}

const getNeigbours = (x: number, y: number, arr: string[][]) => {
  let total = 0;

  for(let i = -1; i <= 1; i++){
   for(let j = -1; j <= 1; j++){
    
    if(getValidPosition(x+i, y+j, arr) && arr[x][y] == "."){
      return 0;
    }
    if(!getValidPosition(x+i, y+j, arr) || (i == 0 && j == 0)) {
      continue

    } 

    const value = arr[x+i][y+j] 

    if(value == "@") total += 1;
  } 
  }
  
  return total < 4 ? 1 : 0
}

const part1 = (data: string): number => {
  const grid = data.split("\n").map((value) => value.split(""))
  const rows = grid.length;
  const cols = grid[0].length;
  
  let sum = 0;
  
  for (let i = 0;  i < rows; i++){
    for(let j = 0; j < cols; j++) {
      sum += getNeigbours(i, j, grid);
    }
  }

  return sum;
};


const part2 = (data: string): number => {
  const grid = data.split("\n").map((value) => value.split(""))
  const rows = grid.length;
  const cols = grid[0].length;

  let sum = 0;

  let stillAdding = true

  while(stillAdding){
    const initalSum = sum;

    for (let i = 0;  i < rows; i++){
      for(let j = 0; j < cols; j++) {
        const value = getNeigbours(i, j, grid);
        if(value){
          grid[i][j] = "."
        }
        sum += value
      }
    }
    if(sum == initalSum){
      stillAdding = false;
    }
  }
  
  return sum;
};


Timed(1, () => part1(data));
Timed(2, () => part2(data));
