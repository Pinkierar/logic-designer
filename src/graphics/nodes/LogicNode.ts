import type {Interactive, Vector2f} from '#graphics';
import {Drawable} from '#graphics';

export abstract class LogicNode extends Drawable {
  protected state: boolean = false;
  protected controlled: Interactive;
  public getPosition: () => Vector2f;
  public getAnimatedPosition: () => Vector2f;
  public setPosition: (x: number, y: number) => void;

  constructor(controlled: Interactive) {
    super();

    this.controlled = controlled;

    this.getPosition = this.controlled.getPosition.bind(this.controlled);
    this.getAnimatedPosition = this.controlled.getAnimatedPosition.bind(this.controlled);
    this.setPosition = this.controlled.setPosition.bind(this.controlled);
  }

  public turnOn() {
    this.state = true;
  }

  public turnOff() {
    this.state = false;
  }

  public draw(): void {
    const {controlled} = this;

    controlled.draw();
  }
}