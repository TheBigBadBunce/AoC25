export class DayRunner {
  constructor(
    day: number,
    task1Description: string,
    task1: () => string | number,
    task2Description?: string,
    task2?: () => string | number
  ) {
    this.day = day;
    this.task1Description = task1Description;
    this.task1 = task1;
    this.task2Description = task2Description || "Unknown";
    this.task2 = task2 || (() => "Not implemented");
  }

  day: number = 0;

  task1Description: string = "Unknown";
  task2Description: string = "Unknown";

  task1 = (): string | number => {
    return "Not implemented";
  };
  task2 = (): string | number => {
    return "Not implemented";
  };

  printResult = (taskNumber: number, taskDescription: string, taskResult: string | number) => {
    const paddedDay = this.day.toString().padStart(2, "0");
    console.log(`DAY ${paddedDay} / Task ${taskNumber} / ${taskDescription}: ${taskResult}`);
  };

  run = () => {
    const task1Result = this.task1();
    this.printResult(1, this.task1Description, task1Result);
    const task2Result = this.task2();
    this.printResult(2, this.task2Description, task2Result);
  };
}
