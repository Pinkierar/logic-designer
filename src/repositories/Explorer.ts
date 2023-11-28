import {directories, DirectoryData, DirectoryMinData} from './Directory';
import type {FileMinData} from './File';

type NestedData = DirectoryMinData & {
  directories?: NestedData[],
  files?: FileMinData[],
};

const toNested = (directory: DirectoryData): NestedData => ({
  id: directory.id,
  name: directory.name,
  directories: directory.directories?.map(({id}) => toNested(directories[id])),
  files: directory.files,
});

export const explorerData: NestedData[] = [
  toNested(directories[1]),
];

console.log(JSON.stringify(explorerData, null, 2));