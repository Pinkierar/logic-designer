import {useEffect} from 'react';

export const useUnmount = (destructor: () => any) => {
  useEffect(() => void destructor, []);
};