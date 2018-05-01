import {handleActions} from 'redux-actions';
import {updateBidsFulfilled} from '../actions';

const defaultState = {};

export default handleActions({

  [updateBidsFulfilled]: (state, { payload = [] }) => {
    let nextState = {};
    payload.forEach(bid => {
      bid.provider_id = bid.vehicle_id;
      nextState[bid.id] = bid;
    });
    return nextState;
  },

}, defaultState);

export const getBidArray = (state) => Object.entries(state).map(([, bid]) => bid);
