import {Contextual} from './Contextual';

export abstract class Drawable extends Contextual {
  public abstract draw(): void;
}