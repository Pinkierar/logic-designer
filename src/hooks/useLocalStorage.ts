// Source: https://usehooks-ts.com/react-hook/use-local-storage

import {useEventListener} from '#hooks';
import {Dispatch, SetStateAction, useCallback, useEffect, useState} from 'react';
import {useEventCallback} from './useEventCallback';

declare global {
  interface WindowEventMap {
    'local-storage': CustomEvent;
  }
}

type SetValue<T> = Dispatch<SetStateAction<T>>

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, SetValue<T>] {
  const readValue = useCallback((): T => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (parseJSON(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Ошибка чтения localStorage по ключу "${key}":`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue: SetValue<T> = useEventCallback(value => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;

      window.localStorage.setItem(key, JSON.stringify(newValue));

      setStoredValue(newValue);

      window.dispatchEvent(new Event('local-storage'));
    } catch (error) {
      console.warn(`Ошибка вставки данных в localStorage по ключу "${key}":`, error);
    }
  });

  useEffect(() => {
    setStoredValue(readValue());
  }, []);

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ('key' in event && event.key && event.key !== key) return;
      setStoredValue(readValue());
    },
    [key, readValue],
  );

  useEventListener('storage', handleStorageChange);
  useEventListener('local-storage', handleStorageChange);

  return [storedValue, setValue];
}

function parseJSON<T>(value: string | null): T | undefined {
  try {
    if (value === 'undefined') return;
    return JSON.parse(value ?? '');
  } catch {
    console.log('parsing error on', {value});
  }
}