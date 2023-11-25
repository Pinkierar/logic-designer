import {BoundingBox, Vector2f, Vector4f} from '#graphics';
import {Shape} from './Shape';

export class PolygonShape extends Shape {
  protected vertices: Vector2f[] = [];

  public constructor(vertices: Vector2f[]) {
    super();

    this.setVertices(vertices);
  }

  public setVertices(vertices: Vector2f[]): void {
    if (vertices.length < 3)
      throw new Error('The polygon must contain at least three vertices');

    this.vertices = vertices;
  }

  // public getVertex(index: number): Vector2f | undefined {
  //   return this.vertices[index];
  // }

  public getVertices(): Vector2f[] {
    return this.vertices;
  }

  public toBoundingBox(): BoundingBox {
    const vertices = this.vertices;

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

  public isInside(point: Vector2f): boolean {
    if (!this.toBoundingBox().isInside(point)) return false;

    const {vertices} = this;
    const [x, y] = point;

    let isInside = false;
    let xi: number, yi: number, xj: number, yj: number, i: number, j: number;
    for (i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
      [xi, yi] = vertices[i];
      [xj, yj] = vertices[j];

      if (yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) {
        isInside = !isInside;
      }
    }

    return isInside;
  }

  public draw(): void {
    const {p} = this;

    p.beginShape(p.TESS);

    this.drawVertices();

    p.endShape(p.CLOSE);
  }

  public drawVertices(): void {
    const {p, vertices} = this;

    for (let i = 0; i < vertices.length; i++) {
      const [x, y] = vertices[i];

      p.vertex(x, y);
    }
  }
}
