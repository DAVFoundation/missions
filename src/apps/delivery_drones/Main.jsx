import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../../store';
import App from './App.jsx';
import '../../common.css';
import { updateApp } from '../../actions';

store.dispatch(updateApp({ 
  name: 'Drone Deliveries', 
  path: '/delivery_drones',
  needType: 'drone_delivery'
}));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
