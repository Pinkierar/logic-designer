import {memo} from 'react';
import type {IconType} from 'react-icons';
import {GrFormNext} from 'react-icons/gr';
import style from './style.module.scss';

type Label = { label: string | IconType };
type Command = Label & { command: () => void };
type Container = Label & { list: Item[] };
export type Item = Command | Container;

type MenuItemProps = {
  children: Item,
};

export const MenuItem = memo<MenuItemProps>(props => {
  const {
    children,
  } = props;

  const {
    label: Label,
  } = children;

  return (
    <li className={style.item}>
      {'list' in children ? (
        <>
          <div className={style.label}>
            {typeof Label === 'string' ? Label : <Label/>}
            <GrFormNext className={style.next}/>
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
        <button className={style.label} onClick={children.command}>
          {typeof Label === 'string' ? Label : <Label/>}
        </button>
      )}
    </li>
  );
});