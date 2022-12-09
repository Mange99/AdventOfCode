import { Timed } from "../../lib/Timed";
import { FileReader } from "../../lib/FileReader";

const data = FileReader.readFile();

const part1 = (data: string): number => {
  let posH = [0, 0];
  let posT = [0, 0];
  const visited: string[] = [];

  data.split("\n").map((value) => {
    const instruction = value.split(" ");
    const dir = instruction[0];
    const steps = Number(instruction[1]);

    for (let i = 0; i < steps; i++) {
      posH = step(posH, dir);
      posT = follow(posH, posT);
      if (!visited.includes(posT.toString())) visited.push(posT.toString());
    }
  });

  return visited.length;
};

const step = (pos: number[], dir: string) => {
  if (dir === "U") {
    return [pos[0], pos[1] - 1];
  } else if (dir === "D") {
    return [pos[0], pos[1] + 1];
  } else if (dir === "R") {
    return [pos[0] + 1, pos[1]];
  } else {
    return [pos[0] - 1, pos[1]];
  }
};

const follow = (posH: number[], posT: number[]) => {
  const diffx = posH[0] - posT[0];
  const diffy = posH[1] - posT[1];

  let newPos = [...posT];

  if ((diffx >= 2 && diffy != 0) || (diffx <= -2 && diffy != 0)) {
    newPos[0] += diffx / 2;
    newPos[1] += diffy >= 2 || diffy <= -2 ? diffy / 2 : diffy;
  } else if ((diffy >= 2 && diffx != 0) || (diffy <= -2 && diffx != 0)) {
    newPos[0] += diffx >= 2 || diffx <= -2 ? diffx / 2 : diffx;
    newPos[1] += diffy / 2;
  } else if (diffx >= 2 || diffx <= -2) newPos[0] += diffx / 2;
  else if (diffy >= 2 || diffy <= -2) newPos[1] += diffy / 2;

  return newPos;
};

const part2 = (data: string): number => {
  const visited: string[] = [];
  let snake: number[][] = [];

  for (let i = 0; i < 10; i++) {
    snake.push([0, 0]);
  }

  data.split("\n").map((value) => {
    const dir = value.split(" ")[0];
    const steps = Number(value.split(" ")[1]);

    for (let i = 0; i < steps; i++) {
      snake[9] = step(snake[9], dir);

      for (let i = 8; i >= 0; i--) {
        snake[i] = follow(snake[i + 1], snake[i]);
      }

      if (!visited.includes(snake[0].toString()))
        visited.push(snake[0].toString());
    }
  });

  return visited.length;
};

Timed(1, () => part1(data));
Timed(2, () => part2(data));
