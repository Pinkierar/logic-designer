import {Shape} from '#graphics';
import {Entity, EntityOptions} from './Entity';

type InteractableOptions = EntityOptions & {
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
    super(shape, options);
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
    const {p, positionX: iPositionX, positionY: iPositionY, controlled} = this;
    const {width, height} = p;
    const [cPositionX, cPositionY] = controlled.getPosition();
    const offsetX = iPositionX - cPositionX;
    const offsetY = iPositionY - cPositionY;
    const interpolated = p.abs(offsetX) < width / 2 && p.abs(offsetY) < height / 2;

    controlled.getShape().setRotation(p.max(-60, p.min(offsetX / 3, 60)));
    controlled.setPosition(
      interpolated ? cPositionX + offsetX / 5 : iPositionX,
      interpolated ? cPositionY + offsetY / 5 : iPositionY,
    );

    controlled.draw();

    Interactive.currentInsideZIndex = -Infinity;
  }

  public drawBoundingEntity(): void {
    super.draw();
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