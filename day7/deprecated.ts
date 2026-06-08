// Deprecated, logic included in addNewlySplitBeams
export const findActivatedSplitters = ({ row, beams }: { row: string; beams: number[] }) => {
  const activatedSplitters: number[] = [];
  beams.forEach((beam) => {
    if (row[beam] === "^") {
      activatedSplitters.push(beam);
    }
  });
  return activatedSplitters;
};
