import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from '../../store';
import App from './App.jsx';
import '../../common.css';
import { updateApp } from '../../actions';
import { NEED_TYPES } from '../../config/needTypes.js';

store.dispatch(updateApp({
  name: 'Drone Delivery Simulation',
  path: '/drone_simulation',
  needType: NEED_TYPES.DRONE_DELIVERY
}));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('app')
);
