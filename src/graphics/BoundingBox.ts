import {Vector2f} from '#graphics';

export class BoundingBox {
  public constructor(
    public readonly ax: number,
    public readonly ay: number,
    public readonly bx: number,
    public readonly by: number,
  ) {
  }

  public get width(): number {
    const {ax, bx} = this;

    return bx - ax;
  }

  public get height(): number {
    const {ay, by} = this;

    return by - ay;
  }

  public get center(): Vector2f {
    const {width, height, ax, ay} = this;

    return [
      ax + width / 2,
      ay + height / 2,
    ];
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