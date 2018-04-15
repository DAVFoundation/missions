import { handleActions } from 'redux-actions';
import { updateStatusFulfilled, confirmTakeoffFulfilled } from '../actions';

const defaultState = {};

export default handleActions(
  {
    [updateStatusFulfilled]: (state, { payload: { vehicles = [] } }) => {
      let nextState = {};
      vehicles.forEach(vehicle => {
        nextState[vehicle.id] = vehicle;
      });
      return nextState;
    },

    [confirmTakeoffFulfilled]: (state, { payload: { vehicle } }) => {
      let nextState = {};
      nextState[vehicle.id] = vehicle;
      return nextState;
    },
  },
  defaultState,
);

export const getVehicleArray = state =>
  Object.entries(state).map(([, vehicle]) => vehicle);

export const getVehicleOnMission = state =>
  state.mission.vehicleId ? state.vehicles[state.mission.vehicleId] : undefined;
