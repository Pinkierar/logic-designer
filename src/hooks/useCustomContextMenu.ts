import {HTMLAttributes, useRef} from 'react';
import {useEventListener} from './useEventListener';

type CustomContextMenuHook = Pick<HTMLAttributes<HTMLElement>, 'onPointerDown' | 'onPointerUp'>;

export const useCustomContextMenu = (
  show: (event: MouseEvent) => void,
): CustomContextMenuHook => {
  const stateRef = useRef({
    isDownAbove: false,
    isUpAbove: false,
  });
  const state = stateRef.current;

  const onPointerDown: CustomContextMenuHook['onPointerDown'] = event => {
    if (event.pointerType === 'mouse' && event.button !== 2) return;

    state.isDownAbove = true;
  };

  const onPointerUp: CustomContextMenuHook['onPointerUp'] = () => {
    if (!state.isDownAbove) return;

    state.isUpAbove = true;
  };

  useEventListener('pointerdown', () => {
    state.isUpAbove = false;
  });

  useEventListener('pointerup', () => {
    state.isDownAbove = false;
  });

  useEventListener('contextmenu', event => {
    if (!state.isUpAbove) return;

    event.preventDefault();

    show(event);
  }, document);

  return {
    onPointerDown,
    onPointerUp,
  };
};