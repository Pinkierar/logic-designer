import {Drawable, Vector2f} from '#graphics';

export abstract class Shape extends Drawable {
  public abstract drawVertices(): void;

  public abstract isInside(point: Vector2f): boolean;
}