import {Color, Style, Vector2f, Vector4f} from '#graphics';
import {BEGIN_KIND} from 'p5';
import {BoundingBox} from './BoundingBox';
import {Shape} from './Shape';

type PolygonOption = {
  kind?: BEGIN_KIND,
  style?: Style,
}

export class PolygonShape extends Shape {
  protected vertices: Vector2f[] = [];
  protected kind!: BEGIN_KIND;
  protected style: Style;

  public constructor(vertices: Vector2f[], options: PolygonOption = {}) {
    super();

    this.setKind(options.kind ?? this.p.TESS);

    this.vertices = vertices;
    this.style = options.style ?? {};
  }

  public setKind(kind: BEGIN_KIND): void {
    this.kind = kind;
  }

  public getVertex(index: number): Vector2f {
    return this.vertices[index];
  }

  public setVertex(index: number, position: Vector2f): void {
    this.vertices[index] = position;
  }

  public toBoundingBox(): BoundingBox {
    return BoundingBox.fromVertices(this.vertices);
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
    const {p, style: {fill, stroke, strokeWeight}, rotation} = this;

    p.push();

    fill && p.fill(...fill as Color);
    stroke && p.stroke(...stroke as Color);
    strokeWeight !== void 0 && p.strokeWeight(strokeWeight);

    p.rotate(rotation);

    p.beginShape(this.kind);

    this.drawVertices();

    p.endShape(p.CLOSE);

    p.pop();
  }

  public drawVertices(): void {
    const {p, vertices} = this;

    for (let i = 0; i < vertices.length; i++) {
      const [x, y] = vertices[i];

      p.vertex(x, y);
    }
  }
}
