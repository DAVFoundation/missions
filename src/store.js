import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from './reducers';

const initStore = () => {
  const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(promiseMiddleware()))
  );

  return store;
};

const store = initStore();

export default store;
