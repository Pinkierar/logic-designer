import {List} from '#components/atoms';
import {useExplorerContext} from '#components/Explorer/Context';
import {useCustomContextMenu} from '#hooks';
import type {FileMinData} from '#repositories/File';
import {memo} from 'react';
import {GrDocument} from 'react-icons/gr';
import style from './style.module.scss';

type FileProps = {
  minData: FileMinData,
};

export const File = memo<FileProps>(props => {
  const {
    minData,
  } = props;

  const {showMenu} = useExplorerContext();

  const contextMenuProps = useCustomContextMenu(
    event => showMenu(event, {type: 'file', data: minData}),
  );

  const openHandler = () => {
    console.log('Открылся файл', minData);
  };

  return (
    <button className={style.file} onClick={openHandler} {...contextMenuProps}>
      <List>
        <GrDocument/>
        {minData.name}
      </List>
    </button>
  );
});