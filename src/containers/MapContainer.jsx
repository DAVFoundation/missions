import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { getCaptainsArray/*, getCaptainOnMission*/ } from '../reducers/captains';
import {getBidArray} from '../reducers/bids';
import {updateMapCoords,getSimulationDrones} from '../actions';
import Map from '../components/Map.jsx';
import {NEED_TYPES} from '../config/needTypes';

const matchStateToProps = (state) => {
  const appPath = state.app.path;
  const needType = state.app.needType;
  let props = {
    orderStage: state.order.stage,
    pickup: state.order.pickup,
    dropoff: state.order.dropoff,
    droneLocation: state.order.droneLocation,
    needType,
    appPath
  };

  props.showRoutePath = false;
  if (needType === NEED_TYPES.DRONE_CHARGING) {
    props.mapItems = getRelevantMapItems('charger', state);
    props.mapItemType = 'charger';
  } else {
    props.mapItems = getRelevantMapItems('vehicle', state);
    props.mapItemType = 'vehicle';
  }

  if (state.mission.status) {
    props.missionStatus = state.mission.status;
    if (props.missionStatus !== 'completed') {
      props.dropoff = {long: state.mission.dropoff_longitude, lat: state.mission.dropoff_latitude};
      props.pickup = {long: state.mission.pickup_longitude, lat: state.mission.pickup_latitude};
    }
  }

  return props;
};

const mapDispatchToProps = (dispatch) => ({
  onMoveEnd: (coords) => {
    dispatch(updateMapCoords({coords: coords}));
    dispatch(getSimulationDrones());
  }
});


const getRelevantMapItems = (mapItemType, state) => {
  let mapItems = [];
  // if we are looking at bids, only show vehicles with bids
  if (['searching', 'choosing'].includes(state.order.stage)) {
    getBidArray(state.bids).forEach(
      bid => state.captains[bid.captain_id] && mapItems.push(state.captains[bid.captain_id])
    );
  } else {
    mapItems = getCaptainsArray(state.captains);
  }
  return mapItems;
};

export default connect(
  matchStateToProps,
  mapDispatchToProps
)(withRouter(Map));

