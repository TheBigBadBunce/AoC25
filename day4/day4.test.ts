import {
  characterIsRoll,
  getAvailableRolls,
  countCharacters,
  getAdjacentCharacter,
  getAllAdjacentCharacters,
  getCharacter,
  Point,
  removeRoll,
  removeRolls,
  getAllAvailableRolls,
} from ".";
import { readBigString, readRows } from "../utils/file";

const testGrid = ["abcde", "fghij", "klmno", "pqrst", "uvwxy"];

describe("Day 4", () => {
  test("Given test data, solves task 1", () => {
    const data = readRows("day4/data/test.txt");
    const result = getAvailableRolls(data);
    expect(result).toHaveLength(13);
  });

  test("Given test data, solves task 2", () => {
    const data = readRows("day4/data/test.txt");
    const result = getAllAvailableRolls(data);
    expect(result).toEqual(43);
  });

  test("Gets a character based on coordinates", () => {
    expect(getCharacter({ data: testGrid, point: [0, 0] })).toEqual("a");
    expect(getCharacter({ data: testGrid, point: [4, 4] })).toEqual("y");
    expect(getCharacter({ data: testGrid, point: [1, 1] })).toEqual("g");
    expect(getCharacter({ data: testGrid, point: [2, 3] })).toEqual("n");
    expect(getCharacter({ data: testGrid, point: [0, 5] })).toEqual(null);
    expect(getCharacter({ data: testGrid, point: [5, 0] })).toEqual(null);
    expect(getCharacter({ data: testGrid, point: [-1, -1] })).toEqual(null);
  });

  test("Gets an adjacent character", () => {
    const data = testGrid;
    let startPoint = [2, 2] as Point;
    expect(getAdjacentCharacter({ data, startPoint, direction: "up" })).toEqual("h");
    expect(getAdjacentCharacter({ data, startPoint, direction: "down" })).toEqual("r");
    expect(getAdjacentCharacter({ data, startPoint, direction: "left" })).toEqual("l");
    expect(getAdjacentCharacter({ data, startPoint, direction: "right" })).toEqual("n");
    expect(getAdjacentCharacter({ data, startPoint, direction: "upleft" })).toEqual("g");
    expect(getAdjacentCharacter({ data, startPoint, direction: "downleft" })).toEqual("q");
    expect(getAdjacentCharacter({ data, startPoint, direction: "upright" })).toEqual("i");
    expect(getAdjacentCharacter({ data, startPoint, direction: "downright" })).toEqual("s");
    startPoint = [0, 0];
    expect(getAdjacentCharacter({ data, startPoint, direction: "up" })).toEqual(null);
    expect(getAdjacentCharacter({ data, startPoint, direction: "left" })).toEqual(null);
    expect(getAdjacentCharacter({ data, startPoint, direction: "upleft" })).toEqual(null);
    startPoint = [4, 4];
    expect(getAdjacentCharacter({ data, startPoint, direction: "down" })).toEqual(null);
    expect(getAdjacentCharacter({ data, startPoint, direction: "right" })).toEqual(null);
    expect(getAdjacentCharacter({ data, startPoint, direction: "downright" })).toEqual(null);

    expect(
      getAdjacentCharacter({ data, startPoint, direction: "left", increment: 2 }),
    ).toEqual("w");
    expect(getAdjacentCharacter({ data, startPoint, direction: "up", increment: 4 })).toEqual(
      "e",
    );
  });

  test("Gets all adjacent characters", () => {
    // Normal 1-distance situations
    let adjacentCharacters = getAllAdjacentCharacters({
      data: testGrid,
      startPoint: [2, 2],
    });
    expect(adjacentCharacters).toEqual(
      expect.arrayContaining(["g", "h", "i", "l", "n", "q", "r", "s"]),
    );
    expect(adjacentCharacters).not.toEqual(expect.arrayContaining([null]));
    adjacentCharacters = getAllAdjacentCharacters({
      data: testGrid,
      startPoint: [1, 3],
    });
    expect(adjacentCharacters).toEqual(
      expect.arrayContaining(["c", "d", "e", "h", "j", "m", "n", "o"]),
    );
    expect(adjacentCharacters).not.toEqual(expect.arrayContaining([null]));
    adjacentCharacters = getAllAdjacentCharacters({
      data: testGrid,
      startPoint: [0, 0],
    });
    expect(adjacentCharacters).toEqual(expect.arrayContaining(["b", "f", "g"]));
    expect(adjacentCharacters).not.toEqual(expect.arrayContaining([null]));

    // Other distances
    adjacentCharacters = getAllAdjacentCharacters({
      data: testGrid,
      startPoint: [2, 2],
      increment: 2,
    });
    // Currently just goes in a straight line
    expect(adjacentCharacters).toEqual(
      expect.arrayContaining(["a", "c", "e", "k", "o", "u", "w", "y"]),
    );
    adjacentCharacters = getAllAdjacentCharacters({
      data: testGrid,
      startPoint: [2, 2],
      increment: 3,
    });
    expect(adjacentCharacters).toEqual([]);

    // Edge case: invalid point
    adjacentCharacters = getAllAdjacentCharacters({
      data: testGrid,
      startPoint: [-1, -1],
    });
    expect(adjacentCharacters).toEqual([]);
  });

  test("Counts matching characters", () => {
    expect(
      countCharacters({ targetCharacter: "@", characters: ["@", "@", "@", "@"] }),
    ).toEqual(4);
    expect(
      countCharacters({
        targetCharacter: "@",
        characters: ["@", "@", " ", " ", " ", "@", "@"],
      }),
    ).toEqual(4);
    expect(
      countCharacters({
        targetCharacter: "@",
        characters: [],
      }),
    ).toEqual(0);
  });

  test("Correctly identifies roll characters", () => {
    expect(characterIsRoll(".")).toEqual(false);
    expect(characterIsRoll(" ")).toEqual(false);
    expect(characterIsRoll("a")).toEqual(false);
    expect(characterIsRoll("@")).toEqual(true);
  });

  test("Removes a roll", () => {
    const data = ["@.@", ".@.", "@.."];
    // Standard cases
    expect(removeRoll({ data, point: [0, 0] })).toEqual(["..@", ".@.", "@.."]);
    expect(removeRoll({ data, point: [2, 0] })).toEqual(["@.@", ".@.", "..."]);
    expect(removeRoll({ data, point: [1, 1] })).toEqual(["@.@", "...", "@.."]);
    // Invalid cases (return default)
    expect(removeRoll({ data, point: [5, 1] })).toEqual(["@.@", ".@.", "@.."]);
    expect(removeRoll({ data, point: [1, 5] })).toEqual(["@.@", ".@.", "@.."]);
    expect(removeRoll({ data, point: [0, -1] })).toEqual(["@.@", ".@.", "@.."]);
    expect(removeRoll({ data, point: [-1, 0] })).toEqual(["@.@", ".@.", "@.."]);
  });

  test("Removes multiple rolls, simple case", () => {
    const data = ["@.@", ".@.", "@.."];
    const newData = removeRolls({
      data,
      points: [
        [0, 0],
        [2, 0],
        [1, 1],
      ],
    });
    expect(newData).toEqual(["..@", "...", "..."]);
  });

  test("Removes multiple rolls, test case", () => {
    const data = [
      "..@@.@@@@.",
      "@@@.@.@.@@",
      "@@@@@.@.@@",
      "@.@@@@..@.",
      "@@.@@@@.@@",
      ".@@@@@@@.@",
      ".@.@.@.@@@",
      "@.@@@.@@@@",
      ".@@@@@@@@.",
      "@.@.@@@.@.",
    ];
    const newData = removeRolls({
      data,
      points: [
        [0, 2],
        [0, 3],
        [0, 5],
        [0, 6],
        [0, 8],
        [1, 0],
        [2, 6],
        [4, 0],
        [4, 9],
        [7, 0],
        [9, 0],
        [9, 2],
        [9, 8],
      ],
    });
    expect(newData).toEqual([
      ".......@..",
      ".@@.@.@.@@",
      "@@@@@...@@",
      "@.@@@@..@.",
      ".@.@@@@.@.",
      ".@@@@@@@.@",
      ".@.@.@.@@@",
      "..@@@.@@@@",
      ".@@@@@@@@.",
      "....@@@...",
    ]);
  });
});
