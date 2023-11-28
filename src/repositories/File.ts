import {Repository} from './Base';

export type FileMinData = {
  id: number,
  name: string,
  image: string,
};

export type FileData = FileMinData & {
  content: string,
};

export const files: FileMinData[] = [
  {
    id: 0,
    name: '',
    image: '',
  },
  {
    id: 1,
    name: 'favicon.svg',
    image: '/favicon.svg',
  },
  {
    id: 2,
    name: 'style.module.css',
    image: '/favicon.svg',
  },
  {
    id: 3,
    name: 'index.tsx',
    image: '/favicon.svg',
  },
  {
    id: 4,
    name: 'style.module.css',
    image: '/favicon.svg',
  },
  {
    id: 5,
    name: 'types.ts',
    image: '/favicon.svg',
  },
  {
    id: 6,
    name: 'index.tsx',
    image: '/favicon.svg',
  },
  {
    id: 7,
    name: 'Item.tsx',
    image: '/favicon.svg',
  },
  {
    id: 8,
    name: 'style.module.css',
    image: '/favicon.svg',
  },
  {
    id: 9,
    name: 'types.ts',
    image: '/favicon.svg',
  },
  {
    id: 10,
    name: 'index.tsx',
    image: '/favicon.svg',
  },
  {
    id: 11,
    name: 'Item.tsx',
    image: '/favicon.svg',
  },
  {
    id: 12,
    name: 'global.css',
    image: '/favicon.svg',
  },
  {
    id: 13,
    name: 'vars.css',
    image: '/favicon.svg',
  },
  {
    id: 14,
    name: 'index.d.ts',
    image: '/favicon.svg',
  },
  {
    id: 15,
    name: 'types.d.ts',
    image: '/favicon.svg',
  },
  {
    id: 16,
    name: 'cl.ts',
    image: '/favicon.svg',
  },
  {
    id: 17,
    name: 'isTruthy.ts',
    image: '/favicon.svg',
  },
  {
    id: 18,
    name: 'index.tsx',
    image: '/favicon.svg',
  },
  {
    id: 19,
    name: '.gitignore',
    image: '/favicon.svg',
  },
  {
    id: 20,
    name: 'index.html',
    image: '/favicon.svg',
  },
  {
    id: 21,
    name: 'package.json',
    image: '/favicon.svg',
  },
  {
    id: 22,
    name: 'tsconfig.json',
    image: '/favicon.svg',
  },
  {
    id: 23,
    name: 'vite.config.ts',
    image: '/favicon.svg',
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