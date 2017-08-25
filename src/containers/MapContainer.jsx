import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getVehicleArray } from '../reducers/vehicles';
import { updateMapCoords } from '../actions';
import Map from '../components/Map.jsx';

const mapDispatchToProps = (dispatch) => ({
  onMoveEnd: (coords) => dispatch(updateMapCoords({coords: coords}))
});

export default connect(
  (state) => ({vehicles: getVehicleArray(state.vehicles)}),
  mapDispatchToProps
)(withRouter(Map));
