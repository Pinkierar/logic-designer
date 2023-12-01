import {CanvasController} from './CanvasController';

export const canvasController = new CanvasController();

window.addEventListener('resize', canvasController.resizeHandler);