// Constants
export const SET_VEHICLES = 'SET_VEHICLES';


// Action creators
export const setVehicles = vehicles => {
  return {
    type: SET_VEHICLES,
    payload: vehicles
  };
};
