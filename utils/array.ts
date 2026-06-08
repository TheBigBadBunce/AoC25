import _ from "lodash";

export const removeDuplicateElements = <T>(input: T[]) => Array.from(new Set(input));

export const removeSingleValue = <T>(input: T[], value: T) => {
  const index = input.indexOf(value);
  input.splice(index, 1);
  return input;
};

export const removeMultipleValues = <T>(input: T[], value: T, count: number) => {
  for (let i = 0; i < count; i++) {
    input = removeSingleValue(input, value);
  }
  return input;
};

export const countInstances = <T>(input: T[], value: T) => {
  return input.filter((item) => item === value).length;
};

export const pushMultiple = <T>(input: T[], value: T, count: number) =>
  input.push(...Array(count).fill(value));
