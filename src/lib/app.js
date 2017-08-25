import store from '../store';
import { updateStatus } from '../actions';

const _updateStatusAndDispatch = () => {
  store.dispatch(updateStatus({id: '0xabc', lat: 32.068717, long: 34.775805}));
};

export function initializeApp() {
  // Get updated status from server, now and then at steady intervals
  _updateStatusAndDispatch();
  setInterval(_updateStatusAndDispatch, 2000);
}
