import {FileMinData} from '#repositories/File';
import {cl} from '#utils/cl';
import {HTMLAttributes, memo} from 'react';
import {GrDocument} from 'react-icons/gr';
import style from './style.module.scss';

type FilePropsMin = {
  children?: never,
  data: FileMinData,
};

type FileProps =
  Omit<HTMLAttributes<HTMLElement>, keyof FilePropsMin>
  & FilePropsMin;

export const File = memo<FileProps>(props => {
  const {
    className,
    data,
    ...otherProps
  } = props;

  const openHandler = () => {
    console.log('Открылся файл', data);
  };

  return (
    <button {...otherProps} onClick={openHandler} className={cl(className, style.file)}>
      <GrDocument/>
      {data.name}
    </button>
  );
});