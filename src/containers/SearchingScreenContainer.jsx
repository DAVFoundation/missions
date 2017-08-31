import { connect } from 'react-redux';
import { getVehicleArray } from '../reducers/vehicles';
import { getBidArray } from '../reducers/bids';
import SearchingScreen from '../components/SearchingScreen.jsx';

export default connect(
  (state) => ({
    vehicles: getVehicleArray(state.vehicles),
    bids: getBidArray(state.bids),
  }),
)(SearchingScreen);
