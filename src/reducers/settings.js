const defaultState = {
  'welcome_seen': false, // Has user finished/skipped/closed on-boarding process?
};

export default (state = defaultState, action) => {
  switch (action.type) {
  default:
    return state;
  }
};
