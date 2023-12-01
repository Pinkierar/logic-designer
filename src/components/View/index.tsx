import {CanvasController} from '#app';
import {cl} from '#utils/cl';
import {HTMLAttributes, memo, useEffect, useRef} from 'react';
import style from './style.module.scss';

type ViewPropsMin = {
  children?: never,
  controller: CanvasController,
};

type ViewProps =
  Omit<HTMLAttributes<HTMLElement>, keyof ViewPropsMin>
  & ViewPropsMin;

export const View = memo<ViewProps>((props) => {
  const {
    className,
    controller: controller,
    ...otherProps
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const container = ref.current;

    container.appendChild(controller.canvas);
    controller.setParent(container);
  }, [ref.current]);

  return (
    <div className={cl(style.view, className)} {...otherProps} ref={ref}/>
  );
});