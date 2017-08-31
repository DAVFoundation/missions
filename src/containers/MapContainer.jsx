import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getVehicleArray } from '../reducers/vehicles';
import { getBidArray } from '../reducers/bids';
import { updateMapCoords } from '../actions';
import Map from '../components/Map.jsx';

const mapDispatchToProps = (dispatch) => ({
  onMoveEnd: (coords) => dispatch(updateMapCoords({coords: coords}))
});

export default connect(
  (state) => {
    let vehicles = [];

    // if we are looking at bids, only show vehicles with bids
    if (state.order.state === 'searching') {
      getBidArray(state.bids).forEach(
        bid => vehicles.push(state.vehicles[bid.vehicle_id])
      );
    } else {
      vehicles = getVehicleArray(state.vehicles);
    }

    return {vehicles};
  },
  mapDispatchToProps
)(withRouter(Map));
