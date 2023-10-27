import {Vector} from 'p5';

export abstract class Drawable {
  private static _p: P5Type;

  public static init(p: P5Type): void {
    if (Drawable._p) throw new Error('The p5js instance is already installed');

    Drawable._p = p;
  }

  protected readonly p: P5Type;
  private readonly position: Vector;

  protected constructor() {
    if (!Drawable._p) throw new Error('p5js instance not installed');

    this.p = Drawable._p;
    this.position = new Vector();
  }

  public abstract update(): void;

  public abstract draw(): void;

  public setPosition(position: Vector): void;
  public setPosition(x: number, y: number): void;
  public setPosition(arg1: Vector | number, y?: number): void;
  public setPosition(arg1: Vector | number, y?: number): void {
    if (arg1 instanceof Vector) return void this.position.set(arg1);
    if (y !== undefined) return void this.position.set(arg1, y);
  }

  public getPosition(): Vector {
    return this.position;
  }
}