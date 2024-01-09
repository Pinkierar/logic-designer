import {isLimited, MINIMUM_FLOAT} from './defines';

export type Vector2f = [number, number];
export type Vector3f = [number, number, number];
export type Vector4f = [number, number, number, number];

export type Color = [number, number, number, number | undefined];

export class Vector2fCalc {
  public static mag(x: number, y: number): number {
    return Math.sqrt(x * x + y * y);
  }

  public static normalize(x: number, y: number): Vector2f {
    const length = Vector2fCalc.mag(x, y);
    if (isLimited(length, MINIMUM_FLOAT)) return [x, y];

    const multiplier = 1 / length;

    return [x * multiplier, y * multiplier];
  }
}