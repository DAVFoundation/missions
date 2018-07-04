import {
  packageSizeOptions
} from '../lib/utils';
import {
  createNeed,
} from './dav';
import moment from 'moment';
import {
  NEED_TYPES
} from '../config/needTypes.js';

export const createDroneChargingNeed = ({
  chargingVelocity,
  currentCharge,
  droneLocation,
  droneType,
  searchRadius
}) => {
  // :    { address: "TT 453A Giải Phóng, Phương Liệt, Thanh Xuân, Hanoi, Vietnam", lat: 20.995084, long: 105.84166400000004 }
  const params = {
    chargingVelocity,
    currentCharge,
    droneLocation,
    droneType,
    searchRadius,
    need_location_latitude: droneLocation.lat,
    need_location_longitude: droneLocation.long,
    need_type: NEED_TYPES.DRONE_CHARGING
  };

  return createNeed(params);
};

export const createRoutePlanNeed = ({
  startPosition,
  endPosition,
  flightHeight,
  heightUnits
}) => {
  const params = {
    need_location_latitude: startPosition.lat,
    need_location_longitude: startPosition.long,
    start_latitude: startPosition.lat,
    start_longitude: startPosition.long,
    end_latitude: endPosition.lat,
    end_longitude: endPosition.long,
    flight_height: flightHeight,
    height_units: heightUnits,
    need_type: NEED_TYPES.ROUTE_PLAN
  };

  return createNeed(params);
};

export const createDroneDeliveryNeed = ({
  pickup,
  dropoff,
  pickup_at,
  size,
  weight
}) => {
  pickup_at = moment(pickup_at, 'HH:mm').format('x');
  const sizeOption = packageSizeOptions.find(
    sizeOption => sizeOption.id === size,
  );

  const params = {
    need_location_latitude: pickup.lat,
    need_location_longitude: pickup.long,
    pickup_at: pickup_at,
    pickup_latitude: pickup.lat,
    pickup_longitude: pickup.long,
    pickup_address: pickup.address,
    dropoff_latitude: dropoff.lat,
    dropoff_longitude: dropoff.long,
    cargo_type: sizeOption.cargoType,
    weight: parseFloat(weight),
    need_type: NEED_TYPES.DRONE_DELIVERY
  };

  return createNeed(params);
};
