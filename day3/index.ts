import _, { reduce } from "lodash";

export const day3task1 = (data: string[]) => {
  // Sum maximum joltages for rows
  return data.reduce((acc, row) => {
    return acc + calculateMaximum2CellJoltageForRow(row);
  }, 0);
};

export const day3task2 = (data: string[]) => {
  // Sum maximum joltages for rows
  return data.reduce((acc, row) => {
    return acc + calculateMaximumJoltageForRow({ row, cells: 12 });
  }, 0);
};

export const calculateMaximumJoltageForRow = (input: { row: string; cells: number }) => {
  return calculateJoltage(getBiggestCellsForRow(input));
};

export const calculateMaximum2CellJoltageForRow = (row: string): number => {
  // Get biggest possible first digit index, search all but last character
  const d1SearchString = row.slice(0, row.length - 1);
  const d1Index = findIndexOfBiggestDigit(d1SearchString);
  // Get biggest possible second digit, search rest of string after first character
  const d2SearchString = row.slice(d1Index + 1);
  const d2Index = d1Index + 1 + findIndexOfBiggestDigit(d2SearchString);
  // Add em up
  return calculateJoltage([row[d1Index], row[d2Index]]);
};

export const getBiggestCellsForRow = ({
  row,
  cells,
}: {
  row: string;
  cells: number;
}): number[] => {
  if (cells === 0) {
    return [];
  }
  const searchString = row.slice(0, row.length - (cells - 1));
  const cellIndex = findIndexOfBiggestDigit(searchString);
  const cellsForRestOfRow = getBiggestCellsForRow({
    row: row.slice(cellIndex + 1),
    cells: cells - 1,
  });
  return [parseDigit(searchString[cellIndex]), ...cellsForRestOfRow];
};

export const calculateJoltage = (digits: number[] | string[]) => {
  digits = parseDigitArray(digits);
  return digits.reduce((acc, digitOrString) => {
    const digit = parseDigit(digitOrString);
    return acc * 10 + digit;
  }, 0);
};

export const parseDigitArray = (input: (string | number)[]) => input.map(parseDigit);

export const parseDigit = (input: string | number) =>
  typeof input === "string" ? parseInt(input) : input;

// Unused; improved upon by findIndexOfBiggestDigit below to get index
export const findBiggestDigit = (digits: string) => {
  let biggestDigit = 0;
  for (let digit of digits) {
    if (parseInt(digit) > biggestDigit) {
      biggestDigit = parseInt(digit);
    }
  }
  return biggestDigit;
};

export const findIndexOfBiggestDigit = (digits: string) => {
  let biggestDigit = 0;
  let index = 0;
  for (let i = 0; i < digits.length; i++) {
    const digit = parseInt(digits[i]);
    if (digit > biggestDigit) {
      biggestDigit = digit;
      index = i;
    }
  }
  return index;
};
