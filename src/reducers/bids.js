import {handleActions} from 'redux-actions';
import {updateBidsFulfilled} from '../actions';

const defaultState = {};

export default handleActions({

  [updateBidsFulfilled]: (state, { payload = [] }) => {
    let nextState = {};
    payload.forEach(bid => {
      nextState[bid.id] = bid;
    });
    return nextState;
  },

}, defaultState);

export const getBidArray = (state) => Object.entries(state).map(([, bid]) => bid);
