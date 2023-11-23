import {cl} from '#utils/cl';
import {HTMLAttributes} from 'react';
import {MenuItem} from './Item';
import {MenuCommand, MenuContainer} from './types';
import style from './style.module.css';

type MenuPropsMin = {
  children: (MenuCommand | MenuContainer)[],
};

type MenuProps =
  Omit<HTMLAttributes<HTMLElement>, keyof MenuPropsMin>
  & MenuPropsMin;

export const Menu = (props: MenuProps) => {
  const {
    children,
    className,
    ...otherProps
  } = props;

  return (
    <section className={cl(style.menu, className)} {...otherProps}>
      <ul className={style.list}>
        {children.map(item => (
          <MenuItem>
            {item}
          </MenuItem>
        ))}
      </ul>
    </section>
  );
};