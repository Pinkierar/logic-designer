import P5, {p5InstanceExtensions} from 'p5';

declare global {
  type ClassByInstance<Instance> = { new(...args: any[]): Instance };
  type P5Type = P5 & p5InstanceExtensions;
  type Falsy = false | 0 | '' | null | undefined;
}
