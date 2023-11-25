import {memo} from 'react';
import {GrFormNext} from 'react-icons/gr';

import style from './style.module.scss';
import {Item} from './types';

type MenuItemProps = {
  children: Item,
};

export const MenuItem = memo<MenuItemProps>(props => {
  const {
    children,
  } = props;

  const {
    label: Label
  } = children;

  return (
    <li className={style.item}>
      {'list' in children ? (
        <>
          <div className={style.label}>
            <span>
              {typeof Label === 'string' ? Label : <Label/>}
            </span>
            <GrFormNext/>
          </div>
          <ul className={style.list}>
            {children.list.map((item, index) => (
              <MenuItem key={index}>
                {item}
              </MenuItem>
            ))}
          </ul>
        </>
      ) : (
        <button className={style.command} onClick={children.command}>
          {typeof Label === 'string' ? Label : <Label/>}
        </button>
      )}
    </li>
  );
});