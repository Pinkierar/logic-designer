import {Item} from '#components/Explorer/types';

export class ExplorerRepository {
  public static async get(): Promise<Item[]> {
    await new Promise(r => window.setTimeout(r, 200));

    return [
      {
        name: 'logic-designer',
        children: [
          {
            name: 'public',
            children: [
              {
                name: 'favicon.svg',
              },
            ],
          },
          {
            name: 'src',
            children: [
              {
                name: 'components',
                children: [
                  {
                    name: 'App',
                    children: [
                      {
                        name: 'style.module.css',
                      },
                      {
                        name: 'index.tsx',
                      },
                    ],
                  },
                  {
                    name: 'Explorer',
                    children: [
                      {
                        name: 'style.module.css',
                      },
                      {
                        name: 'types.ts',
                      },
                      {
                        name: 'index.tsx',
                      },
                      {
                        name: 'Item.tsx',
                      },
                    ],
                  },
                  {
                    name: 'Menu',
                    children: [
                      {
                        name: 'style.module.css',
                      },
                      {
                        name: 'types.ts',
                      },
                      {
                        name: 'index.tsx',
                      },
                      {
                        name: 'Item.tsx',
                      },
                    ],
                  },
                ],
              },
              {
                name: 'styles',
                children: [
                  {
                    name: 'global.css',
                  },
                  {
                    name: 'vars.css',
                  },
                ],
              },
              {
                name: 'types',
                children: [
                  {
                    name: 'index.d.ts',
                  },
                  {
                    name: 'types.d.ts',
                  },
                ],
              },
              {
                name: 'utils',
                children: [
                  {
                    name: 'cl.ts',
                  },
                  {
                    name: 'isTruthy.ts',
                  },
                ],
              },
              {
                name: 'index.tsx',
              },
            ],
          },
          {
            name: '.gitignore',
          },
          {
            name: 'index.html',
          },
          {
            name: 'package.json',
          },
          {
            name: 'tsconfig.json',
          },
          {
            name: 'vite.config.ts',
          },
        ],
      },
    ];
  }

  public static async add(item: Item): Promise<Item> {
    return item;
  }

  public static async delete(id: Item['id']): Promise<void> {
    return;
  }

  public static async edit(item: Item): Promise<Item> {
    return item;
  }
}