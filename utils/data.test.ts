import { separateDataBlocks, separateStringGrid } from "./data";
import { readCsvArray, readNumberArray, readRows } from "./file";

describe("Data functions", () => {
  test("Data block is separated correctly", () => {
    const data = readRows("day5/data/test.txt");
    const dataBlocks = separateDataBlocks(data);
    expect(dataBlocks).toEqual([
      ["3-5", "10-14", "16-20", "12-18"],
      ["1", "5", "8", "11", "17", "32"],
    ]);
  });

  test("Strings in a grid are separated correctly", () => {
    const data = readRows("day6/data/test.txt");
    const dataBlocks = separateStringGrid(data);
    expect(dataBlocks).toEqual([
      ["123", "328", "51", "64"],
      ["45", "64", "387", "23"],
      ["6", "98", "215", "314"],
      ["*", "+", "*", "+"],
    ]);
  });
});
