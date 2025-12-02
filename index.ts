import { printTaskResult } from "./utils/log";
import { allData } from "./utils/data";
import { decodeDoor } from "./day1";

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
