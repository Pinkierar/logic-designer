import {Entity} from '../Entity';
import {Linkable} from '../Linkable';
import {CircleShape} from '../shapes';
import {Vector2f} from '../Vector';

type CircleOptions = {
  zIndex: number,
  radius: number,
  position?: Vector2f,
  color: number,
};

export class Circle extends Linkable<Entity<CircleShape>, CircleShape> {
  public constructor(options: CircleOptions) {
    const {
      zIndex = 0,
      radius,
      position,
      color,
    } = options;

    super(
      new Entity(
        new CircleShape(radius),
        {
          style: {
            fill: [color, 50, 45],
            stroke: [color, 50, 30],
            strokeWeight: 3,
          },
        },
      ),
      new CircleShape(radius),
      {
        zIndex: zIndex,
      },
    );

    if (position) {
      const [positionX, positionY] = position;

      this.setPosition(positionX, positionY);
    }
  }
}