import '#styles/vars.css';
import '#styles/global.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from '#components/App';

window.addEventListener('load', () => {
  ReactDOM.createRoot(document.body).render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>,
  );
});

