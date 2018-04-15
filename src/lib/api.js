import store from '../store';
import {packageSizeOptions} from '../lib/utils';
import moment from 'moment';

const apiRoot = process.env.MISSION_CONTROL_URL;
const testCharger = {   // TODO: Remove this
  id: '1',
  icon: `https://lorempixel.com/100/100/abstract/?5673920`,
  manufacturer: 'GeoCharge',
  model: 'gc2910',
  max_charging_velocity: 30
};

export const fetchStatus = ({id, lat, long, needId}) => {
  if (needId === '5673920') {
    console.log('hahah');
    const chargers = [testCharger];
    return new Promise(resolve => resolve({status: 'idle', chargers}));
  } else {
    const missionId = store.getState().mission.id;
    let url = new URL(`/status`, apiRoot);
    id && url.searchParams.set('id', id);
    lat && url.searchParams.set('lat', lat); // Don't stand on the equator or you'll break this
    long && url.searchParams.set('long', long);
    needId && url.searchParams.set('needId', needId);
    missionId && url.searchParams.set('missionId', missionId);
    return fetchWithUserId(url);
  }
};

export const fetchBids = ({needId}) => {
  // TODO: implement actual bid fetching
  if (needId === '5673920') {
    const droneLocation = store.getState().order.droneLocation;
    return new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
      resolve([{
        need_id: '5673920',
        manufacturer: 'GeoCharge',
        model: 'gc2910',
        id: '0x',
        distance: 10,
        latitude: parseFloat(droneLocation.lat) + 0.018,
        longitude: parseFloat(droneLocation.long) + 0.018,
        price: 20000000000000000000,
        charger_id: testCharger.id,
        charger: testCharger
      }]);
    });
  } else {
    let url = new URL(`/bids/${needId}`, apiRoot);
    return fetchWithUserId(url);
  }
};

export const createNeed = (needDetails, needType = 'delivery_drones') => {
  if (needType === 'delivery_drones') {
    return createDeliveryNeed(needDetails);
  } else {
    return createChargingNeed(needDetails);
  }
};

const createDeliveryNeed = ({pickup, dropoff, pickup_at, size, weight}) => {
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
  };
  return fetchWithUserId(url, 'POST', body);
};

const createChargingNeed = (needDetails) => { // eslint-disable-line no-unused-vars
  // TODO: implement actual API call
  return new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
    resolve({needId: '5673920'});
  });
};

export const chooseBid = (bidId) => {
  let url = new URL(`/bids/${bidId}/choose`, apiRoot);
  return fetchWithUserId(url, 'PUT');
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

  const options = {method, headers};
  if (body) options.body = JSON.stringify(body);
  return fetch(url, options).then(response => response.json());
};
