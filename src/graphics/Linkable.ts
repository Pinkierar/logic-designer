import {Entity} from './Entity';
import {Interactive} from './Interactive';
import {Shape} from './shapes';

export class Linkable<E extends Entity = Entity, S extends Shape = Shape> extends Interactive<E, S> {
  protected parents: Set<Interactive<E, S>> = new Set();

  public addParent(circle: Interactive<E, S>): void {
    if (circle === this) return;
    if (this.parents.has(circle))
      throw new Error('Already exists');

    this.parents.add(circle);
  }

  public getParents(): IterableIterator<Interactive<E, S>> {
    return this.parents.values();
  }
}