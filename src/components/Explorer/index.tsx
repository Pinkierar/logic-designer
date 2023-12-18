import {List} from '#components/atoms';
import {Menu} from '#components/Menu';
import {useClickOutside, useEventListener, useLocalStorage, useResized, useToggle} from '#hooks';
import {DirectoryData, DirectoryRepository} from '#repositories/Directory';
import {classNames} from '#utils/classNames';
import type {InlineStyle} from '#utils/InlineStyle';
import type {IncludeHTMLProps, OmitChildren} from '#utils/props';
import {Dispatch, memo, SetStateAction, useEffect, useMemo, useRef, useState} from 'react';
import {GrContract, GrExpand, GrStorage, GrTarget, GrUpdate} from 'react-icons/gr';
import {ExplorerContextProvider, MenuOptions} from './Context';
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
  menu: (pageX: number, pageY: number) => {
    return {
      left: `${pageX}px`,
      top: `${pageY}px`,
    };
  },
} satisfies InlineStyle;

type ExplorerProps = OmitChildren<IncludeHTMLProps<{
  onResize?: () => void,
}>>;

type MenuState = {
  pageX: number,
  pageY: number,
  visible: boolean,
};

export const Explorer = memo<ExplorerProps>(props => {
  const {
    className,
    onResize,
    ...otherProps
  } = props;

  const menuRef = useRef<HTMLUListElement>(null);

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

  const [menu, setMenu] = useState<MenuState>({pageX: 0, pageY: 0, visible: false});

  const showMenu = (
    {pageX, pageY}: MouseEvent,
    {type, data: minData}: MenuOptions,
  ) => {
    setMenu({pageX, pageY, visible: true});
    console.log('showMenu', type, minData);
  };

  const hideMenu = () => {
    if (!menu.visible) return;

    setMenu(menu => ({...menu, visible: false}));
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

  useClickOutside(menuRef, hideMenu);
  useEventListener('keydown', event => {
    if (event.key !== 'Escape') return;

    hideMenu();
  });

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
      <Menu
        className={classNames(style.menu, menu.visible && style.visible)}
        style={inline.menu(menu.pageX, menu.pageY)}
        items={[
          {
            label: 'Добавить',
            list: [
              {
                label: 'Файл',
                command: () => {
                },
              },
              {
                label: 'Папку',
                command: () => {
                },
              },
            ],
          },
          {
            label: 'Удалить',
            command: () => {
            },
          },
          {
            label: 'Переименовать',
            command: () => {
            },
          },
          {
            label: 'Обновить',
            command: () => {
            },
          },
        ]}
        ref={menuRef}
      />
    </List>
  );
});