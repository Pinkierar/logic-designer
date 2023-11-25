import {cl} from '#utils/cl';
import {HTMLAttributes, memo} from 'react';
import {MenuItem} from './Item';
import style from './style.module.scss';
import {Item} from './types';

type MenuPropsMin = {
  children: Item[],
};

type MenuProps =
  Omit<HTMLAttributes<HTMLElement>, keyof MenuPropsMin>
  & MenuPropsMin;

export const Menu = memo<MenuProps>(props => {
  const {
    children,
    className,
    ...otherProps
  } = props;

  return (
    <section className={cl(style.menu, className)} {...otherProps}>
      <ul className={style.list}>
        {children.map((item, index) => (
          <MenuItem key={index}>
            {item}
          </MenuItem>
        ))}
      </ul>
    </section>
  );
});