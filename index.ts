import { printTaskResult } from "./utils/log";
import { allData } from "./utils/data";
import { decodeDoor } from "./day1";
import { day2 } from "./day2";
import { day3task1, day3task2 } from "./day3";

// New day checklist:
// Copy example folder
// Bulk replace "dayX" with correct day
// Write data reader (if necessary)
// Populate data/ folder
// Add data to utils/data.ts
// When ready to run each task, add it below

// Day 1
printTaskResult(1, 1, "Decode door code", /*decodeDoor(allData.day1)*/ "N/A");
printTaskResult(1, 2, "Decode door code, updated protocol", decodeDoor(allData.day1));
// Day 2
printTaskResult(2, 1, "Sum repeating numbers", "N/A");
printTaskResult(2, 2, "Sum more repeating numbers", day2(allData.day2));
// Day 3
printTaskResult(3, 1, "Calculate 2-cell battery joltage", day3task1(allData.day3));
printTaskResult(3, 1, "Calculate 12-cell battery joltage", day3task2(allData.day3));
