import {canvasController, run} from '#app';
import {App} from '#components/App';
import '#styles/app.scss';
import '#styles/global.scss';
import '#styles/vars.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';

run(canvasController);

window.addEventListener('load', () => {
  const root = document.getElementById('root');
  if (!root) throw new Error('!root');

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App canvasController={canvasController}/>
    </React.StrictMode>,
  );
});

