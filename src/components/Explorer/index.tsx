import {List} from '#components/atoms';
import {useLocalStorage, useResized, useToggle} from '#hooks';
import {DirectoryData, DirectoryMinData, DirectoryRepository} from '#repositories/Directory';
import {FileMinData} from '#repositories/File';
import {classNames} from '#utils/classNames';
import type {InlineStyle} from '#utils/InlineStyle';
import type {IncludeHTMLProps, OmitChildren} from '#utils/props';
import {Dispatch, memo, SetStateAction, useEffect, useMemo, useState} from 'react';
import {GrContract, GrExpand, GrStorage, GrTarget, GrUpdate} from 'react-icons/gr';
import {ExplorerContextProvider} from './Context';
import {Directory} from './Directory';
import style from './style.module.scss';

const WIDTH_KEY = 'explorer-width';
const WIDTH_INIT = window.innerWidth * 0.2;

const ROLLED_KEY = 'explorer-rolled';
const ROLLED_INIT = false;

const inline = {
  width: (width: number) => {
    const limited = Math.max(width, 200);

    return {
      width: `calc(${limited}px - var(--resizer-width) / 2)`,
    };
  },
} satisfies InlineStyle;

type ExplorerProps = OmitChildren<IncludeHTMLProps<{
  onResize?: () => void,
}>>;

export const Explorer = memo<ExplorerProps>(props => {
  const {
    className,
    onResize,
    ...otherProps
  } = props;

  const savedRolled = useLocalStorage(ROLLED_KEY, () => rolled, ROLLED_INIT);
  const savedWidth = useLocalStorage(WIDTH_KEY, () => width, WIDTH_INIT);

  const [rootDirectories, setRootDirectories] = useState<DirectoryData[] | null>(null);

  const [rolled, toggleRolled] = useToggle(savedRolled === 'true');

  const [width, dragging, downHandler] = useResized(
    event => event.pageX,
    value => Math.max(200, Math.min(value, window.innerWidth * 0.9)),
    Number(savedWidth),
  );

  const collapsedSetters = useMemo(
    () => new Set<Dispatch<SetStateAction<boolean>>>(),
    [rootDirectories],
  );

  const setAllCollapsed = (collapsed: boolean) => {
    collapsedSetters.forEach(setCollapsed => {
      setCollapsed(collapsed);
    });
  };

  const showMenu = (
    type: 'file' | 'directory',
    minData: FileMinData | DirectoryMinData,
  ) => {
    console.log('showMenu', type, minData);
  };

  useEffect(() => {
    DirectoryRepository.getAll()
      .then(directories => setRootDirectories(directories))
      .catch(e => console.error(e));
  }, []);

  useEffect(() => {
    if (!onResize) return;

    onResize();
  }, [width, rolled]);

  return (
    <List
      vertical={true}
      className={classNames(style.container, rolled && style.rolled, className)}
      {...otherProps}
    >
      <List className={style.header}>
        <button onClick={toggleRolled}>
          <GrStorage/>
        </button>
        <List gap={0} className={style.tools}>
          <button>
            <GrTarget/>
          </button>
          <button onClick={() => setAllCollapsed(false)}>
            <GrExpand/>
          </button>
          <button onClick={() => setAllCollapsed(true)}>
            <GrContract/>
          </button>
        </List>
      </List>
      <div
        className={classNames(style.explorer, dragging && style.dragging)}
        style={rolled ? void 0 : inline.width(width)}
      >
        <List vertical={true} className={style.content}>
          {rootDirectories ? (
            <ExplorerContextProvider value={{
              addSetCollapsed: collapsedSetters.add.bind(collapsedSetters),
              removeSetCollapsed: collapsedSetters.delete.bind(collapsedSetters),
              showMenu: showMenu,
            }}>
              {rootDirectories.map(directory => (
                <Directory key={directory.id} minData={directory}/>
              ))}
            </ExplorerContextProvider>
          ) : (
            <div className={style.loading}>
              <GrUpdate className={'rotation'}/>
            </div>
          )}
        </List>
      </div>
      <button className={style.resizeMe} onPointerDown={downHandler}/>
    </List>
  );
});