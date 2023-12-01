import {Entity, Shape, Style} from '#graphics';

type InteractableOptions = {
  style?: Style,
  zIndex?: number,
};

export class Interactive<E extends Entity = Entity, S extends Shape = Shape> extends Entity<S> {
  private static interactives: Interactive[] = [];
  private static currentInsideZIndex: number = -Infinity;

  private zIndex!: number;
  private readonly controlled: E;
  private currentIsInside: boolean = false;
  private realIsInside: boolean = false;

  public enter: () => void = () => void 0;
  public leave: () => void = () => void 0;

  public constructor(controlled: E, shape: S, options?: InteractableOptions) {
    super(shape, options?.style);
    Interactive.interactives.push(this);

    this.setZIndex(options?.zIndex ?? 1);
    this.controlled = controlled;
  }

  public static update(x: number, y: number): void {
    for (const interactable of Interactive.interactives) {
      interactable.currentIsInside = interactable._isInside(x, y);
    }

    for (const interactable of Interactive.interactives) {
      if (!interactable.realIsInside || interactable.currentIsInside) continue;
      interactable.leave();
    }

    for (const interactable of Interactive.interactives) {
      if (interactable.realIsInside || !interactable.currentIsInside) continue;
      interactable.enter();
    }

    for (const interactable of Interactive.interactives) {
      interactable.realIsInside = interactable.currentIsInside;
    }
  }

  public setZIndex(zIndex: number): void {
    this.zIndex = zIndex;

    Interactive.interactives.sort(({zIndex: a}, {zIndex: b}) => b - a);
  }

  public getZIndex(): number {
    return this.zIndex;
  }

  public getControlled(): E {
    return this.controlled;
  }

  public override isInside(): boolean {
    return this.realIsInside;
  }

  public override draw(): void {
    const {positionX, positionY, controlled} = this;

    controlled.setPosition(positionX, positionY);

    this.controlled.draw();

    super.draw();

    Interactive.currentInsideZIndex = -Infinity;
  }

  //

  private _isInside(x: number, y: number): boolean {
    if (Interactive.currentInsideZIndex > this.zIndex) return false;

    const isInside = super.isInside(x, y);

    if (isInside) Interactive.currentInsideZIndex = this.zIndex;

    return isInside;
  }
}

(globalThis as any).Interactable = Interactive;