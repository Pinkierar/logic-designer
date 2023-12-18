import {ContextFactory} from '#utils/ContextFactory';

type DialogAlert = {
  mode: 'alert',
  title: string,
  message: string,
};

type DialogConfirm = {
  mode: 'confirm',
  title: string,
  message: string,
  callback: () => void,
};

type DialogPrompt = {
  mode: 'prompt',
  title: string,
  message: string,
  callback: (value: string) => void,
  initial: string,
};

export type DialogCurrent = DialogAlert | DialogConfirm | DialogPrompt | null;

type DialogContextValue = {
  alert: (
    title: string,
    message: string,
  ) => void,
  confirm: (
    title: string,
    message: string,
    callback: () => void,
  ) => void,
  prompt: (
    title: string,
    message: string,
    callback: (value: string) => void,
    initial?: string,
  ) => void,
  hide: () => void,
};

export const [
  DialogContextProvider,
  useDialogContext,
] = ContextFactory.create<DialogContextValue>();