import {Repository} from './Base';

export type FileMinData = {
  id: number,
  name: string,
  image?: string,
};

export type FileData = FileMinData & {
  content: string,
};

export const files: FileMinData[] = [
  {
    id: 0,
    name: '',
  },
  {
    id: 1,
    name: 'favicon.svg',
  },
  {
    id: 2,
    name: 'style.module.css',
  },
  {
    id: 3,
    name: 'index.tsx',
  },
  {
    id: 4,
    name: 'style.module.css',
  },
  {
    id: 5,
    name: 'types.ts',
  },
  {
    id: 6,
    name: 'index.tsx',
  },
  {
    id: 7,
    name: 'Item.tsx',
  },
  {
    id: 8,
    name: 'style.module.css',
  },
  {
    id: 9,
    name: 'types.ts',
  },
  {
    id: 10,
    name: 'index.tsx',
  },
  {
    id: 11,
    name: 'Item.tsx',
  },
  {
    id: 12,
    name: 'global.css',
  },
  {
    id: 13,
    name: 'vars.css',
  },
  {
    id: 14,
    name: 'index.d.ts',
  },
  {
    id: 15,
    name: 'types.d.ts',
  },
  {
    id: 16,
    name: 'cl.ts',
  },
  {
    id: 17,
    name: 'isTruthy.ts',
  },
  {
    id: 18,
    name: 'index.tsx',
  },
  {
    id: 19,
    name: '.gitignore',
  },
  {
    id: 20,
    name: 'index.html',
  },
  {
    id: 21,
    name: 'package.json',
  },
  {
    id: 22,
    name: 'tsconfig.json',
  },
  {
    id: 23,
    name: 'vite.config.ts',
  },
];

export const FileRepository = new class FileRepository extends Repository<FileData> {
  public async add(entity: Omit<FileData, 'id'>): Promise<FileData> {
    throw new Error('Not implemented');
  }

  public async getAll(): Promise<FileData[]> {
    throw new Error('Not implemented');
  }

  public async get(id: number): Promise<FileData> {
    throw new Error('Not implemented');
  }

  public async edit(changes: Partial<FileData>): Promise<FileData> {
    throw new Error('Not implemented');
  }

  public async delete(id: number): Promise<void> {
    throw new Error('Not implemented');
  }
};