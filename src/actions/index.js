import { createAction } from 'redux-actions';
import {
  fetchStatus as apiFetchStatus,
  createNeed as apiCreateNeed,
  fetchBids as apiFetchBids,
  chooseBid as apiChooseBid,
  confirmTakeoff as apiConfirmTakeoff,
} from '../lib/api';

import { initWeb3, registeredDavId } from '../lib/dav';

export const updateApp = createAction('UPDATE_APP');

export const updateStatus = createAction('UPDATE_STATUS', apiFetchStatus);

export const updateStatusFulfilled = createAction('UPDATE_STATUS_FULFILLED');

export const verifyDavId = createAction('VERIFY_DAV_ID', initWeb3);

export const updateDavId = createAction('UPDATE_DAV_ID');

export const registerDavIdFulfilled = createAction('REGISTER_DAV_ID_FULFILLED');

export const registerDavId = createAction('REGISTER_DAV_ID', registeredDavId);

export const unregisteredDavId = createAction('UNREGISTERED_DAV_ID');

export const unlockWallet = createAction('UNLOCK_WALLET');

export const closeWalletDialog = createAction('CLOSE_WALLET_DIALOG');

export const updateMapCoords = createAction('UPDATE_MAP_COORDS');

export const updateOrderDetails = createAction('UPDATE_ORDER_DETAILS');

export const resetOrderDetails = createAction('RESET_ORDER_DETAILS');

export const createNeed = createAction('CREATE_NEED', apiCreateNeed);

export const createNeedFulfilled = createAction('CREATE_NEED_FULFILLED');

export const updateBids = createAction('UPDATE_BIDS', apiFetchBids);

export const updateBidsFulfilled = createAction('UPDATE_BIDS_FULFILLED');

export const chooseBid = createAction('CHOOSE_BID', apiChooseBid);

export const chooseBidPending = createAction('CHOOSE_BID_PENDING');

export const chooseBidFulfilled = createAction('CHOOSE_BID_FULFILLED');

export const confirmTakeoff = createAction(
  'CONFIRM_TAKEOFF',
  apiConfirmTakeoff,
);

export const confirmTakeoffPending = createAction('CONFIRM_TAKEOFF_PENDING');

export const confirmTakeoffFulfilled = createAction(
  'CONFIRM_TAKEOFF_FULFILLED',
);
