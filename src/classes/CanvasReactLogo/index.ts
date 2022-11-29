import { Drawable, Position2D, Size, Vector2D } from '../types';
import Canvas2D from '../Canvas2D';
import Particle from '../Particle';
import { themeParams } from '../../components/Telegram';
import { isMouseOver } from '../utils';

type CanvasReactLogoOptions = {
  imagePath: string;
  rotationSpeed: number;
  position: Position2D;
  size: number | string;
};

// TODO: Rewrite this class
class CanvasReactLogo implements Drawable {
  private readonly image: HTMLImageElement;
  private readonly baseSize: number | string;
  private readonly basePosition: Position2D;
  private readonly movingSpeed: number;
  private canvas2D: Canvas2D;
  private rotationAngle: number;
  private movingAngle: number;
  private imageLoaded: boolean;
  private mousePos: Vector2D;
  private isMouseOver: boolean;
  size: Size = { width: 0, height: 0 };
  pos: Vector2D = { x: 0, y: 0 };
  rotationSpeed: number;

  constructor(
    canvas2D: Canvas2D,
    { imagePath, rotationSpeed, position, size }: CanvasReactLogoOptions,
  ) {
    this.canvas2D = canvas2D;
    this.rotationAngle = 0;
    this.rotationSpeed = rotationSpeed;
    this.basePosition = position;
    this.baseSize = size;
    this.movingAngle = Math.PI / 6;
    this.movingSpeed = 0.15;
    this.mousePos = { x: 0, y: 0 };
    this.isMouseOver = false;
    this.imageLoaded = false;
    this.image = new Image();
    this.image.src = imagePath;
    this.image.onload = () => {
      this.size = this.calcSize();
      this.pos = this.calcPosition();
      this.imageLoaded = true;
    };

    this.canvas2D.canvasEvents.subscribe(this, 'resize', this.handleResize);
    this.canvas2D.canvasEvents.subscribe(this, 'click', this.handleClick);
    this.canvas2D.canvasEvents.subscribe(
      this,
      'mousemovecanvas',
      this.handleMouseMoveCanvas,
    );
  }

  private handleResize = () => {
    this.size = this.calcSize();
    this.pos = this.calcPosition();
  };

  private handleMouseMoveCanvas = (event: MouseEvent) => {
    this.mousePos = { x: event.x, y: event.y };
  };

  private handleClick = (event: MouseEvent) => {
    Array.from({ length: 20 }).forEach(() =>
      this.canvas2D.addDrawable(Particle, {
        lifetime: 3000,
        originPos: {
          x: event.x,
          y: event.y,
        },
      }),
    );
  };

  private calcSize = () => {
    let size =
      typeof this.baseSize === 'string'
        ? 0.01 * parseFloat(this.baseSize) * this.canvas2D.context.canvas.width
        : this.baseSize;
    if (size > 250) size = 250;
    return {
      width: size,
      height: (this.image.height / this.image.width) * size,
    };
  };

  // TODO: Fix issue with position on screen resize
  private calcPosition = () => {
    const pos = {
      x:
        typeof this.basePosition.x === 'string'
          ? 0.01 *
            parseFloat(this.basePosition.x) *
            this.canvas2D.context.canvas.width
          : this.basePosition.x,
      y:
        typeof this.basePosition.y === 'string'
          ? 0.01 *
            parseFloat(this.basePosition.y) *
            this.canvas2D.context.canvas.height
          : this.basePosition.y,
    };
    return {
      x: pos.x - this.size.width / 2,
      y: pos.y - this.size.height / 2,
    };
  };

  dispose = () => {
    this.canvas2D.canvasEvents.unsubscribe(this, 'resize');
    this.canvas2D.canvasEvents.unsubscribe(this, 'click');
    this.canvas2D.canvasEvents.unsubscribe(this, 'mousemovecanvas');
  };

  // TODO: Rewrite this function
  draw = ({ elapsedTime }: Parameters<Drawable['draw']>[0]) => {
    if (!this.imageLoaded) return;

    const halfWidth = this.size.width / 2;
    const halfHeight = this.size.height / 2;

    const movedBy = this.movingSpeed * elapsedTime;
    const additionToX = movedBy * Math.cos(this.movingAngle);
    const additionToY = movedBy * Math.sin(this.movingAngle);
    this.pos = { x: this.pos.x + additionToX, y: this.pos.y + additionToY };

    if (this.pos.x + this.size.width > this.canvas2D.context.canvas.width) {
      this.pos = {
        x: this.canvas2D.context.canvas.width - this.size.width,
        y: this.pos.y,
      };
      this.movingAngle =
        Math.sign(this.movingAngle) * Math.acos(-Math.cos(this.movingAngle));
    }
    if (this.pos.x < 0) {
      this.pos = { x: 0, y: this.pos.y };
      this.movingAngle =
        Math.sign(this.movingAngle) * Math.acos(-Math.cos(this.movingAngle));
    }
    if (this.pos.y + this.size.height > this.canvas2D.context.canvas.height) {
      this.pos = {
        x: this.pos.x,
        y: this.canvas2D.context.canvas.height - this.size.height,
      };
      this.movingAngle = -this.movingAngle;
    }
    if (this.pos.y < 0) {
      this.pos = { x: this.pos.x, y: 0 };
      this.movingAngle = -this.movingAngle;
    }

    if (isMouseOver(this.pos, this.size, this.mousePos))
      this.canvas2D.context.canvas.style.cursor = 'pointer';
    else this.canvas2D.context.canvas.style.cursor = 'default';

    this.rotationAngle += elapsedTime * this.rotationSpeed * 0.001;
    if (this.rotationAngle >= 2 * Math.PI) this.rotationAngle = 0;

    this.canvas2D.context.imageSmoothingQuality = 'high';
    this.canvas2D.context.imageSmoothingEnabled = true;

    this.canvas2D.context.setTransform(
      new DOMMatrix([
        1,
        0,
        0,
        1,
        this.pos.x + halfWidth,
        this.pos.y + halfHeight,
      ]),
    );
    this.canvas2D.context.rotate(this.rotationAngle);

    this.canvas2D.context.drawImage(
      this.image,
      -halfWidth,
      -halfHeight,
      this.size.width,
      this.size.height,
    );

    this.canvas2D.context.globalCompositeOperation = 'source-in';

    // draw color
    this.canvas2D.context.fillStyle = themeParams.linkColor;
    this.canvas2D.context.fillRect(
      -halfWidth,
      -halfHeight,
      this.canvas2D.context.canvas.width,
      this.canvas2D.context.canvas.height,
    );

    this.canvas2D.context.globalCompositeOperation = 'source-over';

    this.canvas2D.context.resetTransform();
  };
}

export default CanvasReactLogo;
