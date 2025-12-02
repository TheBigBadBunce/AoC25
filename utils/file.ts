import { parse } from "csv-parse/sync";
import { assertNever } from "./types";
import fs from "fs";

export const readBigString = (filename: string): string =>
  fs.readFileSync(filename, "utf-8");

export const readRows = (filename: string): string[] => {
  const fileContent = readBigString(filename);
  const rows = fileContent.split("\n");
  return rows;
};

export const readNumberArray = (filename: string): number[][] => {
  const rows = readRows(filename);
  return rows.map((row) => {
    const cells = row.split(" ");
    return cells.map((cell) => parseInt(cell));
  });
};

export const readCsvArray = <T>(filename: string, cast?: CastType): T[][] => {
  const fileContent = readBigString(filename);
  const data = parse(fileContent, {
    cast: castFn<T>(cast || "string"),
  });
  return data as T[][];
};

// DEPRECATED

type CastType = "string" | "number";

const castFn =
  <T>(cast: CastType) =>
  (value: string) => {
    switch (cast) {
      case "number":
        return parseInt(value);
      case "string":
        return value;
      default:
        assertNever(cast);
        throw new Error("Type not implemented for cast: " + cast);
    }
  };
