import store from '../store';
import {packageSizeOptions} from '../lib/utils';
import moment from 'moment';

const apiRoot = process.env.MISSION_CONTROL_URL;
const testCharger = {
  id: '1',
  icon: `https://lorempixel.com/100/100/abstract/?5673920`,
  manufacturer: 'GeoCharge',
  model: 'gc2910',
  max_charging_velocity: 30,
};
const testChargerCoordsOffset = 0.005;
const testPrice = 20000000000000000000;
const testNeedId = '5673920';

export const fetchStatus = ({id, lat, long, needId}) => {
  // TODO: implement actual status fetching for chargers

  if ((store.getState().order.stage === 'draft') && (store.getState().app.path === '/drone_charging')) {
    const chargers = generateRandomChargers({lat, long});
    return new Promise(resolve => resolve({status: 'idle', chargers}));
  } else if (needId === testNeedId) {
    testCharger.coords = {};
    testCharger.coords.lat = parseFloat(lat) + testChargerCoordsOffset;
    testCharger.coords.long = parseFloat(long) + testChargerCoordsOffset;
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
  if (needId === testNeedId) {
    const droneLocation = store.getState().order.droneLocation;
    return new Promise((resolve) => {
      testCharger.coords = {};
      testCharger.coords.lat = parseFloat(droneLocation.lat) + testChargerCoordsOffset;
      testCharger.coords.long = parseFloat(droneLocation.long) + testChargerCoordsOffset;

      resolve([{
        need_id: testNeedId,
        manufacturer: 'GeoCharge',
        model: 'gc2910',
        id: '0x',
        distance: 10,
        lat: parseFloat(droneLocation.lat) + testChargerCoordsOffset,
        long: parseFloat(droneLocation.long) + testChargerCoordsOffset,
        price: testPrice,
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
  return new Promise((resolve) => {
    resolve({needId: testNeedId});
  });
};

export const chooseBid = (bidId) => {
  if (store.getState().app.path === '/drone_charging') {
    // TODO: implement actual API call
    return new Promise(resolve => {
      resolve({
        mission: {
          charger_id: '1',
          price: testPrice,
          need_id: testNeedId,
          'status': 'awaiting_signatures',
          mission_id: 'charging_demo'
        }
      });
    });
  } else {
    let url = new URL(`/bids/${bidId}/choose`, apiRoot);
    return fetchWithUserId(url, 'PUT');
  }
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


const generateRandomChargers = (coords) => {
  let chargers = [];
  for (let i = 1; i < 5; i++) {
    chargers.push({id: i.toString(), coords: randomCoords({id: i, coords, radius: 1000})});
  }
  return chargers;
};

const randomCoords = ({id, coords, radius}) => {
  const angle = id / 10 * 2 * Math.PI;
  const distance = ((id + 1) / 10) * radius;
  const longDegreesPerMeter = 1 / 111321.377778; // longitude degrees per meter
  const latDegreesPerMeter = 1 / 111134.86111; // latitude degrees per meter
  const x = parseFloat(
    (coords.lat + latDegreesPerMeter * distance * Math.cos(angle)).toFixed(6),
  );
  const y = parseFloat(
    (coords.long + longDegreesPerMeter * distance * Math.sin(angle)).toFixed(6),
  );
  return {lat: x, long: y};
};
