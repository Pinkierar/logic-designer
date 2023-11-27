import {useExplorerContext} from '#components/Explorer/Context';
import {cl} from '#utils/cl';
import {memo, useCallback, useEffect, useState} from 'react';
import {GrDocument, GrFolder, GrFormNext} from 'react-icons/gr';

import style from './style.module.scss';
import {Item} from './types';

type MenuItemProps = {
  children: Item,
  collapsed: boolean,
};

export const ExplorerItem = memo<MenuItemProps>(props => {
  const {
    children: item,
    collapsed: parentCollapsed,
  } = props;

  const explorerContext = useExplorerContext();

  const [collapsed, setCollapsed] = useState<boolean>(parentCollapsed);

  const clickHandler = useCallback(() => {
    setCollapsed(state => !state);
  }, []);

  useEffect(() => {
    if (!parentCollapsed) return;

    setCollapsed(true);
  }, [parentCollapsed]);

  useEffect(() => {
    explorerContext.addSetCollapsed(setCollapsed);

    return () => {
      explorerContext.removeSetCollapsed(setCollapsed);
    }
  }, [explorerContext]);

  return (
    <li className={style.item}>
      {'children' in item ? (
        <div className={cl(style.folder, collapsed && style.collapsed)}>
          <div className={style.label}>
            <button onClick={clickHandler}>
              <GrFormNext/>
            </button>
            <GrFolder/>
            {item.name}
          </div>
          <ul className={style.content}>
            {item.children.map(item => (
              <ExplorerItem collapsed={collapsed} key={item.name}>
                {item}
              </ExplorerItem>
            ))}
          </ul>
        </div>
      ) : (
        <button className={style.file}>
          <GrDocument/>
          {item.name}
        </button>
      )}
    </li>
  );
});