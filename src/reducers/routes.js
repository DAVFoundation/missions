import { handleActions } from 'redux-actions';
import { updateStatusFulfilled } from '../actions';

const defaultState = {};

export default handleActions(
  {
    [updateStatusFulfilled]: (state, { payload: { providers = []} }) => {
      let nextState = {};
      providers.forEach(provider => {
        // console.log(provider);
        nextState[provider.id] = provider;
      });
      return nextState;
    }
  },
  defaultState,
);

// export const getChargerArray = state =>
//   Object.entries(state).map(([, vehicle]) => vehicle);

export const getRouteProvidersOnMission = state =>
  state.mission.vehicleId ? state.vehicles[state.mission.vehicleId] : undefined;
