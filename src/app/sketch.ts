import {CanvasController} from '#app';
import {Circle, Interactive, Receiver, Transceiver, Transmitter} from '#graphics';
import {FileData, FileRepository} from '#repositories';
import {CURSOR_TYPE} from 'p5';
import {Button, Lamp} from '../graphics/nodes/io';
import {BoundingBox} from '../graphics/shapes/BoundingBox';

const NOISE_MAX = 15.5;

enum Tool {
  node = 'node',
  connector = 'connector',
  button = 'button',
}

enum Mode {
  placement = 'placement',
  movement = 'movement',
  production = 'production',
}

export const sketch = (canvasController: CanvasController, p: P5Type): void => {
  const {ARROW, DEGREES, HAND, HSL, P2D, ROUND, LEFT, TOP} = p;

  p.colorMode(HSL, 360, 100, 100, 1);
  p.angleMode(DEGREES);

  let cursor: CURSOR_TYPE = ARROW;

  let mouseAbove: Interactive | null = null;
  let dragged: Interactive | null = null;

  let ctrlKey = false;

  const lineWidth = 22;
  let lineNumber = 0;

  let interpolatedFps = 60;

  let centerX = 0;
  let centerY = 0;

  let tool: Tool = Tool.node;
  let mode: Mode = Mode.placement;

  let transmitters: Transmitter[] = [];
  let transceivers: Transceiver[] = [];
  let receivers: Receiver[] = [];

  const drawText = (text: string) => {
    p.push();
    p.noStroke();
    p.fill(p.color(0, 0, 100, 0.8));
    p.text(text, 10, lineNumber * lineWidth + 10);
    p.pop();
    lineNumber++;
  };

  const onEntityJoin = function (this: Interactive): void {
    this.getControlled().setStyle({stroke: [0, 50, 100]});
    mouseAbove = this;

    cursor = HAND;
  };
  const onEntityLeave = function (this: Interactive): void {
    this.getControlled().setStyle({});
    mouseAbove = null;

    cursor = ARROW;
  };
  const activateNodeInteractive = (node: Interactive) => {
    node.enter = onEntityJoin;
    node.leave = onEntityLeave;

    return node;
  };

  const drawFile = (file: FileData): void => {
    if (!file.data) throw new Error(`file (${file.id}) is not editable logic node`);

    let count = 0;
    transmitters = [];
    transceivers = [];
    receivers = [];

    for (let i = 0; i < file.in; i++) {
      const node = activateNodeInteractive(new Circle({
        zIndex: count,
        radius: 30,
        color: 234,
      }));
      const button = new Button(node);

      transmitters.push(button);

      count++;
    }

    for (let i = 0; i < file.data.length; i++) {
      const datum = file.data[i];
      const elementId = datum.el;

      const node = activateNodeInteractive(new Circle({
        zIndex: count,
        radius: 60,
        color: 146,
      }));
      const transceiver = new Transceiver(node, elementId);

      transceivers.push(transceiver);

      count++;
    }

    for (let i = 0; i < file.out; i++) {
      const node = activateNodeInteractive(new Circle({
        zIndex: count,
        radius: 30,
        color: 58,
      }));
      const lamp = new Lamp(node);

      receivers.push(lamp);

      count++;
    }

    if (transceivers.length !== file.data.length)
      throw new Error('transceivers.length !== file.data.length');

    for (let i = 0; i < transceivers.length; i++) {
      const transceiver = transceivers[i];
      const datum = file.data[i];
      const [x, y] = datum.pos;

      transceiver.setPosition(x * 1.7 + 250, y * 0.9 + 100);

      if (datum.to !== void 0) {
        for (let j = 0; j < datum.to.length; j++) {
          const indexTo = datum.to[j];
          const child = transceivers[indexTo];
          if (!child) throw new Error(`Нет ноды с индексом ${datum.to}`);

          transceiver.addChild(child);
        }
      }

      if (datum.in !== void 0) {
        for (let j = 0; j < datum.in.length; j++) {
          const indexIn = datum.in[j];
          const parent = transmitters[indexIn];
          if (!parent) throw new Error(`Нет входа по индексу ${datum.in}`);

          parent.addChild(transceiver);
        }
      }

      if (datum.out !== void 0) {
        for (let j = 0; j < datum.out.length; j++) {
          const indexOut = datum.out[j];
          const child = receivers[indexOut];
          if (!child) throw new Error(`Нет выхода по индексу ${datum.out}`);

          transceiver.addChild(child);
        }
      }
    }

    transceivers.forEach(node => {
      const [x, y] = node.getPosition();
      const newX = x;

      node.setPosition(newX, y);
    });

    const boundingBox = BoundingBox.fromVertices(
      transceivers.map(transceiver => transceiver.getPosition()),
    );

    transmitters.forEach((node, index) => node.setPosition(
      boundingBox.ax - 200,
      boundingBox.ay + index * 100,
    ));
    receivers.forEach((node, index) => node.setPosition(
      boundingBox.bx + 200,
      boundingBox.ay + index * 100,
    ));
  }

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

    FileRepository.get(103).then(drawFile);
  };

  p.draw = () => {
    const {deltaTime, mouseX, mouseY, mouseIsPressed} = p;

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

    lineNumber = 0;

    const fps = 1000 / (deltaTime || 16.7);
    const fpsOffset = fps - interpolatedFps;
    interpolatedFps = interpolatedFps + fpsOffset * 0.07;

    p.cursor(cursor);

    p.clear(0, 0, 0, 0);

    transmitters.forEach(node => node.draw());
    transceivers.forEach(node => node.draw());
    receivers.forEach(node => node.draw());

    drawText(`fps: ${interpolatedFps.toPrecision(4)}`);
    drawText(`mode: ${mode}`);
    drawText(`tool: ${tool}`);
  };

  let resizeTimeout = NaN;
  const beforeResize = () => {
    Interactive.animationStart();

    window.clearTimeout(resizeTimeout);
  };

  canvasController.resized = () => {
    const {width, height} = p;

    centerX = width / 2;
    centerY = height / 2;

    Interactive.animationStop();

    window.clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(beforeResize, 500);
  };

  p.keyPressed = (event: KeyboardEvent) => {
    ctrlKey = event.ctrlKey;

    if (event.code === 'Digit1') {
      tool = Tool.node;
    }

    if (event.code === 'Digit2') {
      tool = Tool.button;
    }

    if (event.code === 'Digit3') {
      tool = Tool.connector;
    }

    if (event.code === 'KeyM') {
      if (mode === Mode.placement) {
        mode = Mode.production;
      } else {
        mode = Mode.placement;
      }
    }
  };

  p.keyReleased = (event: KeyboardEvent) => {
    ctrlKey = event.ctrlKey;
  };

  // let currentParent: Interactive | null = null;
  //
  // p.touchStarted = p.mousePressed = () => {
  //   if (!ctrlKey) return;
  //
  //   const {mouseX, mouseY} = p;
  //
  //   if (tool === Tool.connector && mouseAbove) {
  //     currentParent = mouseAbove;
  //     return;
  //   }
  //
  //   if (tool === Tool.node) {
  //     const circle = generateNode(generateTwilight, entities.length + 1);
  //     circle.setPosition(mouseX, mouseY);
  //     entities.push(circle);
  //   }
  // };
  //
  // p.touchEnded = p.mouseReleased = () => {
  //   const parent = currentParent;
  //   currentParent = null;
  //
  //   if (!parent) return;
  //   if (!mouseAbove) return;
  //   if (parent === mouseAbove) return;
  //
  //   mouseAbove.addParent(parent);
  // };
};