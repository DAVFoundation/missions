import { handleActions } from 'redux-actions';
import { updateStatusFulfilled } from '../actions';

const defaultState = {};

export default handleActions(
  {
    [updateStatusFulfilled]: (state, { payload: { bids = [] } }) => {
      let nextState = {};
      bids.forEach(bid => {
        nextState[bid.id] = bid;
      });
      return nextState;
    },
  },
  defaultState,
);

export const getBidArray = state => Object.entries(state).map(([, bid]) => bid);
