export const printTaskResult = (
  dayNumber: number,
  taskNumber: number,
  taskDescription: string,
  taskResult: string | number
) => {
  const paddedDay = dayNumber.toString().padStart(2, "0");
  console.log(
    `DAY ${paddedDay}:${taskNumber} / ${taskDescription}: ${taskResult}`
  );
};
