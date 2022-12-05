export const Timed = (task: number, fn: any) => {
  const out = fn();

  const mean =
    Array(100)
      .fill(0)
      .map(() => {
        const t1 = performance.now();
        fn();
        const t2 = performance.now();
        return t2 - t1;
      })
      .reduce((prev, curr) => prev + curr, 0) / 100;

  console.table({
    Part: task,
    Result: out,
    Runtime: `${Math.floor(mean * 1000)}µs`,
  });
};
