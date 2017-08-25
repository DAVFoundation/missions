import store from '../store';
import { updateStatus } from '../actions';

export function initializeApp() {
  // Get updated status from server, now and then at steady intervals
  store.dispatch(updateStatus());
  setInterval(
    () => store.dispatch(updateStatus())
    , 2000);
}
