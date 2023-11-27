import {useEventListener} from '#hooks';
import {useCallback, useRef, useState} from 'react';

export const useResized = (
  initial: number,
  creator: (event: PointerEvent) => number,
  limiter: (value: number) => number = value => value,
): [number, boolean, () => void] => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [value, setValue] = useState<number>(limiter(initial));

  const downHandler = useCallback(() => {
    setDragging(true);
  }, []);

  const moveHandler = useCallback((event: PointerEvent) => {
    if (!dragging) return;

    setValue(limiter(creator(event)));
  }, [dragging]);

  const upHandler = useCallback(() => {
    setDragging(false);
  }, []);

  const resizeHandler = useCallback(() => {
    setValue(value => limiter(value));
  }, []);

  const touchMoveHandler = useCallback((event: TouchEvent) => {
    if (!dragging) return;

    event.preventDefault();
  }, [dragging]);

  useEventListener('pointermove', moveHandler);
  useEventListener('pointerup', upHandler);
  useEventListener('resize', resizeHandler);

  useEventListener(
    'touchmove',
    touchMoveHandler,
    useRef(document),
    {passive: false},
  );

  return [value, dragging, downHandler];
};