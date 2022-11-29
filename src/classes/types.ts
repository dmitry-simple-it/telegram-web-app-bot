export interface Drawable {
  pos: Vector2D;
  size: Size;
  draw({ elapsedTime }: { elapsedTime: number }): void;
  dispose(): void;
}

export interface Size {
  width: number;
  height: number;
}

export interface Vector2D {
  x: number;
  y: number;
}

export interface Position2D {
  x: number | string;
  y: number | string;
}
