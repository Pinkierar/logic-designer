import {memo} from 'react';
import type {IconType} from 'react-icons';
import {GrFormNext} from 'react-icons/gr';
import style from './style.module.scss';

type Label = { label: string | IconType };
type Command = Label & { command: () => void };
type Container = Label & { list: (Command | Container)[] };
export type MenuItem = Command | Container;

type MenuItemProps = {
  item: MenuItem,
};

export const MenuChild = memo<MenuItemProps>(props => {
  const {
    item,
  } = props;

  const {
    label: Label,
  } = item;

  return (
    <li className={style.item}>
      {'list' in item ? (
        <>
          <div className={style.label}>
            {typeof Label === 'string' ? Label : <Label/>}
            <GrFormNext className={style.next}/>
          </div>
          <ul className={style.list}>
            {item.list.map((item, index) => (
              <MenuChild key={index} item={item}/>
            ))}
          </ul>
        </>
      ) : (
        <button className={style.label} onClick={item.command}>
          {typeof Label === 'string' ? Label : <Label/>}
        </button>
      )}
    </li>
  );
});