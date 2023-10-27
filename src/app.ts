import '@styles/vars.css';
import '@styles/global.css';
import '@styles/main.css';
import '@styles/tools.css';
import {elementById} from '@includes/elementById';
import {elementMatch} from '@includes/elementMatch';
import {Root} from '@includes/Root';
import P5, {Vector} from 'p5';
import {Shape} from '@includes/Shape.ts';
import {Drawable} from '@includes/Drawable.ts';
import {Interactable} from '@includes/Interactable.ts';

function init() {
  const rootElement = elementById('root', HTMLElement);
  const root = new Root(rootElement);

  const canvasElement = elementById('main', HTMLCanvasElement);
  const canvasParentElement = elementMatch(canvasElement.parentElement, HTMLElement);

  new P5((p: P5Type) => {
    Drawable.init(p);

    const scale = 1.7;
    const shape = new Shape([
      new Vector(-170, 0).mult(scale),

      new Vector(-200, -100).mult(scale),
      new Vector(-150, -50).mult(scale),
      new Vector(-120, -80).mult(scale),
      new Vector(-110, -50).mult(scale),
      new Vector(0, -50).mult(scale),
      new Vector(-20, -30).mult(scale),

      new Vector(200, 0).mult(scale),

      new Vector(-20, 30).mult(scale),
      new Vector(0, 50).mult(scale),
      new Vector(-110, 50).mult(scale),
      new Vector(-120, 80).mult(scale),
      new Vector(-150, 50).mult(scale),
      new Vector(-200, 100).mult(scale),
    ], {
      kind: p.TRIANGLE_FAN,
      fill: p.color('#b51d1d'),
      stroke: p.color('#dd6f6f'),
      strokeWidth: 1,
    });

    const interactiveShape = new Interactable(
      shape,
      [
        new Vector(-200, -100).mult(scale),
        new Vector(200, 0).mult(scale),
        new Vector(-200, 100).mult(scale),
      ],
      {
        fill: p.color('#000000'),
        stroke: p.color('#ffffff'),
        strokeWidth: 2,
      },
    );

    p.setup = () => {
      p.createCanvas(1, 1, p.P2D, canvasElement);
      p.strokeJoin(p.ROUND);

      root.onresize = () => {
        const {
          offsetWidth: width,
          offsetHeight: height,
        } = canvasParentElement;

        p.resizeCanvas(width, height);
      };
    };

    p.draw = () => {
      const shapePosition = new Vector(p.width/2, p.height/2);

      const value = p.frameCount / 50;
      const offset = new Vector(
        p.sin(value) * 2,
        p.cos(value * 3),
      ).mult(100);
      shape.setPosition(shapePosition.add(offset));

      interactiveShape.update();

      // p.clear(0, 0, 0, 0);

      // interactiveShape.draw();
      shape.draw();
    };
  }, canvasParentElement);
}

window.addEventListener('DOMContentLoaded', () => {
  try {
    init();
  } catch (e) {
    const error = e instanceof Error ? e : new Error('Unknown error');

    document.body.innerHTML = `<pre>${error.message}</pre>`;

    throw e;
  }
});
