import store from '../store';
import { updateStatus } from '../actions';

export function initializeApp() {
  store.dispatch(updateStatus());
}
