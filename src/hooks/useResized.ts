import {useEventListener} from '#hooks';
import {useRef, useState} from 'react';

interface PointerEvent {
  pageX: number,
  pageY: number,
}

type ResizedHook = [
  number,
  boolean,
  (event: PointerEvent) => void,
];

export const useResized = (
  creator: (event: PointerEvent) => number,
  limiter: (value: number) => number,
  initial: number,
): ResizedHook => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [value, setValue] = useState<number>(limiter(initial));

  const downHandler = (event: PointerEvent) => {
    setDragging(true);

    setValue(limiter(creator(event)));
  };

  useEventListener('pointermove', event => {
    if (!dragging) return;

    setValue(limiter(creator(event)));
  });

  useEventListener('pointerup', () => {
    setDragging(false);
  });

  useEventListener('resize', () => {
    setValue(value => limiter(value));
  });

  useEventListener(
    'touchmove',
    event => void (dragging && event.preventDefault()),
    useRef(document),
    {passive: false},
  );

  return [value, dragging, downHandler];
};