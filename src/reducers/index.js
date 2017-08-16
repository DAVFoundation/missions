import { combineReducers } from 'redux';
import settings from './settings';
import vehicles from './vehicles';

export default combineReducers({
  settings,
  vehicles,
});
