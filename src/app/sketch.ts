import {CanvasController} from '#app';
import {Circle, Contextual, Interactive, Line, Linkable, Twilight} from '#graphics';
import P5, {CURSOR_TYPE} from 'p5';

const sketch = (canvasController: CanvasController, p: P5Type) => {
  const {ARROW, DEGREES, HAND, HSL, P2D, ROUND, LEFT, TOP} = p;
  // const NOISE_MAX = 15.5;

  p.colorMode(HSL, 360, 100, 100, 1);
  p.angleMode(DEGREES);

  let cursor: CURSOR_TYPE = ARROW;
  let mouseAbove: Linkable | null = null;
  let dragged: Linkable | null = null;
  const deltaTimes: number[] = new Array(20);
  let isLineMode = false;
  let ctrlKey = false;

  const onEntityJoin = function (this: Linkable) {
    this.getControlled().setStyle({stroke: [0, 50, 100]});
    mouseAbove = this;

    cursor = HAND;
  };
  const onEntityLeave = function (this: Linkable) {
    this.getControlled().setStyle({});
    mouseAbove = null;

    cursor = ARROW;
  };

  const generateCircle = (index: number): Circle => {
    const zIndex = index / 100;
    const radius = 20 + zIndex * 10;
    const x = index % 10;
    const y = p.floor(index / 10);

    const circle = new Circle({
      color: p.floor(p.noise(x * 0.3, y * 0.3) * 700) % 360,
      zIndex: index,
      radius: radius,
      position: [50 + x * 80, 50 + y * 80],
    });

    circle.enter = onEntityJoin;
    circle.leave = onEntityLeave;

    return circle;
  };

  const generateTwilight = (index: number): Twilight => {
    const twilight = new Twilight({
      color: p.floor(p.noise(index / 100) * 700) % 360,
      zIndex: index,
    });

    twilight.enter = onEntityJoin;
    twilight.leave = onEntityLeave;

    return twilight;
  };

  const line = new Line({});
  const circles: Linkable[] = [];
  // const entitiesCount = 100;
  // for (let i = 0; i < entitiesCount; i++) {
  //   circles.push(generateCircle(i));
  // }
  //
  // const linesCount = p.floor(p.random(0, 30));
  // for (let i = 0; i < linesCount; i++) {
  //   try {
  //     const indexFrom = p.floor(p.random(0, circles.length));
  //     const indexTo = p.floor(p.random(0, circles.length));
  //     circles[indexFrom].addParent(circles[indexTo]);
  //   } catch (e) {
  //
  //   }
  // }

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
    const {deltaTime, frameCount, mouseX, mouseY, mouseIsPressed} = p;
    deltaTimes[frameCount % deltaTimes.length] = deltaTime;

    if (mouseIsPressed && mouseAbove && !ctrlKey) {
      if (!dragged) {
        dragged = mouseAbove;
      }
    } else {
      dragged = null;
    }

    if (dragged) {
      dragged.setPosition(mouseX, mouseY);
    } else {
      Interactive.update(mouseX, mouseY);
    }

    p.cursor(cursor);

    p.clear(0, 0, 0, 0);

    circles.forEach(circle => {
      line.setFrom(circle.getControlled().getPosition());
      for (const parent of circle.getParents()) {
        line.setTo(parent.getControlled().getPosition());
        line.draw();
      }
    });

    circles.forEach(circle => circle.draw());

    p.push();
    p.fill(p.color(0, 0, 100, 0.8));
    const sumDeltaTimes = deltaTimes.reduce((sum, time) => sum + time, 0);
    const fps = 1000 / (sumDeltaTimes / deltaTimes.length);
    p.text(`fps: ${p.round(fps * 10) / 10}`, 10, 10);
    p.pop();

    p.push();
    p.fill(p.color(0, 0, 100, 0.8));
    p.text(`mode: ${isLineMode ? 'line' : 'circle'}`, 10, 30);
    p.pop();
  };

  // p.mousePressed = () => {
  //   const {mouseX, mouseY} = p;
  //
  //   console.log(`down = [${mouseX}, ${mouseY}]`);
  //
  //   // if (mouseAbove) {
  //   //   mouseAbove.setPosition(mouseX, mouseY);
  //   // } else {
  //   //   Interactive.update(mouseX, mouseY);
  //   // }
  // };
  //
  // p.mouseReleased = () => {
  //   const {mouseX, mouseY} = p;
  //
  //   console.log(`up = [${mouseX}, ${mouseY}]`);
  // };

  // canvasController.resized = () => {
  //   const {width, height} = p;
  //   centerX = width / 2;
  //   centerY = height / 2;
  // };

  p.keyPressed = (event: KeyboardEvent) => {
    ctrlKey = event.ctrlKey;

    if (event.code !== 'KeyR') return;

    isLineMode = !isLineMode;
  };

  p.keyReleased = (event: KeyboardEvent) => {
    ctrlKey = event.ctrlKey;
  };

  let currentParent: Linkable | null = null;

  p.touchStarted = p.mousePressed = () => {
    if (!ctrlKey) return;

    const {mouseX, mouseY} = p;

    if (isLineMode) {
      if (mouseAbove) {
        currentParent = mouseAbove;
      }
    } else {
      const circle = generateTwilight(circles.length + 1);
      circle.setPosition(mouseX, mouseY);
      circles.push(circle);
    }
  };

  p.touchEnded = p.mouseReleased = () => {
    const parent = currentParent;
    currentParent = null;

    if (!parent) return;
    if (!mouseAbove) return;
    if (parent === mouseAbove) return;

    mouseAbove.addParent(parent);

  };
};

export const run = (canvasController: CanvasController): void => {
  new P5((p: P5Type) => {
    Contextual.init(p);
    sketch(canvasController, p);
  }, canvasController.parent ?? document.body);
};