import {
  countInstances,
  pushMultiple,
  removeDuplicateElements,
  removeMultipleValues,
  removeSingleValue,
} from "./array";

test("Removes duplicate elements", () => {
  expect(removeDuplicateElements([])).toEqual([]);
  expect(removeDuplicateElements([1])).toEqual([1]);
  expect(removeDuplicateElements([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  expect(removeDuplicateElements([1, 2, 2, 3, 4])).toEqual([1, 2, 3, 4]);
  expect(removeDuplicateElements([1, 1, 1, 1, 1, 1, 1, 1])).toEqual([1]);
});

test("Removes a single matching value", () => {
  expect(removeSingleValue([], 1)).toEqual([]);
  expect(removeSingleValue([1], 1)).toEqual([]);
  expect(removeSingleValue([1, 2, 3], 1)).toEqual([2, 3]);
  expect(removeSingleValue([1, 2, 3], 2)).toEqual([1, 3]);
  expect(removeSingleValue([1, 2, 3], 3)).toEqual([1, 2]);
});

test("Removes multiple matching values", () => {
  expect(removeMultipleValues([], 1, 1)).toEqual([]);
  expect(removeMultipleValues([], 1, 3)).toEqual([]);
  expect(removeMultipleValues([1], 1, 1)).toEqual([]);
  expect(removeMultipleValues([1], 1, 0)).toEqual([1]);
  expect(removeMultipleValues([1], 1, 3)).toEqual([]);
  expect(removeMultipleValues([1, 2, 3], 1, 1)).toEqual([2, 3]);
  expect(removeMultipleValues([1, 2, 3], 2, 1)).toEqual([1, 3]);
  expect(removeMultipleValues([1, 2, 3], 3, 1)).toEqual([1, 2]);
});

test("Counts instances of a value", () => {
  expect(countInstances([], 1)).toEqual(0);
  expect(countInstances([1], 1)).toEqual(1);
  expect(countInstances([1, 1, 1, 1, 1], 1)).toEqual(5);
  expect(countInstances([1, 2, 3, 4, 5], 3)).toEqual(1);
  expect(countInstances([1, 2, 3, 3, 3, 3, 4, 4, 5], 3)).toEqual(4);
});

describe("Pushes the same value multiple times to an array", () => {
  test("Empty, no values", () => {
    const baseArray: number[] = [];
    pushMultiple(baseArray, 0, 0);
    expect(baseArray).toEqual([]);
  });
  test("Empty, single value", () => {
    const baseArray: number[] = [];
    pushMultiple(baseArray, 0, 1);
    expect(baseArray).toEqual([0]);
  });
  test("Empty, several values", () => {
    const baseArray: number[] = [];
    pushMultiple(baseArray, 0, 5);
    expect(baseArray).toEqual([0, 0, 0, 0, 0]);
  });
  test("Matching values", () => {
    const baseArray: number[] = [0, 0, 0];
    pushMultiple(baseArray, 0, 3);
    expect(baseArray).toEqual([0, 0, 0, 0, 0, 0]);
  });
  test("Varied values", () => {
    const baseArray: number[] = [1, 2, 3, 4];
    pushMultiple(baseArray, 2, 3);
    expect(baseArray).toEqual([1, 2, 3, 4, 2, 2, 2]);
  });
});
