import {sleep} from '#utils/sleep';
import {Repository} from './Base';
import type {FileMinData} from './File';
import {files} from './File';

export type DirectoryMinData = {
  id: number,
  name: string,
};

export type DirectoryData = DirectoryMinData & {
  directories?: DirectoryMinData[],
  files?: FileMinData[],
};

const directoriesMin: DirectoryMinData[] = [
  {
    id: 0,
    name: 'root',
  },
  {
    id: 1,
    name: 'logic-designer',
  },
  {
    id: 2,
    name: 'public',
  },
  {
    id: 3,
    name: 'src',
  },
  {
    id: 4,
    name: 'components',
  },
  {
    id: 5,
    name: 'App',
  },
  {
    id: 6,
    name: 'Explorer',
  },
  {
    id: 7,
    name: 'Menu',
  },
  {
    id: 8,
    name: 'styles',
  },
  {
    id: 9,
    name: 'types',
  },
  {
    id: 10,
    name: 'utils',
  },
];

export const directories: DirectoryData[] = [
  {
    ...directoriesMin[0],
    directories: [
      directoriesMin[1],
    ],
  },
  {
    ...directoriesMin[1],
    directories: [
      directoriesMin[2],
      directoriesMin[3],
    ],
    files: [
      files[19],
      files[20],
      files[21],
      files[22],
      files[23],
    ],
  },
  {
    ...directoriesMin[2],
    files: [
      files[1],
    ],
  },
  {
    ...directoriesMin[3],
    directories: [
      directoriesMin[4],
      directoriesMin[8],
      directoriesMin[9],
      directoriesMin[10],
    ],
    files: [
      files[18],
    ],
  },
  {
    ...directoriesMin[4],
    directories: [
      directoriesMin[5],
      directoriesMin[6],
      directoriesMin[7],
    ],
  },
  {
    ...directoriesMin[5],
    files: [
      files[2],
      files[3],
    ],
  },
  {
    ...directoriesMin[6],
    files: [
      files[4],
      files[5],
      files[6],
      files[7],
    ],
  },
  {
    ...directoriesMin[7],
    files: [
      files[8],
      files[9],
      files[10],
      files[11],
    ],
  },
  {
    ...directoriesMin[8],
    files: [
      files[12],
      files[13],
    ],
  },
  {
    ...directoriesMin[9],
    files: [
      files[14],
      files[15],
    ],
  },
  {
    ...directoriesMin[10],
    files: [
      files[16],
      files[17],
    ],
  },
];

export const DirectoryRepository = new class DirectoryRepository extends Repository<DirectoryData> {
  public async add(entity: Omit<DirectoryData, 'id'>): Promise<DirectoryData> {
    throw new Error('Not implemented');
  }

  public async getAll(): Promise<DirectoryData[]> {
    await sleep(Math.floor(Math.random() * 600) + 300);

    return directories[0].directories ?? [];
  }

  public async get(id: number): Promise<DirectoryData> {
    await sleep(Math.floor(Math.random() * 600) + 300);

    if (!directories[id]) throw new Error(`404 Not found (id=${id})`);

    return directories[id];
  }

  public async edit(changes: Partial<DirectoryData>): Promise<DirectoryData> {
    throw new Error('Not implemented');
  }

  public async delete(id: number): Promise<void> {
    throw new Error('Not implemented');
  }
};