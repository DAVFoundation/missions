import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../store';
import App from './App.jsx';
import '../../common.css';
import { updateApp } from '../../actions';
import { NEED_TYPES } from '../../config/needTypes.js';

store.dispatch(updateApp({ 
  name: 'Route Plan', 
  path: '/route_plan',
  needType: NEED_TYPES.ROUTE_PLAN
}));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);