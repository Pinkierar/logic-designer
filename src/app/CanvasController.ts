import type {OpenFileHandler} from '#components/Explorer/Context';
import {FileMinData} from '#repositories';

class CanvasController {
  public parent: HTMLElement | null = null;
  public readonly canvas: HTMLCanvasElement;
  public setSize?: (width: number, height: number) => void;
  public resized = () => void 0;
  public onOpenFile: OpenFileHandler = () => void 0;

  public constructor() {
    this.canvas = CanvasController.createCanvas();

    this.binds();

    window.addEventListener('resize', this.resizeHandler);

    this.resizeHandler();
  }

  public setParent(parent: HTMLElement): void {
    this.parent = parent;
    parent.style.position = 'relative';

    this.resizeHandler();
  }

  public resizeHandler(): void {
    if (!this.parent || !this.setSize) return;

    const zoom = window.devicePixelRatio;

    const {width, height} = this.parent.getBoundingClientRect();

    const sizeWidth = width;
    const sizeHeight = height;

    this.setSize(sizeWidth * zoom, sizeHeight * zoom);

    this.resized();
  }

  public openFileHandler(fileData: FileMinData): void {
    this.onOpenFile(fileData);
  }

  private static createCanvas(): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.className = 'app';

    return canvas;
  }

  private binds(): void {
    this.resizeHandler = this.resizeHandler.bind(this);
    this.openFileHandler = this.openFileHandler.bind(this);
  }
}

export type {
  CanvasController,
};

export const canvasController = new CanvasController();