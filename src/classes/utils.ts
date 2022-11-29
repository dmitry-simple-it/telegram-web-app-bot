import { Size, Vector2D } from './types';

export const isMouseOver = (pos: Vector2D, size: Size, mousePos: Vector2D) =>
  mousePos.x > pos.x &&
  mousePos.x < pos.x + size.width &&
  mousePos.y > pos.y &&
  mousePos.y < pos.y + size.height;
