import {RefObject} from 'react';
import {useEventListener} from './useEventListener';

export const useClickOutside = (
  elementRef: RefObject<HTMLElement>,
  callback: (event: PointerEvent) => void,
) => {
  useEventListener('pointerdown', event => {
    if (!(event.target instanceof HTMLElement)) return;
    if (!elementRef.current) return;

    const target = event.target;
    const element = elementRef.current;

    if (element.contains(target)) return;

    callback(event);
  });
};