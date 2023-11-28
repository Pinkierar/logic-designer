import {useLocalStorage, useResized} from '#hooks';
import {DirectoryData, DirectoryRepository} from '#repositories/Directory';
import {cl} from '#utils/cl';
import {CSSProperties, HTMLAttributes, memo, useEffect, useMemo, useState} from 'react';
import {GrContract, GrExpand, GrFolder, GrStorage, GrTarget, GrUpdate} from 'react-icons/gr';
import {ExplorerContextProvider, SetCollapsed} from './Context';
import {Directory} from './Directory';
import style from './style.module.scss';

type ExplorerPropsMin = {
  children?: never,
  onResize?: () => void,
};

type ExplorerProps =
  Omit<HTMLAttributes<HTMLElement>, keyof ExplorerPropsMin>
  & ExplorerPropsMin;

const inline = {
  width: (width: number) => {
    const limited = Math.max(width, 200);

    return {
      width: `calc(${limited}px - var(--resizer-width) / 2)`,
    };
  },
} as const satisfies { [className: string]: (...args: any[]) => CSSProperties };

const WIDTH_KEY = 'explorer-width';
const WIDTH_INIT = window.innerWidth * 0.2;

const ROLLED_KEY = 'explorer-rolled';
const ROLLED_INIT = false;

export const Explorer = memo<ExplorerProps>(props => {
  const {
    className,
    onResize,
    ...otherProps
  } = props;

  const savedRolled = useLocalStorage(
    ROLLED_KEY,
    () => rolled,
    ROLLED_INIT,
  );
  const savedWidth = useLocalStorage(
    WIDTH_KEY,
    () => width,
    WIDTH_INIT,
  );

  const [rootDirectories, setRootDirectories] = useState<DirectoryData[] | null>(null);
  const [rolled, setRolled] = useState<boolean>(savedRolled === 'true');

  const [width, dragging, downHandler] = useResized(
    event => event.pageX,
    value => Math.max(200, Math.min(value, window.innerWidth * 0.9)),
    Number(savedWidth),
  );

  const collapsedSetters = useMemo(() => new Set<SetCollapsed>(), [rootDirectories]);

  const setAllCollapsed = (collapsed: boolean) => {
    collapsedSetters.forEach(setCollapsed => {
      setCollapsed(collapsed);
    });
  };

  const downloadRootDirectories = async () => {
    try {
      const directories = await DirectoryRepository.getAll();

      setRootDirectories(directories);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!onResize) return;

    onResize();
  }, [width, rolled]);

  useEffect(() => {
    downloadRootDirectories();
  }, []);

  const list = useMemo(() => (
    <div className={style.content}>
      {rootDirectories ? (
        <ExplorerContextProvider value={{
          addSetCollapsed: collapsedSetters.add.bind(collapsedSetters),
          removeSetCollapsed: collapsedSetters.delete.bind(collapsedSetters),
        }}>
          {rootDirectories.map(rootDirectory => (
            <Directory key={rootDirectory.id} minData={rootDirectory}/>
          ))}
        </ExplorerContextProvider>
      ) : (
        <div className={style.folder}>
          <div className={style.label}>
            <button>
              <GrUpdate className={style.refresh}/>
            </button>
          </div>
        </div>
      )}
    </div>
  ), [collapsedSetters, rootDirectories]);

  return (
    <section className={cl(style.container, rolled && style.rolled, className)} {...otherProps}>
      <div className={style.header}>
        <button onClick={() => setRolled(rolled => !rolled)}>
          <GrStorage/>
        </button>
        <div className={style.tools}>
          <button>
            <GrTarget/>
          </button>
          <button onClick={() => setAllCollapsed(false)}>
            <GrExpand/>
          </button>
          <button onClick={() => setAllCollapsed(true)}>
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