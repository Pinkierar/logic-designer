import {Entity, Shape, Style} from '#graphics';

export class Interactable<E extends Entity<Shape>, S extends Shape> extends Entity<S> {
  private readonly controlled: E;

  public constructor(controlled: E, shape: S, style?: Style) {
    super(shape, style);

    this.controlled = controlled;
  }

  public getControlled(): E {
    return this.controlled;
  }

  public override setPosition(x: number, y: number): void {
    this.controlled.setPosition(x, y);
    super.setPosition(x, y);
  }

  public override draw(): void {
    this.controlled.draw();
    super.draw();
  }
}