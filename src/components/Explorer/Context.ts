import type {DirectoryMinData} from '#repositories/Directory';
import type {FileMinData} from '#repositories/File';
import {ContextFactory} from '#utils/ContextFactory';
import type {Dispatch, SetStateAction} from 'react';

export type MenuOptions =
  | { type: 'file', data: FileMinData }
  | { type: 'directory', data: DirectoryMinData };

type ExplorerContextValue = {
  addSetCollapsed(setter: Dispatch<SetStateAction<boolean>>): void;
  removeSetCollapsed(setter: Dispatch<SetStateAction<boolean>>): void;
  showMenu(event: MouseEvent, options: MenuOptions): void;
};

export const [
  ExplorerContextProvider,
  useExplorerContext,
] = ContextFactory.create<ExplorerContextValue>();