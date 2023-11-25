export type Vector2f = [number, number];
export type Vector3f = [number, number, number];
export type Vector4f = [number, number, number, number];

export type Color = [number, number, number, number | undefined];

export class Vector2fCalc {
  public static mag(vector2f: Vector2f): number {
    const [x, y] = vector2f

    return Math.sqrt(x * x + y * y);
  }
}