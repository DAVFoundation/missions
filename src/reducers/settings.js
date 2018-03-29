import { randomDavAddress } from '../lib/utils';
import { handleActions } from 'redux-actions';
import { updateDavId } from '../actions';

const defaultState = {
  welcome_seen: false, // Has user finished/skipped/closed on-boarding process?
  user_id: randomDavAddress(),
  user_icon: '/images/noam.jpg',
};

export default handleActions({

  [updateDavId]: (state, {payload: { davId }}) => {
    return {...state, user_id: davId.toLowerCase()};
  },

}, defaultState);
