export interface Point {
  x: number;
  y: number;
  z: number;
}

export interface Connection {
  points: Point[];
  distance: number;
}

export interface Circuit {
  connections: Connection[];
  points: Point[];
  size: number;
  id: number;
}

export interface State {
  points: Point[];
  circuits: Circuit[];
}
