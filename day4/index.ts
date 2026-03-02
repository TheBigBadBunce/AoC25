import _ from "lodash";
import { forEachCharacter } from "../utils/string";
import { assertNever } from "../utils/types";

const directions = [
  "up",
  "down",
  "left",
  "right",
  "upright",
  "downright",
  "upleft",
  "downleft",
] as const;
type Direction = (typeof directions)[number];

export type Point = [number, number];

export const getAllAvailableRolls = (data: string[]) => {
  let totalAvailableRollsCount = 0;
  let availableRolls: Point[] = [];

  do {
    availableRolls = getAvailableRolls(data);
    totalAvailableRollsCount += availableRolls.length;
    data = removeRolls({ data, points: availableRolls });
  } while (availableRolls.length > 0);

  return totalAvailableRollsCount;
};

export const getAvailableRolls = (data: string[]) => {
  let availableRolls: Point[] = [];

  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    for (let j = 0; j < row.length; j++) {
      const point = [i, j] as Point;
      const value = getCharacter({ data, point });
      // First check roll is present
      if (value === "@") {
        const adjacentCharacters = getAllAdjacentCharacters({ data, startPoint: point });
        const adjacentRollCount = countCharacters({
          characters: adjacentCharacters,
          targetCharacter: "@",
        });
        if (adjacentRollCount < 4) {
          availableRolls.push([i, j]);
        }
      }
    }
  }

  return availableRolls;
};

export const removeRolls = ({ data, points }: { data: string[]; points: Point[] }) => {
  let workingData = [...data];

  points.forEach((point) => {
    workingData = removeRoll({ data: workingData, point });
  });

  return workingData;
};

export const removeRoll = ({ data, point }: { data: string[]; point: Point }) => {
  if (point[0] >= data.length || point[0] < 0) {
    return data;
  }
  const relevantRow = data[point[0]];
  if (point[1] >= relevantRow.length || point[1] < 0) {
    return data;
  }

  const newRow =
    relevantRow.substring(0, point[1]) + "." + relevantRow.substring(point[1] + 1);
  const updatedData = [...data];
  updatedData.splice(point[0], 1, newRow);
  return updatedData;
};

export const characterIsRoll = (character: string) => character === "@";

export const countCharacters = ({
  characters,
  targetCharacter,
}: {
  characters: (string | null)[];
  targetCharacter: string;
}) => characters.filter((character) => character === targetCharacter).length;

export const getAllAdjacentCharacters = ({
  data,
  startPoint,
  increment = 1,
}: {
  data: string[];
  startPoint: Point;
  increment?: number;
}) => {
  if (getCharacter({ point: startPoint, data }) === null) {
    return [];
  }
  return [
    getAdjacentCharacter({ data, startPoint, increment, direction: "up" }),
    getAdjacentCharacter({ data, startPoint, increment, direction: "down" }),
    getAdjacentCharacter({ data, startPoint, increment, direction: "left" }),
    getAdjacentCharacter({ data, startPoint, increment, direction: "right" }),
    getAdjacentCharacter({ data, startPoint, increment, direction: "upleft" }),
    getAdjacentCharacter({ data, startPoint, increment, direction: "downleft" }),
    getAdjacentCharacter({ data, startPoint, increment, direction: "upright" }),
    getAdjacentCharacter({ data, startPoint, increment, direction: "downright" }),
  ].filter(Boolean);
};

export const getAdjacentCharacter = ({
  data,
  direction,
  startPoint,
  increment = 1,
}: {
  data: string[];
  direction: Direction;
  startPoint: Point;
  increment?: number;
}): string | null => {
  switch (direction) {
    case "up":
      return getCharacter({
        data,
        point: [startPoint[0] - increment, startPoint[1]],
      });
    case "down":
      return getCharacter({
        data,
        point: [startPoint[0] + increment, startPoint[1]],
      });
    case "left":
      return getCharacter({
        data,
        point: [startPoint[0], startPoint[1] - increment],
      });
    case "right":
      return getCharacter({
        data,
        point: [startPoint[0], startPoint[1] + increment],
      });
    case "upleft":
      return getCharacter({
        data,
        point: [startPoint[0] - increment, startPoint[1] - increment],
      });
    case "downleft":
      return getCharacter({
        data,
        point: [startPoint[0] + increment, startPoint[1] - increment],
      });
    case "upright":
      return getCharacter({
        data,
        point: [startPoint[0] - increment, startPoint[1] + increment],
      });
    case "downright":
      return getCharacter({
        data,
        point: [startPoint[0] + increment, startPoint[1] + increment],
      });
    default:
      assertNever(direction);
      throw new Error("Invalid direction:" + direction);
  }
};

export const getCharacter = ({
  data,
  point,
}: {
  data: string[];
  point: Point;
}): string | null => {
  const row = data[point[0]];
  if (!row) return null;
  const cell = row[point[1]];
  if (!cell) return null;
  return cell;
};
