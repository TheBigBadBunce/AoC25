import {
  day5task1,
  day5task2bruteForce,
  day5task2ranges,
  getIdsInRange,
  getMaxRangeValue,
  idWithinRange,
  ingredientIsFresh,
  maybeMergeRanges,
  mergeOverlappingRanges,
  readRange,
} from ".";
import { readRows } from "../utils/file";

describe("Day 5", () => {
  test("Given test data, solves task 1", () => {
    const data = readRows("day5/data/test.txt");
    const result = day5task1(data);
    expect(result).toEqual(3);
  });

  test("Given test data, solves task 2", () => {
    const data = readRows("day5/data/test.txt");
    const bruteForceResult = day5task2bruteForce(data);
    expect(bruteForceResult).toEqual(14);
    const rangeResult = day5task2ranges(data);
    expect(rangeResult).toEqual(14);
  });

  test("Reads a range from a string", () => {
    expect(readRange("44-57")).toEqual([44, 57]);
    expect(readRange("1-100000")).toEqual([1, 100000]);
  });

  test("Correctly tests whether an ID is within a range", () => {
    expect(idWithinRange({ id: 5, range: [2, 10] })).toEqual(true);
    expect(idWithinRange({ id: 2, range: [2, 10] })).toEqual(true);
    expect(idWithinRange({ id: 10, range: [2, 10] })).toEqual(true);
    expect(idWithinRange({ id: 1, range: [2, 10] })).toEqual(false);
    expect(idWithinRange({ id: 11, range: [2, 10] })).toEqual(false);
    expect(idWithinRange({ id: 45, range: [2, 10] })).toEqual(false);
  });

  test("Correctly checks if an ingredient is fresh (within multiple ranges)", () => {
    const ranges = [
      [3, 5],
      [10, 14],
      [16, 20],
      [12, 18],
    ];
    expect(ingredientIsFresh({ id: 1, ranges })).toEqual(false);
    expect(ingredientIsFresh({ id: 5, ranges })).toEqual(true);
    expect(ingredientIsFresh({ id: 8, ranges })).toEqual(false);
    expect(ingredientIsFresh({ id: 11, ranges })).toEqual(true);
    expect(ingredientIsFresh({ id: 17, ranges })).toEqual(true);
    expect(ingredientIsFresh({ id: 32, ranges })).toEqual(false);
  });

  test("Gets highest possible range value", () => {
    expect(
      getMaxRangeValue([
        [1, 10],
        [100, 2000],
        [4, 123456],
      ]),
    ).toEqual(123456);
  });

  test("Gets all IDs within a range", () => {
    expect(getIdsInRange([1, 10])).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });

  test("Merges a pair of ranges where applicable", () => {
    expect(
      maybeMergeRanges([
        [1, 5],
        [6, 10],
      ]),
    ).toEqual([
      [1, 5],
      [6, 10],
    ]);
    expect(
      maybeMergeRanges([
        [1, 6],
        [5, 10],
      ]),
    ).toEqual([[1, 10]]);
    expect(
      maybeMergeRanges([
        [5, 10],
        [1, 6],
      ]),
    ).toEqual([[1, 10]]);
    expect(
      maybeMergeRanges([
        [3, 5],
        [1, 8],
      ]),
    ).toEqual([[1, 8]]);
    expect(
      maybeMergeRanges([
        [1, 8],
        [3, 5],
      ]),
    ).toEqual([[1, 8]]);
    expect(
      maybeMergeRanges([
        [1, 3],
        [3, 5],
      ]),
    ).toEqual([[1, 5]]);
  });

  test("Merges several ranges where applicable", () => {
    // No overlap
    expect(
      mergeOverlappingRanges([
        [1, 5],
        [6, 10],
      ]),
    ).toEqual([
      [1, 5],
      [6, 10],
    ]);
    // Simple 1 overlap
    expect(
      mergeOverlappingRanges([
        [1, 6],
        [5, 10],
      ]),
    ).toEqual([[1, 10]]);
    // Simple 1 overlap with 1 extra
    expect(
      mergeOverlappingRanges([
        [1, 6],
        [5, 10],
        [15, 20],
      ]),
    ).toEqual([
      [1, 10],
      [15, 20],
    ]);
    // 4 ranges, all overlapping
    expect(
      mergeOverlappingRanges([
        [1, 6],
        [5, 10],
        [9, 15],
        [15, 20],
      ]),
    ).toEqual([[1, 20]]);
    // 4 ranges overlapping, 4 unrelated
    expect(
      mergeOverlappingRanges([
        [1, 6],
        [21, 22],
        [25, 26],
        [9, 15],
        [5, 10],
        [30, 31],
        [15, 20],
        [32, 33],
      ]),
    ).toEqual(
      expect.arrayContaining([
        [1, 20],
        [21, 22],
        [25, 26],
        [30, 31],
        [32, 33],
      ]),
    );
  });
});
