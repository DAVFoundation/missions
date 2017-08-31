import store from '../store';
import { updateStatus } from '../actions';

const _updateStatusAndDispatch = () => {
  const coords = store.getState().map.coords;
  if (!coords.lat || !coords.long) return;
  const {lat, long} = coords;
  const requestId = store.getState().order.requestId;
  store.dispatch(updateStatus({id: '0xabc', lat, long, requestId }));
};

export function initializeApp() {
  // Get updated status from server, now and then at steady intervals
  _updateStatusAndDispatch();
  setInterval(_updateStatusAndDispatch, 1000);
}
