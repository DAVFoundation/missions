import store from '../store';
import { packageSizeOptions } from '../lib/utils';
import { createMissionTransaction } from '../actions';
import moment from 'moment';

const apiRoot = process.env.MISSION_CONTROL_URL;

export const fetchStatus = ({ id, lat, long, needId }) => {
  const missionId = store.getState().mission.id;
  let url = new URL(`/status`, apiRoot);
  id && url.searchParams.set('id', id);
  lat && url.searchParams.set('lat', lat); // Don't stand on the equator or you'll break this
  long && url.searchParams.set('long', long);
  needId && url.searchParams.set('needId', needId);
  missionId && url.searchParams.set('missionId', missionId);
  return fetchWithUserId(url);
};

export const fetchBids = ({needId}) => {
  let url = new URL(`/bids/${needId}`, apiRoot);
  return fetchWithUserId(url);
};

export const createNeed = ({ pickup, dropoff, pickup_at, size, weight, need_type }) => {
  pickup_at = moment(pickup_at, 'HH:mm').format('x');
  let url = new URL(`/needs`, apiRoot);
  const sizeOption = packageSizeOptions.find(
    sizeOption => sizeOption.id === size,
  );
  const body = {
    pickup_at: pickup_at,
    pickup_latitude: pickup.lat,
    pickup_longitude: pickup.long,
    pickup_address: pickup.address,
    dropoff_latitude: dropoff.lat,
    dropoff_longitude: dropoff.long,
    cargo_type: sizeOption.cargoType,
    weight: parseFloat(weight),
    need_type: need_type
  };
  return fetchWithUserId(url, 'POST', body);
};

export const chooseBid = (bidId, vehicle_id, price) => {
  let url = new URL(`/bids/${bidId}/choose`, apiRoot);
  return fetchWithUserId(url, 'PUT').then(response => {
    store.dispatch(createMissionTransaction(bidId, vehicle_id, price));
    return response;
  });
};

export const cancelNeed = () => {
  const needId = store.getState().order.needId;
  let url = new URL(`/needs/${needId}`, apiRoot);
  return fetchWithUserId(url, 'DELETE');
};

export const confirmTakeoff = () => {
  const missionId = store.getState().mission.mission_id;
  const command = 'takeoff_pickup';
  let url = new URL(`/mission_command`, apiRoot);
  url.searchParams.set('mission_id', missionId);
  url.searchParams.set('command', command);
  return fetchWithUserId(url);
};

const fetchWithUserId = (url, method = 'GET', body) => {
  const userId = store.getState().settings.user_id;
  url.searchParams.set('user_id', userId);
  const headers = new Headers();

  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);
  return fetch(url, options).then(response => response.json());
};
