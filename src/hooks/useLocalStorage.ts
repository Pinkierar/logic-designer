import {useEffect, useMemo, useState} from 'react';
import {useEventListener} from './useEventListener';
import {useUnmount} from './useUnmount';

type RawValue = string | number | boolean;

export const useLocalStorage = (
  key: string,
  creator: () => RawValue,
  initial: RawValue,
): string => {
  const savedValue = useMemo(() => {
    return window.localStorage.getItem(key) ?? String(initial);
  }, [key, initial]);

  const [storedValue, setStoredValue] = useState(savedValue);

  const saveValue = (value: RawValue) => setStoredValue(String(value));

  useEffect(() => {
    window.localStorage.setItem(key, storedValue);
  }, [storedValue]);

  const saveCallback = () => saveValue(creator());
  useEventListener('beforeunload', saveCallback);
  useUnmount(saveCallback);

  return storedValue;
};