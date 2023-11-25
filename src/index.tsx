import {canvas, run} from '#app';
import {App} from '#components/App';
import '#styles/global.scss';
import '#styles/vars.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';

run(canvas);

window.addEventListener('load', () => {
  const root = document.getElementById('root');
  if (!root) throw new Error('!root');

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App>
        {canvas}
      </App>
    </React.StrictMode>,
  );
});

