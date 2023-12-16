import type {DirectoryMinData} from '#repositories/Directory';
import type {FileMinData} from '#repositories/File';
import {ContextFactory} from '#utils/ContextFactory';
import type {Dispatch, SetStateAction} from 'react';

type ExplorerContextValue = {
  addSetCollapsed(setter: Dispatch<SetStateAction<boolean>>): void,

  removeSetCollapsed(setter: Dispatch<SetStateAction<boolean>>): void,

  showMenu(type: 'file', data: FileMinData): void,
  showMenu(type: 'directory', data: DirectoryMinData): void,
};

export const [
  ExplorerContextProvider,
  useExplorerContext,
] = ContextFactory.create<ExplorerContextValue>();