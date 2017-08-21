import { handleActions } from 'redux-actions';
import { setVehicles } from '../actions';

const defaultState = {
  '0xb2930B35844a230f00E51431aCAe96Fe543a0347': {
    'id': '0xb2930B35844a230f00E51431aCAe96Fe543a0347',
    'model': 'DJX CargoMate 3',
    'coords': {lat: 32.069450, long: 34.772898},
    'rating': 4.9,
    'missions_completed': 36,
    'missions_completed_7_days': 3,
  },
  '0xF00ce0d081A73400e79e88379ca135C22bfBCBcC': {
    'id': '0xF00ce0d081A73400e79e88379ca135C22bfBCBcC',
    'model': 'DJX iHaul',
    'coords': {lat: 32.068178, long: 34.778069},
    'rating': 4.6,
    'missions_completed': 290,
    'missions_completed_7_days': 13,
  },
  '0xe4cFdAf5F656f65f21D04AF3924AA9E3d5828eD0': {
    'id': '0xe4cFdAf5F656f65f21D04AF3924AA9E3d5828eD0',
    'model': 'Parakeet Heavy',
    'coords': {lat: 32.065362, long: 34.772168},
    'rating': 4.8,
    'missions_completed': 19,
    'missions_completed_7_days': 0,
  }
};

export default handleActions({

  [setVehicles]: (state, { payload }) => {
    let nextState = {};
    payload.forEach(vehicle => {
      nextState[vehicle.id] = vehicle;
    });
    return nextState;
  }

}, defaultState);

export const getVehicleArray = (state) => Object.entries(state).map(([, vehicle]) => vehicle);
