import type {Interactive} from '../entities';
import {Transmitter} from './Transmitter';

export class Transceiver extends Transmitter {
  private elementId: number;

  public constructor(controlled: Interactive, elementId: number) {
    super(controlled);

    this.elementId = elementId;
  }

  public override draw(): void {
    super.draw();

    const {p, elementId} = this;
    const [x, y] = this.getAnimatedPosition();
    (globalThis as any).pp = [x, y];

    p.push();
    p.noStroke();
    p.fill(p.color(0, 0, 100));
    p.textAlign(p.CENTER, p.CENTER);
    p.text(elementId, x, y);
    p.pop();
  }
}