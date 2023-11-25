import {cl} from '#utils/cl';
import {forwardRef, HTMLAttributes, memo} from 'react';
import style from './style.module.scss';

type ViewPropsMin = {
  children?: never,
};

type ViewProps =
  Omit<HTMLAttributes<HTMLElement>, keyof ViewPropsMin>
  & ViewPropsMin;

export const View = memo<ViewProps>((props) => {
  const {
    className,
    ...otherProps
  } = props;

  return (
    <div className={cl(style.view, className)} {...otherProps}>

    </div>
  );
});