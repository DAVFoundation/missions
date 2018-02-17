import { handleActions } from 'redux-actions';
import { updateMapCoords } from '../actions';

const defaultState = { coords: {} };

export default handleActions(
  {
    [updateMapCoords]: (state, { payload: { coords } }) => {
      return { ...state, coords };
    },
  },
  defaultState,
);
