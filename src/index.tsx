import {canvasController, run} from '#app';
import {App} from '#components/App';
import '#styles/app.scss';
import '#styles/global.scss';
import '#styles/vars.scss';
// import {setupStore} from '#store';
import React from 'react';
import ReactDOM from 'react-dom/client';
// import {Provider} from 'react-redux';

run(canvasController);

window.addEventListener('load', () => {
  const root = document.getElementById('root');
  if (!root) throw new Error('!root');

  // const store = setupStore();

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      {/*<Provider store={store}>*/}
        <App/>
      {/*</Provider>*/}
    </React.StrictMode>,
  );
});

