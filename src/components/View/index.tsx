import {cl} from '#utils/cl';
import {forwardRef, HTMLAttributes, memo} from 'react';
import style from './style.module.scss';

type ViewPropsMin = {
  children?: never,
};

type ViewProps =
  Omit<HTMLAttributes<HTMLElement>, keyof ViewPropsMin>
  & ViewPropsMin;

export const View = forwardRef<HTMLCanvasElement, ViewProps>((props, ref) => {
  const {
    className,
    ...otherProps
  } = props;

  if (ref) {
    if (typeof ref === 'function') {
      ref(null)
    } else {
      ref.current
    }
  }

  return (
    <div className={cl(style.view, className)} {...otherProps}>

    </div>
  );
});