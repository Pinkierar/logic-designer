import {FormEventHandler, useState} from 'react';

export const useInput = (initialValue: string = '') => {
  const [value, setValue] = useState<string>(initialValue);

  const onChange: FormEventHandler<HTMLInputElement> = event => {
    if (!(event.target instanceof HTMLInputElement)) return;

    setValue(event.target.value);
  };

  return {
    setValue,
    props: {
      onChange,
      value,
    },
  };
};