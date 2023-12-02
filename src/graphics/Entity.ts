import {Color, Drawable, Shape, Style, Vector2f} from '#graphics';

export type EntityOptions = {
  style?: Style,
  position?: Vector2f,
  rotation?: number,
};

export class Entity<S extends Shape = Shape> extends Drawable {
  protected shape: S;

  protected positionX: number = 0;
  protected positionY: number = 0;
  protected style: Style = {};
  private readonly defaultStyle: Readonly<Style> = {};

  public constructor(shape: S, options: EntityOptions = {}) {
    super();

    this.shape = shape;

    options.style && this.setStyle(options.style);
    options.position && this.setPosition(...options.position);

    this.defaultStyle = {...this.style};
  }

  public getShape(): S {
    return this.shape;
  }

  public setStyle(patch: Style): void {
    const {style, defaultStyle} = this;

    style.stroke = patch.stroke ?? defaultStyle.stroke;
    style.strokeWeight = patch.strokeWeight ?? defaultStyle.strokeWeight;
    style.fill = patch.fill ?? defaultStyle.fill;
  }

  public getStyle(): Readonly<Style> {
    return this.style;
  }

  public setPosition(x: number, y: number): void {
    this.positionX = x;
    this.positionY = y;
  }

  public getPosition(): Vector2f {
    const {positionX, positionY} = this;

    return [positionX, positionY];
  }

  public move(x: number, y: number): void {
    this.positionX += x;
    this.positionY += y;
  }

  public isInside(x: number, y: number): boolean {
    const local = this.toLocal(x, y);

    return this.shape.isInside(local);
  }

  public toLocal(x: number, y: number): Vector2f {
    const {positionX, positionY} = this;

    return [
      x - positionX,
      y - positionY,
    ];
  }

  public draw(): void {
    const {p, shape, style: {fill, stroke, strokeWeight}, positionX, positionY} = this;

    p.push();

    fill ? p.fill(...fill as Color) : p.noFill();
    stroke ? p.stroke(...stroke as Color) : p.noStroke();
    p.strokeWeight(strokeWeight ?? 1);
    p.translate(positionX, positionY);

    shape.draw();

    p.pop();
  }
}
