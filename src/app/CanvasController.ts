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

  private setSizeStyle(width: number, height: number): void {
    const {canvas: {style}} = this;

    style.width = `${width}px`;
    style.height = `${height}px`;
  }

  public resizeHandler(): void {
    const {parent} = this;

    if (!parent || !this.setSize) return;

    const zoom = window.devicePixelRatio;

    const {width, height} = parent.getBoundingClientRect();

    const sizeWidth = width;
    const sizeHeight = height;

    this.setSizeStyle(sizeWidth, sizeHeight);
    this.setSize(sizeWidth, sizeHeight);
  }

  private static createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    const {style} = canvas;
    style.position = 'absolute';
    style.top = style.left = style.width = style.height = '0';

    return canvas;
  }

  private binds(): void {
    this.resizeHandler = this.resizeHandler.bind(this);
  }
}