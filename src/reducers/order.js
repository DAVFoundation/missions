import { handleActions } from 'redux-actions';
import { updateOrderDetails, createNeedFulfilled, updateStatusFulfilled, resetOrderDetails, chooseBidPending } from '../actions';
import getConfig from '../config';

const defaultState = {
  stage: 'draft', // draft | searching | choosing | signing | in_mission
  pickup: undefined,
  dropoff: undefined,
  start_at: undefined,
  size: getConfig('default_package_size'),
  weight: getConfig('default_package_weight'),
};

export default handleActions({

  [updateOrderDetails]: (state, { payload }) => {
    return {...state, ...payload};
  },

  [createNeedFulfilled]: (state, { payload }) => {
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

    if (payload.status === 'in_mission') {
      return {...state, ...payload, ...{stage: 'in_mission'}};
    }

    return state;
  },

  [resetOrderDetails]: () => defaultState,

  [chooseBidPending]: (state) => {
    return {...state, stage: 'signing'};
  }

}, defaultState);
