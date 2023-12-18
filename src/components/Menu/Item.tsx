import {memo} from 'react';
import type {IconType} from 'react-icons';
import {GrFormNext} from 'react-icons/gr';
import style from './style.module.scss';

type Label = { label: string | IconType };
type Command = Label & { command: string };
type Container = Label & { items: MenuItem[] };
export type MenuItem = Command | Container;

type MenuItemProps = {
  item: MenuItem,
  callback?: (command: string) => void,
};

export const MenuChild = memo<MenuItemProps>(props => {
  const {
    item,
    callback,
  } = props;

  const {
    label: Label,
  } = item;

  return (
    <li className={style.item}>
      {'items' in item ? (
        <>
          <div className={style.label}>
            {typeof Label === 'string' ? Label : <Label/>}
            <GrFormNext className={style.next}/>
          </div>
          <ul className={style.list}>
            {item.items.map((item, index) => (
              <MenuChild key={index} item={item} callback={callback}/>
            ))}
          </ul>
        </>
      ) : (
        <button
          className={style.label}
          onClick={() => callback && callback(item.command)}
        >
          {typeof Label === 'string' ? Label : <Label/>}
        </button>
      )}
    </li>
  );
});