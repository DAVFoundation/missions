import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import initStore from './initStore';
import App from './App.jsx';
import './Main.css';

ReactDOM.render(
  <Provider store={initStore()}>
    <App />
  </Provider>,
  document.getElementById('app')
);
