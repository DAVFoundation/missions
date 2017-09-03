import { connect } from 'react-redux';
import { getBidArray } from '../reducers/bids';
import SearchingScreen from '../components/SearchingScreen.jsx';
import { resetOrderDetails, chooseBid } from '../actions';

const mapDispatchToProps = (dispatch) => ({
  cancelSearch: () => dispatch(resetOrderDetails()),
  chooseBid: (bidId) => dispatch(chooseBid(bidId)),
});

export default connect(
  (state) => ({
    vehicles: state.vehicles,
    bids: getBidArray(state.bids),
    stage: state.order.stage,
  }),
  mapDispatchToProps
)(SearchingScreen);
