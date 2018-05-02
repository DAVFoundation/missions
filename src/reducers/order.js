import {handleActions, combineActions} from 'redux-actions';
import {
  updateOrderDetails, 
  createDroneDeliveryNeedFulfilled, createDroneChargingNeedFulfilled, createRoutePlanNeedFulfilled, 
  updateStatusFulfilled,
  resetOrderDetails, chooseBidPending, updateBidsFulfilled,
  unlockWallet, unregisteredDavId, registerDavIdFulfilled, closeWalletDialog, startChargingMissionFulfilled,
  confirmDroneDocking
} from '../actions';
import getConfig from '../config';

const defaultState = {
  stage: 'draft', // draft | searching | choosing | signing | in_mission
  registration_step: 'none', // none | unlock_wallet | register_id | register_fulfilled | registered
  fetching: false,
  pickup: undefined,
  dropoff: undefined,
  pickup_at: undefined,
  size: getConfig('default_package_size'),
  weight: getConfig('default_package_weight'),
};

export default handleActions({

  [unlockWallet]: (state) => {
    return {...state, registration_step: 'unlock_wallet', fetching: false};
  },
  [unregisteredDavId]: (state) => {
    return {...state, registration_step: 'register_id', fetching: false};
  },
  [registerDavIdFulfilled]: (state) => {
    return {...state, registration_step: 'register_fulfilled', fetching: false};
  },
  [closeWalletDialog]: (state) => {
    return {...state, registration_step: 'none'};
  },
  [updateOrderDetails]: (state, {payload}) => {
    return {...state, ...payload};
  },

  [combineActions(createDroneDeliveryNeedFulfilled, createDroneChargingNeedFulfilled, createRoutePlanNeedFulfilled)]: (state, {payload}) => {
    return {...state, ...payload, stage: 'searching', created_at: Date.now()};
  },

  [updateBidsFulfilled]: (state, {payload}) => {
    // If searching, and at least 10 bids received OR searched for over 10 seconds change state
    if (state.stage === 'searching') {
      const time = Date.now();
      if (payload.length >= 10 || time - state.created_at > 10 * 1000) {
        return {...state, stage: 'choosing'};
      }
    }
    return state;
  },

  [updateStatusFulfilled]: (state, {payload}) => {
    if (payload.status === 'in_mission') {
      return {...state, ...payload, ...{stage: 'in_mission'}};
    }

    return state;
  },

  [startChargingMissionFulfilled]: state => {
    return {...state, ...{stage: 'in_mission'}};
  },

  [confirmDroneDocking]: state => {
    return {...state, ...{stage: 'in_mission'}};
  },

  [resetOrderDetails]: () => defaultState,

  [chooseBidPending]: state => {
    return {...state, stage: 'signing'};
  },


},
defaultState,
);
