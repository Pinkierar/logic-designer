import {CanvasController} from '#app';
import {Explorer} from '#components/Explorer';
import {Item as ExplorerItem} from '#components/Explorer/types';
import {Menu} from '#components/Menu';
import {View} from '#components/View';
import {ExplorerRepository} from '#repositories/Explorer';
import {memo, useEffect, useState} from 'react';
import {GrCli} from 'react-icons/gr';
import style from './style.module.scss';

type AppProps = {
  children: CanvasController,
};

export const App = memo<AppProps>(props => {
  const {
    children: canvasController,
  } = props;

  const [explorer, setExplorer] = useState<ExplorerItem[]>([]);

  useEffect(() => {
    ExplorerRepository.get().then(explorer => setExplorer(explorer));
  }, []);

  return (
    <div className={style.base}>
      <Menu className={style.menu}>
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
        <Explorer onResize={canvasController.resizeHandler} className={style.explorer}>
          {explorer}
        </Explorer>
        {/*<View className={style.view}>
          {canvasController}
        </View>*/}
      </div>
    </div>
  );
});