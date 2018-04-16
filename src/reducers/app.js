import { handleActions } from 'redux-actions';
import { updateApp } from '../actions';

const defaultState = {};

export default handleActions(
  {
    [updateApp]: (state, { payload: { name, path, needType } }) => {
      return { ...state, name, path, needType };
    },
  },
  defaultState,
);
