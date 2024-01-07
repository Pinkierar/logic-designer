import type {Positioned, Vector2f} from '#graphics';
import {Drawable} from '#graphics';

export abstract class LogicNode extends Drawable {
  protected positioned: Positioned;
  public getPosition: () => Vector2f;
  public setPosition: (x: number, y: number) => void;

  constructor(positioned: Positioned) {
    super();

    this.positioned = positioned;

    this.getPosition = this.positioned.getPosition.bind(this.positioned);
    this.setPosition = this.positioned.setPosition.bind(this.positioned);
  }

  public draw(): void {
    const {positioned} = this;

    positioned.draw();
  }
}