import store from '../store';
import uuid from 'uuid/v4';
import { packageSizeOptions } from '../lib/utils';
import { createMissionTransaction } from '../actions';
import { NEED_TYPES } from '../config/needTypes.js';
import moment from 'moment';

const apiRoot = process.env.MISSION_CONTROL_URL;

const simulationType = 'ROUTE_PLAN';
let simulationMissionStarted = false;
let simulationMissionCompleted = false;
const getAPIFixtures = (simulation) => { // TODO: Remove this
  switch(simulation) {
  case 'ROUTE_PLAN': {
    let provider = {
      id: '0xaca94ef8bd5ffee41947b4585a84bda5a3d3da6e',
      model: 'GRADD',
      icon: `https://lorempixel.com/100/100/abstract/?5673920`,
    };
    return {
      need_id: 'DRONE_ROUTE_PLAN_STUB',
      manufacturer: 'GRADD',
      model: 'GRADD',
      id: uuid().substr(0, 32),
      ETA: 48,
      price: 20000000000000000000,
      provider_id: provider.id,
      provider
    };
  }
  case 'CHARGING': {
    const droneLocation = store.getState().order.droneLocation;
    const testCharger = {
      id: '1',
      icon: `https://lorempixel.com/100/100/abstract/?5673920`,
      manufacturer: 'GeoCharge',
      model: 'gc2910',
      max_charging_velocity: 30
    };
    return {
      need_id: '5673920',
      manufacturer: 'GeoCharge',
      model: 'gc2910',
      id: '0x',
      distance: 10,
      latitude: parseFloat(droneLocation.lat) + 0.018,
      longitude: parseFloat(droneLocation.long) + 0.018,
      price: 20000000000000000000,
      charger_id: testCharger.id,
      charger: testCharger,
      provider: testCharger
    };
  }
  }
};

export const fetchStatus = ({id, lat, long, needId}) => {
  if (simulationType !== 'NONE') {
    if (simulationMissionCompleted) {
      return Promise.resolve({ status: 'in_mission', mission: { status: 'completed' } });
    } else if(simulationMissionStarted) {
      return Promise.resolve({ status: 'in_mission', mission: { status: 'in_progress' } });
    } else {
      let providers = [getAPIFixtures(simulationType).provider];
      return Promise.resolve({ status: 'idle', providers });
    }
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
  if (simulationType !== 'NONE') {
    return Promise.resolve([getAPIFixtures(simulationType)]);
  } else {
    let url = new URL(`/bids/${needId}`, apiRoot);
    return fetchWithUserId(url);
  }
};

export const createNeed = (needDetails) => {
  let { need_type } = needDetails;
  switch(need_type) {
  case NEED_TYPES.DRONE_DELIVERY: {
    let { pickup, dropoff, pickup_at, size, weight } = needDetails;
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
  }
  case NEED_TYPES.DRONE_CHARGING: {
    // TODO: implement actual API call
    return new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
      resolve({needId: '5673920'});
    });
  }
  case NEED_TYPES.ROUTE_PLAN: {
  //   let url = new URL(`/needs`, apiRoot);
  //   let { startPosition, endPosition, flightHeight, heightUnits } = needDetails;
  //   const body = {
  //     start_latitude: startPosition.lat,
  //     start_longitude: startPosition.long,
  //     end_latitude: endPosition.lat,
  //     end_longitude: endPosition.long,
  //     flight_height: flightHeight,
  //     height_units: heightUnits,
  //     need_type: need_type
  //   };
  //   return fetchWithUserId(url, 'POST', body);
    return Promise.resolve({ needId: 'DRONE_ROUTE_PLAN_STUB' });
  }
  default: {
    return new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
      reject({message: 'Need type is not supported'});
    });
  }
  }
};

export const completeSimulationMission = () => {
  simulationMissionCompleted = true;
};

export const chooseBid = (bidId, vehicle_id, price) => {
  // TODO: implement actual bid fetching
  if (simulationType !== 'NONE') {
    return new Promise((resolve, reject) => { // eslint-disable-line no-unused-vars
      store.dispatch(createMissionTransaction(bidId, vehicle_id, price));
      simulationMissionStarted = true;
      resolve({
        mission: {
          mission_id: 1,
          vehicle_id: '0xaca94ef8bd5ffee41947b4585a84bda5a3d3da6e',
          price: 20000000000000000000,
          // time_to_pickup,
          // time_to_dropoff,
          // pickup_latitude,
          // pickup_longitude,
          // pickup_address,
          // dropoff_latitude,
          // dropoff_longitude,
          // pickup_at,
          // cargo_type,
          // weight,
          signed_at: Date.now()
        }
      });
    });
  } else {
    let url = new URL(`/bids/${bidId}/choose`, apiRoot);
    return fetchWithUserId(url, 'PUT').then(response => {
      store.dispatch(createMissionTransaction(bidId, vehicle_id, price));
      return response;
    });
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