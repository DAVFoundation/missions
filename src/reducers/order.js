import { handleActions } from 'redux-actions';
import { updateOrderDetails, createRequestFulfilled, updateStatusFulfilled, resetOrderDetails, chooseBidPending } from '../actions';

const defaultState = {
  stage: 'draft', // draft | searching | choosing | signing
  pickup: undefined,
  dropoff: {lat: 55.711948, long: 13.203493},
  requested_pickup_time: undefined,
  size: 'letter',
  weight: '500',
};

export default handleActions({

  [updateOrderDetails]: (state, { payload }) => {
    return {...state, ...payload};
  },

  [createRequestFulfilled]: (state, { payload }) => {
    return {...state, ...payload, stage: 'searching', created_at: Date.now()};
  },

  [updateStatusFulfilled]: (state, { payload }) => {
    // If searching, and at least 10 bids received OR searched for over 10 seconds change state
    if (state.stage === 'searching') {
      const time = Date.now();
      if (payload.bids.length>=10 || time - state.created_at > 10 * 1000) {
        return {...state, stage: 'choosing'};
      }
    }
    return state;
  },

  [resetOrderDetails]: () => defaultState,

  [chooseBidPending]: (state) => {
    return {...state, stage: 'signing'};
  }

}, defaultState);
