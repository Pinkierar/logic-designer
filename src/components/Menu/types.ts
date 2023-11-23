import {IconType} from 'react-icons';

type MenuLabel = { label: string | IconType };
export type MenuCommand = MenuLabel & { command: () => void };
export type MenuContainer = MenuLabel & { list: (MenuCommand | MenuContainer)[] };