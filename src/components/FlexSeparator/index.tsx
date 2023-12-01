import {cl} from '#utils/cl';
import {HTMLAttributes, memo} from 'react';
import style from './style.module.scss';

type FlexSeparatorProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'>;

export const FlexSeparator = memo<FlexSeparatorProps>(props => {
  const {
    className,
    ...otherProps
  } = props;

  return (
    <div className={cl(style.separator, className)} {...otherProps}/>
  );
});