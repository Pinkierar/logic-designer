import {Shape, Vector2f} from '#graphics';
import {Entity, EntityOptions} from './Entity';

type InteractableOptions = EntityOptions & {
  zIndex?: number,
};

export class Interactive<E extends Entity = Entity, S extends Shape = Shape> extends Entity<S> {
  private static interactives: Interactive[] = [];
  private static currentInsideZIndex: number = -Infinity;
  private static animated: boolean = false;

  private zIndex!: number;
  private readonly controlled: E;
  private currentIsInside: boolean = false;
  private realIsInside: boolean = false;

  private enterHandlers: (() => void)[] = [];
  private leaveHandlers: (() => void)[] = [];

  public constructor(controlled: E, shape: S, options?: InteractableOptions) {
    super(shape, options);
    Interactive.interactives.push(this);

    this.setZIndex(options?.zIndex ?? 1);
    this.controlled = controlled;
  }

  public static animationStart(): void {
    Interactive.animated = true;
  }

  public static animationStop(): void {
    Interactive.animated = false;
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

  public override getAnimatedPosition(): Vector2f {
    return this.controlled.getPosition();
  }

  public override draw(): void {
    if (Interactive.animated) return this.drawAnimated();

    const {positionX: iPositionX, positionY: iPositionY, controlled} = this;

    controlled.setPosition(iPositionX, iPositionY);

    controlled.draw();
  }

  public drawBoundingEntity(): void {
    super.draw();
  }

  public addEnterListener(handler: (this: Interactive) => void): void {
    this.enterHandlers.push(handler.bind(this));
  }

  public addLeaveListener(handler: (this: Interactive) => void): void {
    this.leaveHandlers.push(handler.bind(this));
  }

  //

  private enter() {
    this.enterHandlers.forEach(enterHandler => enterHandler());
  }

  private leave() {
    this.leaveHandlers.forEach(leaveHandler => leaveHandler());
  }

  private drawAnimated(): void {
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

  private _isInside(x: number, y: number): boolean {
    if (Interactive.currentInsideZIndex > this.zIndex) return false;

    const isInside = super.isInside(x, y);

    if (isInside) Interactive.currentInsideZIndex = this.zIndex;

    return isInside;
  }
}

(globalThis as any).Interactable = Interactive;