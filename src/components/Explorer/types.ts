type WithId = {
  id?: number,
};

type Label = WithId & {
  name: string,
}

type File = Label & {};

type Folder = Label & {
  children: Item[],
};

export type Item = File | Folder;