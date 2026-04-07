import _ from "lodash";
import { assertNever } from "../utils/types";

type Function = "+" | "*";
type Calculation = { func: Function; values: number[] };

export const day6task1 = (data: string[][]) => {
  const calculations = buildCalculationsHorizontal(data);
  return _.sum(calculations.map(calculate));
};

export const day6task2 = (data: string[]) => {
  let total = 0;
  let currentFunction: Function = "+"; //dummy value
  let currentValues: number[] = [];

  const flipped = flip2DArray<string>(data.map((row) => row.split("")));
  flipped.forEach((row) => {
    if (isEmptyRow(row)) {
      // Empty row, push result to total
      total += calculate({
        func: currentFunction,
        values: currentValues, //todo
      });
      currentValues = [];
    } else {
      const newFunction = row[row.length - 1];
      if (newFunction !== " ") {
        // Function change
        currentFunction = newFunction as Function;
      }
      currentValues.push(parseRowToInt(row));
    }
  });
  return total;
};

export const parseRowToInt = (row: string[]) => parseInt(row.join(""));

export const isEmptyRow = (row: string[]) => row.every((cell) => cell === " ");

export const flip2DArray = <T>(array: T[][]) =>
  array[0].map((_, colIndex) => array.map((row) => row[colIndex]));

export const buildCalculationsHorizontal = (data: string[][]) => {
  let calculations: Partial<Calculation>[] = [];
  data.forEach((row) => {
    for (let j = 0; j < row.length; j++) {
      const cell = row[j];
      const value = parseInt(cell);
      // If calc doesn't exist, create it
      if (!calculations[j]) {
        calculations.push({ values: [] });
      }
      if (!Number.isNaN(value)) {
        // If it's a number, add to values
        calculations[j].values?.push(value);
      } else {
        // If it's anything else, set calc type
        calculations[j].func = cell as Function;
      }
    }
  });
  return calculations as Calculation[];
};

export const buildCalculationsVertical = (data: string[][]) => {
  let calculations: Partial<Calculation>[] = [];
  data.forEach((row) => {
    for (let j = 0; j < row.length; j++) {
      const cell = row[j];
      const value = parseInt(cell);
      // If calc doesn't exist, create it
      if (!calculations[j]) {
        calculations.push({ values: [] });
      }
      if (!Number.isNaN(value)) {
        // If it's a number, add to values
        calculations[j].values?.push(value);
      } else {
        // If it's anything else, set calc type
        calculations[j].func = cell as Function;
      }
    }
  });
  return calculations as Calculation[];
};

export const calculate = ({ func, values }: Calculation) => {
  switch (func) {
    case "*":
      return multiply(values);
    case "+":
      return add(values);
    default:
      assertNever(func);
      throw new Error("Unknown function: " + func);
  }
};

export const add = (values: number[]) => {
  return values.reduce((acc, current) => acc + current, 0);
};

export const multiply = (values: number[]) => {
  return values.reduce((acc, current) => acc * current, 1);
};
