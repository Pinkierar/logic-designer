import {BoundingBox, Vector2f} from '#graphics';
import {Shape} from './Shape';

export class RectangleShape extends Shape {
  protected width: number;
  protected height: number;

  public constructor(width: number, height: number) {
    super();

    this.width = width;
    this.height = height;
  }

  public setSize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  public getSize(): Vector2f {
    const {width, height} = this;

    return [width, height];
  }

  public isInside(point: Vector2f): boolean {
    const {width, height} = this;

    const bx = width / 2;
    const by = height / 2;
    const ax = -bx;
    const ay = -by;

    const boundingBox = new BoundingBox(ax, ay, bx, by);

    return boundingBox.isInside(point);
  }

  public draw(): void {
    const {p, width, height} = this;

    const ax = width / -2;
    const ay = height / -2;

    p.rect(ax, ay, width, height);
  }

  public drawVertices(): void {
    this.draw();
  }
}