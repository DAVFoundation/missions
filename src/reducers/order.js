import { handleActions } from 'redux-actions';
import { updateOrderDetails } from '../actions';

const defaultState = {
  state: 'draft',
  pickup: undefined,
  dropoff: undefined,
  requested_pickup_time: undefined,
  size: 'letter',
  weight: '500',
};

export default handleActions({

  [updateOrderDetails]: (state, { payload: { details } }) => {
    return {...state, ...details};
  }

}, defaultState);
