import {Dispatch, SetStateAction, useEffect, useState} from 'react';

const specialChars = ['[', ']', '\\', '^', '$', '.', '|', '?', '*', '+', '(', ')'];
const mark = '~~M~~';
const escape = '\\';
const addMark = (char: string) => `${mark}${char}`;
const marker = (marked: string, char: string) => marked.replaceAll(char, addMark);

// [search, setSearch, escaped]
export const useSearch = (): [string, Dispatch<SetStateAction<string>>, string] => {
  const [search, setSearch] = useState<string>('');
  const [escaped, setEscaped] = useState<string>('');

  useEffect(() => {
    const marked = specialChars.reduce(marker, search);
    const escaped = marked.replaceAll(mark, escape);

    setEscaped(escaped);
  }, [search]);

  return [search, setSearch, escaped];
};