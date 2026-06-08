import { printTaskResult } from "./utils/log";
import { allData } from "./utils/data";
import { decodeDoor } from "./day1";
import { day2 } from "./day2";
import { day3task1, day3task2 } from "./day3";
import { getAllAvailableRolls, getAvailableRolls } from "./day4";
import { day5task1, /*day5task2bruteForce,*/ day5task2ranges } from "./day5";
import { day6task1, day6task2 } from "./day6";
import { day7task1, /*day7task2BruteForce,*/ day7task2 } from "./day7";

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
printTaskResult(3, 2, "Calculate 12-cell battery joltage", day3task2(allData.day3));
// Day 4
printTaskResult(4, 1, "Locate paper rolls ", getAvailableRolls(allData.day4).length);
printTaskResult(
  4,
  2,
  "Locate all retrievable paper rolls",
  getAllAvailableRolls(allData.day4),
);
// Day 5
printTaskResult(5, 1, "Find fresh ingredients", day5task1(allData.day5));
printTaskResult(5, 2, "Find all possible ingredients", day5task2ranges(allData.day5));
// Day 6
printTaskResult(6, 1, "Do maths homework", day6task1(allData.day6.grid));
printTaskResult(6, 2, "Do maths homework (but vertically)", day6task2(allData.day6.rows));
// Day 7
printTaskResult(7, 1, "Count beam splits", day7task1(allData.day7));
printTaskResult(7, 2, "Count quantum splits", day7task2(allData.day7));
