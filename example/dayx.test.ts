import { dayXtask1, dayXtask2 } from ".";
import { readBigString } from "../utils/file";

describe("Day X", () => {
  test.skip("Given test data, solves task 1", () => {
    const data = readBigString("dayX/data/data.txt");
    const result = dayXtask1(data);
    expect(result).toEqual(undefined);
  });

  test.skip("Given test data, solves task 2", () => {
    const data = readBigString("dayX/data/data.txt");
    const result = dayXtask2(data);
    expect(result).toEqual(undefined);
  });
});
