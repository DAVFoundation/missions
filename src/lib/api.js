import store from '../store';
import { getShortCoordsString } from '../lib/utils';

const apiRoot = process.env.REACT_APP_MISSION_CONTROL_HOST;

export const fetchStatus = ({ id, lat, long, requestId }) => {
  const userId = store.getState().settings.user_id;
  const missionId = store.getState().mission.id;
  let url = new URL(`/status`, apiRoot);
  id && url.searchParams.set('id', id);
  lat && url.searchParams.set('lat', lat); // Don't stand on the equator or you'll break this
  long && url.searchParams.set('long', long);
  requestId && url.searchParams.set('requestId', requestId);
  missionId && url.searchParams.set('missionId', missionId);
  url.searchParams.set('userId', userId);
  return fetch(url)
    .then(response => response.json());
};

export const createRequest = ({pickup, dropoff, requested_pickup_time, size, weight}) => {
  const userId = store.getState().settings.user_id;
  pickup = getShortCoordsString(pickup, 8, ',');
  dropoff = getShortCoordsString(dropoff, 8, ',');
  return fetch(`${apiRoot}/request/new?user_id=${userId}&pickup=${pickup}&dropoff=${dropoff}&requested_pickup_time=${requested_pickup_time}&size=${size}&weight=${weight}`)
    .then(response => response.json());
};

export const chooseBid = (bid_id) => {
  const userId = store.getState().settings.user_id;
  let url = new URL(`/choose_bid`, apiRoot);
  url.searchParams.set('user_id', userId);
  url.searchParams.set('bid_id', bid_id);
  return fetch(url)
    .then(response => response.json());
};

export const cancelRequest = () => {
  const requestId = store.getState().order.requestId;
  let url = new URL(`/request/cancel`, apiRoot);
  url.searchParams.set('requestId', requestId);
  return fetch(url)
    .then(response => response.json());
};
