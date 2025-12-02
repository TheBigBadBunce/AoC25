import _ from "lodash";

export const day2 = (data: string) => {
  const ranges = data.split(",");
  const invalidIds = ranges.flatMap((range) => {
    const values = range.split("-").map((str) => parseInt(str));
    return findInvalidIds({ start: values[0], end: values[1] });
  });

  return _.sum(invalidIds);
};

export const findInvalidIds = ({ start, end }: { start: number; end: number }) => {
  const invalidIds = new Set<number>();
  for (let i = start; i <= end; i++) {
    const str = i.toString();
    for (let l = 1; l <= str.length / 2; l++) {
      const blocks = splitStringIntoBlocks({ string: str, length: l });
      if (compareBlocks(blocks)) {
        invalidIds.add(i);
      }
    }
  }
  return [...invalidIds];
};

export const splitStringIntoBlocks = ({
  string,
  length,
}: {
  string: string;
  length: number;
}) => {
  if (length > string.length / 2) return [];
  let blocks = [];
  for (let i = 0; i < string.length; i += length) {
    blocks.push(string.slice(i, i + length));
  }
  return blocks;
};

export const compareBlocks = (blocks: string[]) => {
  const firstBlock = blocks[0];
  return blocks.slice(1).every((block) => block === firstBlock);
};
