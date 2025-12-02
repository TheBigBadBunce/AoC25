import { compareBlocks, day2, findInvalidIds, splitStringIntoBlocks } from ".";
import { readBigString } from "../utils/file";

describe("Day 2", () => {
  test.skip("Given test data, solves task", () => {
    const data = readBigString("day2/data/test.txt");
    const result = day2(data);
    expect(result).toEqual(1227775554);
  });

  test("Find invalid IDs in range", () => {
    expect(findInvalidIds({ start: 11, end: 22 })).toEqual([11, 22]);
    expect(findInvalidIds({ start: 95, end: 115 })).toEqual([99, 111]);
    expect(findInvalidIds({ start: 998, end: 1012 })).toEqual([999, 1010]);
    expect(findInvalidIds({ start: 1188511880, end: 1188511890 })).toEqual([1188511885]);
    expect(findInvalidIds({ start: 222220, end: 222224 })).toEqual([222222]);
    expect(findInvalidIds({ start: 1698522, end: 1698528 })).toEqual([]);
    expect(findInvalidIds({ start: 446443, end: 446449 })).toEqual([446446]);
    expect(findInvalidIds({ start: 38593856, end: 38593862 })).toEqual([38593859]);
    expect(findInvalidIds({ start: 565653, end: 565659 })).toEqual([565656]);
    expect(findInvalidIds({ start: 824824821, end: 824824827 })).toEqual([824824824]);
    expect(findInvalidIds({ start: 2121212118, end: 2121212124 })).toEqual([2121212121]);
  });

  test("Compare blocks", () => {
    expect(compareBlocks(["1", "1"])).toEqual(true);
    expect(compareBlocks(["12", "12"])).toEqual(true);
    expect(compareBlocks(["123", "123"])).toEqual(true);
    expect(compareBlocks(["321", "123"])).toEqual(false);
    expect(compareBlocks(["321", "1"])).toEqual(false);
  });

  test("Split string into blocks", () => {
    expect(splitStringIntoBlocks({ string: "1188511880", length: 1 })).toEqual([
      "1",
      "1",
      "8",
      "8",
      "5",
      "1",
      "1",
      "8",
      "8",
      "0",
    ]);
    expect(splitStringIntoBlocks({ string: "1188511880", length: 2 })).toEqual([
      "11",
      "88",
      "51",
      "18",
      "80",
    ]);
    expect(splitStringIntoBlocks({ string: "1188511880", length: 3 })).toEqual([
      "118",
      "851",
      "188",
      "0",
    ]);
    expect(splitStringIntoBlocks({ string: "1188511880", length: 4 })).toEqual([
      "1188",
      "5118",
      "80",
    ]);
    expect(splitStringIntoBlocks({ string: "1188511880", length: 5 })).toEqual([
      "11885",
      "11880",
    ]);
    expect(splitStringIntoBlocks({ string: "1188511880", length: 6 })).toEqual([]);
    expect(splitStringIntoBlocks({ string: "1188511880", length: 11 })).toEqual([]);
    expect(splitStringIntoBlocks({ string: "1188511885", length: 5 })).toEqual([
      "11885",
      "11885",
    ]);
  });
});
