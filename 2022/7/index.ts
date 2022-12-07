import { dir } from "console";
import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

type Node = {
  name: string;
  children: { [key: string]: Node };
  size: number;
  directory: boolean;
};

const createTree = (data: string): Node => {
  const root: Node = {
    name: "/",
    size: 0,
    directory: true,
    children: {},
  };

  const lines = data.split("\n");
  let currentDir: Node = root;
  let previous: Node[] = [];

  lines.forEach((line, i) => {
    if (i < 1) return;
    const parts = line.split(" ");
    const directory = parts[0] == "dir";
    const name = parts[1];

    if (name != "ls") {
      let regEx = new RegExp(/\d+/);
      const size = Number(line.match(regEx)) ?? 0;

      let dir: Node;
      if (directory) {
        dir = {
          name,
          size,
          children: {},
          directory: true,
        };
      } else {
        dir = {
          name,
          size,
          children: {},
          directory: false,
        };
      }

      if (name == "cd") {
        const newDir: string = parts.pop() ?? "/";
        if (newDir == "..") {
          currentDir = previous.pop() ?? root;
        } else {
          previous.push(currentDir);
          currentDir = currentDir.children[newDir];
        }
      } else {
        currentDir.children[name] = dir;
        currentDir.size += currentDir.children[name].size;

        if (previous)
          previous.map((value) => {
            value.size += currentDir.children[name].size;
          });
      }
    }
  });
  return root;
};

const getChildrenSum = (
  node: { [key: string]: Node },
  temp: number[],
  over: boolean = true,
  value: number
) => {
  for (let key in node) {
    if (node.hasOwnProperty(key)) {
      if (node[key].directory)
        if (over && node[key].size > value) temp.push(node[key].size);
        else if (!over && node[key].size < value) temp.push(node[key].size);

      if (node[key].hasOwnProperty("children")) {
        getChildrenSum(node[key].children, temp, over, value);
      }
    }
  }
  return temp;
};

const part1 = (data: string): number => {
  const tree = createTree(data);
  let x: number[] = [];

  return getChildrenSum(createTree(data).children, x, false, 100000).reduce(
    (prev, curr) => prev + curr,
    0
  );
};

const part2 = (data: string): number => {
  const available = 70000000;
  const needed = 30000000;

  const tree = createTree(data);

  const min = needed - (available - tree.size);

  let x: number[] = [];
  return getChildrenSum(tree.children, x, true, min).reduce((prev, curr) =>
    Math.min(prev, curr)
  );
};

Timed(1, () => part1(data));
Timed(1, () => part2(data));

// dir(createTree(data), { depth: 4 });
