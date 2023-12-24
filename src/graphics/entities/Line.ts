import {Entity, Interactive, PolygonShape, Vector2f, VoidShape} from '#graphics';

type LineOptions = {
  from?: Vector2f,
  to?: Vector2f,
};

export class Line extends Interactive<Entity<PolygonShape>, VoidShape> {
  private polygon: PolygonShape;

  public constructor(options: LineOptions) {
    const polygon = new PolygonShape([
      options.from ?? [0, 0],
      options.to ?? [0, 0],
    ]);

    super(
      new Entity(
        polygon,
        {
          style: {
            stroke: [0, 0, 50],
            strokeWeight: 2,
          },
        },
      ),
      new VoidShape(),
    );

    polygon.setKind(this.p.LINES);

    this.polygon = polygon;
  }

  public setFrom(position: Vector2f): void {
    this.polygon.setVertex(0, position);
  }

  public setTo(position: Vector2f): void {
    this.polygon.setVertex(1, position);
  }
}