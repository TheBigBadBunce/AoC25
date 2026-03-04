import { dayXtask1, dayXtask2 } from ".";
import { readRows } from "../utils/file";

describe("Day X", () => {
  test.skip("Given test data, solves task 1", () => {
    const data = readRows("dayX/data/test.txt");
    const result = dayXtask1(data);
    expect(result).toEqual(undefined);
  });

  test.skip("Given test data, solves task 2", () => {
    const data = readRows("dayX/data/test.txt");
    const result = dayXtask2(data);
    expect(result).toEqual(undefined);
  });
});
