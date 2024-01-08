import {Vector2f, Vector4f} from '#graphics';

export class BoundingBox {
  public constructor(
    public readonly ax: number,
    public readonly ay: number,
    public readonly bx: number,
    public readonly by: number,
  ) {
  }

  public static fromVertices(vertices: Vector2f[]): BoundingBox {
    const [x, y] = vertices[0];
    const rect: Vector4f = [x, y, x, y];
    for (let i = 1; i < vertices.length; i++) {
      const [x, y] = vertices[i];
      rect[0] = Math.min(rect[0], x);
      rect[1] = Math.min(rect[1], y);
      rect[2] = Math.max(rect[2], x);
      rect[3] = Math.max(rect[3], y);
    }

    return new BoundingBox(...rect);
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