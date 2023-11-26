import {cl} from '#utils/cl';
import {memo, useCallback, useEffect, useMemo, useState} from 'react';
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

  const [collapsed, setCollapsed] = useState<boolean>(parentCollapsed);

  useEffect(() => {
    if (!parentCollapsed) return;

    setCollapsed(true);
  }, [parentCollapsed]);

  const clickHandler = useCallback(() => {
    setCollapsed(state => !state);
  }, []);

  return (
    <li className={style.item}>
      {'content' in item ? (
        <div className={cl(style.folder, collapsed && style.collapsed)}>
          <div className={style.label}>
            <button onClick={clickHandler}>
              <GrFormNext/>
            </button>
            <GrFolder/>
            {item.name}
          </div>
          <ul className={style.content}>
            {item.content.map(item => (
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