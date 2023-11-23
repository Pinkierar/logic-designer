import {cl} from '#utils/cl';
import {memo, useEffect, useState} from 'react';
import {GrDocument, GrFolder, GrNext} from 'react-icons/gr';

import style from './style.module.css';
import {Item} from './types';

type MenuItemProps = {
  children: Item,
  collapsed: boolean,
};

export const ExplorerItem = memo<MenuItemProps>(props => {
  const {
    children,
    collapsed: parentCollapsed,
  } = props;

  const [collapsed, setCollapsed] = useState<boolean>(parentCollapsed);

  useEffect(() => {
    if (!parentCollapsed) return;

    setCollapsed(true);
  }, [parentCollapsed]);

  const clickHandler = () => {
    setCollapsed(state => !state);
  };

  return (
    <li className={style.item}>
      {'content' in children ? (
        <div className={cl(style.folder, collapsed && style.collapsed)}>
          <div className={style.label}>
            <button onClick={clickHandler}>
              <GrNext/>
            </button>
            <GrFolder/>
            <span>
              {children.name}
            </span>
          </div>
          <ul className={style.content}>
            {children.content.map(item => (
              <ExplorerItem collapsed={collapsed} key={item.name}>
                {item}
              </ExplorerItem>
            ))}
          </ul>
        </div>
      ) : (
        <button className={style.file}>
          <GrDocument/>
          <span>
            {children.name}
          </span>
        </button>
      )}
    </li>
  );
});