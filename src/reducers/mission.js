import {handleActions} from 'redux-actions';
import {
  chooseBidFulfilled,
  updateContractMissionIdMissionId,
  confirmTakeoffPending,
  confirmTakeoffFulfilled,
  updateStatusFulfilled,
  startChargingMissionFulfilled, 
  confirmDroneDocking, 
  completeChargingMission, 
  createMissionTransactionFulfilled,
} from '../actions';
import {NEED_TYPES} from '../config/needTypes';

const defaultState = {};

export default handleActions(
  {
    [chooseBidFulfilled]: (state, {payload}) => {
      const payloadMission = payload.mission;
      let {
        mission_id,
        need_type,
        price,
      } = payloadMission;

      let mission = {
        id: parseInt(mission_id),
        price: parseFloat(price),
      };

      if (need_type === NEED_TYPES.DRONE_CHARGING) {
        mission = {
          ...mission, ...{
            chargerId: payloadMission.charger_id,
          }
        };
      } else {
        mission = {
          ...mission, ...{
            vehicleId: payloadMission.vehicle_od,
            timeToPickup: parseFloat(payloadMission.time_to_pickup),
            timeToDropoff: parseFloat(payloadMission.time_to_dropoff),
            pickup: {
              address: payloadMission.pickup_address,
              lat: parseFloat(payloadMission.pickup_latitude),
              long: parseFloat(payloadMission.pickup_longitude),
            },
            dropoff: {
              lat: parseFloat(payloadMission.dropoff_latitude),
              long: parseFloat(payloadMission.dropoff_longitude),
            },
            pickupAt: payloadMission.pickup_at,
            cargo_type: payloadMission.cargo_type,
            weight: payloadMission.weight,
            signedAt: parseInt(payloadMission.signed_at),
          }
        };
      }
      return {...state, ...mission};
    },

    [updateContractMissionIdMissionId]: (state, {payload: {contractMissionId}}) => {
      return {...state, contractMissionId: contractMissionId};
    },

    [createMissionTransactionFulfilled]: (state) => {
      return { ...state, status: 'completed' };
    },

    [confirmTakeoffPending]: state => ({
      ...state,
      status: 'takeoff_confirmation_initiated',
    }),

    [confirmTakeoffFulfilled]: (state, {payload: {mission}}) => {
      return {...state, ...mission, status: 'takeoff_confirmation_received'};
    },

    [updateStatusFulfilled]: (state, {payload: {mission}}) => {
      if (mission) {
        return {...state, ...mission, status: mission.status};
      }
      return state;
    },

    [startChargingMissionFulfilled]: (state, {payload}) => {
      if (payload.mission) {
        return {...state, ...payload.mission, status: 'charger_waiting'};
      }
      return state;
    },

    [confirmDroneDocking]: (state) => {
      return {...state, ...{status: 'docking_confirmation_received'}};
    },

    [completeChargingMission]: (state) => {
      return {...state, ...{status: 'completed'}};
    },
  },
  defaultState,
);
