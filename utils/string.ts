export const forEachCharacter = (
  string: string,
  iterator: (character: string, i: number) => void,
) => {
  for (let i = 0; i < string.length; i++) {
    iterator(string[i], i);
  }
};

export const findCharacterInstances = ({
  row,
  character,
}: {
  row: string;
  character: string;
}) => {
  const indices: number[] = [];
  forEachCharacter(row, (char, index) => {
    if (char === character) {
      indices.push(index);
    }
  });
  return indices;
};
