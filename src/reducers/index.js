import { combineReducers } from 'redux';
import settings from './settings';
import vehicles from './vehicles';
import chargers from './chargers';
import routes from './routes';
import captains from './captains';
import map from './map';
import order from './order';
import bids from './bids';
import mission from './mission';
import app from './app';

export default combineReducers({
  settings,
  vehicles,
  chargers,
  routes,
  captains,
  map,
  order,
  bids,
  mission,
  app,
});
