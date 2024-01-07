import {Vector2f} from '#graphics';
import {BoundingBox} from './BoundingBox';
import {Shape} from './Shape';

export class CircleShape extends Shape {
  private radius: number;

  public constructor(radius: number) {
    super();

    this.radius = radius;
  }

  public getRadius(): number {
    return this.radius;
  }

  public setRadius(radius: number): void {
    this.radius = radius;
  }

  public isInside(point: Vector2f): boolean {
    const [x, y] = point;

    const length = Math.sqrt(x * x + y * y);

    return length <= this.radius;
  }

  public toBoundingBox(): BoundingBox {
    const {radius} = this

    return new BoundingBox(-radius, -radius, radius, radius);
  }

  public draw(): void {
    const {p, radius} = this

    p.circle(0, 0, radius + radius);
  }

  public drawVertices(): void {
    this.draw();
  }
}