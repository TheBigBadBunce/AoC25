import { readCsvArray, readNumberArray } from "./file";

describe("File functions", () => {
  test("CSV is parsed correctly as strings", () => {
    const data = readCsvArray("utils/testFiles/test.csv");
    expect(data).toEqual([
      ["3", "4"],
      ["4", "3"],
      ["2", "5"],
      ["1", "3"],
      ["3", "9"],
      ["3", "3"],
    ]);
  });

  test("CSV is parsed to other types", () => {
    const data = readCsvArray("utils/testFiles/test.csv", "number");
    expect(data).toEqual([
      [3, 4],
      [4, 3],
      [2, 5],
      [1, 3],
      [3, 9],
      [3, 3],
    ]);
  });
  test("Number file is parsed to strings", () => {
    const data = readNumberArray("utils/testFiles/test.txt");
    expect(data).toEqual([
      [7, 6, 4, 2, 1],
      [1, 2, 7, 8, 9],
      [9, 7, 6, 2, 1],
      [1, 3, 2, 4, 5],
      [8, 6, 4, 4, 1],
      [1, 3, 6, 7, 9],
    ]);
  });
});
