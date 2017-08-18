import { connect } from 'react-redux';
import { getVehicleArray } from '../reducers/vehicles';
import Map from '../components/Map.jsx';

export default connect(
  (state) => ({vehicles: getVehicleArray(state.vehicles)})
)(Map);
