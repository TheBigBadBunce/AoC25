import _ from "lodash";

export const decodeDoor = (data: string[]) => {
  let position = 50;
  let code = 0;

  data.forEach((command) => {
    const result = rotateDial({ position, input: command });
    position = result.position;
    code += result.clicks;
  });

  return code;
};

export const rotateDial = ({ input, position }: { input: string; position: number }) => {
  const direction = input[0];
  const amount = parseInt(input.slice(1));
  let clicks = 0;
  let change = 0;

  if (Number.isNaN(amount)) throw new Error("Invalid rotation amount");
  switch (direction) {
    case "L":
      change = -1;
      break;
    case "R":
      change = +1;
      break;
    default:
      throw new Error("Invalid rotation direction");
  }
  for (let i = 0; i < amount; i++) {
    position += change;
    if (position < 0) position += 100;
    if (position > 99) position -= 100;
    if (position === 0) clicks++;
  }

  return { position, clicks };
};

export const rotateDialClassic = ({
  input,
  position,
}: {
  input: string;
  position: number;
}) => {
  const direction = input[0];
  const amount = parseInt(input.slice(1));
  let click = false;

  if (Number.isNaN(amount)) throw new Error("Invalid rotation amount");
  switch (direction) {
    case "L":
      position -= amount;
      break;
    case "R":
      position += amount;
      break;
    default:
      throw new Error("Invalid rotation direction");
  }
  while (position < 0) {
    position += 100;
    click = true;
  }
  while (position > 99) {
    position -= 100;
    click = true;
  }
  return { position, click };
};
