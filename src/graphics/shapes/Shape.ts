import {Drawable, Vector2f} from '#graphics';

export abstract class Shape extends Drawable {
  protected rotation: number = 0;

  public setRotation(rotation: number): void {
    this.rotation = rotation;
  }

  public getRotation(): number {
    return this.rotation;
  }

  public abstract drawVertices(): void;

  public abstract isInside(point: Vector2f): boolean;
}