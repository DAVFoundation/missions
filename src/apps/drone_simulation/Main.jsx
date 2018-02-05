import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../store';
import App from './App.jsx';
import '../../common.css';
import { updateApp } from '../../actions';

store.dispatch(updateApp({ name: 'Drone Delivery Simulation', path: '' }));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
