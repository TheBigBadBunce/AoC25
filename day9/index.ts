import _ from "lodash";
import { diff } from "../day8";

export const day9task1 = (data: number[][]) => {
  return findLargestRectangle(data);
};

export const day9task2 = (data: any) => {};

export const findLargestRectangle = (coords: number[][]) => {
  let biggestArea = 0;
  coords.forEach((coordA, n) => {
    coords.slice(n + 1).forEach((coordB) => {
      const area = getArea([coordA, coordB]);
      if (area > biggestArea) {
        biggestArea = area;
      }
    });
  });
  return biggestArea;
};

export const getArea = (coords: number[][]) =>
  (diff(coords[0][0], coords[1][0]) + 1) * (diff(coords[0][1], coords[1][1]) + 1);
