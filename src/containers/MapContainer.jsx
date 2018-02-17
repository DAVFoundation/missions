import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getVehicleArray } from '../reducers/vehicles';
import { getBidArray } from '../reducers/bids';
import { updateMapCoords } from '../actions';
import Map from '../components/Map.jsx';

const matchStateToProps = (state) => {
  let vehicles = [];
  // if we are looking at bids, only show vehicles with bids
  if (['searching', 'choosing'].includes(state.order.stage)) {
    getBidArray(state.bids).forEach(
      bid => state.vehicles[bid.vehicle_id] && vehicles.push(state.vehicles[bid.vehicle_id])
    );
  } else {
    vehicles = getVehicleArray(state.vehicles);
  }
  let props = {
    vehicles,
    orderStage: state.order.stage,
    pickup: state.order.pickup,
    dropoff: state.order.dropoff
  };
  if (state.mission) {
    props.missionStatus = state.mission.status;
    if (props.missionStatus === 'in_progress'){
      props.dropoff = {long: state.mission.dropoff_longitude, lat:state.mission.dropoff_latitude};
      props.pickup = {long: state.mission.pickup_longitude, lat: state.mission.pickup_latitude};
    }
  }
  props.appPath = state.app.path;
  return props;
};

const mapDispatchToProps = (dispatch) => ({
  onMoveEnd: (coords) => dispatch(updateMapCoords({coords: coords}))
});

export default connect(
  matchStateToProps,
  mapDispatchToProps
)(withRouter(Map));
