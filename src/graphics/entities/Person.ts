import {Entity, Shape, SpriteShape, Style, Vector2f} from '#graphics';

export class Person<S extends Shape> extends Entity<SpriteShape> {
  public setView;
  public setScale;
  private hitbox: Entity<S>;

  public constructor(
    imageName: string,
    scale: number,
    hitbox: Entity<S>,
    style?: Style,
  ) {
    const sprite = new SpriteShape(imageName, scale);
    super(sprite, style);

    this.setView = this.shape.setView.bind(this.shape);
    this.setScale = this.shape.setScale.bind(this.shape);

    this.hitbox = hitbox;
  }

  public override isInside(point: Vector2f): boolean {
    return this.hitbox.isInside(point);
  }
}
