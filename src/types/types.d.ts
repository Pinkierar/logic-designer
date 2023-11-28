import P5, {p5InstanceExtensions} from 'p5';

declare global {
  type ClassByInstance<Instance extends object> = Instance['constructor'];
  type P5Type = P5 & p5InstanceExtensions;
  type Falsy = null | undefined | false | 0 | -0 | 0n | '';
  type NonNever<F, S> = [F] extends [never] ? S : F;
  type CheckNever<F, S> = [F] extends [never] ? never : S;
}