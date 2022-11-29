import { Drawable, Vector2D } from '../types';
import Canvas2D from '../Canvas2D';
import { isMouseOver } from '../utils';

type CanvasEventHandler = {
  click: (event: MouseEvent) => void;
  mousemove: (event: MouseEvent) => void;
  mouseenter: (event: MouseEvent) => void;
  mouseout: (event: MouseEvent) => void;
  mousemovecanvas: (event: MouseEvent) => void;
  resize: (event: Event) => void;
};

type CanvasEventsMap<
  K extends keyof CanvasEventHandler = keyof CanvasEventHandler,
> = {
  [key in K]: Map<Drawable | Canvas2D, CanvasEventHandler[key]>;
};

class CanvasEvents {
  context: CanvasRenderingContext2D;
  listeners: CanvasEventsMap;
  prevMousePos: Vector2D;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.listeners = {
      click: new Map(),
      mousemove: new Map(),
      mouseenter: new Map(),
      mouseout: new Map(),
      mousemovecanvas: new Map(),
      resize: new Map(),
    };
    this.prevMousePos = { x: 0, y: 0 };
  }

  private handleClickEvent = (event: MouseEvent) => {
    const mousePos = { x: event.x, y: event.y };
    const clickListeners = this.listeners.click;
    for (const clickListener of clickListeners.entries()) {
      const entity = clickListener[0];
      if (entity instanceof Canvas2D) continue;
      if (isMouseOver(entity.pos, entity.size, mousePos))
        clickListener[1](event);
    }
  };

  private handleMouseMove = (event: MouseEvent) => {
    const mousePos = { x: event.x, y: event.y };
    for (const mouseEnterListener of this.listeners.mouseenter.entries()) {
      const entity = mouseEnterListener[0];
      if (entity instanceof Canvas2D) continue;
      if (
        isMouseOver(entity.pos, entity.size, mousePos) &&
        !isMouseOver(entity.pos, entity.size, this.prevMousePos)
      )
        mouseEnterListener[1](event);
    }
    for (const mouseOutListener of this.listeners.mouseout.entries()) {
      const entity = mouseOutListener[0];
      if (entity instanceof Canvas2D) continue;
      if (
        !isMouseOver(entity.pos, entity.size, mousePos) &&
        isMouseOver(entity.pos, entity.size, this.prevMousePos)
      )
        mouseOutListener[1](event);
    }
    for (const mouseMoveListener of this.listeners.mousemove.entries()) {
      const entity = mouseMoveListener[0];
      if (entity instanceof Canvas2D) continue;
      if (isMouseOver(entity.pos, entity.size, mousePos))
        mouseMoveListener[1](event);
    }
    for (const mouseMoveCanvasListener of this.listeners.mousemovecanvas.values()) {
      mouseMoveCanvasListener(event);
    }
    this.prevMousePos = { x: event.x, y: event.y };
  };

  private handleScreenResize = (event: Event) => {
    const resizeListeners = this.listeners.resize;
    for (const resizeListener of resizeListeners.values()) {
      resizeListener(event);
    }
  };

  subscribe = <T extends keyof CanvasEventsMap>(
    entity: Drawable | Canvas2D,
    eventType: T,
    listener: CanvasEventHandler[T],
  ) => {
    const eventListeners = this.listeners[eventType];
    eventListeners.set(entity, listener);
  };

  unsubscribe = <T extends keyof CanvasEventsMap>(
    entity: Drawable | Canvas2D,
    eventType: T,
  ) => {
    this.listeners[eventType].delete(entity);
  };

  listen() {
    window.addEventListener('resize', this.handleScreenResize);
    this.context.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.context.canvas.addEventListener('click', this.handleClickEvent);
  }

  stopListening() {
    window.removeEventListener('resize', this.handleScreenResize);
    this.context.canvas.removeEventListener('mousemove', this.handleMouseMove);
    this.context.canvas.removeEventListener('click', this.handleClickEvent);
  }
}

export default CanvasEvents;
