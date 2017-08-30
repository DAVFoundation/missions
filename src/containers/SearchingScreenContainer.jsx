import { connect } from 'react-redux';
import { getVehicleArray } from '../reducers/vehicles';
import SearchingScreen from '../components/SearchingScreen.jsx';

export default connect(
  (state) => ({vehicles: getVehicleArray(state.vehicles)}),
)(SearchingScreen);
