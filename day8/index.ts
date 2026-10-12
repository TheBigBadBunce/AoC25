import _ from "lodash";
import { Circuit, Connection, Point, State } from "./types";

export const day8task1 = (data: number[][], connections: number, circuitCount: number) => {
  // Create basic state
  const points = sortPoints(readPointsFromData(data));
  const circuits = circuitsFromPoints(points);
  // Calculate all distances
  const shortestConnections = findShortestConnections(points, connections);
  // Add X shortest
  makeBulkConnections(shortestConnections, circuits);
  // Multiply X largest circuits together
  const longestCircuits = sortCircuits(circuits).slice(0, circuitCount);
  return combineCircuits(longestCircuits);
};

export const day8task2 = (data: number[][]) => {
  // Create basic state
  const points = sortPoints(readPointsFromData(data));
  const circuits = circuitsFromPoints(points);
  // Calculate all distances
  const shortestConnections = findShortestConnections(
    points,
    getMaxConnectionsForPoints(points.length),
  );
  // Add X shortest
  let i = 0;
  let lastConnection;
  while (circuits.length > 1) {
    lastConnection = shortestConnections[i];
    connectPoints(lastConnection.points[0], lastConnection.points[1], circuits);
    i++;
    if (i >= shortestConnections.length) {
      throw new Error("No more connections to make");
    }
  }

  return lastConnection!.points[0].x * lastConnection!.points[1].x;
};

export const getMaxConnectionsForPoints = (nPoints: number): number =>
  (nPoints * (nPoints - 1)) / 2;

export const sortPoints = (points: Point[]): Point[] => _.sortBy(points, pointIndex);

export const sortConnections = (connections: Connection[]): Connection[] =>
  _.sortBy(connections, connectionIndex);

export const sortCircuits = (circuits: Circuit[]): Circuit[] =>
  _.sortBy(circuits, circuitsIndex);

export const pointIndex = (point: Point) => point.x * 10000000000 + point.y * 100000 + point.z;

export const connectionIndex = (connection: Connection) => connection.distance;

export const circuitsIndex = (circuit: Circuit) => -circuit.size;

export const readPointsFromData = (data: number[][]): Point[] =>
  data.map((row) => ({ x: row[0], y: row[1], z: row[2] }));

let lastId = 0;
export const resetLastId = () => {
  lastId = 0;
};
export const circuitsFromPoints = (points: Point[]): Circuit[] =>
  points.map((point) => {
    const id = lastId;
    lastId++;
    return { connections: [], points: [point], size: 1, id };
  });

export const findCircuitWithPoint = (circuits: Circuit[], point: Point) =>
  circuits.find(
    (circuit) => !!circuit.points.find((p) => pointIndex(p) === pointIndex(point)),
  );

export const circuitContainsPoint = (circuit: Circuit, point: Point) => {
  return !!circuit.points.find((p) => _.isEqual(point, p));
};

export const diff = (a: number, b: number): number => Math.abs(a - b);

export const squareDiffs = (a: number, b: number) => Math.pow(diff(a, b), 2);

export const distanceBetweenPoints = (a: Point, b: Point) =>
  Math.sqrt(squareDiffs(a.x, b.x) + squareDiffs(a.y, b.y) + squareDiffs(a.z, b.z));

export const findShortestConnections = (points: Point[], count: number) => {
  let connections: Connection[] = [];
  points.forEach((i, n) =>
    points.slice(n + 1).forEach((j) => {
      const distance = distanceBetweenPoints(i, j);
      const newConnection = { points: [i, j], distance };
      if (distance !== 0) {
        connections.push(newConnection);
      }
    }),
  );
  if (connections.length < count) {
    throw new Error("Not enough connections!");
  }
  const sorted = sortConnections(connections);
  return sorted.slice(0, count);
};

export const connectPoints = (a: Point, b: Point, circuits: Circuit[]) => {
  const connection: Connection = { points: [a, b], distance: distanceBetweenPoints(a, b) };
  const circuitA = findCircuitWithPoint(circuits, a);
  if (!circuitA) throw new Error("No circuit A");
  if (circuitContainsPoint(circuitA, b)) {
    return circuits;
  }
  const circuitB = findCircuitWithPoint(circuits, b);
  if (!circuitB) throw new Error("No circuit B");

  circuitA.connections = [...circuitA.connections, ...circuitB.connections, connection];
  circuitA.points = [...circuitA.points, ...circuitB.points];
  circuitA.size = circuitA.size + circuitB.size;

  _.remove(circuits, (circuit) => circuit.id === circuitB.id);

  return circuits;
};

export const makeBulkConnections = (connection: Connection[], circuits: Circuit[]) => {
  connection.forEach((connection) =>
    connectPoints(connection.points[0], connection.points[1], circuits),
  );
  return circuits;
};

export const combineCircuits = (circuits: Circuit[]) =>
  circuits.reduce((acc, current) => acc * current.size, 1);
