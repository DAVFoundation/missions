import { connect } from 'react-redux';
import MissionScreen from '../components/MissionScreen.jsx';
import { humanReadableVehicleStatus } from '../lib/utils';
import { getVehicleArray } from '../reducers/vehicles';

const matchStateToProps = (state) => {
  const vehicles = getVehicleArray(state.vehicles);
  let props = {};
  if (vehicles[0]) props.vehicleStatus = humanReadableVehicleStatus[vehicles[0].status];
  return props;
};

export default connect(
  matchStateToProps,
  () => ({})
)(MissionScreen);
