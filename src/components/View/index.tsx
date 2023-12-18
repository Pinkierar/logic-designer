import {CanvasController} from '#app';
import {classNames} from '#utils/classNames';
import type {IncludeHTMLProps, OmitChildren} from '#utils/props';
import {memo, useEffect, useRef} from 'react';
import style from './style.module.scss';

type ViewProps = OmitChildren<IncludeHTMLProps<{
  controller: CanvasController,
}>>;

export const View = memo<ViewProps>(props => {
  const {
    className,
    controller,
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
    <div className={classNames(style.view, className)} {...otherProps} ref={ref}/>
  );
});