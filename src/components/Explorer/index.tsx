import {cl} from '#utils/cl';
import {HTMLAttributes, memo} from 'react';
import {ExplorerItem} from './Item';
import style from './style.module.css';
import {Item} from './types';

type ExplorerPropsMin = {
  children: Item[],
};

type ExplorerProps =
  Omit<HTMLAttributes<HTMLElement>, keyof ExplorerPropsMin>
  & ExplorerPropsMin;

export const Explorer = memo<ExplorerProps>(props => {
  const {
    children,
    className,
    ...otherProps
  } = props;

  return (
    <section className={cl(style.explorer, className)} {...otherProps}>
      <ul className={style.content}>
        {children.map(item => (
          <ExplorerItem collapsed={true} key={item.name}>
            {item}
          </ExplorerItem>
        ))}
      </ul>
    </section>
  );
});