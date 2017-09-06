import { handleActions } from 'redux-actions';
import { chooseBidFulfilled } from '../actions';

const defaultState = {};

export default handleActions({

  [chooseBidFulfilled]: (state, { payload }) => {
    let {
      mission_id,
      vehicle_id,
      price,
      time_to_pickup,
      time_to_dropoff,
      pickup_lat,
      pickup_long,
      dropoff_lat,
      dropoff_long,
      requested_pickup_time,
      size,
      weight,
      signed_at,
    } = payload.mission;
    const mission = {
      missionId: parseInt(mission_id),
      vehicleId: vehicle_id,
      price: parseFloat(price),
      timeToPickup: parseFloat(time_to_pickup),
      timeToDropoff: parseFloat(time_to_dropoff),
      pickup: {lat: parseFloat(pickup_lat), long: parseFloat(pickup_long) },
      dropoff: {lat: parseFloat(dropoff_lat), long: parseFloat(dropoff_long) },
      requestedPickupTime: requested_pickup_time,
      size: size,
      weight: weight,
      signedAt: parseInt(signed_at),
    };
    return {...state, ...mission};
  }

}, defaultState);
