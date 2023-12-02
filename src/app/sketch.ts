import {CanvasController} from '#app';
import {Contextual, Interactive, TwilightSparkle} from '#graphics';
import P5, {CURSOR_TYPE} from 'p5';

const sketch = (canvasController: CanvasController, p: P5Type) => {
  const {ARROW, DEGREES, HAND, HSL, P2D, ROUND, CENTER, LEFT, TOP} = p;
  const NOISE_MAX = 15.5;

  p.colorMode(HSL, 360, 100, 100, 1);
  p.angleMode(DEGREES);

  let cursor: CURSOR_TYPE = ARROW;
  let mouseAbove: Interactive | null = null;
  const deltaTimes: number[] = new Array(20);

  const onEntityJoin = function (this: Interactive) {
    this.getControlled().setStyle({strokeWeight: 2, stroke: [0, 50, 100]});
    mouseAbove = this;

    cursor = HAND;
  };
  const onEntityLeave = function (this: Interactive) {
    this.getControlled().setStyle({});
    mouseAbove = null;

    cursor = ARROW;
  };
  const generateEntity = (zIndex: number) => {
    const twilight = new TwilightSparkle({zIndex});

    twilight.enter = onEntityJoin;
    twilight.leave = onEntityLeave;

    return twilight;
  };

  const entitiesCount = 100;
  const entities = Array.from(
    {length: entitiesCount},
    (_, i) => generateEntity(i / entitiesCount),
  );

  p.setup = () => {
    const renderer = p.createCanvas(1, 1, P2D, canvasController.canvas);

    const context = renderer.elt.getContext('2d');
    if (!context) throw new Error('non 2d context');
    context.imageSmoothingEnabled = false;

    p.strokeJoin(ROUND);
    p.noiseDetail(5, 0.5);
    p.textSize(20);
    p.textAlign(LEFT, TOP);

    canvasController.setSize = p.resizeCanvas.bind(p);

    canvasController.resizeHandler();
  };

  p.draw = () => {
    const {width, height, deltaTime, frameCount, mouseX, mouseY, mouseIsPressed} = p;
    deltaTimes[frameCount % deltaTimes.length] = deltaTime;
    const centerX = width / 2;
    const centerY = height / 2;

    entities.forEach((entity, i) => {
      const mult = deltaTime * (i / 100 + 0.1) / 200;
      const x = i;
      const t = p.millis() / 5000;
      const movementX = (p.noise(x, 0, t) - 0.5) * mult;
      const movementY = (p.noise(x, NOISE_MAX / 2, t) - 0.5) * mult;

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

    if (mouseIsPressed && mouseAbove) {
      mouseAbove.setPosition(mouseX, mouseY);
    } else {
      Interactive.update(mouseX, mouseY);
    }

    p.cursor(cursor);

    p.clear(0, 0, 0, 0);

    entities.forEach(entity => {
      entity.draw();
      // mouseAbove && entity.drawBoundingEntity();
      // entity.drawBoundingEntity();
    });

    p.push();
    p.fill(p.color(0, 0, 100, 0.8));
    const sumDeltaTimes = deltaTimes.reduce((sum, time) => sum + time, 0);
    const fps = 1000 / (sumDeltaTimes / deltaTimes.length);
    p.text(`fps: ${p.round(fps * 10) / 10}`, 10, 10);
    p.pop();
  };

  // let center!: Vector2f;
  // p.mousePressed = () => {
  //   const {width, height, deltaTime, frameCount, mouseX, mouseY, mouseIsPressed} = p;
  //
  //   if (!center) {
  //     center = [mouseX, mouseY];
  //     console.log(`center = [${mouseX}, ${mouseY}]`);
  //     return
  //   }
  //
  //   const [centerX, centerY] = center;
  //
  //   console.log(`[${mouseX - centerX}, ${mouseY - centerY}],`);
  // }
  //
  // p.mouseReleased = () => {
  //   const {width, height, deltaTime, frameCount, mouseX, mouseY, mouseIsPressed} = p;
  // }

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