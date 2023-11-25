import {Vector2f} from '#graphics';

export class BoundingBox {
  public constructor(
    public readonly ax: number,
    public readonly ay: number,
    public readonly bx: number,
    public readonly by: number,
  ) {
  }

  public isInside(point: Vector2f): boolean {
    const [x, y] = point;
    const {ax, ay, bx, by} = this;

    return (
      x >= ax && x <= bx &&
      y >= ay && y <= by
    );
  }
}