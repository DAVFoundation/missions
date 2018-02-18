import { randomDavAddress } from '../lib/utils';

const defaultState = {
  welcome_seen: false, // Has user finished/skipped/closed on-boarding process?
  user_id: randomDavAddress(),
  user_icon: '/images/noam.jpg',
};

export default (state = defaultState, action) => {
  switch (action.type) {
  default:
    return state;
  }
};
