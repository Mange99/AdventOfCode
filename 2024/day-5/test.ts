import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

type Rule = [number, number];
type Update = number[];

// Build a directed graph from the rules
function buildGraph(rules: Rule[]): Map<number, number[]> {
  const graph = new Map<number, number[]>();
  for (const [from, to] of rules) {
    if (!graph.has(from)) graph.set(from, []);
    graph.get(from)!.push(to);
  }
  return graph;
}

// Perform topological sort using Kahn's algorithm
function topologicalSort(
  nodes: number[],
  graph: Map<number, number[]>
): number[] | null {
  const inDegree = new Map<number, number>();
  const result: number[] = [];
  const queue: number[] = [];

  // Initialize in-degree
  nodes.forEach((node) => inDegree.set(node, 0));
  for (const [from, neighbors] of graph.entries()) {
    if (!nodes.includes(from)) continue;
    for (const to of neighbors) {
      if (nodes.includes(to)) {
        inDegree.set(to, (inDegree.get(to) || 0) + 1);
      }
    }
  }

  // Collect nodes with no incoming edges
  for (const node of nodes) {
    if ((inDegree.get(node) || 0) === 0) queue.push(node);
  }

  // Process nodes in topological order
  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);
    for (const neighbor of graph.get(node) || []) {
      if (!nodes.includes(neighbor)) continue;
      inDegree.set(neighbor, (inDegree.get(neighbor) || 0) - 1);
      if (inDegree.get(neighbor) === 0) queue.push(neighbor);
    }
  }

  // If we didn't process all nodes, there's a cycle
  return result.length === nodes.length ? result : null;
}

// Validate and correct updates
function processUpdates(
  rules: Rule[],
  updates: Update[]
): { valid: Update[]; invalid: Update[] } {
  const graph = buildGraph(rules);
  const valid: Update[] = [];
  const invalid: Update[] = [];

  for (const update of updates) {
    const sorted = topologicalSort(update, graph);
    if (sorted && sorted.join() === update.join()) {
      valid.push(update);
    } else {
      invalid.push(sorted || []);
    }
  }

  return { valid, invalid };
}

// Example Input
const rules: Rule[] = [
  [47, 53],
  [97, 13],
  [97, 61],
  [97, 47],
  [75, 29],
  [61, 13],
  [75, 53],
  [29, 13],
  [97, 29],
  [53, 29],
  [61, 53],
  [97, 53],
  [61, 29],
  [47, 13],
  [75, 47],
  [97, 75],
  [47, 61],
  [75, 61],
  [47, 29],
  [75, 13],
  [53, 13],
];

const updates: Update[] = [
  [75, 47, 61, 53, 29],
  [97, 61, 53, 29, 13],
  [75, 29, 13],
  [75, 97, 47, 61, 53],
  [61, 13, 29],
  [97, 13, 75, 29, 47],
];
const data = FileReader.readFile();

const { valid, invalid } = processUpdates(rules, updates);

const middleSum = (updates: Update[]) =>
  updates.reduce(
    (sum, update) => sum + update[Math.floor(update.length / 2)],
    0
  );

// Results
console.log("Valid Updates:", valid);
console.log("Invalid Updates:", invalid);
console.log("Middle Sum (Valid):", middleSum(valid));
console.log("Middle Sum (Invalid Sorted):", middleSum(invalid));

Timed(1, () => processUpdates);
