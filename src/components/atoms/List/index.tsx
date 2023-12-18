import {classNames} from '#utils/classNames';
import {InlineStyle} from '#utils/InlineStyle';
import {IncludeHTMLProps} from '#utils/props';
import {forwardRef, HTMLAttributes, memo, ReactNode} from 'react';
import style from './style.module.scss';

type ListPropsMin = {
  vertical?: boolean,
  gap?: string | 0,
};

type ListProps = IncludeHTMLProps<ListPropsMin>;

export const List = memo(forwardRef<HTMLDivElement, ListProps>((props, ref) => {
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
      ref={ref}
    >
      {children}
    </div>
  );
}));