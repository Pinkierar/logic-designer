import {Vector4f} from '#graphics';
import {Image} from 'p5';
import {RectangleShape} from './Rectangle';

export class SpriteShape extends RectangleShape {
  private static readonly images: Map<string, Image> = new Map();

  public static addImage(name: string, image: Image) {
    SpriteShape.images.set(name, image);
  }

  //

  private scale: number;
  private src: Image;
  private sprite!: Image;
  private viewX: number;
  private viewY: number;
  private viewWidth: number;
  private viewHeight: number;

  public constructor(imageName: string, scale: number = 1) {
    const src = SpriteShape.images.get(imageName);
    if (!src) throw new Error(`Image "${imageName}" not found`);

    const {width, height} = src;

    super(width, height);

    this.src = src;
    this.viewX = 0;
    this.viewY = 0;
    this.viewWidth = width;
    this.viewHeight = height;
    this.scale = scale;

    this.applyView();
  }

  public setScale(scale: number): void {
    this.scale = scale;

    this.applyScale();
  }

  public getScale(): number {
    return this.scale;
  }

  public setView(view: Vector4f): void {
    const [ax, ay, bx, by] = view;

    this.viewX = ax;
    this.viewY = ay;
    this.viewWidth = bx;
    this.viewHeight = by;

    this.applyView();
  }

  public override setSize(): void {
    throw new Error('Use SpriteShape.setScale');
  }

  public override draw(): void {
    const {p, sprite, width, height} = this;

    const x = width / -2;
    const y = height / -2;

    p.image(sprite, x, y, width, height);

    super.draw();
  }

  //

  private applyScale(): void {
    const {viewWidth, viewHeight, scale} = this;

    super.setSize(viewWidth * scale, viewHeight * scale);
  }

  private applyView(): void {
    const {p, src, viewX, viewY, viewWidth, viewHeight} = this;

    this.sprite = p.createImage(viewWidth, viewHeight);
    this.sprite.copy(
      src,
      viewX,
      viewY,
      viewWidth,
      viewHeight,
      0,
      0,
      viewWidth,
      viewHeight,
    );

    this.applyScale();
  }
}
