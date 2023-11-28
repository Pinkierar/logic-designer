import {Entity, Shape, Style} from '#graphics';

export class Interactable<E extends Entity, S extends Shape> extends Entity<S> {
  private readonly controlled: E;

  public constructor(controlled: E, shape: S, style?: Style) {
    super(shape, style);

    this.controlled = controlled;
  }

  public getControlled(): E {
    return this.controlled;
  }

  public override setPosition(x: number, y: number): void {
    super.setPosition(x, y);
  }

  public override draw(): void {
    const {positionX, positionY, controlled} = this;

    controlled.setPosition(positionX, positionY);

    this.controlled.draw();

    super.draw();
  }
}