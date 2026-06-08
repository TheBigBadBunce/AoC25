import _ from "lodash";
import { findCharacterInstances } from "../utils/string";
import {
  countInstances,
  pushMultiple,
  removeDuplicateElements,
  removeMultipleValues,
} from "../utils/array";

export const day7task1 = (data: string[]) => {
  // find starting beams
  let beams = findSources(data[0]);
  let splits = 0;

  data.forEach((row) => {
    const { beams: newBeams, splits: newSplits } = addNewlySplitBeams({
      beams,
      splitters: findSplitters(row),
    });
    beams = removeDuplicateElements(newBeams);
    splits += newSplits;
  });

  return splits;
};

export const day7task2BruteForce = (data: string[]) => {
  // find starting beams
  let beams = findSources(data[0]);
  let splits = 0;

  data.forEach((row) => {
    const { beams: newBeams, splits: newSplits } = addNewlySplitBeams({
      beams,
      splitters: findSplitters(row),
    });
    beams = newBeams;
    splits += newSplits;
  });

  return beams.length;
};

export const day7task2 = (data: string[]) => {
  // Get starting beams
  // [0,0,0,1,0,0,0] etc - array is % of beams in position
  let beams = findSourcesDirect(data[0]);

  data.forEach((row) => {
    // For each splitter, +1 either side in new array
    const splitters = findSplitters(row);
    splitters.forEach((splitter) => {
      beams[splitter + 1] += beams[splitter];
      beams[splitter - 1] += beams[splitter];
      beams[splitter] = 0;
    });
  });

  return _.sum(beams);
};

export const findSplitters = (row: string) => findCharacterInstances({ row, character: "^" });
export const findSources = (row: string) => findCharacterInstances({ row, character: "S" });
export const findSourcesDirect = (row: string) =>
  row.split("").map((char) => (char === "S" ? 1 : 0));

export const addNewlySplitBeams = ({
  beams,
  splitters,
}: {
  beams: number[];
  splitters: number[];
}) => {
  let splits = 0;
  let newBeams = [...beams];

  splitters.forEach((splitter) => {
    const splitBeams = countInstances(beams, splitter);
    pushMultiple(newBeams, splitter - 1, splitBeams);
    pushMultiple(newBeams, splitter + 1, splitBeams);
    removeMultipleValues(newBeams, splitter, splitBeams);
    splits += splitBeams;
  });
  return { beams: newBeams.sort((a, b) => a - b), splits };
};
