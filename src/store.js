import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from './reducers';
import { loadState, saveState } from './localStorage.js';

const initStore = () => {
  const persistedState = loadState();
  const store = createStore(
    reducers,
    persistedState,
    composeWithDevTools(applyMiddleware(promiseMiddleware()))
  );

  store.subscribe(() => {
    saveState({
      settings: store.getState().settings
    });
  });

  return store;
};

const store = initStore();

export default store;
