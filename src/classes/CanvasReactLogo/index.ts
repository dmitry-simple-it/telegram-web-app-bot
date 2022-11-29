import { Drawable, Position2D, Size, Vector2D } from '../types';
import Canvas2D from '../Canvas2D';
import Particle from '../Particle';
import { themeParams } from '../../components/Telegram';

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
  size: Size;
  pos: Vector2D;
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
    this.size = { width: 0, height: 0 };
    this.pos = { x: 0, y: 0 };
    this.movingAngle = Math.PI / 2;
    this.movingSpeed = 0.3;
    this.image = new Image();
    this.image.src = imagePath;
    this.image.onload = () => {
      this.size = this.calcSize();
      this.pos = this.calcPosition();
    };

    this.canvas2D.canvasEvents.subscribe(this, 'resize', this.handleResize);
    this.canvas2D.canvasEvents.subscribe(this, 'click', (event) => {
      Array.from({ length: 20 }).forEach(() =>
        this.canvas2D.addDrawable(Particle, {
          lifetime: 3000,
          originPos: {
            x: event.x,
            y: event.y,
          },
        }),
      );
    });
    this.canvas2D.canvasEvents.subscribe(
      this,
      'mouseenter',
      this.handleMouseEnter,
    );
    this.canvas2D.canvasEvents.subscribe(this, 'mouseout', this.handleMouseOut);
  }

  private handleResize = () => {
    this.size = this.calcSize();
    this.pos = this.calcPosition();
  };

  private handleMouseEnter = () => {
    this.canvas2D.context.canvas.style.cursor = 'pointer';
  };

  private handleMouseOut = () => {
    this.canvas2D.context.canvas.style.cursor = 'default';
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
    this.canvas2D.canvasEvents.unsubscribe(this, 'mouseenter');
    this.canvas2D.canvasEvents.unsubscribe(this, 'mouseout');
  };

  // TODO: Rewrite this function
  draw = ({ elapsedTime }: Parameters<Drawable['draw']>[0]) => {
    const halfWidth = this.size.width / 2;
    const halfHeight = this.size.height / 2;

    const movedBy = this.movingSpeed * elapsedTime;
    const additionX =
      movedBy * Math.cos(this.movingAngle) +
      movedBy * Math.sin(this.movingAngle);
    const additionY =
      -movedBy * Math.sin(this.movingAngle) +
      movedBy * Math.cos(this.movingAngle);
    this.pos = { x: this.pos.x + additionX, y: this.pos.y + additionY };
    if (this.pos.x + this.size.width >= this.canvas2D.context.canvas.width) {
      this.pos = {
        x: this.canvas2D.context.canvas.width - this.size.width,
        y: this.pos.y + additionY,
      };
      this.movingAngle -= Math.PI / 2;
      if (this.movingAngle < 0)
        this.movingAngle = 2 * Math.PI - this.movingAngle;
    }
    if (this.pos.x <= 0) {
      this.pos = { x: 0, y: this.pos.y + additionY };
      this.movingAngle -= Math.PI / 2;
      if (this.movingAngle >= 2 * Math.PI) this.movingAngle -= 2 * Math.PI;
    }
    if (this.pos.y + this.size.height >= this.canvas2D.context.canvas.height) {
      this.pos = {
        x: this.pos.x,
        y: this.canvas2D.context.canvas.height - this.size.height,
      };
      this.movingAngle -= Math.PI / 2;
      if (this.movingAngle < 0)
        this.movingAngle = 2 * Math.PI - this.movingAngle;
    }
    if (this.pos.y <= 0) {
      this.pos = { x: this.pos.x, y: 0 };
      this.movingAngle -= Math.PI / 2;
      if (this.movingAngle >= 2 * Math.PI) this.movingAngle -= 2 * Math.PI;
    }

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
