import {useLocalStorage, useResized} from '#hooks';
import {cl} from '#utils/cl';
import {CSSProperties, HTMLAttributes, memo, useCallback, useEffect, useMemo} from 'react';
import {GrContract, GrExpand, GrStorage, GrTarget} from 'react-icons/gr';
import {ExplorerContextProvider, SetCollapsed} from './Context';
import {ExplorerItem} from './Item';
import style from './style.module.scss';
import {Item} from './types';

type ExplorerPropsMin = {
  children: Item[],
  onResize?: () => void,
};

type ExplorerProps =
  Omit<HTMLAttributes<HTMLElement>, keyof ExplorerPropsMin>
  & ExplorerPropsMin;

const inline = {
  width: (width: number) => {
    const limited = Math.max(width, 200);

    return {
      width: `calc(${limited}px - var(--interval-micro))`,
    };
  },
} as const satisfies { [className: string]: (...args: any[]) => CSSProperties };

export const Explorer = memo<ExplorerProps>(props => {
  const {
    children,
    className,
    onResize,
    ...otherProps
  } = props;

  const [widthStore, setWidthStore] = useLocalStorage<number>(
    'explorer-width',
    window.innerWidth * 0.2,
  );
  const [rolled, setRolled] = useLocalStorage<boolean>('explorer-rolled', false);

  const [width, dragging, downHandler] = useResized(
    widthStore,
    event => event.pageX,
    value => Math.max(200, Math.min(value, window.innerWidth * 0.9)),
  );

  const collapsedSetters: Set<SetCollapsed> = useMemo(() => new Set(), [children]);

  const setCollapsed = useCallback((collapsed: boolean) => {
    collapsedSetters.forEach(setCollapsed => setCollapsed(collapsed));
  }, [collapsedSetters]);

  const addSetCollapsed = useCallback((setter: SetCollapsed) => {
    collapsedSetters.add(setter);
  }, [collapsedSetters]);

  const removeSetCollapsed = useCallback((setter: SetCollapsed) => {
    collapsedSetters.delete(setter);
  }, [collapsedSetters]);

  const toggleRolled = useCallback(() => {
    setRolled(rolled => !rolled);
  }, []);

  const expandHandler = useCallback(() => {
    setCollapsed(false);
  }, [setCollapsed]);

  const collapseHandler = useCallback(() => {
    setCollapsed(true);
  }, [setCollapsed]);

  useEffect(() => {
    setWidthStore(width);
  }, [width]);

  useEffect(() => {
    if (!onResize) return;

    onResize();
  }, [width, rolled]);

  const list = useMemo(() => (
    <ul className={style.content}>
      <ExplorerContextProvider value={{addSetCollapsed, removeSetCollapsed}}>
        {children.map(item => (
          <ExplorerItem collapsed={true} key={item.name}>
            {item}
          </ExplorerItem>
        ))}
      </ExplorerContextProvider>
    </ul>
  ), [addSetCollapsed, removeSetCollapsed, children])

  return (
    <section className={cl(style.container, rolled && style.rolled, className)} {...otherProps}>
      <div className={style.header}>
        <button onClick={toggleRolled}>
          <GrStorage/>
        </button>
        <div className={style.tools}>
          <button>
            <GrTarget/>
          </button>
          <button onClick={expandHandler}>
            <GrExpand/>
          </button>
          <button onClick={collapseHandler}>
            <GrContract/>
          </button>
        </div>
      </div>
      <div
        className={cl(style.explorer, dragging && style.dragging)}
        style={rolled ? void 0 : inline.width(width)}
      >
        {list}
      </div>
      <div className={style.resizeMe} onPointerDown={downHandler}/>
    </section>
  );
});