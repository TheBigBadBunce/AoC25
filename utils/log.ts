export const printTaskResult = (
  dayNumber: number,
  taskNumber: number,
  taskDescription: string,
  taskRunCallback: () => string | number,
) => {
  const startTime = Date.now();
  const taskResult = taskRunCallback();
  const endTime = Date.now();
  const paddedTime = (endTime - startTime).toString().padStart(4, "0");

  const paddedDay = dayNumber.toString().padStart(2, "0");
  console.log(
    `DAY ${paddedDay}:${taskNumber} / ${paddedTime}ms / ${taskDescription}: ${taskResult}`,
  );
};
