import {IconType} from 'react-icons';

type Label = {
  label: string | IconType,
};

type Command = Label & {
  command: () => void,
};

type Container = Label & {
  list: Item[],
};

export type Item = Command | Container;