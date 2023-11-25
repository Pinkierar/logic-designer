export class CanvasController {
  public parent: HTMLElement | null = null;
  public readonly canvas: HTMLCanvasElement;

  public constructor() {
    this.canvas = CanvasController.createCanvas();

    this.binds();

    this.resizeHandler();
  }

  public setParent(parent: HTMLElement) {
    this.parent = parent;
    this.parent.style.position = 'relative';

    this.resizeHandler();
  }

  public resizeHandler() {
    if (!this.parent) return;

    const {width, height} = this.parent.getBoundingClientRect();

    this.setSize(width, height);
  }

  private setSize(width: number, height: number) {
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    this.canvas.width = width;
    this.canvas.height = height;
  }

  private static createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '0';
    canvas.style.height = '0';

    return canvas;
  }

  private binds() {
    this.resizeHandler = this.resizeHandler.bind(this);
  }
}