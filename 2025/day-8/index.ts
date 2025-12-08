import { FileReader } from "../../lib/FileReader";
import { Timed } from "../../lib/Timed";

const data = FileReader.readFile();

const euclideanDistance = (point1: number[], point2: number[]) => {
  const valueX = point1[0] - point2[0];
  const valueY = point1[1] - point2[1];
  const valueZ = point1[2] - point2[2];

  return Math.sqrt(valueX ** 2 + valueY ** 2 + valueZ ** 2);
};

const getDistances = (rows: string[]) => {
  const distances: number[][] = [];

  for (let i = 0; i < rows.length; i++) {
    for (let j = i + 1; j < rows.length; j++) {
      const point1 = rows[i].split(",").map(Number);
      const point2 = rows[j].split(",").map(Number);

      distances.push([i, j, euclideanDistance(point1, point2)]);
    }
  }
  return distances;
};

type Circut = {
  points: number[];
  distance: number;
};

const part1 = (data: string) => {
  const rows = data.split("\n");

  const distances = getDistances(rows);

  distances.sort((a, b) => a[2] - b[2]).splice(1000);

  const circuts: Circut[] = [];

  for (let i = 0; i < distances.length; i++) {
    const [pointA, pointB, distance] = distances[i];

    const indexA = circuts.findIndex((circut) =>
      circut.points.includes(pointA)
    );

    const indexB = circuts.findIndex((circut) =>
      circut.points.includes(pointB)
    );

    // EXIST IN NONE
    if (indexA === -1 && indexB === -1) {
      circuts.push({ points: [pointA, pointB], distance });
    }
    // A EXISTST IN A CIRCUT
    else if (indexA !== -1 && indexB === -1) {
      circuts[indexA].points.push(pointB);
      circuts[indexA].distance += distance;
    }
    // B EXIST IN SOME CIRCUT
    else if (indexA === -1 && indexB !== -1) {
      circuts[indexB].points.push(pointA);
      circuts[indexB].distance += distance;
    }
    // THEY EXIST IN DIFFERENT CIRCUTS
    else {
      const circutA = circuts[indexA];
      const circutB = circuts[indexB];

      // THEY ARE THE SAME
      if (indexA === indexB) {
        continue;
      }
      circutA.points = [...circutA.points, ...circutB.points];
      circutA.distance += circutB.distance + distance;

      circuts.splice(indexB, 1);
    }
  }

  circuts.sort((a, b) => b.points.length - a.points.length);

  return (
    circuts[0].points.length *
    circuts[1].points.length *
    circuts[2].points.length
  );
};

const part2 = (data: string) => {
  const rows = data.split("\n");

  const distances: number[][] = getDistances(rows);

  distances.sort((a, b) => a[2] - b[2]);

  const circuts: Circut[] = [];

  let lastPoint = 0;
  let lastPoint2 = 0;

  let i = 0;

  while (true) {
    const [pointA, pointB, distance] = distances[i];

    lastPoint = pointA;
    lastPoint2 = pointB;

    const indexA = circuts.findIndex((circut) =>
      circut.points.includes(pointA)
    );

    const indexB = circuts.findIndex((circut) =>
      circut.points.includes(pointB)
    );

    // EXIST IN NONE
    if (indexA === -1 && indexB === -1) {
      circuts.push({ points: [pointA, pointB], distance });
    }
    // A EXISTST IN A CIRCUT
    else if (indexA !== -1 && indexB === -1) {
      circuts[indexA].points.push(pointB);
      circuts[indexA].distance += distance;
    }
    // B EXIST IN SOME CIRCUT
    else if (indexA === -1 && indexB !== -1) {
      circuts[indexB].points.push(pointA);
      circuts[indexB].distance += distance;
    }
    // THEY EXIST IN DIFFERENT CIRCUTS
    else {
      const circutA = circuts[indexA];
      const circutB = circuts[indexB];

      // THEY ARE THE SAME
      if (!(indexA === indexB)) {
        circutA.points = [...circutA.points, ...circutB.points];
        circutA.distance += circutB.distance + distance;

        circuts.splice(indexB, 1);
      }
    }

    if (circuts[0].points.length === rows.length) {
      break;
    }

    i++;
  }

  return (
    Number(rows[lastPoint].split(",")[0]) *
    Number(rows[lastPoint2].split(",")[0])
  );
};

Timed(1, () => part1(data));
Timed(2, () => part2(data));
