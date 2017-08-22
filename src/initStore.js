import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from './reducers';
import { updateStatus } from './actions';

const initStore = () => {
  const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(promiseMiddleware()))
  );

  store.dispatch(updateStatus());

  return store;
};

export default initStore;
