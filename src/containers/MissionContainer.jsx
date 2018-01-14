import { connect } from 'react-redux';
import MissionScreen from '../components/MissionScreen.jsx';
import { humanReadableVehicleStatus } from '../lib/utils';
import { getVehicleArray } from '../reducers/vehicles';

const matchStateToProps = (state) => {
  const vehicles = getVehicleArray(state.vehicles);
  return {
    vehicleStatus: humanReadableVehicleStatus[vehicles[0].status],
  };
};

export default connect(
  matchStateToProps,
  () => ({})
)(MissionScreen);
