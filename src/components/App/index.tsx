import {Menu} from '#components/Menu';
import {GrCli} from 'react-icons/gr';
import style from './style.module.css';


export const App = () => {
  return (
    <main className={style.base}>
      <Menu className={style.menu}>
        {[
          {
            label: GrCli,
            command: () => {
              alert('Pinkierar');
            },
          },
        ]}
      </Menu>
      <div className={style.content}></div>
    </main>
  );
};