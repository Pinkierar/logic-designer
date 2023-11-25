import {Contextual} from '#graphics';

export abstract class Drawable extends Contextual {
  public abstract draw(): void;
}