import { day9task1, day9task2, findLargestRectangle, getArea } from ".";
import { splitCsv } from "../utils/data";
import { readRows } from "../utils/file";

describe("Day 9", () => {
  test("Given test data, solves task 1", () => {
    const data = splitCsv(readRows("day9/data/test.txt"));
    const result = day9task1(data);
    expect(result).toEqual(50);
  });

  test.skip("Given test data, solves task 2", () => {
    const data = readRows("day9/data/test.txt");
    const result = day9task2(data);
    expect(result).toEqual(undefined);
  });

  test("Gets the area of a square", () => {
    expect(
      getArea([
        [1, 1],
        [1, 1],
      ]),
    ).toEqual(1);
    expect(
      getArea([
        [1, 1],
        [1, 3],
      ]),
    ).toEqual(3);
    expect(
      getArea([
        [1, 1],
        [4, 4],
      ]),
    ).toEqual(16);
    expect(
      getArea([
        [1, 1],
        [-1, -1],
      ]),
    ).toEqual(9);
  });

  test("Finds the biggest rectangle in an area", () => {
    expect(findLargestRectangle([])).toEqual(0);
    expect(
      findLargestRectangle([
        [1, 1],
        [5, 1],
        [3, 4],
      ]),
    ).toEqual(12);
  });
});
