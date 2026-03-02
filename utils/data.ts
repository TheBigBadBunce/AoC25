import { readBigString, readCsvArray, readNumberArray, readRows } from "./file";

export const range = (n: number): number[] => [...Array(n).keys()];

export const allData = {
  day1: readRows("day1/data/data.txt"),
  day2: readBigString("day2/data/data.txt"),
  day3: readRows("day3/data/data.txt"),
  day4: readRows("day4/data/data.txt"),
};
