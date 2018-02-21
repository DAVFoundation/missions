import store from '../store';
import {updateBids, updateStatus, updateVehicles} from '../actions';

const _updateStatusAndDispatch = () => {
  const coords = store.getState().map.coords;
  if (!coords.lat || !coords.long) return;
  const { lat, long } = coords;
  const needId = store.getState().order.needId;
  store.dispatch(updateStatus({lat, long, needId}));
};

const _updateBidsAndDispatch = () => {
  const order = store.getState().order;
  if (['searching', 'choosing'].includes(order.stage)) {
    const needId = order.needId;
    store.dispatch(updateBids({needId}));
  }
};

const _updateVehiclesAndDispatch = () => {
  const coords = store.getState().map.coords;
  if (!coords.lat || !coords.long) return;
  const {lat, long} = coords;
  const needId = store.getState().order.needId;
  store.dispatch(updateVehicles({lat, long, needId}));
};

export function initializeApp() {
  // Get updated status from server, now and then at steady intervals
  _updateStatusAndDispatch();
  _updateVehiclesAndDispatch();
  setInterval(_updateStatusAndDispatch, 1000);
  setInterval(_updateVehiclesAndDispatch, 1000);
  setInterval(_updateBidsAndDispatch, 1000);
}
