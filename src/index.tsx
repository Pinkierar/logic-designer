import '#styles/vars.css';
import '#styles/global.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from '#components/App';

window.addEventListener('load', () => {
  const root = document.getElementById('root');
  if (!root) throw new Error('!root');

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>,
  );
});

