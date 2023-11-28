import {Repository} from './Base';

export type FileMinData = {
  id: number,
  name: string,
  image?: string,
};

export type FileData = FileMinData & {
  content: string,
};

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