import {Vector} from 'p5';
import {Drawable} from '@includes/Drawable';
import {fillStyle, Style, StyleFilled} from '@includes/Style';


export class Shape extends Drawable {
  private points!: Vector[];
  private style!: StyleFilled;

  public constructor(points: Vector[], style: Style = {}) {
    super();

    this.setPoints(points);
    this.setStyle(style);
  }

  public setPoints(points: Vector[]): void {
    this.points = points;
  }

  public setStyle(style: Style): void {
    this.style = fillStyle(this.p, style);
  }

  public getPoint(index: number): Vector | undefined {
    const vector = this.points[index] as Vector | undefined;

    return vector;
  }

  public getPoints(): Vector[] {
    return this.points;
  }

  public getStyle(): Style {
    return this.style;
  }

  public update(): void {
  }

  public draw(): void {
    const p = this.p;
    const style = this.style;
    const points = this.points;
    const position = this.getPosition();

    p.push();

    p.translate(position);
    p.rotate(p.frameCount/50);

    p.fill(style.fill);
    p.stroke(style.stroke);
    p.strokeWeight(style.strokeWidth);

    p.beginShape(style.kind);
    for (let i = 0; i < points.length; i++) {
      const point = points[i];

      p.vertex(point.x, point.y);
    }
    p.endShape(p.CLOSE);

    p.pop();
  }
}