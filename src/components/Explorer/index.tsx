import {useEventListener, useLocalStorage} from '#hooks';
import {cl} from '#utils/cl';
import {
  CSSProperties,
  FormEvent,
  HTMLAttributes,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {GrClose, GrSearch, GrStorage} from 'react-icons/gr';
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

const mark = '~~M~~';
const specialCharacters = ['[', ']', '\\', '^', '$', '.', '|', '?', '*', '+', '(', ')'];

export const Explorer = memo<ExplorerProps>(props => {
  const {
    children,
    className,
    onResize,
    ...otherProps
  } = props;

  const documentRef = useRef(document);
  const inputRef = useRef<HTMLInputElement>(null);

  const [searching, setSearching] = useState<boolean>(false);
  const [rolled, setRolled] = useLocalStorage<boolean>('explorer-rolled', false);
  const [dragging, setDragging] = useState<boolean>(false);
  const [width, setWidth] = useLocalStorage<number>('explorer-width', 300);
  const [search, setSearch] = useState<string>('');
  const [escaped, setEscaped] = useState<string>('');

  useEffect(() => {
    const marked = specialCharacters.reduce((marked, special) => {
      return marked.replaceAll(special, a1 => `${mark}${a1}`);
    }, search);
    const escaped = marked.replaceAll(mark, '\\');

    setEscaped(escaped);
  }, [search]);

  const toggleRolled = useCallback(() => setRolled(rolled => !rolled), []);

  const downHandler = useCallback(() => setDragging(true), []);
  const moveHandler = useCallback((event: PointerEvent) => {
    if (!dragging) return;

    setWidth(event.pageX);
  }, [dragging]);
  const upHandler = useCallback(() => setDragging(false), []);

  const searchBlurHandler = useCallback(() => setSearching(false), []);
  const searchClickHandler = useCallback(() => setSearching(true), []);
  const searchingHandler = useCallback((event: FormEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
  }, []);

  useEffect(() => {
    setSearch('');

    if (!searching) return;

    if (!inputRef.current) return;
    const input = inputRef.current;

    input.focus();
  }, [inputRef.current, searching]);

  useEffect(() => {
    if (!onResize) return;

    onResize();
  }, [width, rolled]);

  const keyDownHandler = useCallback((event: KeyboardEvent) => {
    if (event.code !== 'Escape') return;

    setSearching(false);
  }, []);

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
  useEventListener('keydown', keyDownHandler, inputRef);

  return (
    <section className={cl(style.container, className)} {...otherProps}>
      <div className={style.tools}>
        <button className={style.accordion} onClick={toggleRolled}>
          <GrStorage/>
        </button>
        {!rolled && (
          <div className={cl(style.search, searching && style.searching)}>
            <input
              type={'search'}
              onBlur={searchBlurHandler}
              onInput={searchingHandler}
              value={search}
              name={'search'}
              ref={inputRef}
            />
            <button onClick={searchClickHandler}>
              {searching ? (
                <GrClose/>
              ) : (
                <GrSearch/>
              )}
            </button>
          </div>
        )}
      </div>
      <div
        className={cl(style.explorer, dragging && style.dragging)}
        style={inline.explorer(rolled, width)}
      >
        {!rolled && (
          <ul className={style.content}>
            {children.map(item => (
              <ExplorerItem search={escaped} collapsed={false} key={item.name}>
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