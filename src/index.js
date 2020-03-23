import React from 'react';
import { render } from 'react-dom';
import {   Router } from 'react-router-dom'
import { createBrowserHistory } from 'history';
import AppContextProvider from './AppContext';
import App from './App';

export const history = createBrowserHistory();

render(
  <AppContextProvider>
    <Router history={history}>
      <App />
    </Router>
  </AppContextProvider>,
  document.getElementById('root')
);
