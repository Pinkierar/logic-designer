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
    const NonFound = () => (
      <span>
        {item.name}
      </span>
    );

    if (!search) return <NonFound/>;

    const matched = item.name.match(new RegExp(search, 'i'));

    if (!matched) return <NonFound/>;

    const foundIndex = matched.index;
    const foundLength = matched[0].length;

    if (foundIndex === void 0) return <NonFound/>;

    const nameLength = item.name.length;

    if (foundLength === nameLength) return (
      <span className={style.searched}>
        {item.name}
      </span>
    );

    if (foundIndex === 0) return (
      <span>
        <span className={style.searched}>
          {item.name.slice(0, foundLength)}
        </span>
        <span>
          {item.name.slice(foundLength)}
        </span>
      </span>
    );

    const afterIndex = foundIndex + foundLength;

    if (afterIndex === nameLength) return (
      <span>
        <span>
          {item.name.slice(0, foundIndex)}
        </span>
        <span className={style.searched}>
          {item.name.slice(foundIndex)}
        </span>
      </span>
    );

    return (
      <span>
        <span>
          {item.name.slice(0, foundIndex)}
        </span>
        <span className={style.searched}>
          {item.name.slice(foundIndex, afterIndex)}
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