import { handleActions } from 'redux-actions';
import { updateOrderDetails, createRequestFulfilled, resetOrderDetails } from '../actions';

const defaultState = {
  state: 'draft',
  pickup: undefined,
  dropoff: undefined,
  requested_pickup_time: undefined,
  size: 'letter',
  weight: '500',
};

export default handleActions({

  [updateOrderDetails]: (state, { payload }) => {
    return {...state, ...payload};
  },

  [createRequestFulfilled]: (state, {payload }) => {
    return {...state, ...payload, state: 'searching', created_at: Date.now()};
  },

  [resetOrderDetails]: () => defaultState,

}, defaultState);
