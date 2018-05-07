import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCaptainsArray, getCaptainOnMission } from '../reducers/captains';
import { 
  approveCompletedMission, 
  confirmDroneDocking, 
  completeChargingMission,
  updateMissionStatus 
} from '../actions';
import { NEED_TYPES } from '../config/needTypes';

let Components = {
  'DeliveryMissionScreen': require('../components/MissionScreen.jsx').default,
  'ChargingMissionScreen': require('../components/drone_charging/MissionScreen.jsx').default,
  'RoutePlanMissionScreen': require('../components/route_plan/MissionScreen.jsx').default
};

const mapDispatchToProps = (dispatch) => ({
  approveCompletedMission: () => dispatch(approveCompletedMission()),
  completedMission: () => dispatch(updateMissionStatus('completed')),
  confirmDroneDocking: () => dispatch(confirmDroneDocking()),
  completeChargingMission: () => dispatch(completeChargingMission())
});

const matchStateToProps = (state) => {
  const needType = state.app.needType;
  const props = {};
  const mission = state.mission;

  if (needType === NEED_TYPES.DRONE_CHARGING) {
    props.missionStatus = mission.status;
  } else if (needType === NEED_TYPES.ROUTE_PLAN) {
    const vehicleOnMission = getCaptainOnMission(state);
    if(vehicleOnMission) {
      props.vehicleStatus = vehicleOnMission.status;
    }
  } else {
    const vehicles = getCaptainsArray(state.vehicles);
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
        timeLeftInLeg = (travellingDropoffAt + timeToDropoff - Date.now()) / 60000;
        break;
      }
      case 'pickup': {
        const vehicleSignedAt = parseInt(mission.vehicle_signed_at);
        const timeToPickup = parseInt(mission.time_to_pickup);
        timeLeftInLeg = (vehicleSignedAt + timeToPickup - Date.now()) / 60000;
        break;
      }
      }
      timeLeftInLeg = timeLeftInLeg ? parseInt(timeLeftInLeg.toFixed(0)) : 0;
      props.timeLeftInLeg = timeLeftInLeg;
    }
  }

  props.missionStatus = mission.status;
  props.price = parseFloat(mission.price);
  props.appPath = state.app.path;
  props.missionComplete = mission.status === 'completed';

  return props;
};

export default (componentName) => {
  let MissionScreen = Components[componentName];
  return connect(
    matchStateToProps,
    mapDispatchToProps
  )(withRouter(MissionScreen));
};
