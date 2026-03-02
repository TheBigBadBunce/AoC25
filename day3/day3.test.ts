import {
  calculateJoltage,
  calculateMaximum2CellJoltageForRow,
  calculateMaximumJoltageForRow,
  day3task1,
  day3task2,
  findBiggestDigit,
  findIndexOfBiggestDigit,
  getBiggestCellsForRow,
  parseDigit,
  parseDigitArray,
} from ".";
import { readBigString, readRows } from "../utils/file";

describe("Day 3", () => {
  test("Given real data, solves task 1", () => {
    const data = readRows("day3/data/data.txt");
    const result = day3task1(data);
    expect(result).toEqual(16842);
  });

  test("Given test data, solves task 1", () => {
    const data = readRows("day3/data/test.txt");
    const result = day3task1(data);
    expect(result).toEqual(357);
  });

  test("Given test data, solves task 2", () => {
    const data = readRows("day3/data/test.txt");
    const result = day3task2(data);
    expect(result).toEqual(3121910778619);
  });

  test("Calculates maximum 2-cell joltage for a row", () => {
    expect(calculateMaximum2CellJoltageForRow("987654321111111")).toEqual(98);
    expect(calculateMaximum2CellJoltageForRow("811111111111119")).toEqual(89);
    expect(calculateMaximum2CellJoltageForRow("234234234234278")).toEqual(78);
    expect(calculateMaximum2CellJoltageForRow("818181911112111")).toEqual(92);
  });

  test("Calculates maximum 12-cell joltage for a row", () => {
    expect(calculateMaximumJoltageForRow({ row: "987654321111111", cells: 12 })).toEqual(
      987654321111,
    );
    expect(calculateMaximumJoltageForRow({ row: "811111111111119", cells: 12 })).toEqual(
      811111111119,
    );
    expect(calculateMaximumJoltageForRow({ row: "234234234234278", cells: 12 })).toEqual(
      434234234278,
    );
    expect(calculateMaximumJoltageForRow({ row: "818181911112111", cells: 12 })).toEqual(
      888911112111,
    );
  });

  test("Gets 12 biggest cells for a row", () => {
    expect(getBiggestCellsForRow({ row: "987654321111111", cells: 12 })).toEqual([
      9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 1, 1,
    ]);
    expect(getBiggestCellsForRow({ row: "811111111111119", cells: 12 })).toEqual([
      8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9,
    ]);
    expect(getBiggestCellsForRow({ row: "234234234234278", cells: 12 })).toEqual([
      4, 3, 4, 2, 3, 4, 2, 3, 4, 2, 7, 8,
    ]);
    expect(getBiggestCellsForRow({ row: "818181911112111", cells: 12 })).toEqual([
      8, 8, 8, 9, 1, 1, 1, 1, 2, 1, 1, 1,
    ]);
  });

  test("Calculates joltage from 2 integers", () => {
    expect(calculateJoltage([1, 1])).toEqual(11);
    expect(calculateJoltage([9, 1])).toEqual(91);
    expect(calculateJoltage([1, 9])).toEqual(19);
    expect(calculateJoltage([4, 5])).toEqual(45);
    expect(calculateJoltage(["1", "1"])).toEqual(11);
    expect(calculateJoltage(["9", "9"])).toEqual(99);
  });

  test("Calculates joltage from 12 integers", () => {
    expect(calculateJoltage([9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 1, 1])).toEqual(987654321111);
    expect(calculateJoltage([8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9])).toEqual(811111111119);
    expect(calculateJoltage([4, 3, 4, 2, 3, 4, 2, 3, 4, 2, 7, 8])).toEqual(434234234278);
    expect(calculateJoltage([8, 8, 8, 9, 1, 1, 1, 1, 2, 1, 1, 1])).toEqual(888911112111);
  });

  test("Finds the biggest digit in a string", () => {
    expect(findBiggestDigit("1234")).toEqual(4);
    expect(findBiggestDigit("98765432111111")).toEqual(9);
    expect(findBiggestDigit("81111111111111")).toEqual(8);
    expect(findBiggestDigit("23423423423427")).toEqual(7);
    expect(findBiggestDigit("81818191111211")).toEqual(9);
  });

  test("Finds the index of the biggest digit in a string", () => {
    expect(findIndexOfBiggestDigit("1234")).toEqual(3);
    expect(findIndexOfBiggestDigit("98765432111111")).toEqual(0);
    expect(findIndexOfBiggestDigit("81111111111111")).toEqual(0);
    expect(findIndexOfBiggestDigit("23423423423427")).toEqual(13);
    expect(findIndexOfBiggestDigit("81818191111211")).toEqual(6);
  });

  test("Parses a digit from string | number", () => {
    expect(parseDigit("1")).toEqual(1);
    expect(parseDigit("9")).toEqual(9);
    expect(parseDigit(1)).toEqual(1);
    expect(parseDigit(9)).toEqual(9);
  });

  test("Parses a digit array from string | number []", () => {
    expect(
      parseDigitArray([
        "9",
        "8",
        "7",
        "6",
        "5",
        "4",
        "3",
        "2",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
        "1",
      ]),
    ).toEqual([9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1]);
    expect(parseDigitArray([9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1])).toEqual([
      9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1,
    ]);
  });
});
