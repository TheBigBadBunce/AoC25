import { findCharacterInstances } from "./string";

describe("String functions", () => {
  test("Finds character indices", () => {
    expect(findCharacterInstances({ row: ".....", character: "^" })).toEqual([]);
    expect(findCharacterInstances({ row: "..^..", character: "^" })).toEqual([2]);
    expect(findCharacterInstances({ row: "12345", character: "4" })).toEqual([3]);
    expect(findCharacterInstances({ row: ".^^.^", character: "^" })).toEqual([1, 2, 4]);
  });
});
