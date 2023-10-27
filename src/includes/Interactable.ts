import {Drawable} from '@includes/Drawable';
import {Shape} from '@includes/Shape';
import {Vector} from 'p5';
import {Style} from '@includes/Style.ts';

export class Interactable extends Shape {
  private controlled: Drawable;

  public constructor(controlled: Drawable, points: Vector[], style?: Style) {
    super(points, style);

    this.controlled = controlled;
  }

  public override setPosition(_arg1: Vector | number, _arg2?: number) {
    throw new Error('The hitbox follows the controlled');
  }

  public override update(): void {
    const position = this.controlled.getPosition();
    super.setPosition(position);
  }
}