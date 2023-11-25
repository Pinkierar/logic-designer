import {Shape} from './Shape';

export class VoidShape extends Shape {
  public draw(): void {
  }

  public drawVertices(): void {
  }

  public isInside(): boolean {
    return false;
  }
}