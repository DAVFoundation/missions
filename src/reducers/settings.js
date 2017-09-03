const defaultState = {
  'welcome_seen': false, // Has user finished/skipped/closed on-boarding process?
  'user_id': '0xbf6650a594ca39ae373b7800a2c0f617ae8c81d3',
};

export default (state = defaultState, action) => {
  switch (action.type) {
  default:
    return state;
  }
};
