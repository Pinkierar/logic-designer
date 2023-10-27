import appHtml from '@html/app.html';

export class Root {
  private static instance?: Root;

  public _onresize?: () => void;
  private element!: HTMLElement;

  public constructor(element: HTMLElement) {
    if (Root.instance) return Root.instance;
    Root.instance = this;

    this.element = element;

    this.binds();

    this.render();

    window.addEventListener('resize', this.resizeHandler);
  }

  public set onresize(handler: () => void) {
    this._onresize = handler;
    this.resizeHandler();
  }

  //

  private render(): void {
    this.element.innerHTML = appHtml;
  }

  private binds(): void {
    this.resizeHandler = this.resizeHandler.bind(this);
  }

  private resizeHandler(): void {
    this._onresize && this._onresize();
  }
}