export function elementMatch<T extends typeof HTMLElement>(
  element: HTMLElement | undefined | null,
  Match: T,
): InstanceType<T> {
  if (!element) throw new Error('element not found');
  if (!(element instanceof Match)) throw new Error(`element is not ${Match.name}`);

  return element as InstanceType<T>;
}