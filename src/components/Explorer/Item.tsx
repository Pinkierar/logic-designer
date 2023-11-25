import {cl} from '#utils/cl';
import {memo, useEffect, useMemo, useState} from 'react';
import {GrDocument, GrFolder, GrFormNext} from 'react-icons/gr';

import style from './style.module.scss';
import {Item} from './types';

type MenuItemProps = {
  children: Item,
  collapsed: boolean,
  search?: string,
};

export const ExplorerItem = memo<MenuItemProps>(props => {
  const {
    children: item,
    search,
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

  const searchedName = useMemo(() => {
    if (!search) return (
      <span>
        {item.name}
      </span>
    );

    const matched = item.name.match(new RegExp(search, 'i'));

    if (!matched || matched.index === undefined) return (
      <span>
        {item.name}
      </span>
    );

    if (search.length === item.name.length) return (
      <span className={style.searched}>
        {item.name}
      </span>
    );

    if (matched.index === 0) return (
      <span>
        <span className={style.searched}>
          {item.name.slice(0, search.length)}
        </span>
        <span>
          {item.name.slice(search.length)}
        </span>
      </span>
    );

    if (matched.index + search.length === item.name.length) return (
      <span>
        <span>
          {item.name.slice(0, matched.index)}
        </span>
        <span className={style.searched}>
          {item.name.slice(matched.index)}
        </span>
      </span>
    );

    const afterIndex = matched.index + search.length
    return (
      <span>
        <span>
          {item.name.slice(0, matched.index)}
        </span>
        <span className={style.searched}>
          {item.name.slice(matched.index, afterIndex)}
        </span>
        <span>
          {item.name.slice(afterIndex)}
        </span>
      </span>
    );
  }, [search]);

  return (
    <li className={style.item}>
      {'content' in item ? (
        <div className={cl(style.folder, collapsed && style.collapsed)}>
          <div className={style.label}>
            <button onClick={clickHandler}>
              <GrFormNext/>
            </button>
            <GrFolder/>
            {searchedName}
          </div>
          <ul className={style.content}>
            {item.content.map(item => (
              <ExplorerItem search={search} collapsed={collapsed} key={item.name}>
                {item}
              </ExplorerItem>
            ))}
          </ul>
        </div>
      ) : (
        <button className={style.file}>
          <GrDocument/>
          {searchedName}
        </button>
      )}
    </li>
  );
});