import {Drawable} from './Drawable';
import {Vector2f} from './Vector';

export abstract class Positioned extends Drawable {
  public abstract setPosition(x: number, y: number): void;

  public abstract getPosition(): Vector2f;

  public abstract getAnimatedPosition(): Vector2f;
}