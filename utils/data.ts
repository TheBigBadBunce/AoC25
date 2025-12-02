import { readBigString, readCsvArray, readNumberArray, readRows } from "./file";

export const range = (n: number): number[] => [...Array(n).keys()];

export const allData = {
  day1: readRows("day1/data/data.txt"),
};
