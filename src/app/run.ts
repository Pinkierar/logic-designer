import {Contextual} from '#graphics';
import P5 from 'p5';
import {CanvasController} from './CanvasController';
import {sketch} from './sketch';

export const run = (canvasController: CanvasController): void => {
  new P5((p: P5Type) => {
    Contextual.init(p);
    sketch(canvasController, p);
  }, canvasController.parent ?? document.body);
};