import { Drawable } from '../types';
import CanvasEvents from '../CanvasEvents';

class Canvas2D {
  context: CanvasRenderingContext2D;
  drawableEntities: Set<Drawable>;
  prevTime: number;
  canvasEvents: CanvasEvents;

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.drawableEntities = new Set();
    this.prevTime = Date.now();
    this.canvasEvents = new CanvasEvents(this.context);

    this.resizeCanvas();
    this.canvasEvents.subscribe(this, 'resize', this.resizeCanvas);
    this.canvasEvents.listen();
  }

  private resizeCanvas = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.context.canvas.width = width;
    this.context.canvas.height = height;
    this.context.canvas.style.width = `${width}px`;
    this.context.canvas.style.height = `${height}px`;
  };

  private drawFrame = () => {
    const currentTime = Date.now();
    const elapsedTime = currentTime - this.prevTime;
    this.prevTime = currentTime;
    this.context.clearRect(
      0,
      0,
      this.context.canvas.width,
      this.context.canvas.height,
    );
    for (const entity of this.drawableEntities.values()) {
      entity.draw({ elapsedTime });
    }

    requestAnimationFrame(this.drawFrame);
  };

  dispose() {
    this.canvasEvents.stopListening();
  }

  addDrawable<T>(
    entityClass: {
      new (canvas2D: Canvas2D, options: T): Drawable;
    },
    options: T,
  ) {
    const entity = new entityClass(this, options);
    this.drawableEntities.add(entity);
    return this;
  }

  removeDrawable(entity: Drawable) {
    entity.dispose();
    this.drawableEntities.delete(entity);
    return this;
  }

  run = () => {
    this.drawFrame();

    return this;
  };
}

export default Canvas2D;
