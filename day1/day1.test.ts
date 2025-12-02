import { decodeDoor, rotateDial } from ".";
import { readBigString, readRows } from "../utils/file";

describe("Day 1", () => {
  // No longer valid with click logic
  test.skip("Given test data, solves task 1", () => {
    const data = readRows("day1/data/test.txt");
    const result = decodeDoor(data);
    expect(result).toEqual(3);
  });

  test("Dial rotation, position", () => {
    expect(rotateDial({ position: 11, input: "R8" })).toMatchObject({ position: 19 });
    expect(rotateDial({ position: 19, input: "L19" })).toMatchObject({ position: 0 });
    expect(rotateDial({ position: 0, input: "L1" })).toMatchObject({ position: 99 });
    expect(rotateDial({ position: 99, input: "R1" })).toMatchObject({ position: 0 });
    expect(rotateDial({ position: 5, input: "L10" })).toMatchObject({ position: 95 });
    expect(rotateDial({ position: 95, input: "R10" })).toMatchObject({ position: 5 });
  });

  test("Dial rotation, clicks", () => {
    expect(rotateDial({ position: 11, input: "R8" })).toMatchObject({ clicks: 0 });
    expect(rotateDial({ position: 19, input: "L19" })).toMatchObject({ clicks: 1 });
    expect(rotateDial({ position: 0, input: "L1" })).toMatchObject({ clicks: 0 });
    expect(rotateDial({ position: 99, input: "R1" })).toMatchObject({ clicks: 1 });
    expect(rotateDial({ position: 5, input: "L10" })).toMatchObject({ clicks: 1 });
    expect(rotateDial({ position: 95, input: "R10" })).toMatchObject({ clicks: 1 });
    expect(rotateDial({ position: 95, input: "R200" })).toMatchObject({ clicks: 2 });
    expect(rotateDial({ position: 5, input: "L700" })).toMatchObject({ clicks: 7 });
  });

  test.skip("Given test data, solves task 2", () => {
    const data = readRows("day1/data/test.txt");
    const result = decodeDoor(data);
    expect(result).toEqual(6);
  });
});
