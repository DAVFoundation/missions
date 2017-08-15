const defaultState = {
  'welcome_seen': false, //Has user finished/skipped/closed onboarding?
};

const settings = (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default settings;
