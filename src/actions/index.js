import { createAction } from 'redux-actions';
import { fetchStatus as apiFetchStatus, createRequest as apiCreateRequest, chooseBid as apiChooseBid } from '../lib/api';

export const updateStatus = createAction('UPDATE_STATUS', apiFetchStatus);

export const updateStatusFulfilled = createAction('UPDATE_STATUS_FULFILLED');

export const updateMapCoords = createAction('UPDATE_MAP_COORDS');

export const updateOrderDetails = createAction('UPDATE_ORDER_DETAILS');

export const resetOrderDetails = createAction('RESET_ORDER_DETAILS');

export const createRequest = createAction('CREATE_REQUEST', apiCreateRequest);

export const createRequestFulfilled = createAction('CREATE_REQUEST_FULFILLED');

export const chooseBid = createAction('CHOOSE_BID', apiChooseBid);

export const chooseBidPending = createAction('CHOOSE_BID_PENDING');

export const chooseBidFulfilled = createAction('CHOOSE_BID_FULFILLED');
