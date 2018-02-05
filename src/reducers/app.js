import { handleActions } from 'redux-actions';
import { updateApp } from '../actions';

const defaultState = {};

export default handleActions({

  [updateApp]: (state, { payload: { name, path } }) => {
    return {...state, name, path};
  }

}, defaultState);
