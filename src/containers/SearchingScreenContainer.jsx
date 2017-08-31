import { connect } from 'react-redux';
import { getBidArray } from '../reducers/bids';
import SearchingScreen from '../components/SearchingScreen.jsx';

export default connect(
  (state) => ({
    vehicles: state.vehicles,
    bids: getBidArray(state.bids),
  }),
)(SearchingScreen);
