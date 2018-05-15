import {
  handleActions
} from 'redux-actions';
import {
  getSimulationDronesFulfilled
} from '../actions';

const defaultState = {};

export default handleActions({
  [getSimulationDronesFulfilled]: (state, {
    payload
  }) => {
    return (payload || []).reduce(
      (nextState, captain) => {
        nextState[captain.id] = captain;
        return nextState;
      }, {}
    );
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
