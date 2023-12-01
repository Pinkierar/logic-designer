import {CanvasController} from '#app';
import {Contextual, Entity, Interactive, PolygonShape, Vector2f} from '#graphics';
import P5, {CURSOR_TYPE} from 'p5';

const sketch = (canvasController: CanvasController, p: P5Type) => {
  const {ARROW, DEGREES, HAND, HSL, P2D, ROUND} = p;

  p.colorMode(HSL, 360, 100, 100, 1);
  p.angleMode(DEGREES);

  let cursor: CURSOR_TYPE = ARROW;

  const onEntityJoin = function (this: Interactive) {
    this.getControlled().setStyle({strokeWidth: 4, stroke: [0, 50, 100]});
    cursor = HAND;
  };

  const onEntityLeave = function (this: Interactive) {
    this.getControlled().setStyle({});
    cursor = ARROW;
  };

  const generateEntity = (p: P5Type, i: number, max: number) => {
    const entityZoom = i / max * 9 + 200 / max + 1;

    const entity = new Interactive(
      new Entity(
        new PolygonShape(
          [

            [0, 10],

            [1, 2],
            [6, 4],
            [2, 0],
            [7, -5],
            [1, -2],

            [0, -10],

            [-1, -2],
            [-7, -5],
            [-2, 0],
            [-6, 4],
            [-1, 2],

            [0, 10],
          ].map(v => v.map(a => a * entityZoom) as Vector2f),
        ),
        {
          fill: [
            p.floor(p.random(0, 100) + 200) % 360,
            30 + (70 * i / max),
            (80 * i / max),
          ],
          stroke: [0, 0, 100, 0.3],
          strokeWidth: entityZoom / 20,
        },
      ),
      new PolygonShape(
        [
          [0, 8],

          [4, 3],
          [5, -3],

          [0, -8],

          [-5, -3],
          [-4, 3],
        ].map(v => v.map(a => a * entityZoom) as Vector2f),
      ),
      {
        style: {
          strokeWidth: 1,
          stroke: [0, 0, 100, 0.3],
        },
        zIndex: i + 1,
      },
    );

    entity.enter = onEntityJoin;
    entity.leave = onEntityLeave;

    return entity;
  };

  const entitiesCount = 400;
  const entities = Array.from(
    {length: entitiesCount},
    (_, i) => generateEntity(p, i, entitiesCount),
  );

  p.setup = () => {
    p.createCanvas(1, 1, P2D, canvasController.canvas);
    p.strokeJoin(ROUND);

    const context = canvasController.canvas.getContext('2d');
    if (!context) throw new Error('non 2d context');
    context.imageSmoothingEnabled = false;

    canvasController.setSize = p.resizeCanvas.bind(p);
  };

  p.draw = () => {
    const {width, height, deltaTime, mouseX, mouseY} = p;

    entities.forEach((entity, i) => {
      const mult = deltaTime * (i / 100 + 0.1) / 200;
      const movementX = (p.noise(p.millis() / 10000, i * 1000) - 0.5) * mult;
      const movementY = (p.noise(p.millis() / 10000, i * 1000, 1000) - 0.5) * mult;

      entity.move(movementX, movementY);

      const [positionX, positionY] = entity.getPosition();

      let normalizedPositionX = positionX;
      let normalizedPositionY = positionY;
      if (positionX < -width) normalizedPositionX = width * 2;
      if (positionY < -height) normalizedPositionY = height * 2;
      if (positionX > width * 2) normalizedPositionX = -width;
      if (positionY > height * 2) normalizedPositionY = -height;
      entity.setPosition(normalizedPositionX, normalizedPositionY);
    });

    Interactive.update(mouseX, mouseY);

    p.clear(0, 0, 0, 0);

    entities.forEach(entity => {
      entity.draw();
    });

    p.cursor(cursor);
  };

  canvasController.resized = () => {
    const {width, height} = p;

    entities.forEach(entity => {
      entity.setPosition(
        p.random(-width, width * 2),
        p.random(-height, height * 2),
      );
    });
  };
};

export const run = (canvasController: CanvasController): void => {
  new P5((p: P5Type) => {
    Contextual.init(p);
    sketch(canvasController, p);
  }, canvasController.parent ?? document.body);
};