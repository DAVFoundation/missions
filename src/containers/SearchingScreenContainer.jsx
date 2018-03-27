import { connect } from 'react-redux';
import { getBidArray } from '../reducers/bids';
import { getVehicleOnMission } from '../reducers/vehicles';
import SearchingScreen from '../components/SearchingScreen.jsx';
import { resetOrderDetails, chooseBid } from '../actions';
import { cancelNeed } from '../lib/api';

const mapDispatchToProps = (dispatch) => ({
  cancelSearch: () => cancelNeed().then(dispatch(resetOrderDetails())),
  chooseBid: (bidId, vehicle_id, price) => dispatch(chooseBid(bidId, vehicle_id, price)),
});

export default connect(
  (state) => ({
    vehicles: state.vehicles,
    bids: getBidArray(state.bids),
    stage: state.order.stage,
    vehicleOnMission: getVehicleOnMission(state),
    missionId: state.mission.id,
  }),
  mapDispatchToProps
)(SearchingScreen);
