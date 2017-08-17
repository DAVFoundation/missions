const defaultState = {
  'welcome_seen': false, //Has user finished/skipped/closed onboarding?
};

export default (state = defaultState, action) => {
  switch (action.type) {
  default:
    return state;
  }
};
