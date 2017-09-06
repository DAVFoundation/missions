import { combineReducers } from 'redux';
import settings from './settings';
import vehicles from './vehicles';
import map from './map';
import order from './order';
import bids from './bids';
import mission from './mission';

export default combineReducers({
  settings,
  vehicles,
  map,
  order,
  bids,
  mission,
});
