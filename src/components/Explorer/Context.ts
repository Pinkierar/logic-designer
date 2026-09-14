import type {FileMinData, DirectoryMinData} from '#repositories';
import {ContextFactory} from '#utils/ContextFactory';
import type {Dispatch, SetStateAction} from 'react';

export type MenuOptions =
  | { type: 'file', data: FileMinData }
  | { type: 'directory', data: DirectoryMinData };

export type OpenFileHandler = (data: FileMinData) => void

type ExplorerContextValue = {
  addSetCollapsed: (setter: Dispatch<SetStateAction<boolean>>) => void,
  removeSetCollapsed: (setter: Dispatch<SetStateAction<boolean>>) => void,
  showMenu: (event: MouseEvent, options: MenuOptions) => void,
  onOpenFile: OpenFileHandler,
};

export const [
  ExplorerContextProvider,
  useExplorerContext,
] = ContextFactory.create<ExplorerContextValue>();