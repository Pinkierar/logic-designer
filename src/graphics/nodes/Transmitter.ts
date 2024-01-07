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
    const [x, y] = this.getPosition();

    for (const child of children) {
      const [childX, childY] = child.getPosition();

      p.line(x, y, childX, childY);
    }

    super.draw();
  }
}