import {Bezier} from 'bezier-js';
import {Vector2fCalc} from '../Vector';
import {LogicNode} from './LogicNode';
import type {Receiver} from './Receiver';
import type {Transceiver} from './Transceiver';

type OutputNode = Transceiver | Receiver;

export abstract class Transmitter extends LogicNode {
  protected children: Set<OutputNode> = new Set();
  private hatchOffset: number = 0;

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
    const hatchOffset = this.hatchOffset += p.deltaTime;
    const hatchLength = 10;
    const [x, y] = this.getAnimatedPosition();

    p.push();

    p.stroke(p.color(0, 0, 100, 0.5));
    p.strokeWeight(5);

    for (const child of children) {
      const [childX, childY] = child.getAnimatedPosition();
      const vectorX = childX - x;
      const vectorY = childY - y;
      const vectorLength = Vector2fCalc.mag(vectorX, vectorY);
      const vectorHalfLength = vectorLength / 2;
      const [normalX, normalY] = Vector2fCalc.normalize(vectorX, vectorY);

      const pointsCount = 100;
      const points = new Bezier([
        x,
        y,
        x + normalX * vectorHalfLength,
        y + normalY * vectorHalfLength,
        childX,
        childY,
        childX,
        childY,
      ]).getLUT(pointsCount);

      const laserCount = 30;
      const step = pointsCount / laserCount;
      const iterationStep = 3;
      for (let i = 0; i < laserCount; i += iterationStep) {
        const seed = p.floor(p.frameCount + i * step);
        const fromIndex = seed % (pointsCount - iterationStep);
        const {x: fromX, y: fromY} = points[fromIndex];
        const {x: toX, y: toY} = points[fromIndex + iterationStep];

        p.line(fromX, fromY, toX, toY);
      }
    }

    p.pop();

    super.draw();
  }
}