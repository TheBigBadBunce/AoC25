import { readBigString, readCsvArray, readNumberArray, readRows } from "./file";

export const range = (n: number): number[] => [...Array(n).keys()];

export const separateDataBlocks = (data: string[]) => {
  const dataBlocks: string[][] = [];

  let dataBlock: string[] = [];
  data.forEach((row) => {
    if (row === "") {
      dataBlocks.push(dataBlock);
      dataBlock = [];
    } else {
      dataBlock.push(row);
    }
  });
  // May cause issues if last line is empty
  dataBlocks.push(dataBlock);

  return dataBlocks;
};

export const separateStringGrid = (data: string[]) => {
  return data.map((row) => row.split(" ").filter((cell) => cell !== ""));
};

const day6 = readRows("day6/data/data.txt");

export const allData = {
  day1: readRows("day1/data/data.txt"),
  day2: readBigString("day2/data/data.txt"),
  day3: readRows("day3/data/data.txt"),
  day4: readRows("day4/data/data.txt"),
  day5: readRows("day5/data/data.txt"),
  day6: { grid: separateStringGrid(day6), rows: day6 },
  day7: readRows("day7/data/data.txt"),
};
