import type {CSSProperties} from 'react';

type StyleCallback = (...args: any[]) => CSSProperties;
export type InlineStyle = { [name: string]: StyleCallback | CSSProperties };