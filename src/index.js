import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux'
import App from './components/App.js';
import store from './store/store.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename='/Project-Pizza'>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

