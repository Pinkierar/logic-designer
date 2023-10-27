import {elementMatch} from '@includes/elementMatch';

export function elementById<T extends typeof HTMLElement>(
  id: string,
  Match: T,
): InstanceType<T> {
  const element = document.getElementById(id);
  const checkedItem = elementMatch(element, Match);

  return checkedItem;
}