import { createAction } from 'redux-actions';
import { fetchStatus } from '../lib/api';

export const updateStatus = createAction('UPDATE_STATUS', fetchStatus);

export const updateStatusFulfilled = createAction('UPDATE_STATUS_FULFILLED');

export const updateMapCoords = createAction('UPDATE_MAP_COORDS');

export const updateOrderDetails = createAction('UPDATE_ORDER_DETAILS');
