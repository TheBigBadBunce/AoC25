export const forEachCharacter = (
  string: string,
  iterator: (character: string, i: number) => void
) => {
  for (let i = 0; i < string.length; i++) {
    iterator(string[i], i);
  }
};
