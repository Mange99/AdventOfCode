export type File = {
  name: string;
  size: number;
  type: "file";
};

export type Directory = {
  name: string;
  children?: { [key: string]: Node };
  size: number;
  type: "dir";
};

export type Node = File | Directory;

export type Tree<T> = T & {
  children?: T[];
};

export const createTree = (data: string): Directory => {
  const root: Node = {
    name: "/",
    size: 0,
    children: {},
    type: "dir",
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
          type: "dir",
        };
      } else {
        dir = {
          name,
          size,
          type: "file",
        };
      }

      if (name == "cd") {
        const newDir: string = parts.pop() ?? "/";
        if (newDir == "..") {
          //Go back set currentDir to previous
          currentDir = previous.pop() ?? root;
        } else {
          //Else Change to new directory add current to previous
          previous.push(currentDir);

          //New dir = currentDir.children ADD A NEW DIR
          if (currentDir.type == "file") {
            currentDir = {
              ...currentDir,
              children: { [newDir]: {} },
            } as Node;
          } else if (currentDir.children) {
            currentDir = currentDir.children[newDir];
          }
        }
      } else {
        //Adda en ny fil

        if (currentDir.type == "dir" && currentDir.children)
          currentDir.children[name] = dir;

        if (currentDir.type == "dir" && currentDir.children)
          currentDir.size += currentDir.children[name].size;

        if (previous)
          previous.map((value) => {
            if (currentDir.type == "dir" && currentDir.children)
              value.size += currentDir.children[name].size;
          });
      }
    }
  });
  return root;
};
