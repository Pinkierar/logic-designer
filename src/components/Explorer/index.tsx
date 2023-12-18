import {List} from '#components/atoms';
import {useDialogContext} from '#components/Dialog';
import {Menu} from '#components/Menu';
import {useClickOutside, useEventListener, useLocalStorage, useResized, useToggle} from '#hooks';
import {DirectoryData, DirectoryRepository} from '#repositories/Directory';
import {checkNever} from '#utils/checkNever';
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

type MenuState = {
  pageX: number,
  pageY: number,
  options: MenuOptions | null,
};

type ExplorerProps = OmitChildren<IncludeHTMLProps<{
  onResize?: () => void,
}>>;

export const Explorer = memo<ExplorerProps>(props => {
  const {
    className,
    onResize,
    ...otherProps
  } = props;

  const {alert, confirm, prompt} = useDialogContext();

  const menuRef = useRef<HTMLUListElement>(null);

  const savedRolled = useLocalStorage(ROLLED_KEY, () => rolled, ROLLED_INIT);
  const savedWidth = useLocalStorage(WIDTH_KEY, () => width, WIDTH_INIT);

  const [rootDirectories, setRootDirectories] = useState<DirectoryData[] | null>(null);

  const [menu, setMenu] = useState<MenuState>({pageX: 0, pageY: 0, options: null});

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

  const menuCallback = (command: string) => {
    const {options} = menu;

    hideMenu();

    if (!options) return null;

    if (options.type === 'file') {
      const file = options.data;

      if (command === 'file remove') {
        return confirm('Удаление', `Удалить файл "${file.name}"?`, () => {
          console.log(`Файл "${file.name}" удаляется...`);
        });
      }

      if (command === 'file rename') {
        return prompt('Переименование', `Изменить имя файла "${file.name}" на:`, value => {
          console.log(`Имя файла "${file.name}" меняется на "${value}"...`);
        }, file.name);
      }

      throw new Error(`unknown command "${command}"`);
    }

    if (options.type === 'directory') {
      const folder = options.data;

      if (command === 'file new') {
        return prompt('Новый файл', 'Имя нового файла:', value => {
          console.log(`Создаётся файл "${value}"...`);
        });
      }

      if (command === 'folder new') {
        return prompt('Новая папка', 'Имя новой папки:', value => {
          console.log(`Создаётся папка "${value}"...`);
        });
      }

      if (command === 'folder remove') {
        return confirm('Удаление', `Удалить папку "${folder.name}"?`, () => {
          console.log(`Папка "${folder.name}" удаляется...`);
        });
      }

      if (command === 'folder rename') {
        return prompt('Переименование', `Изменить имя папки "${folder.name}" на:`, value => {
          console.log(`Имя папки "${folder.name}" меняется на "${value}"...`);
        }, folder.name);
      }

      if (command === 'folder update') {
        return alert('Обновление', `Папка "${folder.name}" обновляется...`);
      }

      throw new Error(`unknown command "${command}"`);
    }

    checkNever(options);
    throw new Error('options is not never');
  };

  const setAllCollapsed = (collapsed: boolean) => {
    collapsedSetters.forEach(setCollapsed => {
      setCollapsed(collapsed);
    });
  };

  const showMenu = ({pageX, pageY}: MouseEvent, options: MenuOptions): void => {
    setMenu({pageX, pageY, options});
  };

  const hideMenu = (): void => {
    if (!menu.options) return;

    setMenu(menu => ({...menu, options: null}));
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
      {menu.options && (
        <Menu
          className={style.menu}
          style={inline.menu(menu.pageX, menu.pageY)}
          items={menu.options.type === 'file' ? [
            {label: 'Удалить', command: 'file remove'},
            {label: 'Переименовать', command: 'file rename'},
          ] : menu.options.type === 'directory' ? [
            {
              label: 'Добавить',
              items: [
                {label: 'Файл', command: 'file new'},
                {label: 'Папку', command: 'folder new'},
              ],
            },
            {label: 'Удалить', command: 'folder remove'},
            {label: 'Переименовать', command: 'folder rename'},
            {label: 'Обновить', command: 'folder update'},
          ] : checkNever(menu.options)}
          callback={menuCallback}
          ref={menuRef}
        />
      )}
    </List>
  );
});