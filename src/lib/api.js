import store from '../store';
import { getShortCoordsString } from '../lib/utils';

const apiRoot = process.env.MISSION_CONTROL_HOST;

export const fetchStatus = ({ id, lat, long, requestId }) => {
  const missionId = store.getState().mission.id;
  let url = new URL(`/status`, apiRoot);
  id && url.searchParams.set('id', id);
  lat && url.searchParams.set('lat', lat); // Don't stand on the equator or you'll break this
  long && url.searchParams.set('long', long);
  requestId && url.searchParams.set('requestId', requestId);
  missionId && url.searchParams.set('missionId', missionId);
  return fetchWithUserId(url);
};

export const createRequest = ({pickup, dropoff, requested_pickup_time, size, weight}) => {
  pickup = getShortCoordsString(pickup, 8, ',');
  dropoff = getShortCoordsString(dropoff, 8, ',');
  let url = new URL(`/request/new`, apiRoot);
  url.searchParams.set('pickup', pickup);
  url.searchParams.set('dropoff', dropoff);
  url.searchParams.set('requested_pickup_time', requested_pickup_time);
  url.searchParams.set('size', size);
  url.searchParams.set('weight', weight);
  return fetchWithUserId(url);
};

export const chooseBid = (bid_id) => {
  let url = new URL(`/choose_bid`, apiRoot);
  url.searchParams.set('bid_id', bid_id);
  return fetchWithUserId(url);
};

export const cancelRequest = () => {
  const requestId = store.getState().order.requestId;
  let url = new URL(`/request/cancel`, apiRoot);
  url.searchParams.set('requestId', requestId);
  return fetchWithUserId(url);
};


const fetchWithUserId = (url) => {
  const userId = store.getState().settings.user_id;
  url.searchParams.set('user_id', userId);
  return fetch(url)
    .then(response => response.json());
};