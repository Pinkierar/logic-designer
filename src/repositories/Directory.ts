import {sleep} from '#utils/sleep';
import {Repository} from './Base';
import type {FileMinData} from './File';

export type DirectoryMinData = {
  id: number,
  name: string,
};

export type DirectoryData = DirectoryMinData & {
  directories?: DirectoryMinData[],
  files?: FileMinData[],
};

export const DirectoryRepository = new class DirectoryRepository extends Repository<DirectoryData> {
  private readonly directories: Promise<DirectoryData[]>;

  public constructor() {
    super();

    this.directories = fetch('/json/directories.json')
      .then(r => r.json() as Promise<DirectoryData[]>)
      .then(directories => directories.map(directory => ({
        ...directory,
        directories: directory.directories?.sort((a, b) => {
          const an = a.name.toLowerCase();
          const bn = b.name.toLowerCase();

          if (an < bn) return -1;
          if (an > bn) return 1;
          return 0;
        }),
        files: directory.files?.sort((a, b) => {
          const an = a.name.toLowerCase();
          const bn = b.name.toLowerCase();

          if (an < bn) return -1;
          if (an > bn) return 1;
          return 0;
        }),
      })));
  }

  public async add(entity: Omit<DirectoryData, 'id'>): Promise<DirectoryData> {
    throw new Error('Not implemented');
  }

  public async getAll(): Promise<DirectoryData[]> {
    await sleep(Math.floor(Math.random() * 300) + 200);

    const directories = await this.directories;

    return directories.find(directory => directory.id === 0)?.directories ?? [];
  }

  public async get(id: number): Promise<DirectoryData> {
    await sleep(Math.floor(Math.random() * 300) + 200);

    const directories = await this.directories;

    const directory = directories.find(directory => directory.id === id);

    if (!directory) throw new Error(`404 Not found (id=${id})`);

    return directory;
  }

  public async edit(changes: Partial<DirectoryData>): Promise<DirectoryData> {
    throw new Error('Not implemented');
  }

  public async delete(id: number): Promise<void> {
    throw new Error('Not implemented');
  }
};