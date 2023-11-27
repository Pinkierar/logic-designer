import {ContextFactory} from '#utils/ContextFactory';
import {Dispatch, SetStateAction} from 'react';

export type SetCollapsed = Dispatch<SetStateAction<boolean>>;
export type SetCollapsedCallback = (setter: SetCollapsed) => void;

type ExplorerContextValue = {
  addSetCollapsed: SetCollapsedCallback,
  removeSetCollapsed: SetCollapsedCallback,
};

const {
  ContextProvider: ExplorerContextProvider,
  useContext: useExplorerContext,
} = new ContextFactory<ExplorerContextValue>();

export {
  ExplorerContextProvider,
  useExplorerContext,
};