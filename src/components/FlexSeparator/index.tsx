import {classNames} from '#utils/classNames';
import type {IncludeHTMLProps, OmitChildren} from '#utils/props';
import {memo} from 'react';
import style from './style.module.scss';

type FlexSeparatorProps = OmitChildren<IncludeHTMLProps<{}, HTMLDivElement>>;

export const FlexSeparator = memo<FlexSeparatorProps>(props => {
  const {
    className,
    ...otherProps
  } = props;

  return (
    <div className={classNames(className, style.separator)} {...otherProps}/>
  );
});