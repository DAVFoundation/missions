import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getVehicleArray} from '../../reducers/vehicles';
import {getBidArray} from '../../reducers/bids';
import {updateMapCoords} from '../../actions';
import Map from '../../components/Map.jsx';
import {getChargerArray} from '../../reducers/chargers';

const matchStateToProps = (state) => {
  const appPath = state.app.path;
  const needType = state.app.needType;
  let props = {
    graddPayload: state.mission && state.mission.gradd_payload,
    orderStage: state.order.stage,
    droneLocation: state.order.droneLocation,
    startPosition: state.order.startPosition,
    endPosition: state.order.endPosition,
    needType,
    appPath
  };

  props.showRoutePath = false;

  props.mapItems = getRelevantMapItems('vehicle', state);
  props.mapItemType = 'vehicle';

  if (state.mission.status) {
    props.missionStatus = state.mission.status;
    props.startPosition = {
      lat: state.mission.start_latitude,
      long: state.mission.start_longitude
    };
    props.endPosition = {
      lat: state.mission.end_latitude,
      long: state.mission.end_longitude
    };
    if (props.missionStatus === 'in_mission') {
      if (state.captains[state.mission.captain_id] &&
        state.captains[state.mission.captain_id].status === 'ready') {        
        props.showRoutePath = true;
      }
    }
  }

  return props;
};

const mapDispatchToProps = (dispatch) => ({
  onMoveEnd: (coords) => dispatch(updateMapCoords({coords: coords}))
});


const getRelevantMapItems = (mapItemType, state) => {
  const mapItemTypePlural = `${mapItemType}s`;
  const mapItemIdKey = `${mapItemType}_id`;
  let mapItems = [];
  // if we are looking at bids, only show vehicles with bids
  if (['searching', 'choosing'].includes(state.order.stage)) {
    getBidArray(state.bids).forEach(
      bid => state[mapItemTypePlural][bid[mapItemIdKey]] && mapItems.push(state[mapItemTypePlural][bid[mapItemIdKey]])
    );
  } else {
    mapItems = mapItemType === 'vehicle' ? getVehicleArray(state[mapItemTypePlural]) : getChargerArray(state[mapItemTypePlural]);
  }
  return mapItems;
};

export default connect(
  matchStateToProps,
  mapDispatchToProps
)(withRouter(Map));

