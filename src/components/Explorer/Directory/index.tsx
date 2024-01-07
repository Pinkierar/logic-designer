import {List} from '#components/atoms';
import {useCustomContextMenu, useToggle} from '#hooks';
import {DirectoryData, DirectoryMinData, DirectoryRepository} from '#repositories/Directory';
import {classNames} from '#utils/classNames';
import {memo, useEffect, useMemo, useState} from 'react';
import {GrFolder, GrFormNext, GrUpdate} from 'react-icons/gr';
import {useExplorerContext} from '../Context';
import {File} from '../File';
import style from './style.module.scss';

type DirectoryProps = {
  minData: DirectoryMinData,
  collapsed?: boolean,
};

export const Directory = memo<DirectoryProps>(props => {
  const {
    minData,
    collapsed: parentCollapsed = false,
  } = props;

  const {
    addSetCollapsed,
    removeSetCollapsed,
    showMenu,
  } = useExplorerContext();

  const contextMenuProps = useCustomContextMenu(
    event => showMenu(event, {type: 'directory', data: minData}),
  );

  const [collapsed, toggleCollapsed, setCollapsed] = useToggle(true);
  const [directory, setDirectory] = useState<DirectoryData | null>(null);

  const count = useMemo(() => {
    const directories = directory?.directories?.length ?? 0;
    const files = directory?.files?.length ?? 0;

    return directories + files;
  }, [directory]);

  useEffect(() => {
    if (!parentCollapsed) return;

    setCollapsed(true);
  }, [parentCollapsed]);

  useEffect(() => {
    if (!directory) return;

    addSetCollapsed(setCollapsed);

    return () => {
      removeSetCollapsed(setCollapsed);
    };
  }, [directory, addSetCollapsed, removeSetCollapsed]);

  useEffect(() => {
    if (directory || collapsed) return;

    DirectoryRepository.get(minData.id)
      .then(directory => setDirectory(directory))
      .catch(e => {
        console.error(e);
        setCollapsed(true);
      });
  }, [minData.id, directory, collapsed]);

  return (
    <List
      vertical={true}
      className={classNames(style.directory, collapsed && style.collapsed)}
    >
      <List className={style.header}>
        <button className={directory && count === 0 ? 'hidden' : ''} onClick={toggleCollapsed}>
          {directory || collapsed ? (
            <GrFormNext className={classNames(style.arrow, !directory && 'opacity50')}/>
          ) : (
            <GrUpdate className={'rotation'}/>
          )}
        </button>
        <button onDoubleClick={toggleCollapsed} {...contextMenuProps}>
          <List>
            <GrFolder/>
            <span>
              {minData.name}
            </span>
          </List>
        </button>
      </List>
      {directory && count !== 0 && (
        <List vertical={true} className={style.content}>
          {directory.directories?.map(directory => (
            <Directory key={directory.id} collapsed={collapsed} minData={directory}/>
          ))}
          {directory.files?.map(file => (
            <File key={file.id} minData={file}/>
          ))}
        </List>
      )}
    </List>
  );
});