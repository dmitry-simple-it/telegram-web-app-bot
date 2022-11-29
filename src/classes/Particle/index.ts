import Canvas2D from '../Canvas2D';
import { Drawable, Size, Vector2D } from '../types';
import { themeParams } from '../../components/Telegram';

const symbols = [
  '\u2601',
  '\u2605',
  '\u263B',
  '\u2665',
  '\u269C',
  '\u266A',
  '\u2746',
];

class Particle implements Drawable {
  private readonly particleLifeTimeout: NodeJS.Timeout;
  private readonly angle: number;
  private readonly speed: number;
  private readonly rotationSpeed: number;
  private readonly opacityRemoval: number;
  private readonly symbol: string;
  private canvas2D: Canvas2D;
  private rotationAngle: number;
  private opacity: number;

  pos: Vector2D;
  size: Size;

  constructor(
    canvas2D: Canvas2D,
    { lifetime, originPos }: { lifetime: number; originPos: Vector2D },
  ) {
    this.canvas2D = canvas2D;
    this.size = this.calcSize();
    this.pos = { x: originPos.x - 20, y: originPos.y - 20 };
    this.angle = Math.random() * 2 * Math.PI;
    this.speed = Math.random() * 0.2;
    this.rotationAngle = 0;
    this.rotationSpeed = Math.random() * 2;
    this.opacityRemoval = 1 / lifetime;
    this.opacity = 1;
    this.symbol = symbols[Math.floor(Math.random() * symbols.length)];

    this.particleLifeTimeout = setTimeout(() => {
      this.canvas2D.removeDrawable(this);
    }, lifetime);
  }

  private calcSize() {
    return {
      width: this.canvas2D.context.canvas.width * 0.05,
      height: this.canvas2D.context.canvas.width * 0.05,
    };
  }

  dispose() {
    clearTimeout(this.particleLifeTimeout);
  }

  draw({ elapsedTime }: { elapsedTime: number }) {
    const halfWidth = this.size.width / 2;
    const halfHeight = this.size.height / 2;

    const ctx = this.canvas2D.context;

    const addition = this.speed * elapsedTime;
    const additionX =
      addition * Math.cos(this.angle) + addition * Math.sin(this.angle);
    const additionY =
      -addition * Math.sin(this.angle) + addition * Math.cos(this.angle);
    this.pos = { x: this.pos.x + additionX, y: this.pos.y + additionY };

    this.rotationAngle += elapsedTime * this.rotationSpeed * 0.001;
    if (this.rotationAngle > 2 * Math.PI) this.rotationAngle = 0;
    ctx.fillStyle = themeParams.linkColor;
    ctx.setTransform(
      new DOMMatrix([
        1,
        0,
        0,
        1,
        this.pos.x + halfWidth,
        this.pos.y + halfHeight,
      ]),
    );
    ctx.rotate(this.rotationAngle);
    this.opacity -= this.opacityRemoval * elapsedTime;
    if (this.opacity < 0) this.opacity = 0;
    ctx.globalAlpha = this.opacity;
    ctx.font = '48px serif';
    ctx.fillText(this.symbol, -24, 24);
    ctx.globalAlpha = 1;
    ctx.resetTransform();
  }
}

export default Particle;
