export class CanvasController {
  public parent: HTMLElement | null = null;
  public readonly canvas: HTMLCanvasElement;
  public setSize?: (width: number, height: number) => void;

  public constructor() {
    this.canvas = CanvasController.createCanvas();

    this.binds();

    this.resizeHandler();
  }

  public setParent(parent: HTMLElement): void {
    this.parent = parent;
    parent.style.position = 'relative';

    this.resizeHandler();
  }

  public resizeHandler(): void {
    const {parent} = this;

    if (!parent || !this.setSize) return;

    const zoom = window.devicePixelRatio;

    const {width, height} = parent.getBoundingClientRect();

    const sizeWidth = width;
    const sizeHeight = height;

    this.setSize(sizeWidth * zoom, sizeHeight * zoom);
  }

  private static createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.className = 'app';

    return canvas;
  }

  private binds(): void {
    this.resizeHandler = this.resizeHandler.bind(this);
  }
}