import {CanvasController} from '#app';
import {Explorer} from '#components/Explorer';
import {MenuHeader} from '#components/Menu';
import {View} from '#components/View';
import {memo} from 'react';
import {GrCli} from 'react-icons/gr';
import style from './style.module.scss';

type AppProps = {
  canvasController: CanvasController,
};

export const App = memo<AppProps>(props => {
  const {
    canvasController,
  } = props;

  return (
    <div className={style.base}>
      <MenuHeader className={style.menu} items={[
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
      ]}/>
      <div className={style.content}>
        <Explorer onResize={canvasController.resizeHandler} className={style.explorer}/>
        <View className={style.view} controller={canvasController}/>
      </div>
    </div>
  );
});