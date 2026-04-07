import {
  add,
  buildCalculationsHorizontal,
  buildCalculationsVertical,
  calculate,
  day6task1,
  day6task2,
  flip2DArray,
  multiply,
  parseRowToInt,
} from ".";
import { separateStringGrid } from "../utils/data";
import { readRows } from "../utils/file";

describe("Day 6", () => {
  test("Given test data, solves task 1", () => {
    const data = separateStringGrid(readRows("day6/data/test.txt"));
    const result = day6task1(data);
    expect(result).toEqual(4277556);
  });

  test("Given test data, solves task 2", () => {
    const data = readRows("day6/data/test.txt");
    const result = day6task2(data);
    expect(result).toEqual(3263827);
  });

  test("Builds calculations correctly (horizontal)", () => {
    const data = separateStringGrid(readRows("day6/data/test.txt"));
    expect(buildCalculationsHorizontal(data)).toEqual([
      { func: "*", values: [123, 45, 6] },
      { func: "+", values: [328, 64, 98] },
      { func: "*", values: [51, 387, 215] },
      { func: "+", values: [64, 23, 314] },
    ]);
  });

  test("Maths functions", () => {
    expect(add([1, 1])).toEqual(2);
    expect(add([1, 2])).toEqual(3);
    expect(add([1, 2, 3])).toEqual(6);
    expect(add([1, 2, 4, 10, 12])).toEqual(29);

    expect(multiply([1, 1])).toEqual(1);
    expect(multiply([1, 2])).toEqual(2);
    expect(multiply([1, 2, 3])).toEqual(6);
    expect(multiply([1, 2, 4, 10, 12])).toEqual(960);

    expect(calculate({ func: "+", values: [1, 2, 4, 10] })).toEqual(17);
    expect(calculate({ func: "*", values: [1, 2, 4, 10] })).toEqual(80);
  });

  test("Flips a 2D array", () => {
    const input = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    expect(flip2DArray(input)).toEqual([
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ]);
  });

  test("Parses a row to value correctly", () => {
    expect(parseRowToInt(["1", " ", " ", "*"])).toEqual(1);
    expect(parseRowToInt(["2", "4", " ", " "])).toEqual(24);
    expect(parseRowToInt(["3", "5", "6", " "])).toEqual(356);
    expect(parseRowToInt(["3", "6", "9", "+"])).toEqual(369);
    expect(parseRowToInt(["2", "4", "8", " "])).toEqual(248);
    expect(parseRowToInt(["8", " ", " ", " "])).toEqual(8);
    expect(parseRowToInt([" ", "3", "2", "*"])).toEqual(32);
    expect(parseRowToInt(["5", "8", "1", " "])).toEqual(581);
    expect(parseRowToInt(["1", "7", "5", " "])).toEqual(175);
    expect(parseRowToInt(["6", "2", "3", "+"])).toEqual(623);
    expect(parseRowToInt(["4", "3", "1", " "])).toEqual(431);
    expect(parseRowToInt([" ", " ", "4", " "])).toEqual(4);
  });
});
