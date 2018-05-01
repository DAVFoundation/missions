import { handleActions } from 'redux-actions';
import { updateStatusFulfilled } from '../actions';

const defaultState = {};

export default handleActions(
  {
    [updateStatusFulfilled]: (state, { payload }) => {
      let nextState = {};
      let captains = payload.captains || [];
      captains.forEach(captain => {
        // console.log(provider);
        nextState[captain.id] = captain;
      });
      return nextState;
    }
  },
  defaultState,
);

export const getRouteProvidersOnMission = state =>
  state.mission.captainId ? state.captains[state.mission.captainId] : undefined;
