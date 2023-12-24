import {Entity} from '../Entity';
import {Interactive} from '../Interactive';
import {CircleShape} from '../shapes';
import {Vector2f} from '../Vector';
import {Line} from './Line';

type CircleOptions = {
  zIndex: number,
  radius: number,
  position?: Vector2f,
  color: number,
}

// const vertices = {
//   back: [
//     [3, -65],
//     [91, -219],
//     [48, -47],
//     [224, 7],
//     [58, 42],
//     [131, 246],
//     [-5, 31],
//     [-83, 232],
//     [-54, 17],
//     [-214, 3],
//     [-42, -22],
//     [-145, -200],
//   ],
//   main: [
//     [-15, -432],
//     [62, -114],
//     [249, -160],
//     [106, 3],
//     [228, 165],
//     [52, 109],
//     [8, 442],
//     [-57, 105],
//     [-253, 181],
//     [-106, -5],
//     [-300, -206],
//     [-61, -105],
//   ],
//   star1: [
//     [209, -447],
//     [227, -374],
//     [272, -384],
//     [238, -345],
//     [268, -305],
//     [225, -319],
//     [215, -242],
//     [198, -321],
//     [152, -303],
//     [185, -348],
//     [140, -393],
//     [197, -372],
//   ],
//   star2: [
//     [261, 111],
//     [282, 217],
//     [339, 200],
//     [295, 258],
//     [329, 312],
//     [280, 293],
//     [268, 404],
//     [249, 291],
//     [195, 316],
//     [236, 254],
//     [182, 188],
//     [248, 221],
//   ],
//   star3: [
//     [-146, 241],
//     [-130, 326],
//     [-93, 314],
//     [-121, 357],
//     [-97, 401],
//     [-132, 386],
//     [-141, 473],
//     [-154, 385],
//     [-193, 404],
//     [-164, 355],
//     [-203, 302],
//     [-155, 328],
//   ],
//   star4: [
//     [-349, -44],
//     [-328, 39],
//     [-279, 28],
//     [-316, 70],
//     [-284, 114],
//     [-331, 99],
//     [-343, 187],
//     [-360, 98],
//     [-412, 118],
//     [-373, 69],
//     [-424, 16],
//     [-361, 42],
//   ],
//   star5: [
//     [-224, -499],
//     [-209, -430],
//     [-174, -441],
//     [-201, -404],
//     [-177, -368],
//     [-211, -381],
//     [-219, -310],
//     [-232, -382],
//     [-269, -366],
//     [-241, -406],
//     [-278, -449],
//     [-233, -429],
//   ],
//   bounding: [
//     [-13, -367],
//     [212, -136],
//     [194, 140],
//     [6.8, 376],
//     [-215, 154],
//     [-255, -175],
//   ],
// } satisfies { [key: string]: Vector2f[] };

export class Circle extends Interactive<Entity<CircleShape>, CircleShape> {
  private parents: Set<Circle> = new Set();
  private children: Set<Circle> = new Set();
  private lines: Line[] = [];

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

  public addParent(circle: Circle): void {
    if (circle === this) return;
    if (this.parents.has(circle))
      throw new Error('Already exists');

    this.parents.add(circle);

    circle.addChild(this);
  }

  public getParents(): IterableIterator<Circle> {
    return this.parents.values();
  }

  //

  private addChild(circle: Circle): void {
    if (circle === this) return;
    if (this.children.has(circle))
      throw new Error('Already exists');

    this.children.add(circle);
  }
}