import { createAction } from 'redux-actions';
import { fetchStatus } from '../lib/api';

export const updateStatus = createAction('UPDATE_STATUS', fetchStatus);

export const updateStatusFulfilled = createAction('UPDATE_STATUS_FULFILLED');
