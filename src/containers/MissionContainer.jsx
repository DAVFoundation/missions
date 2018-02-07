import { connect } from 'react-redux';
import MissionScreen from '../components/MissionScreen.jsx';
import { getVehicleArray } from '../reducers/vehicles';

const matchStateToProps = (state) => {
  const vehicles = getVehicleArray(state.vehicles);
  const mission = state.mission;
  let props = {};
  if (vehicles[0] && vehicles[0].status) {
    const leg = vehicles[0].status.split('_')[1];
    props.vehicleStatus = vehicles[0].status;
    props.leg = leg;
    let timeLeftInLeg;
    switch (leg) {
    case 'dropoff': {
      const travellingDropoffAt = parseInt(mission.travelling_dropoff_at);
      const timeToDropoff = parseInt(mission.time_to_dropoff);
      timeLeftInLeg = (travellingDropoffAt + timeToDropoff - Date.now())/60000;
      break;
    }
    case 'pickup': {
      const vehicleSignedAt = parseInt(mission.vehicle_signed_at);
      const timeToPickup = parseInt(mission.time_to_pickup);
      timeLeftInLeg = (vehicleSignedAt + timeToPickup - Date.now())/60000;
      break;
    }
    }
    timeLeftInLeg = timeLeftInLeg ? timeLeftInLeg.toFixed(0) : '0';
    props.timeLeftInLeg = timeLeftInLeg;
  }

  return props;
};



export default connect(
  matchStateToProps,
  () => ({})
)(MissionScreen);
