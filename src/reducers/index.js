import { combineReducers } from 'redux';
import settings from './settings';
import vehicles from './vehicles';
import map from './map';
import order from './order';

export default combineReducers({
  settings,
  vehicles,
  map,
  order,
});
