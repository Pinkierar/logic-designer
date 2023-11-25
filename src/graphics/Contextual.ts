export abstract class Contextual {
  private static _p: P5Type;

  public static init(p: P5Type): void {
    Contextual._p = p;
  }

  //

  protected p: P5Type;

  protected constructor() {
    if (!Contextual._p) throw new Error('Use Contextual.init');

    this.p = Contextual._p;
  }
}