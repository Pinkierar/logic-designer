import {DirectoryData, DirectoryMinData, DirectoryRepository} from '#repositories/Directory';
import {cl} from '#utils/cl';
import {HTMLAttributes, memo, useEffect, useMemo, useState} from 'react';
import {GrFolder, GrFormNext, GrUpdate} from 'react-icons/gr';
import {useExplorerContext} from './Context';
import {File} from './File';
import style from './style.module.scss';

type DirectoryPropsMin = {
  children?: never,
  minData: DirectoryMinData,
  collapsed?: boolean,
};

type DirectoryProps =
  Omit<HTMLAttributes<HTMLElement>, keyof DirectoryPropsMin>
  & DirectoryPropsMin;

export const Directory = memo<DirectoryProps>(props => {
  const {
    className,
    minData,
    collapsed: parentCollapsed = false,
    ...otherProps
  } = props;

  const explorerContext = useExplorerContext();

  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [directory, setDirectory] = useState<DirectoryData | null>(null);

  const clickHandler = () => setCollapsed(state => !state);

  useEffect(() => {
    if (!parentCollapsed) return;

    setCollapsed(true);
  }, [parentCollapsed]);

  useEffect(() => {
    explorerContext.addSetCollapsed(setCollapsed);

    return () => {
      explorerContext.removeSetCollapsed(setCollapsed);
    };
  }, [explorerContext]);

  const downloadData = async (id: number) => {
    try {
      const directory = await DirectoryRepository.get(id);

      setDirectory(directory);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (directory || collapsed) return;

    downloadData(minData.id);
  }, [minData.id, directory, collapsed]);

  const count = useMemo(() => {
    if (!directory) return void 0;

    const directories = directory?.directories?.length ?? 0;
    const files = directory?.files?.length ?? 0;

    return directories + files;
  }, [directory]);

  return (
    <div
      className={cl(className, style.folder, collapsed && style.collapsed)}
      {...otherProps}
    >
      <div className={style.label}>
        <button className={cl(count === 0 && 'hidden')} onClick={clickHandler}>
          {directory || collapsed ? (
            <GrFormNext/>
          ) : (
            <GrUpdate className={style.refresh}/>
          )}
        </button>
        <GrFolder/>
        <span>
          {minData.name}
        </span>
      </div>
      {directory && count !== 0 && (
        <div className={style.content}>
          {directory.directories?.map(directory => (
            <Directory key={directory.id} collapsed={collapsed} minData={directory}/>
          ))}
          {directory.files?.map(file => (
            <File key={file.id} data={file}/>
          ))}
        </div>
      )}
    </div>
  );
});