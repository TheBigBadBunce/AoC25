import { separateDataBlocks, separateStringGrid, splitCsv } from "./data";
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

  test("CSV numbers are separated correctly", () => {
    const data = readRows("day8/data/test.txt");
    const dataBlocks = splitCsv(data);
    expect(dataBlocks).toEqual([
      [162, 817, 812],
      [57, 618, 57],
      [906, 360, 560],
      [592, 479, 940],
      [352, 342, 300],
      [466, 668, 158],
      [542, 29, 236],
      [431, 825, 988],
      [739, 650, 466],
      [52, 470, 668],
      [216, 146, 977],
      [819, 987, 18],
      [117, 168, 530],
      [805, 96, 715],
      [346, 949, 466],
      [970, 615, 88],
      [941, 993, 340],
      [862, 61, 35],
      [984, 92, 344],
      [425, 690, 689],
    ]);
  });
});
