import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getVehicleArray} from '../reducers/vehicles';
import {getBidArray} from '../reducers/bids';
import {updateMapCoords} from '../actions';
import Map from '../components/Map.jsx';
import {getChargerArray} from '../reducers/chargers';

const matchStateToProps = (state) => {
  const appPath = state.app.path;

  let props = {
    orderStage: state.order.stage,
    pickup: state.order.pickup,
    dropoff: state.order.dropoff,
    droneLocation: state.order.droneLocation,
    appPath
  };

  if (appPath === '/drone_charging') {
    props.mapItems = getRelevantMapItems('charger', state);
    props.mapItemType = 'charger';
  } else {
    props.mapItems = getRelevantMapItems('vehicle', state);
    props.mapItemType = 'vehicle';
  }

  if (state.mission) {
    props.missionStatus = state.mission.status;
    if (props.missionStatus === 'in_progress') {
      props.dropoff = {long: state.mission.dropoff_longitude, lat: state.mission.dropoff_latitude};
      props.pickup = {long: state.mission.pickup_longitude, lat: state.mission.pickup_latitude};
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

