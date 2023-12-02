import {Vector2f} from '#graphics';
import {Shape} from './Shape';

export class GroupShape<Shapes extends Shape[] = []> extends Shape {
  private readonly shapes: Shapes;

  public constructor(shapes: Shapes) {
    super();

    this.shapes = shapes;
  }

  public getShapes(): Shapes {
    return this.shapes;
  }

  public override setRotation(rotation: number): void {
    this.shapes.forEach(shape => shape.setRotation(rotation));
    super.setRotation(rotation);
  }

  public draw(): void {
    this.shapes.forEach(shape => shape.draw());
  }

  public drawVertices(): void {
    throw new Error('Невозможно нарисовать вершины сразу нескольких фигур');
  }

  public isInside(point: Vector2f): boolean {
    for (const shape of this.shapes) {
      if (shape.isInside(point)) return true;
    }

    return false;
  }
}