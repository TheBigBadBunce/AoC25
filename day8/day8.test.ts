import { size } from "lodash";
import {
  circuitContainsPoint,
  circuitsFromPoints,
  circuitsIndex,
  combineCircuits,
  connectPoints,
  day8task1,
  day8task2,
  diff,
  distanceBetweenPoints,
  findCircuitWithPoint,
  findShortestConnections,
  getMaxConnectionsForPoints,
  makeBulkConnections,
  pointIndex,
  readPointsFromData,
  resetLastId,
  sortCircuits,
  sortPoints,
  squareDiffs,
} from ".";
import { splitCsv } from "../utils/data";
import { readRows } from "../utils/file";
import {
  basicState,
  firstConnection,
  onePointCircuits,
  parsedTestData,
  secondConnection,
  simplePoints,
} from "./fixtures";
import { Circuit } from "./types";
import _ from "lodash";

const testData = splitCsv(readRows("day8/data/test.txt"));

describe("Day 8", () => {
  beforeEach(() => resetLastId());

  test("Given test data, solves task 1", () => {
    const result = day8task1(_.clone(testData), 10, 3);
    expect(result).toEqual(40);
  });

  test("Given test data, solves task 2", () => {
    const result = day8task2(_.clone(testData));
    expect(result).toEqual(25272);
  });

  test("Gets correct number of max connections for n points", () => {
    expect(getMaxConnectionsForPoints(1)).toEqual(0);
    expect(getMaxConnectionsForPoints(2)).toEqual(1);
    expect(getMaxConnectionsForPoints(3)).toEqual(3);
    expect(getMaxConnectionsForPoints(4)).toEqual(6);
    expect(getMaxConnectionsForPoints(5)).toEqual(10);
    expect(getMaxConnectionsForPoints(6)).toEqual(15);
  });

  test("Sorts points", () => {
    expect(
      sortPoints([
        { x: 10, y: 10, z: 10 },
        { x: 30, y: 10, z: 10 },
        { x: 20, y: 10, z: 10 },
      ]),
    ).toEqual([
      { x: 10, y: 10, z: 10 },
      { x: 20, y: 10, z: 10 },
      { x: 30, y: 10, z: 10 },
    ]);
    expect(
      sortPoints([
        { x: 10, y: 30, z: 10 },
        { x: 10, y: 20, z: 10 },
        { x: 10, y: 10, z: 10 },
      ]),
    ).toEqual([
      { x: 10, y: 10, z: 10 },
      { x: 10, y: 20, z: 10 },
      { x: 10, y: 30, z: 10 },
    ]);
    expect(
      sortPoints([
        { x: 10, y: 10, z: 20 },
        { x: 10, y: 10, z: 10 },
        { x: 10, y: 10, z: 30 },
      ]),
    ).toEqual([
      { x: 10, y: 10, z: 10 },
      { x: 10, y: 10, z: 20 },
      { x: 10, y: 10, z: 30 },
    ]);
  });

  test("Sorts circuits by size", () => {
    expect(sortCircuits(_.cloneDeep(onePointCircuits))).toEqual(onePointCircuits);
    expect(
      sortCircuits([
        { size: 1 },
        { size: 3 },
        { size: 2 },
        { size: 1 },
      ] as unknown as Circuit[]),
    ).toEqual([{ size: 3 }, { size: 2 }, { size: 1 }, { size: 1 }]);
  });

  test("Generates an index value for a point", () => {
    expect(pointIndex({ x: 12345, y: 34567, z: 7890 })).toEqual(123453456707890);
  });

  test("Reads points", () => {
    expect(readPointsFromData([[1, 2, 3]])).toEqual([{ x: 1, y: 2, z: 3 }]);
    expect(readPointsFromData(_.clone(testData))).toEqual(parsedTestData);
  });

  test("Generates circuits from points", () => {
    expect(circuitsFromPoints(simplePoints)).toEqual(onePointCircuits);
  });

  test("Given a point, finds the circuit with it", () => {
    expect(findCircuitWithPoint(onePointCircuits, { x: 216, y: 146, z: 977 })).toEqual({
      connections: [],
      points: [{ x: 216, y: 146, z: 977 }],
      size: 1,
      id: 1,
    });
  });

  test("Checks whether a circuit contains a point", () => {
    expect(circuitContainsPoint(onePointCircuits[0], simplePoints[0])).toEqual(true);
    expect(circuitContainsPoint(onePointCircuits[0], simplePoints[2])).toEqual(false);
    expect(circuitContainsPoint(onePointCircuits[2], simplePoints[0])).toEqual(false);
    expect(circuitContainsPoint(onePointCircuits[2], simplePoints[2])).toEqual(true);
  });

  test("gets the difference between 2 numbers", () => {
    expect(diff(1, 1)).toEqual(0);
    expect(diff(5, 1)).toEqual(4);
    expect(diff(1, 5)).toEqual(4);
    expect(diff(1, -1)).toEqual(2);
    expect(diff(-1, 1)).toEqual(2);
  });

  test("Squares the difference between 2 numbers", () => {
    expect(squareDiffs(1, 1)).toEqual(0);
    expect(squareDiffs(5, 1)).toEqual(16);
    expect(squareDiffs(1, 5)).toEqual(16);
    expect(squareDiffs(1, -1)).toEqual(4);
    expect(squareDiffs(-1, 1)).toEqual(4);
  });

  test("Finds the distance between 2 points", () => {
    expect(distanceBetweenPoints(simplePoints[0], simplePoints[0])).toEqual(0);
    expect(distanceBetweenPoints(simplePoints[0], simplePoints[1])).toBeCloseTo(476.82);
    expect(distanceBetweenPoints(simplePoints[0], simplePoints[2])).toBeCloseTo(1130.52);
    expect(distanceBetweenPoints(simplePoints[1], simplePoints[0])).toBeCloseTo(476.82);
    expect(distanceBetweenPoints(simplePoints[1], simplePoints[1])).toEqual(0);
    expect(distanceBetweenPoints(simplePoints[1], simplePoints[2])).toBeCloseTo(1410.88);
    expect(distanceBetweenPoints(simplePoints[2], simplePoints[0])).toBeCloseTo(1130.52);
    expect(distanceBetweenPoints(simplePoints[2], simplePoints[1])).toBeCloseTo(1410.88);
    expect(distanceBetweenPoints(simplePoints[2], simplePoints[2])).toEqual(0);
  });

  test("Finds the shortest connection between all points, single result", () => {
    expect(findShortestConnections(simplePoints, 1)).toEqual([
      expect.objectContaining({
        points: [
          { x: 52, y: 470, z: 668 },
          { x: 216, y: 146, z: 977 },
        ],
        distance: expect.closeTo(476.82),
      }),
    ]);
  });

  test("Finds the shortest connections between all points, in order", () => {
    expect(findShortestConnections(simplePoints, 3)).toEqual([
      expect.objectContaining({
        points: [
          { x: 52, y: 470, z: 668 },
          { x: 216, y: 146, z: 977 },
        ],
        distance: expect.closeTo(476.82),
      }),
      expect.objectContaining({
        points: [
          { x: 52, y: 470, z: 668 },
          { x: 819, y: 987, z: 18 },
        ],
        distance: expect.closeTo(1130.52),
      }),
      expect.objectContaining({
        points: [
          { x: 216, y: 146, z: 977 },
          { x: 819, y: 987, z: 18 },
        ],
        distance: expect.closeTo(1410.88),
      }),
    ]);
  });

  test("Connects points and merges circuits", () => {
    const state = _.cloneDeep(basicState);
    connectPoints(simplePoints[0], simplePoints[1], state.circuits);
    expect(state).toEqual(firstConnection);
    connectPoints(simplePoints[0], simplePoints[2], state.circuits);
    expect(state).toEqual(secondConnection);
  });

  test("Maintains state when 2 points are already in a circuit", () => {
    const state = _.clone(secondConnection);
    connectPoints(simplePoints[0], simplePoints[1], state.circuits);
    expect(state).toEqual(secondConnection);
  });

  test("Adds multiple connections", () => {
    expect(makeBulkConnections([], _.cloneDeep(basicState).circuits)).toEqual(
      basicState.circuits,
    );
    expect(
      makeBulkConnections(
        [
          {
            points: [
              { x: 52, y: 470, z: 668 },
              { x: 216, y: 146, z: 977 },
            ],
            distance: 476.82,
          },
          {
            points: [
              { x: 52, y: 470, z: 668 },
              { x: 819, y: 987, z: 18 },
            ],
            distance: 1130.52,
          },
          {
            points: [
              { x: 216, y: 146, z: 977 },
              { x: 819, y: 987, z: 18 },
            ],
            distance: 1410.88,
          },
        ],
        _.cloneDeep(basicState).circuits,
      ),
    ).toEqual(secondConnection.circuits);
  });

  test("Calculates size of combined circuit", () => {
    expect(combineCircuits(onePointCircuits)).toEqual(1);
  });
});
