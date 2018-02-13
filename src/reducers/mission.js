import { handleActions } from 'redux-actions';
import { chooseBidFulfilled, confirmTakeoffPending, confirmTakeoffFulfilled, updateStatusFulfilled} from '../actions';

const defaultState = {};

export default handleActions({

  [chooseBidFulfilled]: (state, { payload }) => {
    let {
      mission_id,
      vehicle_id,
      price,
      time_to_pickup,
      time_to_dropoff,
      pickup_latitude,
      pickup_longitude,
      dropoff_latitude,
      dropoff_longitude,
      start_at,
      cargo_type,
      weight,
      signed_at,
    } = payload.mission;
    const mission = {
      id: parseInt(mission_id),
      vehicleId: vehicle_id,
      price: parseFloat(price),
      timeToPickup: parseFloat(time_to_pickup),
      timeToDropoff: parseFloat(time_to_dropoff),
      pickup: {lat: parseFloat(pickup_latitude), long: parseFloat(pickup_longitude) },
      dropoff: {lat: parseFloat(dropoff_latitude), long: parseFloat(dropoff_longitude) },
      startAt: start_at,
      cargo_type: cargo_type,
      weight: weight,
      signedAt: parseInt(signed_at),
    };
    return {...state, ...mission};
  },

  [confirmTakeoffPending]: state => ({...state, status: 'takeoff_confirmation_initiated'}),

  [confirmTakeoffFulfilled]: (state, { payload: {mission} }) => {
    return {...state, ...mission, status: 'takeoff_confirmation_received'};
  },

  [updateStatusFulfilled]: (state, { payload: {mission} }) => {
    if (mission){
      return {...state, ...mission, status: mission.status};
    }
    return state;
  }

}, defaultState);
