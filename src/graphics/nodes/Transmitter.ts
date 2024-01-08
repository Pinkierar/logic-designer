import {LogicNode} from './LogicNode';
import type {Receiver} from './Receiver';
import type {Transceiver} from './Transceiver';

type OutputNode = Transceiver | Receiver;

export abstract class Transmitter extends LogicNode {
  protected children: Set<OutputNode> = new Set();

  public addChild(child: OutputNode): void {
    if (child === this) return;

    const {children} = this;

    children.add(child);
  }

  public getChildren(): IterableIterator<OutputNode> {
    const {children} = this;

    return children.values();
  }

  public override draw(): void {
    const {p, children} = this;
    const [x, y] = this.getAnimatedPosition();

    p.push();
    p.stroke(p.color(0, 0, 100, 0.5));
    for (const child of children) {
      const [childX, childY] = child.getAnimatedPosition();

      p.line(x, y, childX, childY);
    }
    p.pop();

    super.draw();
  }
}