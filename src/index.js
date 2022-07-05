import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import store from './app/store';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

import { fetchUsers } from './features/users/usersSlice';
import { worker } from './api/server';

//if (process.env.NODE_ENV === 'development') {
//const { worker } = require('./api/server');
//worker.start();
//}

async function main() {
  await worker.start({ onUnhandledRequest: 'bypass' });

  store.dispatch(fetchUsers());

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    //<React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
    //</React.StrictMode>
  );
}
main();
