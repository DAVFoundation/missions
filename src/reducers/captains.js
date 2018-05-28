import {
  handleActions
} from 'redux-actions';
import {
  getSimulationDronesFulfilled,
  updateStatusFulfilled
} from '../actions';

const defaultState = {};

export default handleActions({
  [updateStatusFulfilled]: (state, {
    payload
  }) => {
    let captains = payload.captains || [];
    captains.forEach(captain => {
      state[captain.id] = captain;
    });
    return state;
  },
  [getSimulationDronesFulfilled]: (state, {
    payload
  }) => {
    payload.forEach(captain => {
      if (!state[captain.id]) {
        state[captain.id] = captain;
      }
      else{
        state[captain.id].coords = captain.coords;
      }
    });
    return state;
  }
},
defaultState
);

export const getCaptainsArray = state =>
  Object.entries(state).map(([, captain]) => captain);

export const getCaptainOnMission = state =>
  state.mission.captain_id ?
    state.captains[state.mission.captain_id] :
    undefined;
