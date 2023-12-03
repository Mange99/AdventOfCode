import { log } from "console";
import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();


const directions = [
  [-1, 0], [1, 0], [0, -1], [0, 1],
  [-1, -1], [-1, 1], [1, -1], [1, 1]
];

const part1 = (data: string): number => {
  const grid = data.split("\n");
  const rows = grid.length;
  const cols = grid[0].length;
  let sum = 0;
  const symbols = ["#", "$", "*", "@", "+", "-", "%", "&", "/", "="];
  const counted: { row: number, col: number }[] = []; 

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (symbols.includes(grid[i][j])) {
    
        directions.forEach(([dx, dy]) => {
          let x = i + dx, y = j + dy;

          while (x >= 0 && x < rows && y >= 0 && y < cols) {
            const cell = grid[x][y];
            
            if (!isNaN(parseInt(cell)) && !isCounted(counted, x, y)) {
              const { num, positions } = getNumber(grid[x], y, x);
              if (num > 0) {
                sum += num;
                counted.push(...positions);
              }
            } else {
              break; 
            }
            x += dx;
            y += dy;
          }
        });
      }
    }
  }
  return sum;
};


const getNumber = (input: string, index: number, row: number) => {
  let left = index;
  let right = index;

  if (isNaN(Number(input.substring(index, index + 1))) || index >= input.length) return { num: 0, len: 0, positions: [] };

  while (left > 0 && !isNaN(parseInt(input[left - 1]))) {
    left--;
  }

  while (right < input.length - 1 && !isNaN(parseInt(input[right + 1]))) {
    right++;
  }

  const num = parseInt(input.substring(left, right + 1));
  const len = right - left + 1;
  const positions = Array.from({ length: len }, (_, i) => ({ row: row, col: left + i }));

  return { num: num, len: len, positions: positions };
};

const isCounted = (counted: {row: number, col: number}[], row: number, col: number): boolean => {
  return counted.some(pos => pos.row === row && pos.col === col);
};


const part2 = (data: string): number => {
  const grid = data.split("\n");
  const rows = grid.length;
  const cols = grid[0].length;
  let sum = 0;
  const symbols = ["*"];
  const counted: { row: number, col: number }[] = []; 


  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {

      if (symbols.includes(grid[i][j])) {
        let curr: number[] = [];

        directions.forEach(([dx, dy]) => {
          let x = i + dx, y = j + dy;

          while (x >= 0 && x < rows && y >= 0 && y < cols) {
            const cell = grid[x][y];
            
            if (!isNaN(parseInt(cell)) && !isCounted(counted, x, y)) {
              const { num, positions } = getNumber(grid[x], y, x);
              if (num > 0) {
                curr.push(num);
                counted.push(...positions);
              }
            } else {
              break; 
            }
            x += dx;
            y += dy;
          }
        });
        if(curr.length === 2){
          sum+= curr[0] * curr[1];
        }
      }
    }
  }
  return sum;
};

Timed(1, () => part1(data));
Timed(2, () => part2(data));
