// Source: https://github.com/juliencrn/usehooks-ts

import {useCallback, useLayoutEffect, useRef} from 'react';

export function useEventCallback<Args extends unknown[], R>(
  callback: (...args: Args) => R,
) {
  const ref = useRef<typeof callback>(() => {
    throw new Error('Невозможно вызвать обработчик во время рендеринга.');
  });

  useLayoutEffect(() => {
    ref.current = callback;
  }, [callback]);

  return useCallback((...args: Args) => ref.current(...args), [ref]);
}