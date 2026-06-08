import {
  addNewlySplitBeams,
  day7task1,
  day7task2,
  day7task2BruteForce,
  findSources,
  findSourcesDirect,
  findSplitters,
} from ".";
import { readRows } from "../utils/file";
import { findActivatedSplitters } from "./deprecated";

describe("Day 7", () => {
  test("Given test data, solves task 1", () => {
    const data = readRows("day7/data/test.txt");
    const result = day7task1(data);
    expect(result).toEqual(21);
  });

  test("Given test data, solves task 2 with brute force", () => {
    const data = readRows("day7/data/test.txt");
    const result = day7task2BruteForce(data);
    expect(result).toEqual(40);
  });

  test("Given test data, solves task 2 without brute force", () => {
    const data = readRows("day7/data/test.txt");
    const result = day7task2(data);
    expect(result).toEqual(40);
  });

  test("Finds activated splitters for a row", () => {
    expect(findActivatedSplitters({ row: ".....", beams: [2] })).toEqual([]);
    expect(findActivatedSplitters({ row: "..^..", beams: [2] })).toEqual([2]);
    expect(findActivatedSplitters({ row: ".^.^.", beams: [1, 3] })).toEqual([1, 3]);
    expect(findActivatedSplitters({ row: ".^.^.", beams: [1] })).toEqual([1]);

    expect(findActivatedSplitters({ row: ".....^.^.^.....", beams: [5, 7, 9] })).toEqual([
      5, 7, 9,
    ]);
    expect(findActivatedSplitters({ row: "....^.^...^....", beams: [4, 6, 8, 10] })).toEqual([
      4, 6, 10,
    ]);
    expect(findActivatedSplitters({ row: "...^.^...^.^...", beams: [3, 5, 9, 11] })).toEqual([
      3, 5, 9, 11,
    ]);
  });

  test("Adds new beams after splitting and counts splits", () => {
    // Now includes dupes (they are filtered out elsewhere)
    expect(addNewlySplitBeams({ beams: [], splitters: [] })).toEqual({ beams: [], splits: 0 });
    expect(addNewlySplitBeams({ beams: [2], splitters: [2] })).toEqual({
      beams: [1, 3],
      splits: 1,
    });
    expect(addNewlySplitBeams({ beams: [2, 4], splitters: [2] })).toEqual({
      beams: [1, 3, 4],
      splits: 1,
    });
    expect(addNewlySplitBeams({ beams: [2, 4], splitters: [2, 4] })).toEqual({
      beams: [1, 3, 3, 5],
      splits: 2,
    });
    expect(addNewlySplitBeams({ beams: [4, 6, 8, 10], splitters: [4, 6, 10] })).toEqual({
      beams: [3, 5, 5, 7, 8, 9, 11],
      splits: 3,
    });
  });

  test("Finds appropriate characters", () => {
    expect(findSplitters("..^.^")).toEqual([2, 4]);
    expect(findSources(".S...")).toEqual([1]);
  });

  test("Finds appropriate characters", () => {
    expect(findSourcesDirect(".S...")).toEqual([0, 1, 0, 0, 0]);
    expect(findSourcesDirect(".S.SS")).toEqual([0, 1, 0, 1, 1]);
  });
});
