import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getCaptainOnMission } from '../reducers/captains';
import { 
  approveCompletedMission, 
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
  confirmDroneDocking: () => dispatch(updateMissionStatus('docking_confirmation_received', 'docking_confirmation_received')),
  completeChargingMission: () => dispatch(updateMissionStatus('ready', 'ready')),
});

const matchStateToProps = (state) => {
  const needType = state.app.needType;
  const props = {};
  const mission = state.mission;

  const vehicleOnMission = getCaptainOnMission(state);
  if(vehicleOnMission && vehicleOnMission.status) {
    props.vehicleStatus = vehicleOnMission.status;
  }

  if (needType === NEED_TYPES.DRONE_DELIVERY) {
    if(props.vehicleStatus) {
      props.leg = props.vehicleStatus.split('_')[1];
      let timeLeftInLeg;
      switch (props.leg) {
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
      props.timeLeftInLeg = timeLeftInLeg ? parseInt(timeLeftInLeg.toFixed(0)) : 0;
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
