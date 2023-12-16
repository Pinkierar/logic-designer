import {classNames} from '#utils/classNames';
import {InlineStyle} from '#utils/InlineStyle';
import {IncludeHTMLProps} from '#utils/props';
import {HTMLAttributes, memo, ReactNode} from 'react';
import style from './style.module.scss';

type ListPropsMin = {
  vertical?: boolean,
  gap?: string | 0,
};

type ListProps = IncludeHTMLProps<ListPropsMin>;

export const List = memo<ListProps>(props => {
  const {
    children,
    className,
    gap,
    vertical = false,
    ...otherProps
  } = props;

  return (
    <div
      className={classNames(
        className,
        style.list,
        vertical && style.vertical,
      )}
      style={{gap}}
      {...otherProps}
    >
      {children}
    </div>
  );
});