import {List} from '#components/atoms';
import {useExplorerContext} from '#components/Explorer/Context';
import {useCustomContextMenu} from '#hooks';
import type {FileMinData} from '#repositories';
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

  const {showMenu, onOpenFile} = useExplorerContext();

  const contextMenuProps = useCustomContextMenu(
    event => showMenu(event, {type: 'file', data: minData}),
  );

  const openHandler = () => onOpenFile(minData);

  return (
    <button className={style.file} onClick={openHandler} {...contextMenuProps}>
      <List>
        <GrDocument/>
        {minData.name}
      </List>
    </button>
  );
});