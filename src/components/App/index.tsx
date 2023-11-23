import {Explorer} from '#components/Explorer';
import {Menu} from '#components/Menu';
import {GrCli} from 'react-icons/gr';
import style from './style.module.css';

export const App = () => {
  return (
    <main className={style.base}>
      <Menu>
        {[
          {
            label: GrCli,
            command: () => {
              alert('Pinkierar');
            },
          },
          {
            label: 'Файл',
            list: [
              {
                label: 'Новый',
                list: [
                  {
                    label: 'Проект',
                    command: () => {
                    },
                  },
                ],
              },
              {
                label: 'Открыть...',
                command: () => {
                },
              },
              {
                label: 'Сохранить как',
                command: () => {
                },
              },
              {
                label: 'Закрыть проект',
                command: () => {
                },
              },
            ],
          },
          {
            label: 'Помощь',
            list: [
              {
                label: 'О программе',
                command: () => {
                },
              },
            ],
          },
        ]}
      </Menu>
      <div className={style.content}>
        <Explorer>
          {[
            {
              name: 'logic-designer',
              content: [
                {
                  name: 'public',
                  content: [
                    {
                      name: 'favicon.svg',
                    },
                  ],
                },
                {
                  name: 'src',
                  content: [
                    {
                      name: 'components',
                      content: [
                        {
                          name: 'App',
                          content: [
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
                          content: [
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
                          content: [
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
                      content: [
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
                      content: [
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
                      content: [
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
          ]}
        </Explorer>
        <div className={style.view}></div>
      </div>
    </main>
  );
};