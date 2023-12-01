import { dir } from "console";
import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";
import { createTree, Node } from "../../lib/Tree";

const data = FileReader.readFile();

const getChildrenSum = (
  node: { [key: string]: Node },
  temp: number[],
  over: boolean = true,
  value: number
) => {
  for (let key in node) {
    const beror = node[key];
    if (node.hasOwnProperty(key)) {
      if (beror.type === "dir")
        if (over && node[key].size > value) temp.push(node[key].size);
        else if (!over && node[key].size < value) temp.push(node[key].size);

      if (beror.type == "dir") {
        getChildrenSum(beror.children ?? {}, temp, over, value);
      }
    }
  }
  return temp;
};

const part1 = (data: string): number => {
  const tree = createTree(data);

  let x: number[] = [];

  if (tree.children)
    return getChildrenSum(tree.children, x, false, 100000).reduce(
      (prev, curr) => prev + curr,
      0
    );
  return 2;
};

const part2 = (data: string): number => {
  const available = 70000000;
  const needed = 30000000;

  const tree = createTree(data);

  const min = needed - (available - tree.size);

  let x: number[] = [];
  if (tree.children)
    return getChildrenSum(tree.children, x, true, min).reduce((prev, curr) =>
      Math.min(prev, curr)
    );
  return 2;
};

Timed(1, () => part1(data));
Timed(2, () => part2(data));

dir(createTree(data), { depth: 7 });
