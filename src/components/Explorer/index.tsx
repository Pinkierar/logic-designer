import {useEventListener, useLocalStorage} from '#hooks';
import {cl} from '#utils/cl';
import {
  CSSProperties,
  HTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {GrStorage} from 'react-icons/gr';
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
  explorer: (rolled: boolean, width: number) => {
    const limited = Math.max(width, 200);

    return {
      width: rolled ? 0 : limited,
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

  const documentRef = useRef(document);

  const [rolled, setRolled] = useLocalStorage<boolean>('explorer-rolled', false);
  const [dragging, setDragging] = useState<boolean>(false);
  const [width, setWidth] = useLocalStorage<number>('explorer-width', 300);

  const toggleRolled = useCallback(() => setRolled(rolled => !rolled), []);

  const downHandler = useCallback(() => setDragging(true), []);
  const moveHandler = useCallback((event: PointerEvent) => {
    if (!dragging) return;

    setWidth(event.pageX);
  }, [dragging]);
  const upHandler = useCallback(() => setDragging(false), []);

  useEffect(() => {
    if (!onResize) return;

    onResize();
  }, [width, rolled]);

  const touchMoveHandler = useCallback((event: TouchEvent) => {
    if (!dragging) return;

    event.preventDefault();
  }, [dragging]);

  useEventListener(
    'touchmove',
    touchMoveHandler,
    documentRef,
    {passive: false},
  );
  useEventListener('pointermove', moveHandler);
  useEventListener('pointerup', upHandler);

  return (
    <section className={cl(style.container, className)} {...otherProps}>
      <div className={style.tools}>
        <button className={style.accordion} onClick={toggleRolled}>
          <GrStorage/>
        </button>
        {!rolled && (
          <>

          </>
        )}
      </div>
      <div
        className={cl(style.explorer, dragging && style.dragging)}
        style={inline.explorer(rolled, width)}
      >
        {!rolled && (
          <ul className={style.content}>
            {children.map(item => (
              <ExplorerItem collapsed={false} key={item.name}>
                {item}
              </ExplorerItem>
            ))}
          </ul>
        )}
      </div>
      {!rolled && (
        <div className={style.resizeMe} onPointerDown={downHandler}/>
      )}
    </section>
  );
});