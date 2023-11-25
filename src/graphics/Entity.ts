import {Color, Drawable, Shape, Style, Vector2f} from '#graphics';

export class Entity<S extends Shape = Shape> extends Drawable {
  protected shape: S;

  protected positionX: number = 0;
  protected positionY: number = 0;
  protected style: Style;
  private readonly defaultStyle: Readonly<Style>;

  public constructor(shape: S, style?: Style) {
    super();

    this.style = style ?? {};
    this.defaultStyle = {...this.style};

    this.shape = shape;
  }

  public setStyle(patch: Style): void {
    const {style, defaultStyle} = this;

    style.stroke = patch.stroke ?? defaultStyle.stroke;
    style.strokeWidth = patch.strokeWidth ?? defaultStyle.strokeWidth;
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

  public isInside(point: Vector2f): boolean {
    const local = this.toLocal(point);

    return this.shape.isInside(local);
  }

  public toLocal(point: Vector2f): Vector2f {
    const {positionX, positionY} = this;

    return [
      point[0] - positionX,
      point[1] - positionY,
    ];
  }

  public draw(): void {
    const {p, shape, style: {fill, stroke, strokeWidth}, positionX, positionY} = this;

    p.push();

    fill ? p.fill(...fill as Color) : p.noFill();
    stroke ? p.stroke(...stroke as Color) : p.noStroke();
    p.strokeWeight(strokeWidth ?? 1);
    p.translate(positionX, positionY);

    shape.draw();

    p.pop();
  }
}
