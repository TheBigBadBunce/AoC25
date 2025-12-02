export function assertNever(value: never) {
  throw new Error("Never assertion failed. Unexpected value: " + value);
}
