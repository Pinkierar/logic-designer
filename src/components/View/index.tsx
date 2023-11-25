import {CanvasController} from '#app';
import {cl} from '#utils/cl';
import {HTMLAttributes, memo, useEffect, useRef} from 'react';
import style from './style.module.scss';

type ViewPropsMin = {
  children: CanvasController,
};

type ViewProps =
  Omit<HTMLAttributes<HTMLElement>, keyof ViewPropsMin>
  & ViewPropsMin;

export const View = memo<ViewProps>((props) => {
  const {
    className,
    children: canvasController,
    ...otherProps
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const container = ref.current;

    container.appendChild(canvasController.canvas);
    canvasController.setParent(container);
  }, [ref.current]);

  return (
    <div className={cl(style.view, className)} {...otherProps} ref={ref}/>
  );
});