import {Explorer} from '#components/Explorer';
import {Item as ExplorerItem} from '#components/Explorer/types';
import {Menu} from '#components/Menu';
import {useEffect, useState} from 'react';
import {GrCli} from 'react-icons/gr';
import {ExplorerRepository} from '../../Repository/Explorer';
import style from './style.module.css';

export const App = () => {
  const [explorer, setExplorer] = useState<ExplorerItem[]>([]);

  useEffect(() => {
    ExplorerRepository.get().then(explorer => setExplorer(explorer))
  }, []);

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
          {explorer}
        </Explorer>
        <div className={style.view}></div>
      </div>
    </main>
  );
};