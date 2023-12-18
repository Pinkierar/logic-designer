import {canvasController} from '#app';
import {List} from '#components/atoms';
import {Dialog, DialogContextProvider, DialogCurrent} from '#components/Dialog';
import {Explorer} from '#components/Explorer';
import {MenuHeader} from '#components/Menu';
import {MenuItem} from '#components/Menu/Item';
import {View} from '#components/View';
import {memo, useState} from 'react';
import {GrCli} from 'react-icons/gr';
import style from './style.module.scss';

const menuItems: MenuItem[] = [
  {
    label: GrCli,
    command: 'logo',
  },
  {
    label: 'Файл',
    items: [
      {
        label: 'Новый',
        items: [
          {
            label: 'Проект',
            command: 'project new',
          },
        ],
      },
      {
        label: 'Открыть...',
        command: 'open',
      },
      {
        label: 'Сохранить как',
        command: 'save as',
      },
      {
        label: 'Закрыть проект',
        command: 'project close',
      },
    ],
  },
  {
    label: 'Помощь',
    items: [
      {
        label: 'О программе',
        command: 'about',
      },
    ],
  },
];

const menuCallback = (command: string) => {
  if (command === 'project new') {
    alert('Pinkierar');
  } else if (command === 'open') {

  } else if (command === 'save as') {

  } else if (command === 'project close') {

  } else if (command === 'about') {

  }

  throw new Error(`unknown command "${command}"`);
};

export const App = memo(() => {
  const [dialog, setDialog] = useState<DialogCurrent>(null);

  return (
    <DialogContextProvider value={{
      alert: (title, message) => setDialog({
        mode: 'alert',
        title,
        message,
      }),
      confirm: (title, message, callback) => setDialog({
        mode: 'confirm',
        title,
        message,
        callback,
      }),
      prompt: (title, message, callback, initial = '') => setDialog({
        mode: 'prompt',
        title,
        message,
        callback,
        initial,
      }),
      hide: () => setDialog(null),
    }}>
      <List gap={0} vertical={true} className={style.base}>
        <MenuHeader className={style.menu} items={menuItems} callback={menuCallback}/>
        <List gap={0} className={style.content}>
          <Explorer onResize={canvasController.resizeHandler} className={style.explorer}/>
          <View className={style.view} controller={canvasController}/>
        </List>
        <Dialog current={dialog}/>
      </List>
    </DialogContextProvider>
  );
});