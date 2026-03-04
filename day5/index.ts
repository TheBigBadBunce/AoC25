import _ from "lodash";
import { range, separateDataBlocks } from "../utils/data";

export const day5task1 = (data: string[]) => {
  const { ranges, ids } = tidyData(data);
  const freshIngredients = ids.filter((id) => ingredientIsFresh({ id, ranges })).length;
  return freshIngredients;
};

export const day5task2bruteForce = (data: string[]) => {
  const { ranges } = tidyData(data);
  const maxValue = getMaxRangeValue(ranges);
  let freshIngredients = 0;

  for (let id = 0; id <= maxValue; id++) {
    if (ingredientIsFresh({ id, ranges })) freshIngredients++;
  }
  return freshIngredients;
};

export const day5task2ranges = (data: string[]) => {
  const { ranges: unmergedRanges } = tidyData(data);
  const ranges = mergeOverlappingRanges(unmergedRanges);
  let ids = 0;

  ranges.forEach((range) => {
    ids += range[1] - range[0] + 1;
  });
  return ids;
};

export const getIdsInRange = (range: number[]) => {
  let ids = [];
  for (let i = range[0]; i <= range[1]; i++) {
    ids.push(i);
  }
  return ids;
};

export const tidyData = (data: string[]) => {
  const dataBlocks = separateDataBlocks(data);
  return { ranges: dataBlocks[0].map(readRange), ids: mapParseInt(dataBlocks[1]) };
};

// Mapping parse int doesn't work correctly
const mapParseInt = (range: string[]) => range.map((item) => parseInt(item));

export const readRange = (range: string) => range.split("-").map((piece) => parseInt(piece));

export const idWithinRange = ({ id, range }: { id: number; range: number[] }) =>
  id >= range[0] && id <= range[1];

export const ingredientIsFresh = ({ id, ranges }: { id: number; ranges: number[][] }) =>
  ranges.some((range) => idWithinRange({ range, id }));

export const getMaxRangeValue = (ranges: number[][]) =>
  _.max(ranges.map((range) => range[1])) || 1;

export const mergeOverlappingRanges = (ranges: number[][]) => {
  let changesMade = false;

  do {
    changesMade = false;
    for (let i = 0; i < ranges.length; i++) {
      for (let j = i + 1; j < ranges.length; j++) {
        // Ignore empty ranges
        if (ranges[i].length !== 0 && ranges[j].length !== 0) {
          const newRanges = maybeMergeRanges([ranges[i], ranges[j]]);
          if (newRanges.length === 1) {
            // Ranges have been merged
            ranges[i] = newRanges[0];
            ranges[j] = [];
            changesMade = true;
          }
        }
      }
    }
  } while (changesMade === true);

  return ranges.filter((range) => range.length !== 0);
};

export const maybeMergeRanges = ([range1, range2]: number[][]): number[][] => {
  const [range1Min, range1Max] = range1;
  const [range2Min, range2Max] = range2;
  // console.log({ range1, range2, range1Min, range1Max, range2Min, range2Max });
  if (
    (range1Max >= range2Min && range1Max <= range2Max) ||
    (range2Max >= range1Min && range2Max <= range1Max) ||
    (range1Min <= range2Min && range1Max >= range2Max) ||
    (range2Min <= range1Min && range2Max >= range1Max)
  ) {
    // Ranges overlap
    return [[_.min([range1Min, range2Min])!, _.max([range1Max, range2Max])!]];
  }
  return [range1, range2];
};
