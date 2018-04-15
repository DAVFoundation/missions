import { handleActions } from 'redux-actions';
import { updateStatusFulfilled } from '../actions';

const defaultState = {};

export default handleActions(
  {
    [updateStatusFulfilled]: (state, { payload: { chargers = []} }) => {
      let nextState = {};
      chargers.forEach(charger => {
        console.log(charger);
        nextState[charger.id] = charger;
      });
      return nextState;
    }
  },
  defaultState,
);

export const getChargerArray = state =>
  Object.entries(state).map(([, vehicle]) => vehicle);

export const getChargerOnMission = state =>
  state.mission.vehicleId ? state.vehicles[state.mission.vehicleId] : undefined;
