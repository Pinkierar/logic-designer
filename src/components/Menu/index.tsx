import {classNames} from '#utils/classNames';
import type {IncludeHTMLProps, OmitChildren} from '#utils/props';
import {memo} from 'react';
import {Item, MenuItem} from './Item';
import style from './style.module.scss';

type MenuProps = OmitChildren<IncludeHTMLProps<{
  items: Item[],
}>>;

export const Menu = memo<MenuProps>(props => {
  const {
    items,
    className,
    ...otherProps
  } = props;

  return (
    <ul className={classNames(className, style.list, style.menu)} {...otherProps}>
      {items.map((item, index) => (
        <MenuItem key={index}>
          {item}
        </MenuItem>
      ))}
    </ul>
  );
});

export const MenuHeader = memo<MenuProps>(props => {
  const {
    className,
    ...otherProps
  } = props;

  return (
    <Menu className={classNames(className, style.header)} {...otherProps}/>
  );
});