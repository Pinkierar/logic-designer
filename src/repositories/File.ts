import {Vector2f} from '#graphics';
import {sleep} from '#utils/sleep';
import {Repository} from './Base';

type Count = number;
type FileId = number;
type FileName = string;

type NodeIndex = number;
type NodePosition = Vector2f;
type NodeIOIndex = number;

export type FileMinData = {
  // айди логического элемента
  id: FileId,

  // имя логического элемента
  name: FileName,

  // изображение логического элемента
  image?: string,
};

type Node = {
  // индекс логического элемента
  el: FileId,

  // положение ноды
  pos: NodePosition,

  // индекс ноды, куда отправить выходной сигнал
  to?: NodeIndex,

  // индекс IO входа, откуда получить входной сигнал
  in?: NodeIOIndex,

  // индекс IO выхода, куда отправить выходной сигнал
  out?: NodeIOIndex,
};

export type FileData = FileMinData & {
  // количество IO входов (если 1, то неограниченно)
  in: Count,

  // нужно ли и инвертировать входы
  invert?: boolean,

  // количество IO выходов (если 1, то неограниченно)
  out: Count,

  // логика элемента (если null, то логика определена в коде)
  data: Node[] | null,
};

export const FileRepository = new class FileRepository extends Repository<FileData> {
  private readonly files: Promise<FileData[]>;

  public constructor() {
    super();

    this.files = fetch('/json/files.json')
      .then(r => r.json() as Promise<FileData[]>);
  }

  public async add(entity: Omit<FileData, 'id'>): Promise<FileData> {
    throw new Error('Not implemented');
  }

  public async getAll(): Promise<FileData[]> {
    throw new Error('Not implemented');
  }

  public async get(id: number): Promise<FileData> {
    await sleep(Math.floor(Math.random() * 300) + 200);

    const files = await this.files;

    const file = files.find(file => file.id === id);

    if (!file) throw new Error(`404 Not found (id=${id})`);

    return file;
  }

  public async edit(changes: Partial<FileData>): Promise<FileData> {
    throw new Error('Not implemented');
  }

  public async delete(id: number): Promise<void> {
    throw new Error('Not implemented');
  }
};