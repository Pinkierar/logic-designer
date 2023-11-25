import {CanvasController} from './CanvasController';

export const canvas = new CanvasController();

window.addEventListener('resize', canvas.resizeHandler);