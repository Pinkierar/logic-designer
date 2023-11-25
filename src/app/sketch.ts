import {CanvasController} from '#app';
import {Contextual, Entity, Interactable, PolygonShape} from '#graphics';
import P5, {CURSOR_TYPE} from 'p5';

const sketch = (canvasController: CanvasController, p: P5Type) => {
  p.colorMode(p.HSL, 360, 100, 100, 1);

  const entity = new Interactable(
    new Entity(
      new PolygonShape(
        [
          [-170, 0],

          [-200, -100],
          [-150, -50],
          [-120, -80],
          [-110, -50],
          [0, -50],
          [-20, -30],

          [200, 0],

          [-20, 30],
          [0, 50],
          [-110, 50],
          [-120, 80],
          [-150, 50],
          [-200, 100],
        ].map(([x, y]) => [x * 2, y * 2]),
      ),
      {
        fill: [0, 72, 41],
        stroke: [0, 62, 65],
        strokeWidth: 2,
      },
    ),
    new PolygonShape(
      [
        [-200, -100],
        [200, 0],
        [-200, 100],
      ].map(([x, y]) => [x * 1.9, y * 1.7]),
    ),
    {
      stroke: [0, 100, 100, 0.1],
      strokeWidth: 1,
    },
  );

  p.setup = () => {
    p.createCanvas(1, 1, p.P2D, canvasController.canvas);
    p.strokeJoin(p.ROUND);

    const context = canvasController.canvas.getContext('2d');
    if (!context) throw new Error('non 2d context');
    context.imageSmoothingEnabled = false;

    canvasController.setSize = p.resizeCanvas.bind(p);
  };

  p.draw = () => {
    let cursor: CURSOR_TYPE = p.ARROW;

    const centerX = p.width / 2;
    const centerY = p.height / 2;

    const value = p.millis() / 1300;

    entity.setPosition(
      centerX + p.sin(value) * 2 * 50,
      centerY + p.cos(value * 3) * 50,
    );

    const hovered = entity.isInside([p.mouseX, p.mouseY]);
    entity.getControlled().setStyle(hovered ? {stroke: [0, 50, 100]} : {});
    if (hovered) cursor = p.HAND;

    p.clear(0, 0, 0, 0);

    entity.draw();

    p.cursor(cursor);
  };
};

export const run = (canvasController: CanvasController): void => {
  new P5((p: P5Type) => {
    Contextual.init(p);
    sketch(canvasController, p);
  }, canvasController.parent ?? document.body);
};