import {Dispatch, SetStateAction, useCallback, useState} from 'react';

type ToggleHook = [
  boolean,
  () => void,
  Dispatch<SetStateAction<boolean>>,
];

export function useToggle(initial?: any): ToggleHook {
  const [value, setValue] = useState(Boolean(initial));

  const toggle = useCallback(() => setValue(x => !x), []);

  return [value, toggle, setValue];
}